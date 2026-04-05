// src\features\services\components\services-active-filters.tsx
type ServicesActiveFiltersProps = {
  selectedCategories: string[];
  selectedRating: string[];
  onRemoveCategory: (value: string) => void;
  onRemoveRating: (value: string) => void;
  onClearAll: () => void;
};

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
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
          onRemove={() => onRemoveCategory(item)}
        />
      ))}

      {selectedRating.map((item) => (
        <FilterChip key={item} label={`Rating: ${item}`} onRemove={() => onRemoveRating(item)} />
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-sm font-medium text-[#1f78d1] hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
