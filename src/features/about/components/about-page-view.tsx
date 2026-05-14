// src\features\about\components\about-page-view.tsx
import type { AboutPageData } from "../types/about.types";
import { AboutCtaSection } from "./about-cta-section";
import { AboutHeroSection } from "./about-hero-section";
import { AboutMissionSection } from "./about-mission-section";
import { AboutValuesSection } from "./about-values-section";

type AboutPageViewProps = {
  data: AboutPageData;
};

export function AboutPageView({ data }: AboutPageViewProps) {
  return (
    <main className="bg-white">
      <AboutHeroSection hero={data.hero} />
      <AboutMissionSection story={data.story} mission={data.mission} />
      <AboutValuesSection values={data.values} />
      <AboutCtaSection cta={data.cta} />
    </main>
  );
}
