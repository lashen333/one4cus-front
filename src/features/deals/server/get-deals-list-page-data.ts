// src\features\deals\server\get-deals-list-page-data.ts
/*import { dealsListMock } from "../mocks/deals-list.mock";

export async function getDealsPageData() {
  return dealsListMock;
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import { CACHE_TAGS } from "@/lib/cache/cache-tags";
import type { ApiResponse } from "@/types/api";
import { dealsPageStaticConfig } from "../config/deals-page.config";
import {
  mapOpportunityDtoToDealListItem,
  type OpportunityListDto,
} from "../mappers/deals-list.mapper";
import type { DealsListingPageData } from "../types/deals-list.types";
import { buildDealsApiQuery, type DealsQueryParams } from "../utils/deals-filter.utils";

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

export async function getDealsPageData(
  query: DealsQueryParams = {},
): Promise<DealsListingPageData> {
  const apiQuery = buildDealsApiQuery({
    page: query.page ?? 1,
    limit: query.limit ?? 12,
    search: query.search,
    categories: query.categories,
    verified: query.verified,
  });
  const response = await publicApiFetch<ApiResponse<OpportunitiesApiPayload>>(
    `/api/public/opportunities?${apiQuery}`,
    {
      revalidate: 300,
      tags: [CACHE_TAGS.deals, CACHE_TAGS.home],
    },
  );

  const payload = unwrapApiResponse(response);
  const items = payload.data.map(mapOpportunityDtoToDealListItem);

  return {
    ...dealsPageStaticConfig,
    resultCount: payload.meta.total,
    pagination: payload.meta,
    items,
  };
}
