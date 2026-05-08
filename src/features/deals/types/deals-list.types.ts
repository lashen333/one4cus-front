// src\features\deals\types\deals-list.types.ts
export type DealCategory =
  | "Investment"
  | "Real Estate"
  | "Natural Resources"
  | "Startups / Tech"
  | "Agriculture / Export"
  | "Renewable Energy"
  | "Tourism / Hospitality";

export type FundingStatus = "Open for investment" | "Fully funded" | "Closed" | "Coming soon";

export type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk";

export type MinimumInvestmentOption = "Under LKR 100,000" | "100K – 250K" | "250K – 500K" | "500K+";

export type DealType = "Fixed Return" | "Revenue Share" | "Equity" | "Profit Share";

export type DealListItem = {
  id: string;
  slug: string;
  title: string;
  location: string;
  estRoi: string;
  duration: string;
  dealType: string;
  category: DealCategory;
  minimumInvestment: string;
  raised: string;
  target: string;
  progress: number;
  verified: boolean;
  riskLevel: RiskLevel;
  fundingStatus: FundingStatus;
  image: string;
};

export type DealsListingPageData = {
  hero: {
    badge: string;
    title: {
      prefix: string;
      highlight: string;
    };
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    heroImage: string;
    heroMetricValue: string;
    heroMetricLabel: string;
  };
  filters: {
    categories: DealCategory[];
    fundingStatuses: FundingStatus[];
    riskLevels: RiskLevel[];
    minimumInvestments: MinimumInvestmentOption[];
    dealTypes: DealType[];
    roiRange: {
      min: number;
      max: number;
      selectedMin: number;
      selectedMax: number;
    };
  };
  sortOptions: string[];
  items: DealListItem[];
};
