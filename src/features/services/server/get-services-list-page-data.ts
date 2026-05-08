// src\features\services\server\get-services-list-page-data.ts
/*import { servicesListMock } from "../mocks/services-list.mock";

export async function getServicesPageData() {
  return servicesListMock;
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { servicesPageStaticConfig } from "../config/services-page.config";
import { mapServiceDtoToListItem, type ServiceListDto } from "../mappers/services-list.mapper";
import type { ServicesPageData } from "../types/services-list.types";

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

export async function getServicesPageData(): Promise<ServicesPageData> {
  const response = await publicApiFetch<ApiResponse<ServicesApiPayload>>("/api/public/services", {
    revalidate: 60,
  });

  const payload = unwrapApiResponse(response);
  const items = payload.data.map(mapServiceDtoToListItem);

  return {
    ...servicesPageStaticConfig,
    resultCount: payload.meta.total,
    items,
  };
}
