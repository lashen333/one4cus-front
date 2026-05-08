// src\features\services\mappers\services-list.mapper.ts

// This file contains the mapping logic to transform raw service data from the API into the format used by the services list components.
import { getServiceFallbackImage } from "@/lib/utils/image-fallbacks";
import type {
  AvailabilityOption,
  ProviderStatus,
  ServiceCategory,
  ServiceProviderListItem,
} from "../types/services-list.types";

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

const DEFAULT_CATEGORY: ServiceCategory = "Service";

function normalizeCategory(category: string | null): ServiceCategory {
  const allowedCategories: ServiceCategory[] = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Landscaping",
    "IT Support",
    "Carpentry",
    "caregiver",
    "Service",
  ];

  if (category && allowedCategories.includes(category as ServiceCategory)) {
    return category as ServiceCategory;
  }

  return DEFAULT_CATEGORY;
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

function getHomeServiceImage(dto: ServiceListDto) {
  return dto.thumbnailImageUrl ?? getServiceFallbackImage(dto.category);
}

export function mapServiceDtoToListItem(dto: ServiceListDto): ServiceProviderListItem {
  const availabilityState = getAvailabilityState(dto.availability);

  return {
    id: dto.id,
    slug: dto.slug,

    companyName: dto.providerBusinessName ?? "Unknown Provider",
    serviceTitle: dto.title ?? "Untitled Service",

    category: normalizeCategory(dto.category),

    availabilityLabel:
      dto.availability ?? (availabilityState === "available" ? "Available" : "Booked Solid"),

    availabilityState,

    image: getHomeServiceImage(dto),

    verified: dto.status === "published",

    rating: 0,
    reviewCount: 0,

    yearsExperience: extractYearsExperience(dto.experienceText),

    location: dto.locationText ?? dto.providerCity ?? "Sri Lanka",
    city: dto.providerCity ?? "Sri Lanka",

    startRateLkr: getRate(dto.perWorkRate),

    pricingUnit: "work",

    statusTags: getStatusTags(dto.status),

    availabilityTags: getAvailabilityTags(availabilityState),
  };
}
