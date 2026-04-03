// src\lib\api\api-response.ts
export function createSuccessResponse<T>(data: T, status = 200) {
  return Response.json(
    {
      success: true,
      data,
    },
    {
      status,
    },
  );
}
