// src\components\analytics\card-click-tracker.tsx
//global card click tracker

"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function CardClickTracker() {
  useEffect(() => {
    function handleCardClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const cardElement = target.closest<HTMLElement>(
        '[data-analytics-event="click_view_profile"]',
      );

      if (!cardElement) return;

      pushToDataLayer({
        event: "card_click",
        element_name: cardElement.dataset.elementName || "unknown_card",
        event_value: {
          page_name: cardElement.dataset.pageName || "unknown",
          section_name: cardElement.dataset.sectionName || "unknown",
          profile_type: cardElement.dataset.profileType || "unknown",
          source_page: cardElement.dataset.sourcePage || "unknown",
          page_section: cardElement.dataset.pageSection || "unknown",
          item_id: cardElement.dataset.itemId || "unknown",
          item_name: cardElement.dataset.itemName || "unknown",
          item_category: cardElement.dataset.itemCategory || "unknown",
          card_position: cardElement.dataset.cardPosition || "unknown",
          destination_url: cardElement.dataset.destinationUrl || "unknown",
        },
      });
    }

    document.addEventListener("click", handleCardClick, true);

    return () => {
      document.removeEventListener("click", handleCardClick, true);
    };
  }, []);

  return null;
}
