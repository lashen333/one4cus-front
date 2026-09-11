// src/features/home/components/hero-section.tsx
"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect, useState } from "react";
import type { HeroContent } from "../types/home.types";
import { LeadFormModal } from "./lead-form-modal";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const [activeForm, setActiveForm] = useState<"provider" | "signup" | null>(null);

  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      element_name: "home_hero_section",
      event_value: {
        page_name: "homepage",
        section_name: "hero_section",
      },
    });
  }, []);

  const trackPrimaryCtaClick = () => {
    pushToDataLayer({
      event: "cta_click",
      element_name: "home_hero_browse",
      event_value: {
        page_name: "homepage",
        section_name: "hero_section",
        cta_label: hero.primaryCta.label,
        cta_href: hero.primaryCta.href,
        page_section: "homepage_hero",
      },
    });
  };

  const openLeadForm = (formType: "provider" | "signup") => {
    pushToDataLayer({
      event: "cta_click",
      element_name: "home_hero_list",
      event_value: {
        page_name: "homepage",
        section_name: "hero_section",
        cta_label: hero.secondaryCta.label,
        cta_href: "lead_form",
        page_section: "homepage_hero",
        form_type: formType,
      },
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
                onClick={trackPrimaryCtaClick}
                data-analytics-event="cta_click"
                data-page-name="homepage"
                data-section-name="hero_section"
                data-cta-label={hero.primaryCta.label}
                data-cta-href={hero.primaryCta.href}
                data-element-name="home_hero_browse"
                data-page-section="homepage_hero"
              >
                {hero.primaryCta.label}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => openLeadForm("provider")}
                data-analytics-event="cta_click"
                data-page-name="homepage"
                data-section-name="hero_section"
                data-cta-label={hero.secondaryCta.label}
                data-cta-href="lead_form"
                data-element-name="home_hero_list"
                data-page-section="homepage_hero"
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
