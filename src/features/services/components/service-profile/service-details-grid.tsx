// src\features\services\components\service-profile\service-details-grid.tsx
type ServiceDetailItem = {
  id: string;
  label: string;
  value: string;
};

type ServiceDetailsGridProps = {
  items: ServiceDetailItem[];
};

export function ServiceDetailsGrid({ items }: ServiceDetailsGridProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Service Details</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="border-b border-slate-100 pb-4">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
