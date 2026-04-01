// src\features\home\components\deals-grid.tsx
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import type { DealItem } from "../types/home.types";
import { DealCard } from "./deal-card";

type DealsGridProps = {
  title: string;
  items: DealItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function DealsGrid({
  title,
  items,
  ctaLabel,
  ctaHref,
}: DealsGridProps) {
  return (
    <section className="pt-6 pb-16">
      <PageContainer>
        <SectionHeading title={title} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <DealCard key={item.id} item={item} />
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