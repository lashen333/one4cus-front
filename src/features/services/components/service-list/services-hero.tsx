// src/features/services/components/service-list/services-hero.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { BrowsePageToggle } from "@/features/browse/components/browse-page-toggle";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { MapPin, Search } from "lucide-react";
import { useEffect, useRef } from "react";

type ServicesHeroProps = {
  badge: string;
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  subtitle: string;
  searchPlaceholder: string;
  cityPlaceholder: string;
  searchTerm: string;
  city: string;
  onSearchTermChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSubmitSearch: () => void;
};

export function ServicesHero({
  badge,
  title,
  subtitle,
  searchPlaceholder,
  cityPlaceholder,
  searchTerm,
  city,
  onSearchTermChange,
  onCityChange,
  onSubmitSearch,
}: ServicesHeroProps) {
  const hasTrackedSearchFocus = useRef(false);

  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      page_name: "services_page",
      section_name: "hero_section",
      element_name: "services_hero_section",
    });
  }, []);

  const trackSearchInputFocus = () => {
    if (hasTrackedSearchFocus.current) return;

    hasTrackedSearchFocus.current = true;

    pushToDataLayer({
      event: "search_input_focus",
      page_name: "services_page",
      section_name: "hero_section",
      element_name: "search_input_services",
    });
  };

  const handleSubmitSearch = () => {
    const cleanedSearchTerm = searchTerm.trim();
    const cleanedCity = city.trim();

    pushToDataLayer({
      event: "search_submit",
      page_name: "services_page",
      section_name: "hero_section",
      element_name: "btn_search_services",
      search_term: cleanedSearchTerm || "empty",
      city: cleanedCity || "empty",
    });

    onSubmitSearch();
  };

  return (
    <section className="bg-[#eef5fb] py-10">
      <PageContainer>
        <BrowsePageToggle active="services" />

        <div className="mx-auto mt-12 max-w-5xl text-center">
          <div className="inline-flex rounded-full border border-[#b9d5ef] bg-white px-4 py-1 text-sm font-medium text-[#1f78d1]">
            {badge}
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
            {title.prefix} <span className="text-[#1f78d1]">{title.highlight}</span> {title.suffix}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-500">{subtitle}</p>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onFocus={trackSearchInputFocus}
                onChange={(e) => onSearchTermChange(e.target.value)}
                type="text"
                placeholder={searchPlaceholder}
                className="h-16 w-full border-b border-slate-200 pl-12 pr-4 text-sm outline-none md:border-b-0 md:border-r"
              />
            </div>

            <div className="relative md:w-60">
              <MapPin className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                type="text"
                placeholder={cityPlaceholder}
                className="h-16 w-full border-b border-slate-200 pl-12 pr-4 text-sm outline-none md:border-b-0"
              />
            </div>

            <div className="p-2">
              <Button
                className="h-12 w-full px-8 md:w-auto"
                type="button"
                onClick={handleSubmitSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
