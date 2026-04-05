// src\features\services\components\services-filters-sidebar.tsx
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

function FilterCheckbox({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
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
    <aside className="w-full max-w-[280px] shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={onResetAll}
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
