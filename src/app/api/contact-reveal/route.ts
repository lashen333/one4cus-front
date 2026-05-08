// src\app\api\contact-reveal\route.ts

//this api route handle the contact leads
import { NextRequest, NextResponse } from "next/server";

type ContactRevealBody = {
  entityType: "service" | "deal" | "provider";
  entitySlug: string;
  sourceTitle: string;
  visitorName: string;
  visitorContact: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

function validateBody(body: Partial<ContactRevealBody>) {
  if (!body.entityType) return "Entity type is required.";
  if (!body.entitySlug) return "Entity slug is required.";
  if (!body.visitorName?.trim()) return "Name is required.";
  if (!body.visitorContact?.trim()) return "Phone number or email is required.";

  return null;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function unwrapBackendData<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message ?? "Backend response failed.");
  }

  return response.data;
}

async function getRevealContact(entityType: ContactRevealBody["entityType"], slug: string) {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is missing.");
  }

  if (entityType === "deal") {
    const response = await fetchJson<
      ApiResponse<{
        providerPhone: string | null;
        providerWhatsapp: string | null;
      }>
    >(`${backendUrl}/api/public/opportunities/slug/${slug}`);

    const data = unwrapBackendData(response);

    return data.providerPhone ?? data.providerWhatsapp ?? null;
  }

  if (entityType === "service") {
    const response = await fetchJson<
      ApiResponse<{
        providerPhone: string | null;
        providerWhatsapp: string | null;
      }>
    >(`${backendUrl}/api/public/services/slug/${slug}`);

    const data = unwrapBackendData(response);

    return data.providerPhone ?? data.providerWhatsapp ?? null;
  }

  if (entityType === "provider") {
    const response = await fetchJson<
      ApiResponse<{
        primaryPhone: string | null;
        whatsappNumber: string | null;
      }>
    >(`${backendUrl}/api/public/providers/slug/${slug}`);

    const data = unwrapBackendData(response);

    return data.primaryPhone ?? data.whatsappNumber ?? null;
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRevealBody;
    const validationError = validateBody(body);

    if (validationError) {
      return NextResponse.json(
        {
          success: false,
          message: validationError,
        },
        { status: 400 },
      );
    }

    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK_URL;

    if (!sheetWebhookUrl) {
      throw new Error("GOOGLE_SHEETS_CONTACT_WEBHOOK_URL is missing.");
    }

    const revealedContact = await getRevealContact(body.entityType, body.entitySlug);

    if (!revealedContact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact number is not available for this listing.",
        },
        { status: 404 },
      );
    }

    await fetch(sheetWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entityType: body.entityType,
        entitySlug: body.entitySlug,
        sourceTitle: body.sourceTitle,
        visitorName: body.visitorName,
        visitorContact: body.visitorContact,
        revealedContact,
        userAgent: request.headers.get("user-agent") ?? "",
      }),
    });

    return NextResponse.json({
      success: true,
      data: {
        revealedContact,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to reveal contact.",
      },
      { status: 500 },
    );
  }
}
