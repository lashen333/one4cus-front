// src\features\about\components\about-mission-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { AboutPageData } from "../types/about.types";

type AboutMissionSectionProps = {
  story: AboutPageData["story"];
  mission: AboutPageData["mission"];
};

export function AboutMissionSection({ story, mission }: AboutMissionSectionProps) {
  return (
    <section className="py-16 md:py-20">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{story.title}</h2>

            <div className="mt-6 space-y-5">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#eef5fb] p-6 md:p-8">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#1f78d1]">
              Mission
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
              {mission.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">{mission.description}</p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
