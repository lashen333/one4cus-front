// src\features\deals\components\deal-hero-banner.tsx
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Share2, TrendingUp } from "lucide-react";
import Image from "next/image";
import type { DealProfileData } from "../types/deals.types";

type DealHeroBannerProps = {
  deal: DealProfileData;
};

export function DealHeroBanner({ deal }: DealHeroBannerProps) {
  return (
    <section className="relative h-[520px] overflow-hidden">
      <Image src={deal.heroImage} alt={deal.title} fill priority className="object-cover" />

      <div className="absolute inset-0 bg-black/40" />

      <PageContainer className="relative z-10 flex h-full items-end pb-12">
        <div className="max-w-3xl text-white">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-green-600 px-3 py-1 font-medium text-white">
              {deal.statusLabel}
            </span>
            <span className="text-white/90">{deal.statusSubLabel}</span>
          </div>

          <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            {deal.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-6 text-base text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{deal.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              <span>{deal.projectedRoi}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button className="h-12 px-6">Download Project Proposal</Button>

            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <Bookmark className="size-5" />
            </button>

            <button
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <Share2 className="size-5" />
            </button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
