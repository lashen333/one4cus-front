// src\features\services\utils\service-category.utils.ts
//this file has the category mapping for te list page and profile page first trust the backend return category if it null or invalid use his logic

// src/lib/utils/service-category.utils.ts

import type { ServiceCategory } from "@/features/services/types/services-list.types";

type NormalizeServiceCategoryInput = {
  category?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: string[] | null;
  providerName?: string | null;
};

const CANONICAL_CATEGORIES: ServiceCategory[] = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Landscaping",
  "IT Support",
  "Carpentry",
  "Caregiver",
  "Consulting",
  "Architectural Design",
  "Other",
];

function normalizeText(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function getCanonicalCategory(value: string | null | undefined): ServiceCategory | null {
  const normalized = normalizeText(value);

  if (!normalized) return null;

  const directMap: Record<string, ServiceCategory> = {
    plumbing: "Plumbing",
    electrical: "Electrical",
    cleaning: "Cleaning",
    landscaping: "Landscaping",
    "it support": "IT Support",
    carpentry: "Carpentry",
    caregiver: "Caregiver",
    consulting: "Consulting",
    "architectural design": "Architectural Design",
    other: "Other",
  };

  return directMap[normalized] ?? null;
}

export function normalizeServiceCategory(input: NormalizeServiceCategoryInput): ServiceCategory {
  const canonicalCategory = getCanonicalCategory(input.category);

  if (canonicalCategory) {
    return canonicalCategory;
  }

  const searchableText = [
    input.category,
    input.title,
    input.description,
    input.tags?.join(" "),
    input.providerName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!searchableText.trim()) return "Other";

  if (searchableText.includes("plumb") || searchableText.includes("pipe")) {
    return "Plumbing";
  }

  if (
    searchableText.includes("it support") ||
    searchableText.includes("technology") ||
    searchableText.includes("computer") ||
    searchableText.includes("software") ||
    searchableText.includes("network") ||
    searchableText.includes("cctv") ||
    searchableText.includes("helpdesk") ||
    searchableText.includes("data backup")
  ) {
    return "IT Support";
  }

  if (
    searchableText.includes("electric") ||
    searchableText.includes("electrical") ||
    searchableText.includes("wiring") ||
    searchableText.includes("power") ||
    searchableText.includes("circuit")
  ) {
    return "Electrical";
  }

  if (
    searchableText.includes("clean") ||
    searchableText.includes("housekeeping") ||
    searchableText.includes("janitorial") ||
    searchableText.includes("maid")
  ) {
    return "Cleaning";
  }

  if (
    searchableText.includes("landscap") ||
    searchableText.includes("garden") ||
    searchableText.includes("lawn")
  ) {
    return "Landscaping";
  }

  if (
    searchableText.includes("carpentry") ||
    searchableText.includes("carpenter") ||
    searchableText.includes("wood") ||
    searchableText.includes("furniture")
  ) {
    return "Carpentry";
  }

  if (
    searchableText.includes("caregiver") ||
    searchableText.includes("elder care") ||
    searchableText.includes("elderly care") ||
    searchableText.includes("senior") ||
    searchableText.includes("dementia") ||
    searchableText.includes("nursing") ||
    searchableText.includes("home care")
  ) {
    return "Caregiver";
  }

  if (
    searchableText.includes("consulting") ||
    searchableText.includes("consult") ||
    searchableText.includes("advisor") ||
    searchableText.includes("advisory")
  ) {
    return "Consulting";
  }

  if (
    searchableText.includes("architect") ||
    searchableText.includes("architecture") ||
    searchableText.includes("house plan") ||
    searchableText.includes("building design")
  ) {
    return "Architectural Design";
  }

  return "Other";
}
