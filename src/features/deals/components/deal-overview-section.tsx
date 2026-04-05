// src\features\deals\components\deal-overview-section.tsx
type DealOverviewSectionProps = {
  title: string;
  paragraphs: string[];
};

export function DealOverviewSection({ title, paragraphs }: DealOverviewSectionProps) {
  return (
    <section className="pt-8">
      <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>

      <div className="mt-6 space-y-6 text-lg leading-9 text-slate-500">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
