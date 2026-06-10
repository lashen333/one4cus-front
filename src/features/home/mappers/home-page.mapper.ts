// src\features\home\mappers\home-page.mapper.ts
import { getDealFallbackImage, getServiceFallbackImage } from "@/lib/utils/image-fallbacks";
import type { DealItem, ProviderItem } from "../types/home.types";

export type HomeServiceDto = {
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
  providerCity: string | null;
};

export type HomeOpportunityDto = {
  id: string;
  providerId: string;
  slug: string;
  status: string;
  title: string | null;
  category: string | null;
  shortSummary: string | null;
  fullDescription: string | null;
  province: string | null;
  district: string | null;
  city: string | null;
  postalCode: string | null;
  coverImageUrl: string | null;
  investmentType: string | null;
  expectedRoiText: string | null;
  fundingGoal: string | number | null;
  minimumInvestment: string | number | null;
  maximumInvestment: string | number | null;
  riskLevel: string | null;
  publishedAt: string | null;
  providerBusinessName: string | null;
  providerPhone: string | null;
  providerCity: string | null;
};

function maskPhone(phone: string | null) {
  if (!phone) return "Not provided";

  const cleanPhone = phone.replace(/\s+/g, "");

  if (cleanPhone.length <= 4) return "Not provided";

  return `${cleanPhone.slice(0, 3)}xxxxxxx`;
}

function getNumber(value: string | number | null | undefined) {
  if (value === null || value === undefined) return 0;

  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

function getMillionValue(value: string | number | null | undefined) {
  const numericValue = getNumber(value);

  if (numericValue === 0) return 0;

  return Math.round(numericValue / 1_000_000);
}

function getHomeServiceImage(dto: HomeServiceDto) {
  return (
    dto.thumbnailImageUrl ??
    getServiceFallbackImage(dto.category, dto.slug || dto.id || dto.providerBusinessName)
  );
}

export function mapHomeServiceDtoToProviderItem(dto: HomeServiceDto): ProviderItem {
  return {
    id: dto.id,
    name: `${dto.providerBusinessName ?? "Unknown Provider"} - ${dto.title ?? "Untitled Service"}`,
    category: dto.title ?? dto.category ?? "Service",
    description:
      dto.description ?? dto.locationText ?? "Service details are available from this provider.",
    rating: 0,
    reviewCount: 0,
    phone: maskPhone(dto.providerPhone),
    image: getHomeServiceImage(dto),
    // important: service card should go to service detail page
    profileHref: `/services/${dto.slug}`,
  };
}

export function mapHomeOpportunityDtoToDealItem(dto: HomeOpportunityDto): DealItem {
  const targetValue = getMillionValue(dto.fundingGoal);

  return {
    id: dto.id,
    title: dto.title ?? "Untitled Opportunity",
    description: dto.shortSummary ?? dto.fullDescription ?? "Opportunity details are available.",
    raisedLabel: "Raised",
    targetLabel: "Target",
    raisedValue: 0,
    targetValue,
    image: dto.coverImageUrl ?? getDealFallbackImage(dto.category),

    // important: deal card should go to deal profile page
    href: `/deals/${dto.slug}`,
  };
}
