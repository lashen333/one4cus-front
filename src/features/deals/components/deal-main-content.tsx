// src\features\deals\components\deal-main-content.tsx
import Image from "next/image";
import type { DealProfileData } from "../types/deals.types";
import { DealDetailsGrid } from "./deal-details-grid";
import { DealGallerySection } from "./deal-gallery-section";
import { DealHighlightsGrid } from "./deal-highlights-grid";
import { DealHowItWorksCard } from "./deal-how-it-works-card";
import { DealOverviewSection } from "./deal-overview-section";
import { DealTabs } from "./deal-tabs";

type DealMainContentProps = {
  deal: DealProfileData;
};

export function DealMainContent({ deal }: DealMainContentProps) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="relative h-[340px] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/images/deals/detail/deal-main.jpg"
            alt={deal.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="rounded-2xl bg-[#eef5fb] p-6">
          <div className="inline-flex rounded-full border border-[#cfe1f5] bg-white px-3 py-1 text-xs font-semibold text-[#1f78d1]">
            Risk Profile
          </div>

          <h3 className="mt-4 text-3xl font-bold text-[#1f78d1]">{deal.riskProfile}</h3>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm text-slate-400">Expected Returns</p>
              <p className="mt-1 text-4xl font-bold text-slate-900">{deal.expectedReturns}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Projected performance based on previous mining cycles in the region.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Minimum Entry</p>
              <p className="mt-1 text-4xl font-bold text-slate-900">{deal.minimumEntry}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DealTabs />
        <DealOverviewSection title={deal.overviewTitle} paragraphs={deal.overviewParagraphs} />
        <DealDetailsGrid items={deal.detailItems} />
        <DealHighlightsGrid items={deal.highlights} />
        <DealGallerySection items={deal.gallery} />
        <DealHowItWorksCard />
      </div>
    </div>
  );
}
