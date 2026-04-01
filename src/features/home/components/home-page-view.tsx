// src\features\home\components\home-page-view.tsx
import type { HomePageData } from "../types/home.types";
import { HeroSection } from "./hero-section";
import { HomeTabsSection } from "./home-tabs-section";
import { SearchPanel } from "./search-panel";

type HomePageViewProps = {
  data: HomePageData;
};

export function HomePageView({ data }: HomePageViewProps) {
  return (
    <main>
      <HeroSection hero={data.hero} />
      <SearchPanel search={data.search} />
      <HomeTabsSection
        servicesSection={data.servicesSection}
        dealsSection={data.dealsSection}
      />
    </main>
  );
}