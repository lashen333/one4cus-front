// src\features\services\server\get-services-list-page-data.ts
/*import { servicesListMock } from "../mocks/services-list.mock";

export async function getServicesPageData() {
  return servicesListMock;
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import { CACHE_TAGS } from "@/lib/cache/cache-tags";
import type { ApiResponse } from "@/types/api";
import { servicesPageStaticConfig } from "../config/services-page.config";
import { mapServiceDtoToListItem, type ServiceListDto } from "../mappers/services-list.mapper";
import type { ServicesPageData } from "../types/services-list.types";
import { buildServicesApiQuery, type ServicesQueryParams } from "../utils/services-filter.utils";

type ServicesApiPayload = {
  data: ServiceListDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getServicesPageData(
  query: ServicesQueryParams = {},
): Promise<ServicesPageData> {
  const apiQuery = buildServicesApiQuery({
    page: query.page ?? 1,
    limit: query.limit ?? 12,
    search: query.search,
    city: query.city,
    categories: query.categories,
    verified: query.verified,
  });

  const response = await publicApiFetch<ApiResponse<ServicesApiPayload>>(
    `/api/public/services?${apiQuery}`,
    {
      revalidate: 300,
      tags: [CACHE_TAGS.services, CACHE_TAGS.home],
    },
  );

  const payload = unwrapApiResponse(response);
  const items = payload.data.map(mapServiceDtoToListItem);

  return {
    ...servicesPageStaticConfig,
    resultCount: payload.meta.total,
    items,
    pagination: payload.meta,
  };
}
