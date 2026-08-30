// src/features/services/components/service-list/services-active-filters.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";

type ServicesActiveFiltersProps = {
  selectedCategories: string[];
  selectedRating: string[];
  onRemoveCategory: (value: string) => void;
  onRemoveRating: (value: string) => void;
  onClearAll: () => void;
};

function toTrackingName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function FilterChip({
  label,
  filterGroup,
  filterName,
  onRemove,
}: {
  label: string;
  filterGroup: "category" | "rating";
  filterName: string;
  onRemove: () => void;
}) {
  const trackingName = toTrackingName(filterName);

  return (
    <button
      type="button"
      onClick={() => {
        pushToDataLayer({
          event: "filter_remove",
          page_name: "services_page",
          section_name: "listing_section",
          element_name: `filter_chip_remove_${trackingName}`,
          filter_group: filterGroup,
          filter_name: filterName,
          filter_value: trackingName,
          filter_location: "active_filters",
        });

        onRemove();
      }}
      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
    >
      {label} <span className="ml-2">×</span>
    </button>
  );
}

export function ServicesActiveFilters({
  selectedCategories,
  selectedRating,
  onRemoveCategory,
  onRemoveRating,
  onClearAll,
}: ServicesActiveFiltersProps) {
  const hasFilters = selectedCategories.length > 0 || selectedRating.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {selectedCategories.map((item) => (
        <FilterChip
          key={item}
          label={`Category: ${item}`}
          filterGroup="category"
          filterName={item}
          onRemove={() => onRemoveCategory(item)}
        />
      ))}

      {selectedRating.map((item) => (
        <FilterChip
          key={item}
          label={`Rating: ${item}`}
          filterGroup="rating"
          filterName={item}
          onRemove={() => onRemoveRating(item)}
        />
      ))}

      <button
        type="button"
        onClick={() => {
          pushToDataLayer({
            event: "filter_clear_all",
            page_name: "services_page",
            section_name: "listing_section",
            element_name: "btn_clear_all_active_filters",
            filter_location: "active_filters",
          });

          onClearAll();
        }}
        className="text-sm font-medium text-[#1f78d1] hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
