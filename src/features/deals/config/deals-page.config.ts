// src\features\deals\config\deals-page.config.ts
import type { DealsListingPageData } from "../types/deals-list.types";

export const dealsPageStaticConfig: Omit<
  DealsListingPageData,
  "items" | "resultCount" | "pagination"
> = {
  hero: {
    badge: "Opportunities Available",
    title: {
      prefix: "Invest in the Future of",
      highlight: "Sri Lanka",
    },
    subtitle:
      "Discover verified, high-impact investment opportunities across real estate, green energy, and emerging tech sectors. Grow your portfolio with confidence.",
    primaryCtaLabel: "Explore All Deals",
    secondaryCtaLabel: "How it Works",
    heroImage: "/home/deals/deals-hero.webp",
    heroMetricValue: "14.8%",
    heroMetricLabel: "Avg. Yearly Return",
  },
  filters: {
    categories: [
      "Investment",
      "Real Estate",
      "Natural Resources",
      "Startups / Tech",
      "Agriculture / Export",
      "Renewable Energy",
      "Tourism / Hospitality",
      "Other",
    ],
    fundingStatuses: ["Open for investment", "Fully funded", "Closed", "Coming soon"],
    riskLevels: ["Low Risk", "Medium Risk", "High Risk"],
    minimumInvestments: ["Under LKR 100,000", "100K – 250K", "250K – 500K", "500K+"],
    dealTypes: ["Fixed Return", "Revenue Share", "Equity", "Profit Share"],
    roiRange: {
      min: 10,
      max: 60,
      selectedMin: 10,
      selectedMax: 40,
    },
  },
  sortOptions: ["Highest ROI", "Lowest Investment", "Newest", "Most Funded"],
};
