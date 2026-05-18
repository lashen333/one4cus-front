// src/app/api/revalidate/route.ts

import { CACHE_TAGS } from "@/lib/cache/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidateBody = {
  secret: string;
  type: "home" | "services" | "service" | "deals" | "deal" | "providers" | "provider" | "all";
  slug?: string;
};

function isValidSecret(secret: string) {
  return Boolean(secret) && secret === process.env.REVALIDATION_SECRET;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RevalidateBody;

    if (!isValidSecret(body.secret)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid revalidation secret.",
        },
        { status: 401 },
      );
    }

    switch (body.type) {
      case "home": {
        revalidateTag(CACHE_TAGS.home, "max");
        revalidatePath("/");
        break;
      }

      case "services": {
        revalidateTag(CACHE_TAGS.services, "max");
        revalidateTag(CACHE_TAGS.home, "max");

        revalidatePath("/");
        revalidatePath("/services");
        break;
      }

      case "service": {
        if (!body.slug) {
          return NextResponse.json(
            {
              success: false,
              message: "Service slug is required.",
            },
            { status: 400 },
          );
        }

        revalidateTag(CACHE_TAGS.services, "max");
        revalidateTag(CACHE_TAGS.service(body.slug), "max");
        revalidateTag(CACHE_TAGS.home, "max");

        revalidatePath("/");
        revalidatePath("/services");
        revalidatePath(`/services/${body.slug}`);
        break;
      }

      case "deals": {
        revalidateTag(CACHE_TAGS.deals, "max");
        revalidateTag(CACHE_TAGS.home, "max");

        revalidatePath("/");
        revalidatePath("/deals");
        break;
      }

      case "deal": {
        if (!body.slug) {
          return NextResponse.json(
            {
              success: false,
              message: "Deal slug is required.",
            },
            { status: 400 },
          );
        }

        revalidateTag(CACHE_TAGS.deals, "max");
        revalidateTag(CACHE_TAGS.deal(body.slug), "max");
        revalidateTag(CACHE_TAGS.home, "max");

        revalidatePath("/");
        revalidatePath("/deals");
        revalidatePath(`/deals/${body.slug}`);
        break;
      }

      case "providers": {
        revalidateTag(CACHE_TAGS.providers, "max");
        revalidatePath("/providers");
        break;
      }

      case "provider": {
        if (!body.slug) {
          return NextResponse.json(
            {
              success: false,
              message: "Provider slug is required.",
            },
            { status: 400 },
          );
        }

        revalidateTag(CACHE_TAGS.providers, "max");
        revalidateTag(CACHE_TAGS.provider(body.slug), "max");
        revalidatePath(`/providers/${body.slug}`);
        break;
      }

      case "all": {
        revalidateTag(CACHE_TAGS.home, "max");
        revalidateTag(CACHE_TAGS.services, "max");
        revalidateTag(CACHE_TAGS.deals, "max");
        revalidateTag(CACHE_TAGS.providers, "max");

        revalidatePath("/");
        revalidatePath("/services");
        revalidatePath("/deals");
        break;
      }

      default: {
        return NextResponse.json(
          {
            success: false,
            message: "Unsupported revalidation type.",
          },
          { status: 400 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      type: body.type,
      slug: body.slug ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to revalidate cache.",
      },
      { status: 500 },
    );
  }
}
