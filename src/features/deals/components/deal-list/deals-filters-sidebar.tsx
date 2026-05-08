// src\features\deals\components\deal-list\deals-filters-sidebar.tsx
type DealsFiltersSidebarProps = {
  categories: string[];
  fundingStatuses: string[];
  riskLevels: string[];
  minimumInvestments: string[];
  dealTypes: string[];
  selectedCategories: string[];
  selectedFundingStatuses: string[];
  selectedRiskLevels: string[];
  selectedMinimumInvestments: string[];
  selectedDealTypes: string[];
  roiMin: number;
  roiMax: number;
  onCategoryToggle: (value: string) => void;
  onFundingStatusToggle: (value: string) => void;
  onRiskLevelToggle: (value: string) => void;
  onMinimumInvestmentToggle: (value: string) => void;
  onDealTypeToggle: (value: string) => void;
  onRoiMinChange: (value: number) => void;
  onRoiMaxChange: (value: number) => void;
  onApplyFilters: () => void;
  onClearAll: () => void;
};

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded border-slate-300"
      />
      <span>{label}</span>
    </label>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200 pb-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">{title}</h3>
        <span className="text-slate-400">⌄</span>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function DealsFiltersSidebar({
  categories,
  fundingStatuses,
  riskLevels,
  minimumInvestments,
  dealTypes,
  selectedCategories,
  selectedFundingStatuses,
  selectedRiskLevels,
  selectedMinimumInvestments,
  selectedDealTypes,
  roiMin,
  roiMax,
  onCategoryToggle,
  onFundingStatusToggle,
  onRiskLevelToggle,
  onMinimumInvestmentToggle,
  onDealTypeToggle,
  onRoiMinChange,
  onRoiMaxChange,
  onApplyFilters,
  onClearAll,
}: DealsFiltersSidebarProps) {
  return (
    <aside className="hidden w-full max-w-70 shrink-0 xl:block">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-medium text-[#1f78d1] hover:underline"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <FilterSection title="Investment Category">
            {categories.map((item) => (
              <FilterCheckbox
                key={item}
                label={item}
                checked={selectedCategories.includes(item)}
                onChange={() => onCategoryToggle(item)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Funding Status">
            {fundingStatuses.map((item) => (
              <FilterCheckbox
                key={item}
                label={item}
                checked={selectedFundingStatuses.includes(item)}
                onChange={() => onFundingStatusToggle(item)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Risk Level">
            {riskLevels.map((item) => (
              <FilterCheckbox
                key={item}
                label={item}
                checked={selectedRiskLevels.includes(item)}
                onChange={() => onRiskLevelToggle(item)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Expected ROI Range">
            <div className="space-y-4">
              <div className="rounded-full bg-[#e6f0fb] px-3 py-1 text-xs font-semibold text-[#1f78d1]">
                {roiMin}% - {roiMax}%
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-500">Min ROI</label>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={roiMin}
                  onChange={(e) => onRoiMinChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-500">Max ROI</label>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={roiMax}
                  onChange={(e) => onRoiMaxChange(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Minimum Investment">
            {minimumInvestments.map((item) => (
              <FilterCheckbox
                key={item}
                label={item}
                checked={selectedMinimumInvestments.includes(item)}
                onChange={() => onMinimumInvestmentToggle(item)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Deal Type">
            {dealTypes.map((item) => (
              <FilterCheckbox
                key={item}
                label={item}
                checked={selectedDealTypes.includes(item)}
                onChange={() => onDealTypeToggle(item)}
              />
            ))}
          </FilterSection>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={onApplyFilters}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1f78d1] px-4 text-sm font-medium text-white transition hover:bg-[#1768b7]"
          >
            Apply Search Filters
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#1f78d1] px-4 text-sm font-medium text-[#1f78d1] transition hover:bg-blue-50"
          >
            Clear All
          </button>
        </div>
      </div>
    </aside>
  );
}
