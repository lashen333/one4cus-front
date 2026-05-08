// src\features\services\components\service-profile\service-detail-page-view.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { ServiceDetailData } from "../../types/service-profile.types";
import { ServiceDetailHero } from "./service-detail-hero";
import { ServiceDetailsGrid } from "./service-details-grid";
import { ServiceProviderSidebar } from "./service-provider-sidebar";

type ServiceDetailPageViewProps = {
  service: ServiceDetailData;
};

export function ServiceDetailPageView({ service }: ServiceDetailPageViewProps) {
  return (
    <main className="bg-white">
      <section className="py-12">
        <PageContainer>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-8">
              <ServiceDetailHero service={service} />

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">About this service</h2>

                <p className="mt-4 text-base leading-8 text-slate-600">{service.description}</p>
              </section>

              <ServiceDetailsGrid items={service.detailItems} />

              <section className="rounded-2xl border border-slate-200 bg-[#eef5fb] p-6">
                <h2 className="text-2xl font-semibold text-slate-900">Provider Information</h2>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  {service.provider.description}
                </p>
              </section>
            </div>

            <ServiceProviderSidebar service={service} />
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
