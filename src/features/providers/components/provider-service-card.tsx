// src\features\providers\components\provider-service-card.tsx
import type { ProviderServiceItem } from "../types/providers.types";

type ProviderServiceCardProps = {
  item: ProviderServiceItem;
};

export function ProviderServiceCard({ item }: ProviderServiceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-[1.9rem] font-semibold leading-tight text-slate-900">{item.title}</h3>

      <p className="mt-5 min-h-[96px] text-base leading-7 text-slate-500">{item.description}</p>

      <p className="mt-5 text-[1.8rem] font-semibold text-[#1f78d1]">{item.priceLabel}</p>

      <div className="mt-6">
        <button
          type="button"
          disabled
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-sm font-medium text-slate-300"
        >
          {item.ctaLabel}
        </button>
      </div>
    </article>
  );
}
