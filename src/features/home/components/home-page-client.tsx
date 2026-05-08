// src/features/home/components/home-page-client.tsx
"use client";

import { useMemo, useState } from "react";
import type { DealItem, HomePageData, ProviderItem } from "../types/home.types";
import { HomeTabsSection } from "./home-tabs-section";
import { SearchPanel } from "./search-panel";

type HomePageClientProps = {
  data: HomePageData;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function filterServices(items: ProviderItem[], searchTerm: string) {
  const query = normalize(searchTerm);

  if (!query) return items;

  return items.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query)
    );
  });
}

function filterDeals(items: DealItem[], searchTerm: string) {
  const query = normalize(searchTerm);

  if (!query) return items;

  return items.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );
  });
}

export function HomePageClient({ data }: HomePageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = useMemo(() => {
    return filterServices(data.servicesSection.items, searchTerm);
  }, [data.servicesSection.items, searchTerm]);

  const filteredDeals = useMemo(() => {
    return filterDeals(data.dealsSection.items, searchTerm);
  }, [data.dealsSection.items, searchTerm]);

  const filteredData: HomePageData = {
    ...data,
    servicesSection: {
      ...data.servicesSection,
      items: filteredServices,
    },
    dealsSection: {
      ...data.dealsSection,
      items: filteredDeals,
    },
  };

  return (
    <>
      <SearchPanel
        search={data.search}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSubmitSearch={() => undefined}
      />

      <HomeTabsSection
        servicesSection={filteredData.servicesSection}
        dealsSection={filteredData.dealsSection}
      />
    </>
  );
}
