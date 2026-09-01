// src\features\deals\components\deal-list\deals-grid.tsx
import type { DealListItem } from "../../types/deals-list.types";
import { DealOpportunityCard } from "./deal-opportunity-card";

type DealsGridProps = {
  items: DealListItem[];
};

export function DealsGrid({ items }: DealsGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-semibold text-slate-900">No opportunities found</h3>
        <p className="mt-2 text-slate-500">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {items.map((item, index) => (
        <DealOpportunityCard
          key={item.id}
          item={item}
          cardPosition={index + 1}
          sourcePage="deals_page"
          pageSection="listing_section"
        />
      ))}
    </div>
  );
}
