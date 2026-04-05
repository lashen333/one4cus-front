// src\features\services\components\services-list-client.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { useMemo, useState } from "react";
import type { ServicesPageData } from "../types/services.types";
import {
  filterServices,
  paginateItems,
  type ServicesFiltersState,
} from "../utils/services-filter.utils";
import { ServicesActiveFilters } from "./services-active-filters";
import { ServicesFiltersSidebar } from "./services-filters-sidebar";
import { ServicesGrid } from "./services-grid";
import { ServicesHero } from "./services-hero";
import { ServicesPagination } from "./services-pagination";

type ServicesListClientProps = {
  data: ServicesPageData;
};

const PAGE_SIZE = 6;

const initialFilters: ServicesFiltersState = {
  searchTerm: "",
  city: "",
  selectedCategories: [],
  selectedRating: [],
  selectedProviderStatus: [],
  selectedAvailability: [],
  verifiedOnly: false,
};

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function ServicesListClient({ data }: ServicesListClientProps) {
  const [filters, setFilters] = useState<ServicesFiltersState>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return filterServices(data.items, filters);
  }, [data.items, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    return paginateItems(filteredItems, currentPage, PAGE_SIZE);
  }, [filteredItems, currentPage]);

  function resetAllFilters() {
    setFilters(initialFilters);
    setCurrentPage(1);
  }

  function updateFilters(partial: Partial<ServicesFiltersState>) {
    setFilters((prev) => ({ ...prev, ...partial }));
    setCurrentPage(1);
  }

  return (
    <main>
      <ServicesHero
        badge={data.badge}
        title={data.title}
        subtitle={data.subtitle}
        searchPlaceholder={data.searchPlaceholder}
        cityPlaceholder={data.cityPlaceholder}
        searchTerm={filters.searchTerm}
        city={filters.city}
        onSearchTermChange={(value) => updateFilters({ searchTerm: value })}
        onCityChange={(value) => updateFilters({ city: value })}
      />

      <section className="py-10">
        <PageContainer>
          <div className="flex flex-col gap-8 xl:flex-row">
            <ServicesFiltersSidebar
              categories={data.filters.categories}
              ratingOptions={data.filters.ratingOptions}
              providerStatusOptions={data.filters.providerStatusOptions}
              availabilityOptions={data.filters.availabilityOptions}
              selectedCategories={filters.selectedCategories}
              selectedRating={filters.selectedRating}
              selectedProviderStatus={filters.selectedProviderStatus}
              selectedAvailability={filters.selectedAvailability}
              onCategoryToggle={(value) =>
                updateFilters({
                  selectedCategories: toggleArrayValue(filters.selectedCategories, value),
                })
              }
              onRatingToggle={(value) =>
                updateFilters({
                  selectedRating: toggleArrayValue(filters.selectedRating, value),
                })
              }
              onProviderStatusToggle={(value) =>
                updateFilters({
                  selectedProviderStatus: toggleArrayValue(filters.selectedProviderStatus, value),
                })
              }
              onAvailabilityToggle={(value) =>
                updateFilters({
                  selectedAvailability: toggleArrayValue(filters.selectedAvailability, value),
                })
              }
              onResetAll={resetAllFilters}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-6">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">{filteredItems.length}</span>{" "}
                    service providers
                  </p>

                  <ServicesActiveFilters
                    selectedCategories={filters.selectedCategories}
                    selectedRating={filters.selectedRating}
                    onRemoveCategory={(value) =>
                      updateFilters({
                        selectedCategories: filters.selectedCategories.filter(
                          (item) => item !== value,
                        ),
                      })
                    }
                    onRemoveRating={(value) =>
                      updateFilters({
                        selectedRating: filters.selectedRating.filter((item) => item !== value),
                      })
                    }
                    onClearAll={resetAllFilters}
                  />
                </div>

                <label className="inline-flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
                    className="size-4 rounded border-slate-300"
                  />
                  <span>Verified Only</span>
                </label>
              </div>

              <div className="mt-6">
                <ServicesGrid items={paginatedItems} />
                <ServicesPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
