// src/features/services/components/service-list/services-filters-sidebar.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";

type ServicesFiltersSidebarProps = {
  categories: string[];
  ratingOptions: string[];
  providerStatusOptions: string[];
  availabilityOptions: string[];
  selectedCategories: string[];
  selectedRating: string[];
  selectedProviderStatus: string[];
  selectedAvailability: string[];
  onCategoryToggle: (value: string) => void;
  onRatingToggle: (value: string) => void;
  onProviderStatusToggle: (value: string) => void;
  onAvailabilityToggle: (value: string) => void;
  onResetAll: () => void;
};

function toTrackingName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function FilterCheckbox({
  label,
  checked,
  filterGroup,
  onToggle,
}: {
  label: string;
  checked: boolean;
  filterGroup: "category" | "rating" | "provider_status" | "availability";
  onToggle: () => void;
}) {
  const trackingName = toTrackingName(label);
  const nextState = checked ? "deselected" : "selected";

  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          pushToDataLayer({
            event: "filter_toggle",
            page_name: "services_page",
            section_name: "listing_section",
            element_name: `filter_checkbox_${trackingName}`,
            filter_group: filterGroup,
            filter_name: label,
            filter_value: trackingName,
            filter_state: nextState,
            filter_location: "desktop_sidebar",
          });

          onToggle();
        }}
        className="size-4 rounded border-slate-300"
      />
      <span>{label}</span>
    </label>
  );
}

export function ServicesFiltersSidebar({
  categories,
  ratingOptions,
  providerStatusOptions,
  availabilityOptions,
  selectedCategories,
  selectedRating,
  selectedProviderStatus,
  selectedAvailability,
  onCategoryToggle,
  onRatingToggle,
  onProviderStatusToggle,
  onAvailabilityToggle,
  onResetAll,
}: ServicesFiltersSidebarProps) {
  return (
    <aside className="hidden w-full max-w-70 shrink-0 lg:block">
      <div className="sticky top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={() => {
              pushToDataLayer({
                event: "filter_reset",
                page_name: "services_page",
                section_name: "listing_section",
                element_name: "btn_reset_all_filters",
                filter_location: "desktop_sidebar",
              });

              onResetAll();
            }}
            className="text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Reset All
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Service Category
            </h3>
            <div className="mt-4 space-y-3">
              {categories.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  filterGroup="category"
                  checked={selectedCategories.includes(item)}
                  onToggle={() => onCategoryToggle(item)}
                />
              ))}
            </div>
          </section>

          {/*<section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Minimum Rating
            </h3>
            <div className="mt-4 space-y-3">
              {ratingOptions.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  filterGroup="rating"
                  checked={selectedRating.includes(item)}
                  onToggle={() => onRatingToggle(item)}
                />
              ))}
            </div>
          </section>*/}

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Provider Status
            </h3>
            <div className="mt-4 space-y-3">
              {providerStatusOptions.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  filterGroup="provider_status"
                  checked={selectedProviderStatus.includes(item)}
                  onToggle={() => onProviderStatusToggle(item)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Availability
            </h3>
            <div className="mt-4 space-y-3">
              {availabilityOptions.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  filterGroup="availability"
                  checked={selectedAvailability.includes(item)}
                  onToggle={() => onAvailabilityToggle(item)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
