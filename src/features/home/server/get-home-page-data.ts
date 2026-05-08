// src\features\home\server\get-home-page-data.ts
/*import { homePageMock } from "../mocks/home-page.mock";

export async function getHomePageData() {
  return homePageMock;
}
*/

import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { homePageStaticConfig } from "../config/home-page.config";
import {
  mapHomeOpportunityDtoToDealItem,
  mapHomeServiceDtoToProviderItem,
  type HomeOpportunityDto,
  type HomeServiceDto,
} from "../mappers/home-page.mapper";
import type { HomePageData } from "../types/home.types";

type PaginatedApiPayload<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getHomePageData(): Promise<HomePageData> {
  const [servicesResponse, opportunitiesResponse] = await Promise.all([
    publicApiFetch<ApiResponse<PaginatedApiPayload<HomeServiceDto>>>("/api/public/services", {
      revalidate: 60,
    }),
    publicApiFetch<ApiResponse<PaginatedApiPayload<HomeOpportunityDto>>>(
      "/api/public/opportunities",
      {
        revalidate: 60,
      },
    ),
  ]);

  const servicesPayload = unwrapApiResponse(servicesResponse);
  const opportunitiesPayload = unwrapApiResponse(opportunitiesResponse);

  const serviceItems = servicesPayload.data.slice(0, 9).map(mapHomeServiceDtoToProviderItem);

  const dealItems = opportunitiesPayload.data.slice(0, 9).map(mapHomeOpportunityDtoToDealItem);

  return {
    ...homePageStaticConfig,
    servicesSection: {
      title: "Our Top Services",
      ctaLabel: "Browse All Services",
      ctaHref: "/services",
      items: serviceItems,
    },
    dealsSection: {
      title: "Our Top Investments",
      ctaLabel: "Browse All Deals",
      ctaHref: "/deals",
      items: dealItems,
    },
  };
}
