// src\lib\api\unwrap-api-response.ts
// This is a helper function to unwrap the data from an API response and handle errors

import type { ApiResponse } from "@/types/api";

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error.message);
  }

  return response.data;
}
