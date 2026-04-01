// src\features\home\components\home-tabs-section.tsx
"use client";

import { useState } from "react";
import type { HomePageData } from "../types/home.types";
import { DealsGrid } from "./deals-grid";
import { ProvidersGrid } from "./providers-grid";
import { SectionToggle, type HomeTabKey } from "./section-toggle";

type HomeTabsSectionProps = {
  servicesSection: HomePageData["servicesSection"];
  dealsSection: HomePageData["dealsSection"];
};

export function HomeTabsSection({
  servicesSection,
  dealsSection,
}: HomeTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<HomeTabKey>("services");

  return (
    <section className="pb-6 pt-4">
      <div className="flex justify-center">
        <SectionToggle activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === "services" ? (
        <ProvidersGrid
          title={servicesSection.title}
          items={servicesSection.items}
          ctaLabel={servicesSection.ctaLabel}
          ctaHref={servicesSection.ctaHref}
        />
      ) : (
        <DealsGrid
          title={dealsSection.title}
          items={dealsSection.items}
          ctaLabel={dealsSection.ctaLabel}
          ctaHref={dealsSection.ctaHref}
        />
      )}
    </section>
  );
}