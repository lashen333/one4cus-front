// src\features\about\components\about-cta-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import Link from "next/link";
import type { AboutPageData } from "../types/about.types";

type AboutCtaSectionProps = {
  cta: AboutPageData["cta"];
};

export function AboutCtaSection({ cta }: AboutCtaSectionProps) {
  return (
    <section className="py-16 md:py-20">
      <PageContainer>
        <div className="rounded-3xl bg-[#1f78d1] px-6 py-12 text-center md:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{cta.title}</h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50">
            {cta.description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={cta.primaryHref}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#1f78d1] transition hover:bg-blue-50"
            >
              {cta.primaryLabel}
            </Link>

            <Link
              href={cta.secondaryHref}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/50 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
