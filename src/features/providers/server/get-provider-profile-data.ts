// src\features\providers\server\get-provider-profile-data.ts
/*import { providerProfileMock } from "../mocks/provider-profile.mock";

export async function getProviderProfileData(slug: string) {
  return {
    ...providerProfileMock,
    slug,
  };
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { notFound } from "next/navigation";

export async function getProviderProfileData(slug: string) {
  const response = await publicApiFetch<ApiResponse<unknown>>(
    `/api/public/providers/slug/${slug}`,
    {
      revalidate: 60,
    },
  );

  console.log("PROVIDER RAW RESPONSE:", JSON.stringify(response, null, 2));

  const data = unwrapApiResponse(response);

  console.log("PROVIDER UNWRAPPED DATA:", JSON.stringify(data, null, 2));

  if (!data) {
    notFound();
  }

  return data as never;
}
