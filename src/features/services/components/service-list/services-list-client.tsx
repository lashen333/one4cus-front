"use client";

import { PageContainer } from "@/components/layout/page-container";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { ServicesPageData } from "../../types/services-list.types";
import {
  buildServicesSearchParams,
  parseServicesFiltersFromSearchParams,
  toggleArrayValue,
  type ServicesFiltersState,
} from "../../utils/services-filter.utils";
import { ServicesActiveFilters } from "./services-active-filters";
import { ServicesFiltersSidebar } from "./services-filters-sidebar";
import { ServicesGrid } from "./services-grid";
import { ServicesHero } from "./services-hero";
import { ServicesMobileFiltersDrawer } from "./services-mobile-filters-drawer";
import { ServicesPagination } from "./services-pagination";

type ServicesListClientProps = {
  data: ServicesPageData;
};

export function ServicesListClient({ data }: ServicesListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    return parseServicesFiltersFromSearchParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const [draftFilters, setDraftFilters] = useState<ServicesFiltersState>(filters);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const visibleItems = data.items;
  const currentPage = data.pagination.page;
  const totalPages = data.pagination.totalPages;

  function pushFiltersToUrl(nextFilters: ServicesFiltersState) {
    const params = buildServicesSearchParams(nextFilters, {
      page: 1,
      limit: data.pagination.limit,
    });

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function resetAllFilters() {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", String(data.pagination.limit));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function updateDraftFilters(partial: Partial<ServicesFiltersState>) {
    setDraftFilters((prev) => ({ ...prev, ...partial }));
  }

  function submitSearch() {
    pushFiltersToUrl({
      ...filters,
      searchTerm: draftFilters.searchTerm,
      city: draftFilters.city,
    });
  }

  function toggleCategory(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedCategories: toggleArrayValue(filters.selectedCategories, value),
    });
  }

  function toggleRating(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedRating: toggleArrayValue(filters.selectedRating, value),
    });
  }

  function toggleProviderStatus(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedProviderStatus: toggleArrayValue(filters.selectedProviderStatus, value),
    });
  }

  function toggleAvailability(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedAvailability: toggleArrayValue(filters.selectedAvailability, value),
    });
  }

  function toggleVerifiedOnly(value: boolean) {
    pushFiltersToUrl({
      ...filters,
      verifiedOnly: value,
    });
  }

  function removeCategory(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedCategories: filters.selectedCategories.filter((item) => item !== value),
    });
  }

  function removeRating(value: string) {
    pushFiltersToUrl({
      ...filters,
      selectedRating: filters.selectedRating.filter((item) => item !== value),
    });
  }

  return (
    <main>
      <ServicesHero
        badge={data.badge}
        title={data.title}
        subtitle={data.subtitle}
        searchPlaceholder={data.searchPlaceholder}
        cityPlaceholder={data.cityPlaceholder}
        searchTerm={draftFilters.searchTerm}
        city={draftFilters.city}
        onSearchTermChange={(value) => updateDraftFilters({ searchTerm: value })}
        onCityChange={(value) => updateDraftFilters({ city: value })}
        onSubmitSearch={submitSearch}
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
              onCategoryToggle={toggleCategory}
              onRatingToggle={toggleRating}
              onProviderStatusToggle={toggleProviderStatus}
              onAvailabilityToggle={toggleAvailability}
              onResetAll={resetAllFilters}
            />

            <div className="min-w-0 flex-1">
              <div className="mb-5 flex items-center justify-between gap-3 xl:hidden">
                <div>
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">{visibleItems.length}</span> of{" "}
                    <span className="font-semibold text-slate-900">{data.resultCount}</span> service
                    providers
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Use filters to narrow results</p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </button>
              </div>

              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-6">
                  <p className="hidden text-sm text-slate-500 xl:block">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">{visibleItems.length}</span> of{" "}
                    <span className="font-semibold text-slate-900">{data.resultCount}</span> service
                    providers
                  </p>

                  <ServicesActiveFilters
                    selectedCategories={filters.selectedCategories}
                    selectedRating={filters.selectedRating}
                    onRemoveCategory={removeCategory}
                    onRemoveRating={removeRating}
                    onClearAll={resetAllFilters}
                  />
                </div>

                <label className="inline-flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(event) => toggleVerifiedOnly(event.target.checked)}
                    className="size-4 rounded border-slate-300"
                  />
                  <span>Verified Only</span>
                </label>
              </div>

              <div className="mt-6">
                <ServicesGrid items={visibleItems} />

                <ServicesPagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <ServicesMobileFiltersDrawer
        isOpen={isMobileFiltersOpen}
        categories={data.filters.categories}
        ratingOptions={data.filters.ratingOptions}
        providerStatusOptions={data.filters.providerStatusOptions}
        availabilityOptions={data.filters.availabilityOptions}
        selectedCategories={filters.selectedCategories}
        selectedRating={filters.selectedRating}
        selectedProviderStatus={filters.selectedProviderStatus}
        selectedAvailability={filters.selectedAvailability}
        onCategoryToggle={toggleCategory}
        onRatingToggle={toggleRating}
        onProviderStatusToggle={toggleProviderStatus}
        onAvailabilityToggle={toggleAvailability}
        onResetAll={resetAllFilters}
        onClose={() => setIsMobileFiltersOpen(false)}
      />
    </main>
  );
}
