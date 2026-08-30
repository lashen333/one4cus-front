// src\features\deals\components\deal-list\deals-hero-tracker.tsx

"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function DealsHeroTracker() {
  useEffect(() => {
    pushToDataLayer({
      event: "section_view",
      page_name: "deals_page",
      section_name: "hero_section",
      element_name: "deals_hero_section",
    });
  }, []);

  return null;
}
