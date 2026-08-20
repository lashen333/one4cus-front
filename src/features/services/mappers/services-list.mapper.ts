// src\features\services\mappers\services-list.mapper.ts

// This file contains the mapping logic to transform raw service data from the API
// into the clean frontend view-model used by the services list components.

import { getServiceFallbackImage } from "@/lib/utils/image-fallbacks";
import type {
  AvailabilityOption,
  ProviderStatus,
  ServiceCategory,
  ServiceProviderListItem,
} from "../types/services-list.types";
import { normalizeServiceCategory } from "../utils/service-category.utils";

export type ServiceListDto = {
  id: string;
  providerId: string;
  slug: string;
  status: string;
  title: string | null;
  category: string | null;
  locationText: string | null;
  tagsJson: string[] | null;
  description: string | null;
  perWorkRate: number | string | null;
  currency: string | null;
  availability: string | null;
  warrantyType: string | null;
  experienceText: string | null;
  thumbnailImageUrl: string | null;
  publishedAt: string | null;
  providerBusinessName: string | null;
  providerPhone: string | null;
  providerCity: string | null;
};

{
  /*const DEFAULT_CATEGORY: ServiceCategory = "Other";

function getSearchableCategoryText(dto: ServiceListDto) {
  return [
    dto.category,
    dto.title,
    dto.description,
    dto.tagsJson?.join(" "),
    dto.providerBusinessName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function normalizeCategory(dto: ServiceListDto): ServiceCategory {
  const value = getSearchableCategoryText(dto);

  if (!value.trim()) {
    return DEFAULT_CATEGORY;
  }

  if (value.includes("plumb") || value.includes("pipe") || value.includes("water line")) {
    return "Plumbing";
  }

  if (
    value.includes("electric") ||
    value.includes("electrical") ||
    value.includes("wiring") ||
    value.includes("power") ||
    value.includes("circuit")
  ) {
    return "Electrical";
  }

  if (
    value.includes("clean") ||
    value.includes("housekeeping") ||
    value.includes("janitorial") ||
    value.includes("maid")
  ) {
    return "Cleaning";
  }

  if (
    value.includes("landscap") ||
    value.includes("garden") ||
    value.includes("lawn") ||
    value.includes("yard")
  ) {
    return "Landscaping";
  }

  if (
    value.includes("it support") ||
    value.includes("computer") ||
    value.includes("software") ||
    value.includes("network") ||
    value.includes("tech support") ||
    value.includes("website")
  ) {
    return "IT Support";
  }

  if (
    value.includes("carpentry") ||
    value.includes("carpenter") ||
    value.includes("wood") ||
    value.includes("furniture")
  ) {
    return "Carpentry";
  }

  if (
    value.includes("caregiver") ||
    value.includes("elder care") ||
    value.includes("eldercare") ||
    value.includes("senior") ||
    value.includes("dementia") ||
    value.includes("nursing") ||
    value.includes("home care")
  ) {
    return "Caregiver";
  }

  if (
    value.includes("consult") ||
    value.includes("advisor") ||
    value.includes("advisory") ||
    value.includes("business support")
  ) {
    return "Consulting";
  }

  if (
    value.includes("architect") ||
    value.includes("architecture") ||
    value.includes("house plan") ||
    value.includes("building design")
  ) {
    return "Architectural Design";
  }

  return DEFAULT_CATEGORY;
}
*/
}
function getAvailabilityState(
  availability: string | null,
): ServiceProviderListItem["availabilityState"] {
  if (!availability) return "available";

  const normalized = availability.toLowerCase();

  if (
    normalized.includes("booked") ||
    normalized.includes("unavailable") ||
    normalized.includes("not available")
  ) {
    return "booked";
  }

  return "available";
}

function getAvailabilityLabel(
  availability: string | null,
  availabilityState: ServiceProviderListItem["availabilityState"],
) {
  if (availability?.trim()) {
    return availability;
  }

  return availabilityState === "available" ? "Available" : "Booked Solid";
}

function getAvailabilityTags(
  availabilityState: ServiceProviderListItem["availabilityState"],
): AvailabilityOption[] {
  if (availabilityState === "booked") {
    return [];
  }

  return ["Available Today", "Accepting New Clients"];
}

function getStatusTags(status: string): ProviderStatus[] {
  if (status === "published") {
    return ["Verified Professionals"];
  }

  return [];
}

function extractYearsExperience(experienceText: string | null) {
  if (!experienceText) return 0;

  const match = experienceText.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getRate(value: number | string | null) {
  if (value === null || value === undefined) return 0;

  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getLocation(dto: ServiceListDto) {
  const location = dto.locationText?.trim() || dto.providerCity?.trim();

  return location || "Sri Lanka";
}

function getCity(dto: ServiceListDto) {
  return dto.providerCity?.trim() || "Sri Lanka";
}

function getServiceImage(dto: ServiceListDto, category: ServiceCategory) {
  return (
    dto.thumbnailImageUrl ??
    getServiceFallbackImage(category, dto.slug || dto.id || dto.providerBusinessName)
  );
}

export function mapServiceDtoToListItem(dto: ServiceListDto): ServiceProviderListItem {
  const availabilityState = getAvailabilityState(dto.availability);
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

    companyName: dto.providerBusinessName ?? "Unknown Provider",
    serviceTitle: dto.title ?? "General Service",

    category,

    availabilityLabel: getAvailabilityLabel(dto.availability, availabilityState),

    availabilityState,

    image: getServiceImage(dto, category),

    verified: dto.status === "published",

    rating: 0,
    reviewCount: 0,

    yearsExperience: extractYearsExperience(dto.experienceText),

    location: getLocation(dto),
    city: getCity(dto),

    startRateLkr: getRate(dto.perWorkRate),

    pricingUnit: "work",

    statusTags: getStatusTags(dto.status),

    availabilityTags: getAvailabilityTags(availabilityState),
  };
}
