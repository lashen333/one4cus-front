// src\features\services\utils\services-filter.utils.ts
import type { ServiceProviderListItem } from "../types/services.types";

export type ServicesFiltersState = {
  searchTerm: string;
  city: string;
  selectedCategories: string[];
  selectedRating: string[];
  selectedProviderStatus: string[];
  selectedAvailability: string[];
  verifiedOnly: boolean;
};

export function filterServices(items: ServiceProviderListItem[], filters: ServicesFiltersState) {
  return items.filter((item) => {
    const matchesSearch =
      !filters.searchTerm ||
      item.serviceTitle.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesCity =
      !filters.city ||
      item.location.toLowerCase().includes(filters.city.toLowerCase()) ||
      item.city.toLowerCase().includes(filters.city.toLowerCase());

    const matchesCategory =
      filters.selectedCategories.length === 0 || filters.selectedCategories.includes(item.category);

    const matchesVerified = !filters.verifiedOnly || item.verified;

    const matchesProviderStatus =
      filters.selectedProviderStatus.length === 0 ||
      filters.selectedProviderStatus.every((status) => item.statusTags.includes(status as never));

    const matchesAvailability =
      filters.selectedAvailability.length === 0 ||
      filters.selectedAvailability.every((availability) =>
        item.availabilityTags.includes(availability as never),
      );

    const matchesRating =
      filters.selectedRating.length === 0 ||
      filters.selectedRating.some((rating) => {
        if (rating === "5.0") return item.rating >= 5;
        if (rating === "4.0 & Up") return item.rating >= 4;
        if (rating === "3.0 & Up") return item.rating >= 3;
        return true;
      });

    return (
      matchesSearch &&
      matchesCity &&
      matchesCategory &&
      matchesVerified &&
      matchesProviderStatus &&
      matchesAvailability &&
      matchesRating
    );
  });
}

export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
