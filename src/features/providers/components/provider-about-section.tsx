import { PageContainer } from "@/components/layout/page-container";

type ProviderAboutSectionProps = {
  title: string;
  description: string;
};

export function ProviderAboutSection({ title, description }: ProviderAboutSectionProps) {
  return (
    <section className="pb-10">
      <PageContainer>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-[2rem] font-semibold text-slate-900">{title}</h2>

          <p className="mt-5 text-lg leading-9 text-slate-500">{description}</p>
        </div>
      </PageContainer>
    </section>
  );
}
