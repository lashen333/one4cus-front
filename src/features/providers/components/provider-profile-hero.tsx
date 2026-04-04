// src\features\providers\components\provider-profile-hero.tsx
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Image from "next/image";
import type { ProviderProfileData } from "../types/providers.types";
import { ProviderRating } from "./provider-rating";

type ProviderProfileHeroProps = {
  provider: ProviderProfileData;
};

export function ProviderProfileHero({ provider }: ProviderProfileHeroProps) {
  return (
    <section className="pt-12 pb-10">
      <PageContainer>
        <div className="rounded-[24px] bg-[#eef5fb] px-8 py-12 md:px-12">
          <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
            <div className="flex flex-col items-center text-center">
              <div className="relative size-[124px] overflow-hidden rounded-full">
                <Image src={provider.avatar} alt={provider.name} fill className="object-cover" />
              </div>

              <div className="relative -mt-5 ml-24 size-6 rounded-full border-4 border-[#eef5fb] bg-green-600" />

              <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-900">
                {provider.name}
              </h1>

              <div className="mt-3">
                <ProviderRating
                  rating={provider.averageRating}
                  reviewCount={provider.reviewCount}
                  centered
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-[2rem] font-semibold text-slate-900">Contact {provider.name}</h2>

              <div className="mt-6 flex items-center gap-3 text-xl text-slate-500">
                <Phone className="size-5 text-slate-500" />
                <span>{provider.phoneMasked}</span>
              </div>

              <div className="mt-6">
                <Button className="h-12 px-6">Reveal Phone Number</Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
