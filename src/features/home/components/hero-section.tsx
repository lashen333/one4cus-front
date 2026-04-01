// src\features\home\components\hero-section.tsx
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import type { HeroContent } from "../types/home.types";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-10">
      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            {hero.title}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">
            {hero.subtitle}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}