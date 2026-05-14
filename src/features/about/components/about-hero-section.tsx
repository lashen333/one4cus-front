// src\features\about\components\about-hero-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { AboutPageData } from "../types/about.types";

type AboutHeroSectionProps = {
  hero: AboutPageData["hero"];
};

export function AboutHeroSection({ hero }: AboutHeroSectionProps) {
  return (
    <section className="bg-[#f3f8fc] py-16 md:py-24">
      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#cfe1f5] bg-white px-4 py-2 text-sm font-semibold text-[#1f78d1]">
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            {hero.title} <span className="text-[#1f78d1]">{hero.highlightedText}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            {hero.description}
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
