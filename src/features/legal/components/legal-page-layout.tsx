// src\features\legal\components\legal-page-layout.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { LegalPageData } from "../types/legal.types";
import { LegalSection } from "./legal-section";

type LegalPageLayoutProps = {
  data: LegalPageData;
};

export function LegalPageLayout({ data }: LegalPageLayoutProps) {
  return (
    <main className="bg-white">
      <section className="py-14 md:py-20">
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <header>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {data.title}
              </h1>

              <p className="mt-4 text-base font-medium text-slate-500">
                Last updated: {data.lastUpdated}
              </p>

              {data.intro ? (
                <p className="mt-6 text-base leading-8 text-slate-600">{data.intro}</p>
              ) : null}
            </header>

            <div className="mt-10">
              {data.sections.map((section) => (
                <LegalSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
