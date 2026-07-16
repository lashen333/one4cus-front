// src\features\home\components\providers-grid.tsx
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { ProviderItem } from "../types/home.types";
import { ProviderCard } from "./provider-card";

type ProvidersGridProps = {
  title: string;
  items: ProviderItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function ProvidersGrid({ title, items, ctaLabel, ctaHref }: ProvidersGridProps) {
  return (
    <section className="pt-6 pb-16">
      <PageContainer>
        <SectionHeading title={title} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <ProviderCard
              key={item.id}
              item={item}
              cardPosition={index + 1}
              sourcePage="home"
              pageSection="home_services"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={ctaHref} className="min-w-56">
            {ctaLabel}
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
