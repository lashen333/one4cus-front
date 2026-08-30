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
  sourcePage: string;
  pageSection: string;
};

export function ProvidersGrid({
  title,
  items,
  ctaLabel,
  ctaHref,
  sourcePage = "home",
  pageSection = "home_services",
}: ProvidersGridProps) {
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
              sourcePage={sourcePage}
              pageSection={pageSection}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            href={ctaHref}
            data-analytics-event="click_section_cta"
            data-page-name="home_page"
            data-element-name="btn_browse_all_services"
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
