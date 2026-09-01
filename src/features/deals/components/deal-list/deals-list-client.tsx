// src\features\deals\components\deal-list\deals-list-client.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { DealsListingPageData } from "../../types/deals-list.types";
import {
  buildDealsSearchParams,
  parseDealsFiltersFromSearchParams,
  toggleArrayValue,
  type DealsFiltersState,
} from "../../utils/deals-filter.utils";
import { DealsActiveFilters } from "./deals-active-filters";
import { DealsFiltersSidebar } from "./deals-filters-sidebar";
import { DealsGrid } from "./deals-grid";
import { DealsHero } from "./deals-hero";
import { DealsMobileFiltersDrawer } from "./deals-mobile-filters-drawer";
import { DealsPagination } from "./deals-pagination";

type DealsListClientProps = {
  data: DealsListingPageData;
};

//this convert the tracking names snake case style
function toTrackingName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function DealsListClient({ data }: DealsListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    return parseDealsFiltersFromSearchParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const [draftSearchTerm, setDraftSearchTerm] = useState(filters.searchTerm);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const hasTrackedSearchFocus = useRef(false);

  function trackSearchInputFocus() {
    if (hasTrackedSearchFocus.current) return;

    hasTrackedSearchFocus.current = true;

    pushToDataLayer({
      event: "search_input_focus",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "search_input_deals",
    });
  }

  const visibleItems = data.items;
  const currentPage = data.pagination.page;
  const totalPages = data.pagination.totalPages;
  const totalResults = data.pagination.total;

  function pushFiltersToUrl(nextFilters: DealsFiltersState) {
    const params = buildDealsSearchParams(nextFilters, {
      page: 1,
      limit: data.pagination.limit,
    });

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function clearAllFilters() {
    pushToDataLayer({
      event: "filter_reset",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "btn_clear_all_filters",
    });

    setDraftSearchTerm("");

    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", String(data.pagination.limit));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function submitSearch() {
    const cleanedSearchTerm = draftSearchTerm.trim();

    pushToDataLayer({
      event: "search_submit",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "search_input_deals",
      search_term: cleanedSearchTerm || "empty",
    });

    pushFiltersToUrl({
      ...filters,
      searchTerm: draftSearchTerm,
    });
  }

  function toggleCategory(value: string) {
    const trackingName = toTrackingName(value);
    const isSelected = filters.selectedCategories.includes(value);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_checkbox_${trackingName}`,
      filter_group: "category",
      filter_name: value,
      filter_value: trackingName,
      filter_state: isSelected ? "deselected" : "selected",
    });

    pushFiltersToUrl({
      ...filters,
      selectedCategories: toggleArrayValue(filters.selectedCategories, value),
    });
  }

  function toggleFundingStatus(value: string) {
    const trackingName = toTrackingName(value);
    const isSelected = filters.selectedFundingStatuses.includes(value);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_checkbox_${trackingName}`,
      filter_group: "funding_status",
      filter_name: value,
      filter_value: trackingName,
      filter_state: isSelected ? "deselected" : "selected",
    });

    pushFiltersToUrl({
      ...filters,
      selectedFundingStatuses: toggleArrayValue(filters.selectedFundingStatuses, value),
    });
  }

  function toggleRiskLevel(value: string) {
    const trackingName = toTrackingName(value);
    const isSelected = filters.selectedRiskLevels.includes(value);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_checkbox_${trackingName}`,
      filter_group: "risk_level",
      filter_name: value,
      filter_value: trackingName,
      filter_state: isSelected ? "deselected" : "selected",
    });
    pushFiltersToUrl({
      ...filters,
      selectedRiskLevels: toggleArrayValue(filters.selectedRiskLevels, value),
    });
  }

  function toggleMinimumInvestment(value: string) {
    const trackingName = toTrackingName(value);
    const isSelected = filters.selectedMinimumInvestments.includes(value);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_checkbox_${trackingName}`,
      filter_group: "minimum_investment",
      filter_name: value,
      filter_value: trackingName,
      filter_state: isSelected ? "deselected" : "selected",
    });
    pushFiltersToUrl({
      ...filters,
      selectedMinimumInvestments: toggleArrayValue(filters.selectedMinimumInvestments, value),
    });
  }

  function toggleDealType(value: string) {
    const trackingName = toTrackingName(value);
    const isSelected = filters.selectedDealTypes.includes(value);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_checkbox_${trackingName}`,
      filter_group: "deal_type",
      filter_name: value,
      filter_value: trackingName,
      filter_state: isSelected ? "deselected" : "selected",
    });

    pushFiltersToUrl({
      ...filters,
      selectedDealTypes: toggleArrayValue(filters.selectedDealTypes, value),
    });
  }

  function toggleVerifiedOnly(value: boolean) {
    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "filter_checkbox_verified_deals",
      filter_group: "verified",
      filter_name: "Verified Only",
      filter_value: "verified_only",
      filter_state: value ? "selected" : "deselected",
    });

    pushFiltersToUrl({
      ...filters,
      verifiedOnly: value,
    });
  }

  function removeCategory(value: string) {
    const trackingName = toTrackingName(value);

    pushToDataLayer({
      event: "filter_remove",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_chip_remove_${trackingName}`,
      filter_group: "category",
      filter_name: value,
      filter_value: trackingName,
    });

    pushFiltersToUrl({
      ...filters,
      selectedCategories: filters.selectedCategories.filter((item) => item !== value),
    });
  }

  function removeRiskLevel(value: string) {
    const trackingName = toTrackingName(value);

    pushToDataLayer({
      event: "filter_remove",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: `filter_chip_remove_${trackingName}`,
      filter_group: "risk_level",
      filter_name: value,
      filter_value: trackingName,
    });

    pushFiltersToUrl({
      ...filters,
      selectedRiskLevels: filters.selectedRiskLevels.filter((item) => item !== value),
    });
  }

  function updateSort(value: string) {
    pushToDataLayer({
      event: "sort_change",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "filter_tag_sort_by",
      sort_by: value,
    });

    pushFiltersToUrl({
      ...filters,
      sortBy: value,
    });
  }

  function applyFilters() {
    pushToDataLayer({
      event: "filter_apply",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "btn_filter_apply",
    });
  }

  function updateRoiMin(value: number) {
    const nextValue = Math.min(value, filters.roiMax);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "filter_range_roi_min",
      filter_group: "roi_range",
      filter_name: "Min ROI",
      filter_value: String(nextValue),
      filter_state: "changed",
    });

    pushFiltersToUrl({
      ...filters,
      roiMin: nextValue,
    });
  }

  function updateRoiMax(value: number) {
    const nextValue = Math.max(value, filters.roiMin);

    pushToDataLayer({
      event: "filter_toggle",
      page_name: "deals_page",
      section_name: "listing_section",
      element_name: "filter_range_roi_max",
      filter_group: "roi_range",
      filter_name: "Max ROI",
      filter_value: String(nextValue),
      filter_state: "changed",
    });

    pushFiltersToUrl({
      ...filters,
      roiMax: nextValue,
    });
  }

  return (
    <main>
      <DealsHero hero={data.hero} />

      <section className="pb-16">
        <PageContainer>
          <div className="flex flex-col gap-8 xl:flex-row">
            <DealsFiltersSidebar
              categories={data.filters.categories}
              fundingStatuses={data.filters.fundingStatuses}
              riskLevels={data.filters.riskLevels}
              minimumInvestments={data.filters.minimumInvestments}
              dealTypes={data.filters.dealTypes}
              selectedCategories={filters.selectedCategories}
              selectedFundingStatuses={filters.selectedFundingStatuses}
              selectedRiskLevels={filters.selectedRiskLevels}
              selectedMinimumInvestments={filters.selectedMinimumInvestments}
              selectedDealTypes={filters.selectedDealTypes}
              roiMin={filters.roiMin}
              roiMax={filters.roiMax}
              onCategoryToggle={toggleCategory}
              onFundingStatusToggle={toggleFundingStatus}
              onRiskLevelToggle={toggleRiskLevel}
              onMinimumInvestmentToggle={toggleMinimumInvestment}
              onDealTypeToggle={toggleDealType}
              onRoiMinChange={updateRoiMin}
              onRoiMaxChange={updateRoiMax}
              onApplyFilters={applyFilters}
              onClearAll={clearAllFilters}
            />

            <div className="min-w-0 flex-1">
              <div className="mb-5 flex items-center justify-between gap-3 xl:hidden">
                <div>
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">{visibleItems.length}</span> of{" "}
                    <span className="font-semibold text-slate-900">{totalResults}</span>{" "}
                    opportunities
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

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row">
                    <form
                      className="relative min-w-0 flex-1"
                      onSubmit={(event) => {
                        event.preventDefault();
                        submitSearch();
                      }}
                    >
                      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={draftSearchTerm}
                        onFocus={trackSearchInputFocus}
                        onChange={(event) => setDraftSearchTerm(event.target.value)}
                        type="text"
                        placeholder="Search by project name, location, or keyword..."
                        className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                      />
                    </form>

                    <label className="inline-flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={filters.verifiedOnly}
                        onChange={(event) => toggleVerifiedOnly(event.target.checked)}
                        className="size-4 rounded border-slate-300"
                      />
                      <span>Verified Only</span>
                    </label>

                    <div className="w-full md:w-auto">
                      <label className="mb-1 block text-xs font-medium text-slate-500 md:hidden">
                        Sort by
                      </label>

                      <select
                        value={filters.sortBy}
                        onChange={(event) => updateSort(event.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none md:min-w-48"
                      >
                        {data.sortOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="hidden text-sm text-slate-500 xl:block">
                      Showing{" "}
                      <span className="font-semibold text-slate-900">{visibleItems.length}</span> of{" "}
                      <span className="font-semibold text-slate-900">{totalResults}</span>{" "}
                      opportunities
                    </p>

                    <DealsActiveFilters
                      selectedCategories={filters.selectedCategories}
                      selectedRiskLevels={filters.selectedRiskLevels}
                      onRemoveCategory={removeCategory}
                      onRemoveRiskLevel={removeRiskLevel}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-[#eef5fb] text-[#1f78d1]"
                    >
                      ⊞
                    </button>
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <DealsGrid items={visibleItems} />

                <DealsPagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <DealsMobileFiltersDrawer
        isOpen={isMobileFiltersOpen}
        categories={data.filters.categories}
        fundingStatuses={data.filters.fundingStatuses}
        riskLevels={data.filters.riskLevels}
        minimumInvestments={data.filters.minimumInvestments}
        dealTypes={data.filters.dealTypes}
        selectedCategories={filters.selectedCategories}
        selectedFundingStatuses={filters.selectedFundingStatuses}
        selectedRiskLevels={filters.selectedRiskLevels}
        selectedMinimumInvestments={filters.selectedMinimumInvestments}
        selectedDealTypes={filters.selectedDealTypes}
        onCategoryToggle={toggleCategory}
        onFundingStatusToggle={toggleFundingStatus}
        onRiskLevelToggle={toggleRiskLevel}
        onMinimumInvestmentToggle={toggleMinimumInvestment}
        onDealTypeToggle={toggleDealType}
        onResetAll={clearAllFilters}
        onClose={() => setIsMobileFiltersOpen(false)}
      />
    </main>
  );
}
