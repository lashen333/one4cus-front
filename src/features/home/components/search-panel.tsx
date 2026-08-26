// src\features\home\components\search-panel.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { Search } from "lucide-react";
import type { HomePageData } from "../types/home.types";

type SearchPanelProps = {
  search: HomePageData["search"];
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSubmitSearch: () => void;
};

export function SearchPanel({
  search,
  searchTerm,
  onSearchTermChange,
  onSubmitSearch,
}: SearchPanelProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedSearchTerm = searchTerm.trim();

    pushToDataLayer({
      event: "search_submit",
      search_term: cleanedSearchTerm || "empty",
      element_name: "search_input_home",
      page_section: "homepage_search",
    });
    onSubmitSearch();
  }

  return (
    <section className="pb-8">
      <PageContainer>
        <div className="rounded-3xl bg-slate-50 px-4 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => onSearchTermChange(event.target.value)}
                  type="search"
                  placeholder={search.placeholder}
                  className="h-14 w-full rounded-md border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#1677c8]"
                />
              </div>

              <Button type="submit" className="h-14 px-8">
                {search.buttonLabel}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {search.chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    pushToDataLayer({
                      event: "quick_search_click",
                      search_term: chip.label,
                      chip_id: chip.id,
                      element_name: "filter_tag_(category_name)",
                      page_section: "homepage_search_chips",
                    });
                    onSearchTermChange(chip.label);
                  }}
                  className={`rounded-md border px-4 py-2 text-sm transition ${
                    searchTerm.toLowerCase() === chip.label.toLowerCase()
                      ? "border-[#1677c8] bg-[#1677c8] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {searchTerm ? (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    pushToDataLayer({
                      event: "search_clear",
                      search_term: searchTerm.trim() || "empty",
                      element_name: "clear_search_home",
                      page_section: "homepage_search",
                    });
                    onSearchTermChange("");
                  }}
                  className="text-sm font-medium text-[#1677c8] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
