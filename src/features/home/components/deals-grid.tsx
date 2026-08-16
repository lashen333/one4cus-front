// src\features\home\components\deals-grid.tsx
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { DealItem } from "../types/home.types";
import { DealCard } from "./deal-card";

type DealsGridProps = {
  title: string;
  items: DealItem[];
  ctaLabel: string;
  ctaHref: string;
  sourcePage?: string;
  pageSection?: string;
};

export function DealsGrid({
  title,
  items,
  ctaLabel,
  ctaHref,
  sourcePage = "home",
  pageSection = "home_deals",
}: DealsGridProps) {
  return (
    <section className="pt-6 pb-16">
      <PageContainer>
        <SectionHeading title={title} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <DealCard
              key={item.id}
              item={item}
              cardPosition={index + 1}
              sourcePage={sourcePage}
              pageSection={pageSection}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            href={ctaHref}
            data-analytics-event="click_section_cta"
            data-cta-label={ctaLabel}
            data-cta-href={ctaHref}
            data-source-page={sourcePage}
            data-page-section={pageSection}
            className="min-w-56"
          >
            {ctaLabel}
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
