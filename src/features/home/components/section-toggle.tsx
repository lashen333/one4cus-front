// src\features\home\components\section-toggle.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { cn } from "@/lib/utils/cn";

export type HomeTabKey = "services" | "deals";

type SectionToggleProps = {
  activeTab: HomeTabKey;
  onChange: (tab: HomeTabKey) => void;
};

export function SectionToggle({ activeTab, onChange }: SectionToggleProps) {
  const trackToggleClick = (tab: HomeTabKey) => {
    if (tab === activeTab) return;

    pushToDataLayer({
      event: "section_toggle_click",
      page_name: "home_page",
      section_name: "hero_section",
      element_name: tab === "services" ? "button_toggle_services" : "button_toggle_deals",
      selected_tab: tab,
    });
    onChange(tab);
  };
  return (
    <div className="mx-auto inline-flex rounded-full bg-[#1677c8] p-2">
      <button
        type="button"
        onClick={() => trackToggleClick("services")}
        className={cn(
          "rounded-full px-8 py-3 text-lg font-medium transition",
          activeTab === "services" ? "bg-white text-[#1677c8]" : "text-white hover:bg-white/10",
        )}
      >
        Services
      </button>

      <button
        type="button"
        onClick={() => trackToggleClick("deals")}
        className={cn(
          "rounded-full px-8 py-3 text-lg font-medium transition",
          activeTab === "deals" ? "bg-white text-[#1677c8]" : "text-white hover:bg-white/10",
        )}
      >
        Deals
      </button>
    </div>
  );
}
