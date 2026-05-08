// src\features\deals\server\get-deals-list-page-data.ts
/*import { dealsListMock } from "../mocks/deals-list.mock";

export async function getDealsPageData() {
  return dealsListMock;
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { dealsPageStaticConfig } from "../config/deals-page.config";
import {
  mapOpportunityDtoToDealListItem,
  type OpportunityListDto,
} from "../mappers/deals-list.mapper";
import type { DealsListingPageData } from "../types/deals-list.types";

type OpportunitiesApiPayload = {
  data: OpportunityListDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getDealsPageData(): Promise<DealsListingPageData> {
  const response = await publicApiFetch<ApiResponse<OpportunitiesApiPayload>>(
    "/api/public/opportunities",
    {
      revalidate: 60,
    },
  );

  const payload = unwrapApiResponse(response);
  const items = payload.data.map(mapOpportunityDtoToDealListItem);

  return {
    ...dealsPageStaticConfig,
    items,
  };
}
