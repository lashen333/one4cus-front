// src\features\home\components\section-toggle.tsx
"use client";

import { cn } from "@/lib/utils/cn";

export type HomeTabKey = "services" | "deals";

type SectionToggleProps = {
  activeTab: HomeTabKey;
  onChange: (tab: HomeTabKey) => void;
};

export function SectionToggle({
  activeTab,
  onChange,
}: SectionToggleProps) {
  return (
    <div className="mx-auto inline-flex rounded-full bg-[#1677c8] p-2">
      <button
        type="button"
        onClick={() => onChange("services")}
        className={cn(
          "rounded-full px-8 py-3 text-lg font-medium transition",
          activeTab === "services"
            ? "bg-white text-[#1677c8]"
            : "text-white hover:bg-white/10"
        )}
      >
        Services
      </button>

      <button
        type="button"
        onClick={() => onChange("deals")}
        className={cn(
          "rounded-full px-8 py-3 text-lg font-medium transition",
          activeTab === "deals"
            ? "bg-white text-[#1677c8]"
            : "text-white hover:bg-white/10"
        )}
      >
        Deals
      </button>
    </div>
  );
}