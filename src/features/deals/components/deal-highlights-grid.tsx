// src\features\deals\components\deal-highlights-grid.tsx
import type { DealHighlightItem } from "../types/deals.types";

type DealHighlightsGridProps = {
  items: DealHighlightItem[];
};

export function DealHighlightsGrid({ items }: DealHighlightsGridProps) {
  return (
    <section className="pt-10">
      <h3 className="text-2xl font-semibold text-slate-900">Investment Highlights</h3>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
            <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
