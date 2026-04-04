// src\features\providers\components\provider-reviews-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { ProviderReviewItem } from "../types/providers.types";
import { ProviderReviewCard } from "./provider-review-card";

type ProviderReviewsSectionProps = {
  title: string;
  items: ProviderReviewItem[];
};

export function ProviderReviewsSection({ title, items }: ProviderReviewsSectionProps) {
  return (
    <section className="pb-20">
      <PageContainer>
        <h2 className="text-[2.5rem] font-semibold text-slate-900">{title}</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <ProviderReviewCard key={item.id} item={item} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
