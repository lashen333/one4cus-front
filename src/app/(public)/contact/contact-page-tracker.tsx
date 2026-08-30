// src\app\(public)\contact\contact-page-tracker.tsx
//section view tracker file
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function ContactPageTracker() {
  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      page_name: "contact_us_page",
      section_name: "hero_section",
      element_name: "contact_us_hero_section",
    });
  }, []);

  return null;
}
