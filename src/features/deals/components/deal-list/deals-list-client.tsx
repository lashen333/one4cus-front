// src\features\deals\components\deal-list\deals-list-client.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { DealsListingPageData } from "../../types/deals-list.types";
import {
  filterDeals,
  paginateDeals,
  sortDeals,
  type DealsFiltersState,
} from "../../utils/deals-filter.utils";
import { DealsActiveFilters } from "./deals-active-filters";
import { DealsFiltersSidebar } from "./deals-filters-sidebar";
import { DealsGrid } from "./deals-grid";
import { DealsHero } from "./deals-hero";
import { DealsPagination } from "./deals-pagination";

type DealsListClientProps = {
  data: DealsListingPageData;
};

const PAGE_SIZE = 6;

function toggleArrayItem(items: string[], value: string) {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

const initialFilters = (data: DealsListingPageData): DealsFiltersState => ({
  searchTerm: "",
  verifiedOnly: true,
  selectedCategories: [],
  selectedFundingStatuses: ["Open for investment"],
  selectedRiskLevels: ["Medium Risk"],
  selectedMinimumInvestments: [],
  selectedDealTypes: [],
  roiMin: data.filters.roiRange.selectedMin,
  roiMax: data.filters.roiRange.selectedMax,
  sortBy: data.sortOptions[0],
});

export function DealsListClient({ data }: DealsListClientProps) {
  const [filters, setFilters] = useState<DealsFiltersState>(() => initialFilters(data));
  const [currentPage, setCurrentPage] = useState(1);

  function updateFilters(partial: Partial<DealsFiltersState>) {
    setFilters((prev) => ({ ...prev, ...partial }));
    setCurrentPage(1);
  }

  function clearAllFilters() {
    setFilters(initialFilters(data));
    setCurrentPage(1);
  }

  const filteredItems = useMemo(() => {
    const filtered = filterDeals(data.items, filters);
    return sortDeals(filtered, filters.sortBy);
  }, [data.items, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    return paginateDeals(filteredItems, currentPage, PAGE_SIZE);
  }, [filteredItems, currentPage]);

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
              onCategoryToggle={(value) =>
                updateFilters({
                  selectedCategories: toggleArrayItem(filters.selectedCategories, value),
                })
              }
              onFundingStatusToggle={(value) =>
                updateFilters({
                  selectedFundingStatuses: toggleArrayItem(filters.selectedFundingStatuses, value),
                })
              }
              onRiskLevelToggle={(value) =>
                updateFilters({
                  selectedRiskLevels: toggleArrayItem(filters.selectedRiskLevels, value),
                })
              }
              onMinimumInvestmentToggle={(value) =>
                updateFilters({
                  selectedMinimumInvestments: toggleArrayItem(
                    filters.selectedMinimumInvestments,
                    value,
                  ),
                })
              }
              onDealTypeToggle={(value) =>
                updateFilters({
                  selectedDealTypes: toggleArrayItem(filters.selectedDealTypes, value),
                })
              }
              onRoiMinChange={(value) =>
                updateFilters({
                  roiMin: Math.min(value, filters.roiMax),
                })
              }
              onRoiMaxChange={(value) =>
                updateFilters({
                  roiMax: Math.max(value, filters.roiMin),
                })
              }
              onApplyFilters={() => undefined}
              onClearAll={clearAllFilters}
            />

            <div className="min-w-0 flex-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={filters.searchTerm}
                        onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                        type="text"
                        placeholder="Search by project name, location, or keyword..."
                        className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                      />
                    </div>

                    <label className="inline-flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={filters.verifiedOnly}
                        onChange={(e) => updateFilters({ verifiedOnly: e.target.checked })}
                        className="size-4 rounded border-slate-300"
                      />
                      <span>Verified Only</span>
                    </label>

                    <select
                      value={filters.sortBy}
                      onChange={(e) => updateFilters({ sortBy: e.target.value })}
                      className="h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                    >
                      {data.sortOptions.map((option) => (
                        <option key={option} value={option}>
                          Sort by: {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm text-slate-500">
                      Showing{" "}
                      <span className="font-semibold text-slate-900">{filteredItems.length}</span>{" "}
                      opportunities
                    </p>

                    <DealsActiveFilters
                      selectedCategories={filters.selectedCategories}
                      selectedRiskLevels={filters.selectedRiskLevels}
                      onRemoveCategory={(value) =>
                        updateFilters({
                          selectedCategories: filters.selectedCategories.filter(
                            (item) => item !== value,
                          ),
                        })
                      }
                      onRemoveRiskLevel={(value) =>
                        updateFilters({
                          selectedRiskLevels: filters.selectedRiskLevels.filter(
                            (item) => item !== value,
                          ),
                        })
                      }
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
                <DealsGrid items={paginatedItems} />
                <DealsPagination
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
