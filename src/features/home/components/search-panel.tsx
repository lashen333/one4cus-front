// src\features\home\components\search-panel.tsx
import { Search } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import type { HomePageData } from "../types/home.types";

type SearchPanelProps = {
  search: HomePageData["search"];
};

export function SearchPanel({ search }: SearchPanelProps) {
  return (
    <section className="pb-8">
      <PageContainer>
        <div className="rounded-3xl bg-slate-50 px-6 py-14 sm:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={search.placeholder}
                  className="h-14 w-full rounded-md border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#1677c8]"
                />
              </div>

              <Button className="h-14 px-8">{search.buttonLabel}</Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {search.chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}