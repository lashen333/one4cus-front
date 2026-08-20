// src\features\home\components\hero-section.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useState } from "react";
import type { HeroContent } from "../types/home.types";
import { LeadFormModal } from "./lead-form-modal";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const [activeForm, setActiveForm] = useState<"provider" | "signup" | null>(null);

  const openLeadForm = (formType: "provider" | "signup") => {
    pushToDataLayer({
      event: "click_hero_cta",
      cta_label: hero.secondaryCta.label,
      cta_href: "lead_form",
      page_section: "homepage_hero",
      form_type: formType,
    });

    setActiveForm(formType);
  };

  return (
    <>
      <section className="pt-24 pb-10">
        <PageContainer>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              {hero.title}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">
              {hero.subtitle}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={hero.primaryCta.href}
                data-analytics-event="click_hero_cta"
                data-cta-label={hero.primaryCta.label}
                data-cta-href={hero.primaryCta.href}
                data-page-section="homepage_hero"
              >
                {hero.primaryCta.label}
              </Button>

              <Button
                type="button"
                variant="secondary"
                data-analytics-event="click_hero_cta"
                data-cta-label={hero.secondaryCta.label}
                data-cta-href="lead_form"
                data-page-section="homepage_hero"
                onClick={() => {
                  openLeadForm("provider");
                }}
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {activeForm ? (
        <LeadFormModal
          open={Boolean(activeForm)}
          leadType={activeForm}
          onClose={() => setActiveForm(null)}
        />
      ) : null}
    </>
  );
}
