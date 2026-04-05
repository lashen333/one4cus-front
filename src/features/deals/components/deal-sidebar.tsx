// src\features\deals\components\deal-sidebar.tsx
import type { DealProfileData } from "../types/deals.types";
import { DealInvestmentOverviewCard } from "./deal-investment-overview-card";
import { DealKeyHighlightsCard } from "./deal-key-highlights-card";
import { DealOwnerCard } from "./deal-owner-card";
import { DealSupportCard } from "./deal-support-card";

type DealSidebarProps = {
  deal: DealProfileData;
};

export function DealSidebar({ deal }: DealSidebarProps) {
  return (
    <aside className="space-y-6">
      <DealInvestmentOverviewCard deal={deal} />
      <DealKeyHighlightsCard />
      <DealOwnerCard owner={deal.owner} />
      <DealSupportCard />
    </aside>
  );
}
