// src\features\deals\components\deal-profile\deal-owner-card.tsx
import { RevealContactButton } from "@/components/shared/reveal-contact-button";
import { getProviderInitials } from "@/lib/utils/image-fallbacks";
import Image from "next/image";
import type { DealOwner } from "../../types/deals.types";

type DealOwnerCardProps = {
  owner: DealOwner;
};

export function DealOwnerCard({ owner }: DealOwnerCardProps) {
  const initials = getProviderInitials(owner.name);
  const avatarSrc = owner.avatar?.trim() ? owner.avatar : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Project Ownership</h3>

      <div className="mt-5 flex items-start gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-slate-100">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={owner.name} fill sizes="56px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#1677c8] text-lg font-bold text-white">
              {initials}
            </div>
          )}
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
        <RevealContactButton
          entityType="deal"
          entitySlug={owner.entitySlug}
          sourceTitle={owner.company}
        />
        {/*<Button className="w-full">
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="size-4" />
            Send Message
          </span>
        </Button>*/}
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-500">{owner.description}</p>

      {/*<button
        type="button"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-red-300 text-sm font-medium text-red-500 transition hover:bg-red-50"
      >
        Report
      </button>*/}
    </div>
  );
}
