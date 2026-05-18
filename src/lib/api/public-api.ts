// src/lib/api/public-api.ts
// Reusable typed fetch helper for calling the backend public API from Server Components / server loaders.

const BACKEND_API_URL = process.env.BACKEND_API_URL;

type PublicApiFetchOptions = {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
};

function getBackendApiUrl() {
  if (!BACKEND_API_URL) {
    throw new Error("BACKEND_API_URL is missing in .env");
  }

  return BACKEND_API_URL.replace(/\/$/, "");
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function publicApiFetch<T>(
  path: string,
  options: PublicApiFetchOptions = {},
): Promise<T> {
  const baseUrl = getBackendApiUrl();
  const normalizedPath = normalizePath(path);
  const url = `${baseUrl}${normalizedPath}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: options.cache,
    next:
      options.cache === "no-store"
        ? undefined
        : {
            revalidate: options.revalidate ?? 300,
            tags: options.tags,
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
