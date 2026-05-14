// src\features\deals\components\deal-profile\deal-main-content.tsx
import type { DealProfileData } from "../../types/deals.types";
import { DealDetailsGrid } from "./deal-details-grid";
import { DealHighlightsGrid } from "./deal-highlights-grid";
import { DealOverviewSection } from "./deal-overview-section";

type DealMainContentProps = {
  deal: DealProfileData;
};

export function DealMainContent({ deal }: DealMainContentProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-[#eef5fb] p-6 shadow-sm">
          <div className="inline-flex rounded-full border border-[#cfe1f5] bg-white px-3 py-1 text-xs font-semibold text-[#1f78d1]">
            Risk Profile
          </div>

          <h3 className="mt-5 text-3xl font-bold text-[#1f78d1]">{deal.riskProfile}</h3>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Risk level based on the available opportunity details.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            Expected Returns
          </div>

          <p className="mt-5 text-2xl font-bold leading-tight text-slate-900">
            {deal.expectedReturns}
          </p>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Projected return information shared by the provider.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2 xl:col-span-1">
          <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1f78d1]">
            Minimum Entry
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-900">{deal.minimumEntry}</p>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Minimum amount required to start this opportunity.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <DealOverviewSection title={deal.overviewTitle} paragraphs={deal.overviewParagraphs} />
        <DealDetailsGrid items={deal.detailItems} />
        <DealHighlightsGrid items={deal.highlights} />
      </div>
    </div>
  );
}
