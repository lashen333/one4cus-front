// src\features\providers\components\provider-services-section.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { ProviderServiceItem } from "../types/providers.types";
import { ProviderServiceCard } from "./provider-service-card";

type ProviderServicesSectionProps = {
  title: string;
  items: ProviderServiceItem[];
};

export function ProviderServicesSection({ title, items }: ProviderServicesSectionProps) {
  return (
    <section className="pb-14">
      <PageContainer>
        <h2 className="text-[2.5rem] font-semibold text-slate-900">{title}</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ProviderServiceCard key={item.id} item={item} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
