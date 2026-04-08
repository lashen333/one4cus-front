// src\features\deals\utils\deals-filter.utils.ts
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

function extractNumericRoi(roi: string) {
  const match = roi.match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export function filterDeals(items: DealListItem[], filters: DealsFiltersState) {
  return items.filter((item) => {
    const itemRoi = extractNumericRoi(item.estRoi);

    const matchesSearch =
      !filters.searchTerm ||
      item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(filters.searchTerm.toLowerCase());

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
        const value = Number(item.minimumInvestment.replace(/[^\d]/g, ""));

        if (range === "Under LKR 100,000") return value < 100000;
        if (range === "100K – 250K") return value >= 100000 && value <= 250000;
        if (range === "250K – 500K") return value > 250000 && value <= 500000;
        if (range === "500K+") return value > 500000;
        return true;
      });

    const matchesDealType =
      filters.selectedDealTypes.length === 0 || filters.selectedDealTypes.includes(item.dealType);

    const matchesRoi = itemRoi >= filters.roiMin && itemRoi <= filters.roiMax;

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

export function sortDeals(items: DealListItem[], sortBy: string) {
  const sorted = [...items];

  if (sortBy === "Highest ROI") {
    sorted.sort((a, b) => extractNumericRoi(b.estRoi) - extractNumericRoi(a.estRoi));
  } else if (sortBy === "Lowest Investment") {
    sorted.sort(
      (a, b) =>
        Number(a.minimumInvestment.replace(/[^\d]/g, "")) -
        Number(b.minimumInvestment.replace(/[^\d]/g, "")),
    );
  } else if (sortBy === "Most Funded") {
    sorted.sort((a, b) => b.progress - a.progress);
  }

  return sorted;
}

export function paginateDeals<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
