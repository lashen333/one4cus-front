// src\features\deals\components\deal-investment-overview-card.tsx
import type { DealProfileData } from "../types/deals.types";

type DealInvestmentOverviewCardProps = {
  deal: DealProfileData;
};

export function DealInvestmentOverviewCard({ deal }: DealInvestmentOverviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-slate-900">Investment Overview</h3>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Target ROI</span>
          <span className="font-semibold text-slate-900">{deal.projectedRoi}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Investment Term</span>
          <span className="font-semibold text-slate-900">{deal.investmentTerm}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Entry Level</span>
          <span className="font-semibold text-slate-900">{deal.entryLevel}</span>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Funding Status</p>
        <p className="mt-2 text-3xl font-bold text-[#1f78d1]">{deal.fundingRaised}</p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#1f78d1]"
            style={{ width: `${deal.fundingProgress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 text-xs text-slate-500">
          <span>Goal: {deal.fundingGoal}</span>
          <span>{deal.fundingProgress}% Funded</span>
        </div>
      </div>
    </div>
  );
}
