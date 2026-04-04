// src\lib\api\api-error.ts
import { appMessages } from "@/lib/constants/messages";

const isDevelopment = process.env.NODE_ENV === "development";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ApiErrorCode;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    code: ApiErrorCode = "INTERNAL_SERVER_ERROR",
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function createErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: isDevelopment ? (error.details ?? null) : null,
        },
      },
      {
        status: error.statusCode,
      },
    );
  }

  console.error("Unhandled API error:", error);

  return Response.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: appMessages.general.somethingWentWrong,
        details: null,
      },
    },
    {
      status: 500,
    },
  );
}
