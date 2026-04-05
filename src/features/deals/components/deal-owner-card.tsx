// src\features\deals\components\deal-owner-card.tsx
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import type { DealOwner } from "../types/deals.types";

type DealOwnerCardProps = {
  owner: DealOwner;
};

export function DealOwnerCard({ owner }: DealOwnerCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Project Ownership</h3>

      <div className="mt-5 flex items-start gap-4">
        <div className="relative size-14 overflow-hidden rounded-full">
          <Image src={owner.avatar} alt={owner.name} fill className="object-cover" />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900">{owner.name}</h4>
          <p className="text-sm text-slate-500">{owner.role}</p>
          <p className="text-sm font-medium text-[#1f78d1]">{owner.company}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
        <div className="flex items-center justify-between gap-4">
          <span>Phone</span>
          <span className="font-medium">{owner.phoneMasked}</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#1f78d1] text-sm font-medium text-[#1f78d1] transition hover:bg-blue-50"
        >
          <Phone className="size-4" />
          Reveal Phone Number
        </button>

        <Button className="w-full">
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="size-4" />
            Send Message
          </span>
        </Button>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-500">{owner.description}</p>

      <button
        type="button"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-red-300 text-sm font-medium text-red-500 transition hover:bg-red-50"
      >
        Report
      </button>
    </div>
  );
}
