// src\features\about\components\about-page-tracker.tsx
//section view tracker file
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function AboutPageTracker() {
  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      element_name: "about_us_hero_section",
      event_value: {
        page_name: "about_us_page",
        section_name: "hero_section",
      },
    });
  }, []);

  return null;
}
