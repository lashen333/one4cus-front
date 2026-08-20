// src\features\deals\components\deal-list\deal-opportunity-card.tsx
import { BadgeCheck, BarChart3, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { DealListItem } from "../../types/deals-list.types";

type DealOpportunityCardProps = {
  item: DealListItem;
};

function getRiskClasses(risk: string) {
  if (risk === "Low Risk") {
    return "bg-[#edf9f0] text-[#22a25a]";
  }
  if (risk === "Medium Risk") {
    return "bg-[#eef5fb] text-[#1f78d1]";
  }
  return "bg-[#fff1f1] text-[#e05252]";
}

function getFundingClasses(status: string) {
  if (status === "Open for investment") {
    return "bg-[#edf9f0] text-[#22a25a]";
  }
  if (status === "Fully funded") {
    return "bg-[#eef5fb] text-[#1f78d1]";
  }
  if (status === "Coming soon") {
    return "bg-[#fff7e8] text-[#d28b15]";
  }
  return "bg-slate-100 text-slate-600";
}

export function DealOpportunityCard({ item }: DealOpportunityCardProps) {
  const imageSrc = item.image || "/images/placeholders/deal.png";
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 w-full shrink-0">
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ${getRiskClasses(
            item.riskLevel,
          )}`}
        >
          {item.riskLevel}
        </div>

        <div
          className={`absolute right-3 top-12 rounded-full px-3 py-1 text-[11px] font-semibold ${getFundingClasses(
            item.fundingStatus,
          )}`}
        >
          {item.fundingStatus === "Open for investment" ? "Open Now" : item.fundingStatus}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-16 text-[1.55rem] font-semibold leading-tight text-slate-700">
            {item.title}
          </h3>

          {item.verified ? <BadgeCheck className="mt-1 size-5 shrink-0 text-[#1f78d1]" /> : null}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="flex items-center gap-2 text-slate-400">
              <BarChart3 className="size-4" />
              EST. ROI
            </p>
            <p className="mt-1 font-semibold text-[#22a25a]">{item.estRoi}</p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-slate-400">
              <Clock3 className="size-4" />
              Duration
            </p>
            <p className="mt-1 font-semibold text-slate-900">{item.duration}</p>
          </div>

          <div>
            <p className="text-slate-400">Deal Type</p>
            <p className="mt-1 font-semibold text-slate-900">{item.dealType}</p>
          </div>

          <div>
            <p className="text-slate-400">Category</p>
            <p className="mt-1 font-semibold text-slate-900">{item.category}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Min. Investment
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-700">{item.minimumInvestment}</p>
        </div>

        {/*<div className="mt-5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div>
              <p className="font-semibold text-[#1f78d1]">Raised</p>
              <p className="font-semibold text-slate-900">{item.raised}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-500">Target</p>
              <p className="font-semibold text-slate-900">{item.target}</p>
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#1f78d1]"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>*/}
        <div className="mt-auto pt-1">
          <Link
            href={`/deals/${item.slug}`}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1f78d1] px-5 text-sm font-medium text-white transition hover:bg-[#1768b7]"
          >
            View Opportunity
          </Link>
        </div>
      </div>
    </article>
  );
}
