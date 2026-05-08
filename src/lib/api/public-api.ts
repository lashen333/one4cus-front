// src\lib\api\public-api.ts
// This is a reusable typed fetch helper for calling a backend API
const BACKEND_API_URL = process.env.BACKEND_API_URL;

type PublicApiFetchOptions = {
  revalidate?: number;
  cache?: RequestCache;
};

export async function publicApiFetch<T>(
  path: string,
  options: PublicApiFetchOptions = {},
): Promise<T> {
  if (!BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is missing in .env.local");
  }

  const url = `${BACKEND_API_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: options.cache,
    next:
      options.cache === "no-store"
        ? undefined
        : {
            revalidate: options.revalidate ?? 60,
          },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `API request failed: ${response.status} ${response.statusText}. URL: ${url}. Response: ${errorText}`,
    );
  }

  return response.json() as Promise<T>;
}
