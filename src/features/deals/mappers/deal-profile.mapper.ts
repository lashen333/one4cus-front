// src\features\deals\mappers\deal-profile.mapper.ts

import { getDealFallbackImage } from "@/lib/utils/image-fallbacks";
import type { DealProfileData } from "../types/deals.types";

export type OpportunityDetailDto = {
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

  projectStartDate: string | null;
  expectedCompletionDate: string | null;

  coverImageUrl: string | null;

  investmentType: string | null;
  expectedRoiText: string | null;

  fundingGoal: string | number | null;
  fundingGoalCurrency: string | null;

  minimumRaiseAmount: string | number | null;
  minimumRaiseCurrency: string | null;

  minimumInvestment: string | number | null;
  minimumInvestmentCurrency: string | null;

  maximumInvestment: string | number | null;
  maximumInvestmentCurrency: string | null;

  dealDurationValue: string | number | null;
  dealDurationUnit: string | null;

  fundingDeadline: string | null;

  investorBenefitsText: string | null;

  riskLevel: string | null;
  riskInvestorsMayLoseCapital: boolean;
  riskReturnsNotGuaranteed: boolean;
  riskTimelineMayChange: boolean;

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

function formatMoney(value: string | number | null | undefined, currency = "LKR") {
  if (value === null || value === undefined) return "N/A";

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return `${currency} ${value}`;
  }

  return `${currency} ${numericValue.toLocaleString("en-LK")}`;
}

function getLocation(dto: OpportunityDetailDto) {
  const parts = [dto.city, dto.district, dto.province].filter(Boolean);

  if (parts.length > 0) {
    return `${parts.join(", ")}, Sri Lanka`;
  }

  const providerParts = [dto.providerCity, dto.providerDistrict, dto.providerProvince].filter(
    Boolean,
  );

  if (providerParts.length > 0) {
    return `${providerParts.join(", ")}, Sri Lanka`;
  }

  return "Sri Lanka";
}

function getDuration(dto: OpportunityDetailDto) {
  if (dto.dealDurationValue && dto.dealDurationUnit) {
    return `${dto.dealDurationValue} ${dto.dealDurationUnit}`;
  }

  if (dto.projectStartDate && dto.expectedCompletionDate) {
    return "Project timeline available";
  }

  return "Contract based";
}

function normalizeRiskProfile(riskLevel: string | null) {
  if (!riskLevel) return "MEDIUM";

  const value = riskLevel.toLowerCase();

  if (value.includes("low")) return "LOW";
  if (value.includes("high")) return "HIGH";

  return "MEDIUM";
}

function getStatusLabel(status: string) {
  if (status === "published") return "Active Offering";
  if (status === "draft") return "Draft";
  if (status === "rejected") return "Closed";

  return "Active Offering";
}

function getProviderName(dto: OpportunityDetailDto) {
  return dto.providerBusinessName ?? "Unknown Provider";
}

function getProviderPhone(dto: OpportunityDetailDto) {
  return dto.providerPhone ?? dto.providerWhatsapp ?? null;
}

function maskPhone(phone: string | null) {
  if (!phone) return "Hidden";

  const cleanPhone = phone.replace(/\s+/g, "");

  if (cleanPhone.length <= 4) return "Hidden";

  return `${cleanPhone.slice(0, 3)}xxxxxxx`;
}

function getProviderAvatar(dto: OpportunityDetailDto) {
  return dto.providerLogoUrl ?? dto.providerCoverImageUrl ?? null;
}

function getHeroImage(dto: OpportunityDetailDto) {
  return dto.coverImageUrl ?? getDealFallbackImage(dto.category);
}

function splitDescription(description: string | null) {
  if (!description) {
    return ["No opportunity description available yet."];
  }

  return description
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRiskHighlights(dto: OpportunityDetailDto) {
  const highlights = [];

  if (dto.riskInvestorsMayLoseCapital) {
    highlights.push({
      id: "risk-capital",
      title: "Capital Risk",
      description: "Investors should understand that capital may be at risk.",
    });
  }

  if (dto.riskReturnsNotGuaranteed) {
    highlights.push({
      id: "risk-returns",
      title: "Returns Not Guaranteed",
      description: "Projected returns are not guaranteed and can vary by performance.",
    });
  }

  if (dto.riskTimelineMayChange) {
    highlights.push({
      id: "risk-timeline",
      title: "Timeline May Change",
      description: "Project timelines may change depending on operational conditions.",
    });
  }

  return highlights;
}

export function mapOpportunityDetailDtoToViewModel(dto: OpportunityDetailDto): DealProfileData {
  const providerName = getProviderName(dto);

  const minimumInvestment = formatMoney(
    dto.minimumInvestment,
    dto.minimumInvestmentCurrency ?? "LKR",
  );

  const fundingGoal = formatMoney(dto.fundingGoal, dto.fundingGoalCurrency ?? "LKR");

  const duration = getDuration(dto);

  const baseHighlights = [
    {
      id: "minimum-entry",
      title: "Minimum Entry",
      description: `Start investing from ${minimumInvestment}.`,
    },
    {
      id: "provider-backed",
      title: "Provider Backed",
      description: `This opportunity is connected to ${providerName}.`,
    },
    {
      id: "local-opportunity",
      title: "Local Opportunity",
      description: `Opportunity based in ${getLocation(dto)}.`,
    },
    {
      id: "investor-benefits",
      title: "Investor Benefits",
      description:
        dto.investorBenefitsText ?? "Investor benefits are available based on the agreement.",
    },
  ];

  return {
    slug: dto.slug,

    statusLabel: getStatusLabel(dto.status),
    statusSubLabel: "Provider opportunity",

    title: dto.title ?? "Untitled Opportunity",
    location: getLocation(dto),
    projectedRoi: dto.expectedRoiText ?? "ROI on agreement",
    heroImage: getHeroImage(dto),

    riskProfile: normalizeRiskProfile(dto.riskLevel),
    expectedReturns: dto.expectedRoiText ?? "ROI on agreement",
    minimumEntry: minimumInvestment,

    investmentTerm: duration,
    entryLevel: minimumInvestment,
    fundingRaised: formatMoney(dto.minimumRaiseAmount, dto.minimumRaiseCurrency ?? "LKR"),
    fundingGoal,
    fundingProgress: 0,

    overviewTitle: "Opportunity Overview",
    overviewParagraphs: splitDescription(dto.fullDescription ?? dto.shortSummary),

    detailItems: [
      {
        id: "investment-type",
        label: "Investment Type",
        value: dto.investmentType ?? "Investment",
      },
      {
        id: "expected-roi",
        label: "Expected ROI",
        value: dto.expectedRoiText ?? "ROI on agreement",
      },
      {
        id: "minimum-investment",
        label: "Minimum Investment",
        value: minimumInvestment,
      },
      {
        id: "duration",
        label: "Duration",
        value: duration,
      },
      {
        id: "location",
        label: "Location",
        value: getLocation(dto),
      },
      {
        id: "provider",
        label: "Provider",
        value: providerName,
      },
    ],

    highlights: [...baseHighlights, ...getRiskHighlights(dto)],

    gallery: [
      {
        id: "main-image",
        image: getHeroImage(dto),
        alt: dto.title ?? "Opportunity image",
      },
    ],

    owner: {
      name: providerName,
      role: "Opportunity Provider",
      company: providerName,
      avatar: getProviderAvatar(dto),
      phoneMasked: maskPhone(getProviderPhone(dto)),
      description: `This opportunity is provided by ${providerName}.`,
      entitySlug: dto.slug,
    },
  };
}
