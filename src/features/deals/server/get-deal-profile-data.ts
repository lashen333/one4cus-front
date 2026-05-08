// src\features\deals\server\get-deal-profile-data.ts
/*import { dealProfileMock } from "../mocks/deal-profile.mock";

export async function getDealProfileData(slug: string) {
  return {
    ...dealProfileMock,
    slug,
  };
}
*/

// src/features/deals/server/get-deal-profile-data.ts
import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { notFound } from "next/navigation";
import {
  mapOpportunityDetailDtoToViewModel,
  type OpportunityDetailDto,
} from "../mappers/deal-profile.mapper";

type OpportunityDetailApiPayload =
  | OpportunityDetailDto
  | {
      data: OpportunityDetailDto;
    };

function extractOpportunityDto(payload: OpportunityDetailApiPayload): OpportunityDetailDto | null {
  if ("data" in payload && payload.data) {
    return payload.data;
  }

  return payload as OpportunityDetailDto;
}

export async function getDealProfileData(slug: string) {
  const response = await publicApiFetch<ApiResponse<OpportunityDetailApiPayload | null>>(
    `/api/public/opportunities/slug/${slug}`,
    {
      revalidate: 60,
    },
  );

  const payload = unwrapApiResponse(response);

  if (!payload) {
    notFound();
  }

  const opportunityDto = extractOpportunityDto(payload);

  if (!opportunityDto) {
    notFound();
  }

  return mapOpportunityDetailDtoToViewModel(opportunityDto);
}
