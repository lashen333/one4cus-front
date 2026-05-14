// src\features\about\components\about-values-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import { Handshake, SearchCheck, TrendingUp } from "lucide-react";
import type { AboutPageData } from "../types/about.types";

type AboutValuesSectionProps = {
  values: AboutPageData["values"];
};

const icons = [Handshake, SearchCheck, TrendingUp];

export function AboutValuesSection({ values }: AboutValuesSectionProps) {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {values.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-600">{values.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.items.map((item, index) => {
            const Icon = icons[index] ?? Handshake;

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e6f0fb] text-[#1f78d1]">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
