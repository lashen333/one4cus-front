// src/features/deals/mappers/deals-list.mapper.ts
import { getDealFallbackImage } from "@/lib/utils/image-fallbacks";
import type {
  DealCategory,
  DealListItem,
  FundingStatus,
  RiskLevel,
} from "../types/deals-list.types";
import { normalizeDealCategory } from "../utils/deal-category.utils";

export type OpportunityListDto = {
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

const DEFAULT_RISK_LEVEL: RiskLevel = "Medium Risk";
const DEFAULT_FUNDING_STATUS: FundingStatus = "Open for investment";

function normalizeRiskLevel(riskLevel: string | null): RiskLevel {
  const value = riskLevel?.toLowerCase();

  if (!value) return DEFAULT_RISK_LEVEL;
  if (value.includes("low")) return "Low Risk";
  if (value.includes("high")) return "High Risk";

  return "Medium Risk";
}

function normalizeFundingStatus(status: string | null): FundingStatus {
  if (status === "published") return "Open for investment";

  const value = status?.toLowerCase();

  if (!value) return DEFAULT_FUNDING_STATUS;
  if (value.includes("funded")) return "Fully funded";
  if (value.includes("closed")) return "Closed";
  if (value.includes("coming")) return "Coming soon";

  return DEFAULT_FUNDING_STATUS;
}

function getLocation(dto: OpportunityListDto) {
  const parts = [dto.city, dto.district, dto.province].filter(Boolean);

  if (parts.length > 0) {
    return `${parts.join(", ")}, Sri Lanka`;
  }

  if (dto.providerCity) {
    return `${dto.providerCity}, Sri Lanka`;
  }

  return "Sri Lanka";
}

function getMinimumInvestment(value: string | number | null) {
  if (value === null || value === undefined) return "LKR 0";

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return `LKR ${value}`;
  }

  return `LKR ${numericValue.toLocaleString("en-LK")}`;
}

function getFundingGoal(value: string | number | null) {
  if (value === null || value === undefined) return "LKR 0";

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return `LKR ${value}`;
  }

  return `LKR ${numericValue.toLocaleString("en-LK")}`;
}

function getProgress(fundingGoal: string | number | null) {
  // Backend currently does not return raised amount.
  // Until backend sends raisedAmount/fundingRaised, show 0 progress.
  if (!fundingGoal) return 0;

  return 0;
}

function getDealImage(dto: OpportunityListDto, category: DealCategory) {
  return dto.coverImageUrl ?? getDealFallbackImage(category);
}

export function mapOpportunityDtoToDealListItem(dto: OpportunityListDto): DealListItem {
  const category = normalizeDealCategory({
    category: dto.category,
    title: dto.title,
    summary: dto.shortSummary,
    description: dto.fullDescription,
    investmentType: dto.investmentType,
    providerName: dto.providerBusinessName,
  });

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title ?? "Untitled Opportunity",
    location: getLocation(dto),
    estRoi: dto.expectedRoiText ?? "ROI on agreement",
    duration: "Contract based",
    dealType: dto.investmentType ?? "Investment",
    category,
    minimumInvestment: getMinimumInvestment(dto.minimumInvestment),
    raised: "LKR 0",
    target: getFundingGoal(dto.fundingGoal),
    progress: getProgress(dto.fundingGoal),
    verified: dto.status === "published",
    riskLevel: normalizeRiskLevel(dto.riskLevel),
    fundingStatus: normalizeFundingStatus(dto.status),
    image: getDealImage(dto, category),
  };
}
