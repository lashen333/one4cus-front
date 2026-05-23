// src/features/services/utils/services-filter.utils.ts

export type ServicesFiltersState = {
  searchTerm: string;
  city: string;
  selectedCategories: string[];
  selectedRating: string[];
  selectedProviderStatus: string[];
  selectedAvailability: string[];
  verifiedOnly: boolean;
};

export type ServicesQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  categories?: string[];
  verified?: boolean;
};

export const initialServicesFilters: ServicesFiltersState = {
  searchTerm: "",
  city: "",
  selectedCategories: [],
  selectedRating: [],
  selectedProviderStatus: [],
  selectedAvailability: [],
  verifiedOnly: false,
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

export function parseServicesFiltersFromSearchParams(
  searchParams: URLSearchParams,
): ServicesFiltersState {
  return {
    searchTerm: searchParams.get("search") ?? "",
    city: searchParams.get("city") ?? "",
    selectedCategories: parseList(searchParams.get("category")),
    selectedRating: [],
    selectedProviderStatus: [],
    selectedAvailability: [],
    verifiedOnly: searchParams.get("verified") === "true",
  };
}

export function buildServicesSearchParams(
  filters: ServicesFiltersState,
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

  if (filters.city.trim()) {
    params.set("city", filters.city.trim());
  }

  if (filters.selectedCategories.length > 0) {
    params.set("category", filters.selectedCategories.join(","));
  }

  if (filters.verifiedOnly) {
    params.set("verified", "true");
  }

  return params;
}

export function buildServicesApiQuery(params: ServicesQueryParams) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 12));

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.city?.trim()) {
    searchParams.set("city", params.city.trim());
  }

  if (params.categories && params.categories.length > 0) {
    searchParams.set("category", params.categories.join(","));
  }

  if (params.verified) {
    searchParams.set("verified", "true");
  }

  return searchParams.toString();
}
