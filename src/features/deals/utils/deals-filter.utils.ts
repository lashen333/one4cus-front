// src/features/deals/utils/deals-filter.utils.ts
import type { DealListItem } from "../types/deals-list.types";

export type DealsFiltersState = {
  searchTerm: string;
  verifiedOnly: boolean;
  selectedCategories: string[];
  selectedFundingStatuses: string[];
  selectedRiskLevels: string[];
  selectedMinimumInvestments: string[];
  selectedDealTypes: string[];
  roiMin: number;
  roiMax: number;
  sortBy: string;
};

function extractNumericValue(value: string | number | null | undefined) {
  if (value === null || value === undefined) return 0;

  const match = String(value).match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function extractNumericRoi(roi: string | null | undefined) {
  if (!roi) return null;

  const match = roi.match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : null;
}

export function filterDeals(items: DealListItem[] = [], filters: DealsFiltersState) {
  const safeItems = Array.isArray(items) ? items : [];
  const searchValue = filters.searchTerm.trim().toLowerCase();

  return safeItems.filter((item) => {
    const itemRoi = extractNumericRoi(item.estRoi);

    const matchesSearch =
      !searchValue ||
      item.title.toLowerCase().includes(searchValue) ||
      item.location.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue);

    const matchesVerified = !filters.verifiedOnly || item.verified;

    const matchesCategory =
      filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.category);

    const matchesFundingStatus =
      filters.selectedFundingStatuses.length === 0 ||
      filters.selectedFundingStatuses.includes(item.fundingStatus);

    const matchesRiskLevel =
      filters.selectedRiskLevels.length === 0 ||
      filters.selectedRiskLevels.includes(item.riskLevel);

    const matchesMinimumInvestment =
      filters.selectedMinimumInvestments.length === 0 ||
      filters.selectedMinimumInvestments.some((range) => {
        const value = extractNumericValue(item.minimumInvestment);

        if (range === "Under LKR 100,000") return value < 100000;
        if (range === "100K – 250K") return value >= 100000 && value <= 250000;
        if (range === "250K – 500K") return value > 250000 && value <= 500000;
        if (range === "500K+") return value > 500000;

        return true;
      });

    const matchesDealType =
      filters.selectedDealTypes.length === 0 || filters.selectedDealTypes.includes(item.dealType);

    // Important:
    // If backend ROI text has no number, do not filter it out.
    const matchesRoi = itemRoi === null || (itemRoi >= filters.roiMin && itemRoi <= filters.roiMax);

    return (
      matchesSearch &&
      matchesVerified &&
      matchesCategory &&
      matchesFundingStatus &&
      matchesRiskLevel &&
      matchesMinimumInvestment &&
      matchesDealType &&
      matchesRoi
    );
  });
}

export function sortDeals(items: DealListItem[] = [], sortBy: string) {
  const safeItems = Array.isArray(items) ? items : [];
  const sorted = [...safeItems];

  if (sortBy === "Highest ROI") {
    sorted.sort((a, b) => {
      const bRoi = extractNumericRoi(b.estRoi) ?? 0;
      const aRoi = extractNumericRoi(a.estRoi) ?? 0;

      return bRoi - aRoi;
    });
  } else if (sortBy === "Lowest Investment") {
    sorted.sort(
      (a, b) => extractNumericValue(a.minimumInvestment) - extractNumericValue(b.minimumInvestment),
    );
  } else if (sortBy === "Most Funded") {
    sorted.sort((a, b) => b.progress - a.progress);
  }

  return sorted;
}

export function paginateDeals<T>(items: T[] = [], page: number, pageSize: number) {
  const safeItems = Array.isArray(items) ? items : [];
  const start = (page - 1) * pageSize;

  return safeItems.slice(start, start + pageSize);
}
