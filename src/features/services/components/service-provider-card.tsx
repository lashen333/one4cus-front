// src\features\services\components\service-provider-card.tsx
import { BadgeCheck, Clock3, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceProviderListItem } from "../types/services.types";

type ServiceProviderCardProps = {
  item: ServiceProviderListItem;
};

function getAvailabilityClasses(state: "available" | "booked") {
  if (state === "available") {
    return "bg-[#20c5b5] text-white";
  }

  return "bg-[#ead28b] text-slate-800";
}

export function ServiceProviderCard({ item }: ServiceProviderCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 w-full">
        <Image src={item.image} alt={item.serviceTitle} fill className="object-cover" />

        <div className="absolute left-3 top-3 rounded-full bg-[#1f78d1] px-3 py-1 text-xs font-semibold text-white">
          {item.category}
        </div>

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${getAvailabilityClasses(
            item.availabilityState,
          )}`}
        >
          {item.availabilityLabel}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">{item.companyName}</p>

          {item.verified ? (
            <div className="inline-flex items-center gap-1 text-sm font-medium text-[#20b9a7]">
              <BadgeCheck className="size-4" />
              Verified
            </div>
          ) : null}
        </div>

        <h3 className="mt-2 text-[1.7rem] font-semibold leading-tight text-slate-900">
          {item.serviceTitle}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 text-slate-500" />
            <span>
              {item.rating} ({item.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 className="size-4 text-slate-500" />
            <span>{item.yearsExperience}+ Years</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin className="size-4 text-slate-500" />
          <span>{item.location}</span>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Starting Rate</p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <p className="text-3xl font-bold text-slate-900">
              {item.startRateLkr}LKR
              <span className="ml-1 text-sm font-medium text-slate-500">/{item.pricingUnit}</span>
            </p>

            <Link
              href={`/providers/${item.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1f78d1] px-5 text-sm font-medium text-white transition hover:bg-[#1768b7]"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
