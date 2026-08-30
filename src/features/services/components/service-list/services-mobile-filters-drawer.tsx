// src/features/services/components/service-list/services-mobile-filters-drawer.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { X } from "lucide-react";

type ServicesMobileFiltersDrawerProps = {
  isOpen: boolean;
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
  onClose: () => void;
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
            filter_location: "mobile_drawer",
          });

          onToggle();
        }}
        className="size-4 rounded border-slate-300"
      />
      <span>{label}</span>
    </label>
  );
}

export function ServicesMobileFiltersDrawer({
  isOpen,
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
  onClose,
}: ServicesMobileFiltersDrawerProps) {
  if (!isOpen) return null;

  const trackClose = (elementName: string) => {
    pushToDataLayer({
      event: "filter_drawer_close",
      page_name: "services_page",
      section_name: "listing_section",
      element_name: elementName,
      filter_location: "mobile_drawer",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={() => trackClose("filter_drawer_overlay_close")}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
        <div className="sticky top-0 z-10 -mx-5 -mt-5 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
            <p className="mt-1 text-sm text-slate-500">Refine service providers</p>
          </div>

          <button
            type="button"
            onClick={() => trackClose("btn_close_mobile_filters")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-8 py-6">
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

          <section>
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
          </section>

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

        <div className="sticky bottom-0 -mx-5 border-t border-slate-100 bg-white px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                pushToDataLayer({
                  event: "filter_reset",
                  page_name: "services_page",
                  section_name: "listing_section",
                  element_name: "btn_reset_mobile_filters",
                  filter_location: "mobile_drawer",
                });

                onResetAll();
              }}
              className="h-11 rounded-xl border border-slate-300 text-sm font-medium text-slate-700"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                pushToDataLayer({
                  event: "filter_apply",
                  page_name: "services_page",
                  section_name: "listing_section",
                  element_name: "btn_apply_mobile_filters",
                  filter_location: "mobile_drawer",
                });

                onClose();
              }}
              className="h-11 rounded-xl bg-[#1f78d1] text-sm font-medium text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
