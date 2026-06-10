// src\features\services\mappers\service-profile.mapper.ts
import { getServiceFallbackImage } from "@/lib/utils/image-fallbacks";
import type { ServiceDetailData } from "../types/service-profile.types";
import { normalizeServiceCategory } from "../utils/service-category.utils";

export type ServiceDetailDto = {
  id: string;
  providerId: string;
  slug: string;
  status: string;
  title: string | null;
  category: string | null;
  locationText: string | null;
  tagsJson: string[] | null;
  description: string | null;
  perWorkRate: string | number | null;
  currency: string | null;
  availability: string | null;
  warrantyType: string | null;
  experienceText: string | null;
  thumbnailImageUrl: string | null;
  publishedAt: string | null;

  providerBusinessName: string | null;
  providerPhone: string | null;
  providerWhatsapp: string | null;
  providerCity: string | null;
  providerDistrict: string | null;
  providerProvince: string | null;
  providerLogoUrl: string | null;
  providerCoverImageUrl: string | null;
};

function formatMoney(value: string | number | null, currency = "LKR") {
  if (value === null || value === undefined) {
    return "Price on request";
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return `${currency} ${value}`;
  }

  return `${currency} ${numericValue.toLocaleString("en-LK")}`;
}

function maskPhone(phone: string | null) {
  if (!phone) return "Not provided";

  const cleanPhone = phone.replace(/\s+/g, "");

  if (cleanPhone.length <= 4) return "Not provided";

  return `${cleanPhone.slice(0, 3)}xxxxxxx`;
}

function getLocation(dto: ServiceDetailDto) {
  if (dto.locationText) return dto.locationText;

  const parts = [dto.providerCity, dto.providerDistrict, dto.providerProvince].filter(Boolean);

  if (parts.length > 0) {
    return `${parts.join(", ")}, Sri Lanka`;
  }

  return "Sri Lanka";
}

function getProviderAvatar(dto: ServiceDetailDto) {
  return dto.providerLogoUrl ?? dto.providerCoverImageUrl ?? null;
}

function getServiceImage(dto: ServiceDetailDto, category: string) {
  return (
    dto.thumbnailImageUrl ??
    getServiceFallbackImage(category, dto.slug || dto.id || dto.providerBusinessName)
  );
}

function getStatusLabel(status: string) {
  if (status === "published") return "Published Service";
  if (status === "draft") return "Draft Service";

  return "Service";
}

export function mapServiceDetailDtoToViewModel(dto: ServiceDetailDto): ServiceDetailData {
  const providerName = dto.providerBusinessName ?? "Unknown Provider";
  const priceLabel = formatMoney(dto.perWorkRate, dto.currency ?? "LKR");
  const location = getLocation(dto);

  const category = normalizeServiceCategory({
    category: dto.category,
    title: dto.title,
    description: dto.description,
    tags: dto.tagsJson,
    providerName: dto.providerBusinessName,
  });

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title ?? "Untitled Service",
    category,
    statusLabel: getStatusLabel(dto.status),
    image: getServiceImage(dto, category),

    description: dto.description ?? "No service description available yet.",
    location,
    priceLabel,
    availabilityLabel: dto.availability ?? "Availability not specified",
    warrantyLabel: dto.warrantyType ?? "Warranty not specified",
    experienceLabel: dto.experienceText ?? "Experience not specified",

    detailItems: [
      {
        id: "category",
        label: "Category",
        value: category,
      },
      {
        id: "rate",
        label: "Service Rate",
        value: priceLabel,
      },
      {
        id: "availability",
        label: "Availability",
        value: dto.availability ?? "Not specified",
      },
      {
        id: "experience",
        label: "Experience",
        value: dto.experienceText ?? "Not specified",
      },
      {
        id: "warranty",
        label: "Warranty",
        value: dto.warrantyType ?? "Not specified",
      },
      {
        id: "location",
        label: "Location",
        value: location,
      },
    ],

    provider: {
      id: dto.providerId,
      name: providerName,
      avatar: getProviderAvatar(dto),
      phoneMasked: maskPhone(dto.providerPhone),
      whatsappMasked: maskPhone(dto.providerWhatsapp),
      city: dto.providerCity ?? "Sri Lanka",
      district: dto.providerDistrict ?? "",
      province: dto.providerProvince ?? "",
      location,
      description: `This service is provided by ${providerName}.`,
    },
  };
}
