// src\app\api\health\route.ts
import { ApiError, createErrorResponse } from "@/lib/api/api-error";
import { createSuccessResponse } from "@/lib/api/api-response";

export async function GET() {
  try {
    const isHealthy = true;

    if (!isHealthy) {
      throw new ApiError("Service is unavailable", 503, "INTERNAL_SERVER_ERROR");
    }

    return createSuccessResponse({
      status: "ok",
      message: "API is running",
    });
  } catch (error) {
    return createErrorResponse(error);
  }
}
