// src\features\home\components\home-page-view.tsx
import type { HomePageData } from "../types/home.types";
import { HeroSection } from "./hero-section";
import { HomePageClient } from "./home-page-client";

type HomePageViewProps = {
  data: HomePageData;
};

export function HomePageView({ data }: HomePageViewProps) {
  return (
    <main>
      <HeroSection hero={data.hero} />
      <HomePageClient data={data} />
    </main>
  );
}
