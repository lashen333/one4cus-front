// src\features\providers\components\provider-review-card.tsx
import Image from "next/image";
import type { ProviderReviewItem } from "../types/providers.types";
import { ProviderRating } from "./provider-rating";

type ProviderReviewCardProps = {
  item: ProviderReviewItem;
};

export function ProviderReviewCard({ item }: ProviderReviewCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="relative size-12 overflow-hidden rounded-full">
          <Image src={item.avatar} alt={item.name} fill className="object-cover" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <div className="mt-1">
            <ProviderRating rating={item.rating} size="sm" />
          </div>
        </div>
      </div>

      <p className="mt-5 text-base leading-8 text-slate-500">{item.comment}</p>

      <p className="mt-6 text-sm text-slate-500">{item.reviewedOn}</p>
    </article>
  );
}
