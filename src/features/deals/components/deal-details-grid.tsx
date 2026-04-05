// src\features\deals\components\deal-details-grid.tsx
import type { DealStatItem } from "../types/deals.types";

type DealDetailsGridProps = {
  items: DealStatItem[];
};

export function DealDetailsGrid({ items }: DealDetailsGridProps) {
  return (
    <section className="pt-10">
      <div className="flex items-center gap-2">
        <span className="text-[#1f78d1]">ⓘ</span>
        <h3 className="text-2xl font-semibold text-slate-900">Investment Details Include</h3>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="border-b border-slate-200 pb-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
