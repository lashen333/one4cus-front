// src\features\deals\components\deal-list\deals-mobile-filters-drawer.tsx
// src/features/deals/components/deal-list/deals-mobile-filters-drawer.tsx
import { X } from "lucide-react";

type DealsMobileFiltersDrawerProps = {
  isOpen: boolean;
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
  onCategoryToggle: (value: string) => void;
  onFundingStatusToggle: (value: string) => void;
  onRiskLevelToggle: (value: string) => void;
  onMinimumInvestmentToggle: (value: string) => void;
  onDealTypeToggle: (value: string) => void;
  onResetAll: () => void;
  onClose: () => void;
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

export function DealsMobileFiltersDrawer({
  isOpen,
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
  onCategoryToggle,
  onFundingStatusToggle,
  onRiskLevelToggle,
  onMinimumInvestmentToggle,
  onDealTypeToggle,
  onResetAll,
  onClose,
}: DealsMobileFiltersDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
        <div className="sticky top-0 z-10 -mx-5 -mt-5 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
            <p className="mt-1 text-sm text-slate-500">Refine investment opportunities</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-8 py-6">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Investment Category
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
              Funding Status
            </h3>
            <div className="mt-4 space-y-3">
              {fundingStatuses.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  checked={selectedFundingStatuses.includes(item)}
                  onToggle={() => onFundingStatusToggle(item)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">Risk Level</h3>
            <div className="mt-4 space-y-3">
              {riskLevels.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  checked={selectedRiskLevels.includes(item)}
                  onToggle={() => onRiskLevelToggle(item)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Minimum Investment
            </h3>
            <div className="mt-4 space-y-3">
              {minimumInvestments.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  checked={selectedMinimumInvestments.includes(item)}
                  onToggle={() => onMinimumInvestmentToggle(item)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">Deal Type</h3>
            <div className="mt-4 space-y-3">
              {dealTypes.map((item) => (
                <FilterCheckbox
                  key={item}
                  label={item}
                  checked={selectedDealTypes.includes(item)}
                  onToggle={() => onDealTypeToggle(item)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 -mx-5 border-t border-slate-100 bg-white px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onResetAll}
              className="h-11 rounded-xl border border-slate-300 text-sm font-medium text-slate-700"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={onClose}
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
