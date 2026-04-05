// src\features\deals\components\deal-tabs.tsx
const tabs = ["Project Overview", "Investor Materials", "Live Updates", "Investors (253)", "FAQs"];

export function DealTabs() {
  return (
    <div className="border-b border-slate-200">
      <div className="flex flex-wrap items-center gap-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={
              index === 0
                ? "border-b-2 border-[#1f78d1] pb-4 text-sm font-semibold text-[#1f78d1]"
                : "pb-4 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            }
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
