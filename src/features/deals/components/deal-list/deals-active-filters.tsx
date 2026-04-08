// src\features\deals\components\deal-list\deals-active-filters.tsx
type DealsActiveFiltersProps = {
  selectedCategories: string[];
  selectedRiskLevels: string[];
  onRemoveCategory: (value: string) => void;
  onRemoveRiskLevel: (value: string) => void;
};

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
    >
      {label}
      <span className="ml-2">×</span>
    </button>
  );
}

export function DealsActiveFilters({
  selectedCategories,
  selectedRiskLevels,
  onRemoveCategory,
  onRemoveRiskLevel,
}: DealsActiveFiltersProps) {
  const hasFilters = selectedCategories.length > 0 || selectedRiskLevels.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedCategories.map((item) => (
        <Chip key={item} label={item} onRemove={() => onRemoveCategory(item)} />
      ))}

      {selectedRiskLevels.map((item) => (
        <Chip key={item} label={item} onRemove={() => onRemoveRiskLevel(item)} />
      ))}
    </div>
  );
}
