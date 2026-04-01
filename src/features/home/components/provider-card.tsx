// src\features\home\components\provider-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, Phone } from "lucide-react";
import type { ProviderItem } from "../types/home.types";

type ProviderCardProps = {
  item: ProviderItem;
};

export function ProviderCard({ item }: ProviderCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 w-full">
        <Image
          src={item.image}
          alt={`${item.name} ${item.category}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-[1.35rem] font-semibold text-slate-900">
          {item.name} - {item.category}
        </h3>

        <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-500">
          {item.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span>
            {item.rating} ({item.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Phone className="size-4 text-[#1677c8]" />
          <span>{item.phone}</span>
        </div>

        <Link
          href={item.profileHref}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-[#1677c8] text-sm font-medium text-[#1677c8] transition hover:bg-blue-50"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}