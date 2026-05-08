// src\features\services\server\get-service-profile-data.ts
import { publicApiFetch } from "@/lib/api/public-api";
import { unwrapApiResponse } from "@/lib/api/unwrap-api-response";
import type { ApiResponse } from "@/types/api";
import { notFound } from "next/navigation";
import {
  mapServiceDetailDtoToViewModel,
  type ServiceDetailDto,
} from "../mappers/service-profile.mapper";

type ServiceDetailApiPayload =
  | ServiceDetailDto
  | {
      data: ServiceDetailDto;
    };

function extractServiceDto(payload: ServiceDetailApiPayload): ServiceDetailDto | null {
  if ("data" in payload && payload.data) {
    return payload.data;
  }

  return payload as ServiceDetailDto;
}

export async function getServiceDetailData(slug: string) {
  const response = await publicApiFetch<ApiResponse<ServiceDetailApiPayload | null>>(
    `/api/public/services/slug/${slug}`,
    {
      revalidate: 60,
    },
  );

  const payload = unwrapApiResponse(response);

  if (!payload) {
    notFound();
  }

  const serviceDto = extractServiceDto(payload);

  if (!serviceDto) {
    notFound();
  }

  return mapServiceDetailDtoToViewModel(serviceDto);
}
