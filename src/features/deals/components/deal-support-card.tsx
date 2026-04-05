// src\features\deals\components\deal-support-card.tsx
export function DealSupportCard() {
  return (
    <div className="rounded-2xl border border-[#cfe1f5] bg-[#f6fbff] p-6">
      <h3 className="text-xl font-semibold text-slate-900">Have Questions?</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        Our investment relations team is available to help you understand the risks and rewards.
      </p>

      <button type="button" className="mt-5 text-sm font-semibold text-[#1f78d1] hover:underline">
        Visit Help Center
      </button>
    </div>
  );
}
