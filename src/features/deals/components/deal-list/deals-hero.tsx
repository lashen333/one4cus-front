// src\features\deals\components\deal-list\deals-hero.tsx

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { BrowsePageToggle } from "@/features/browse/components/browse-page-toggle";
import Image from "next/image";
import { DealsHeroTracker } from "./deals-hero-tracker";

type DealsHeroProps = {
  hero: {
    badge: string;
    title: {
      prefix: string;
      highlight: string;
    };
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImage: string;
    heroMetricValue: string;
    heroMetricLabel: string;
  };
};

export function DealsHero({ hero }: DealsHeroProps) {
  return (
    <section className="pt-10 pb-12">
      <DealsHeroTracker />

      <PageContainer>
        <BrowsePageToggle active="deals" />

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="inline-flex rounded-full bg-[#e6f0fb] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1f78d1]">
              {hero.badge}
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              {hero.title.prefix} <span className="text-[#1f78d1]">{hero.title.highlight}</span>
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-9 text-slate-500">{hero.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/deals"
                data-analytics-event="click_hero_cta"
                data-page-name="deals_page"
                data-section-name="hero_section"
                data-element-name="btn_explore_all_deals"
                data-cta-label={hero.primaryCtaLabel}
                data-cta-href="/deals"
              >
                {hero.primaryCtaLabel}
              </Button>

              <Button
                href="#how-it-works"
                variant="secondary"
                data-analytics-event="click_hero_cta"
                data-page-name="deals_page"
                data-section-name="hero_section"
                data-element-name="btn_how_it_works"
                data-cta-label={hero.secondaryCtaLabel}
                data-cta-href="#how-it-works"
              >
                {hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="relative h-105">
                <Image src={hero.heroImage} alt="Deals hero visual" fill className="object-cover" />
              </div>
            </div>

            <div className="absolute -bottom-6 left-8 rounded-2xl bg-white px-6 py-4 shadow-xl">
              <p className="text-3xl font-bold text-slate-900">{hero.heroMetricValue}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {hero.heroMetricLabel}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
