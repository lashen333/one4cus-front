// src\features\home\components\deal-card.tsx
import Image from "next/image";
import Link from "next/link";
import type { DealItem } from "../types/home.types";

type DealCardProps = {
  item: DealItem;
};

function getProgressPercentage(raised: number, target: number) {
  if (!target) return 0;
  return Math.min((raised / target) * 100, 100);
}

export function DealCard({ item }: DealCardProps) {
  const percentage = getProgressPercentage(item.raisedValue, item.targetValue);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-64 w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-[1.35rem] font-semibold leading-8 text-slate-900">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-500">
          {item.description}
        </p>

        <div className="mt-5 flex items-end justify-between text-sm">
          <div>
            <p className="font-semibold text-[#1677c8]">{item.raisedLabel}</p>
            <p className="font-semibold text-slate-800">LKR {item.raisedValue}M</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-800">{item.targetLabel}</p>
            <p className="font-semibold text-slate-800">LKR {item.targetValue}M</p>
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#1677c8]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <Link
          href={item.href}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-[#1677c8] text-sm font-medium text-[#1677c8] transition hover:bg-blue-50"
        >
          View Opportunity
        </Link>
      </div>
    </article>
  );
}