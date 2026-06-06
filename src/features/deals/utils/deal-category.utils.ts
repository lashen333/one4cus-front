// src\features\deals\utils\deal-category.utils.ts
//category mapping for display and filtering purposes
// src/lib/utils/deal-category.utils.ts

import type { DealCategory } from "@/features/deals/types/deals-list.types";

type NormalizeDealCategoryInput = {
  category?: string | null;
  title?: string | null;
  summary?: string | null;
  description?: string | null;
  investmentType?: string | null;
  providerName?: string | null;
};

function normalizeText(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function getCanonicalDealCategory(value: string | null | undefined): DealCategory | null {
  const normalized = normalizeText(value);

  if (!normalized) return null;

  const directMap: Record<string, DealCategory> = {
    investment: "Investment",
    "real estate": "Real Estate",
    "natural resources": "Natural Resources",
    "startups / tech": "Startups / Tech",
    "startup / tech": "Startups / Tech",
    startups: "Startups / Tech",
    tech: "Startups / Tech",
    "agriculture / export": "Agriculture / Export",
    agriculture: "Agriculture / Export",
    export: "Agriculture / Export",
    "renewable energy": "Renewable Energy",
    "tourism / hospitality": "Tourism / Hospitality",
    tourism: "Tourism / Hospitality",
    hospitality: "Tourism / Hospitality",
    other: "Other",
  };

  return directMap[normalized] ?? null;
}

export function normalizeDealCategory(input: NormalizeDealCategoryInput): DealCategory {
  const canonicalCategory = getCanonicalDealCategory(input.category);

  if (canonicalCategory) {
    return canonicalCategory;
  }

  const searchableText = [
    input.category,
    input.title,
    input.summary,
    input.description,
    input.investmentType,
    input.providerName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!searchableText.trim()) return "Other";

  if (
    searchableText.includes("invest") ||
    searchableText.includes("equity") ||
    searchableText.includes("profit share") ||
    searchableText.includes("revenue share") ||
    searchableText.includes("fixed return")
  ) {
    return "Investment";
  }

  if (
    searchableText.includes("real estate") ||
    searchableText.includes("property") ||
    searchableText.includes("land") ||
    searchableText.includes("apartment") ||
    searchableText.includes("housing")
  ) {
    return "Real Estate";
  }

  if (
    searchableText.includes("natural") ||
    searchableText.includes("gem") ||
    searchableText.includes("mining") ||
    searchableText.includes("resource")
  ) {
    return "Natural Resources";
  }

  if (
    searchableText.includes("startup") ||
    searchableText.includes("tech") ||
    searchableText.includes("software") ||
    searchableText.includes("platform")
  ) {
    return "Startups / Tech";
  }

  if (
    searchableText.includes("agri") ||
    searchableText.includes("farm") ||
    searchableText.includes("export") ||
    searchableText.includes("plantation")
  ) {
    return "Agriculture / Export";
  }

  if (
    searchableText.includes("renewable") ||
    searchableText.includes("solar") ||
    searchableText.includes("energy")
  ) {
    return "Renewable Energy";
  }

  if (
    searchableText.includes("tourism") ||
    searchableText.includes("hotel") ||
    searchableText.includes("hospitality") ||
    searchableText.includes("travel")
  ) {
    return "Tourism / Hospitality";
  }

  return "Other";
}
