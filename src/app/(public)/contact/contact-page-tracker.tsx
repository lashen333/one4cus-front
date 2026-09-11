// src\app\(public)\contact\contact-page-tracker.tsx
//section view tracker file
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function ContactPageTracker() {
  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      element_name: "contact_us_hero_section",
      event_value: {
        page_name: "contact_us_page",
        section_name: "hero_section",
      },
    });
  }, []);

  return null;
}
