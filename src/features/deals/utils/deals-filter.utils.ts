// src/features/deals/utils/deals-filter.utils.ts

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

export type DealsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  verified?: boolean;
};

export const initialDealsFilters: DealsFiltersState = {
  searchTerm: "",
  verifiedOnly: false,
  selectedCategories: [],
  selectedFundingStatuses: [],
  selectedRiskLevels: [],
  selectedMinimumInvestments: [],
  selectedDealTypes: [],
  roiMin: 0,
  roiMax: 100,
  sortBy: "Newest",
};

export function toggleArrayValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function parseList(value: string | null) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseDealsFiltersFromSearchParams(
  searchParams: URLSearchParams,
): DealsFiltersState {
  return {
    ...initialDealsFilters,
    searchTerm: searchParams.get("search") ?? "",
    selectedCategories: parseList(searchParams.get("category")),
    verifiedOnly: searchParams.get("verified") === "true",
    sortBy: searchParams.get("sort") ?? "Newest",
  };
}

export function buildDealsSearchParams(
  filters: DealsFiltersState,
  options?: {
    page?: number;
    limit?: number;
  },
) {
  const params = new URLSearchParams();

  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 12));

  if (filters.searchTerm.trim()) {
    params.set("search", filters.searchTerm.trim());
  }

  if (filters.selectedCategories.length > 0) {
    params.set("category", filters.selectedCategories.join(","));
  }

  if (filters.verifiedOnly) {
    params.set("verified", "true");
  }

  if (filters.sortBy && filters.sortBy !== "Newest") {
    params.set("sort", filters.sortBy);
  }

  return params;
}

export function buildDealsApiQuery(params: DealsQueryParams) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 12));

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.categories && params.categories.length > 0) {
    searchParams.set("category", params.categories.join(","));
  }

  if (params.verified) {
    searchParams.set("verified", "true");
  }

  return searchParams.toString();
}
