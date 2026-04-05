// src\features\services\components\services-grid.tsx
import type { ServiceProviderListItem } from "../types/services.types";
import { ServiceProviderCard } from "./service-provider-card";

type ServicesGridProps = {
  items: ServiceProviderListItem[];
};

export function ServicesGrid({ items }: ServicesGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-xl font-semibold text-slate-900">No providers found</h3>
        <p className="mt-2 text-slate-500">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => (
        <ServiceProviderCard key={item.id} item={item} />
      ))}
    </div>
  );
}
