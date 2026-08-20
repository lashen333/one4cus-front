// src\features\home\components\provider-card.tsx
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProviderItem } from "../types/home.types";

type ProviderCardProps = {
  item: ProviderItem;
  cardPosition?: number; // Optional prop to indicate the position of the card
  sourcePage?: string; // Optional prop to indicate the source page of the card
  pageSection?: string; // Optional prop to indicate the page section of the card
};

function getProviderCardTitle(item: ProviderItem) {
  const name = item.name.trim();
  const category = item.category.trim();

  if (!category) return name;

  const normalizedName = name.toLowerCase();
  const normalizedCategory = category.toLowerCase();

  if (normalizedName.includes(normalizedCategory)) {
    return name;
  }

  return `${name} - ${category}`;
}

export function ProviderCard({
  item,
  cardPosition,
  sourcePage = "home",
  pageSection = "home_services",
}: ProviderCardProps) {
  const imageSrc = item.image || "/images/placeholders/service.jpg";
  const title = getProviderCardTitle(item);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="relative h-56 w-full bg-slate-100 sm:h-64">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-3 text-[1.35rem] font-semibold leading-8 text-slate-700">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-500">{item.description}</p>

        {/*<div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span>
            {item.rating} ({item.reviewCount} reviews)
          </span>
        </div>*/}

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Phone className="size-4 shrink-0 text-[#1677c8]" />
          <span>{item.phone}</span>
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={item.profileHref}
            data-analytics-event="click_view_profile"
            data-profile-type="service_provider"
            data-source-page={sourcePage}
            data-page-section={pageSection}
            data-item-id={item.id}
            data-item-name={title}
            data-item-category={item.category || "unknown"}
            data-card-position={cardPosition ?? ""}
            data-destination-url={item.profileHref}
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[#1677c8] text-sm font-medium text-[#1677c8] transition hover:bg-blue-50"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
