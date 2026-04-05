// src\features\deals\components\deal-profile-page-view.tsx
import { PageContainer } from "@/components/layout/page-container";
import type { DealProfileData } from "../types/deals.types";
import { DealHeroBanner } from "./deal-hero-banner";
import { DealMainContent } from "./deal-main-content";
import { DealSidebar } from "./deal-sidebar";

type DealProfilePageViewProps = {
  deal: DealProfileData;
};

export function DealProfilePageView({ deal }: DealProfilePageViewProps) {
  return (
    <main>
      <DealHeroBanner deal={deal} />

      <section className="py-10">
        <PageContainer>
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <DealMainContent deal={deal} />
            <DealSidebar deal={deal} />
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
