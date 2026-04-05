// src\features\deals\mocks\deal-profile.mock.ts
import type { DealProfileData } from "../types/deals.types";

export const dealProfileMock: DealProfileData = {
  slug: "gem-mining-ratnapura-project",
  statusLabel: "Active Offering",
  statusSubLabel: "Verified by Mineral Authority",
  title: "Gem Mining Investment – Ratnapura Project",
  location: "Ratnapura, Sri Lanka",
  projectedRoi: "18% - 30% Projected ROI",
  heroImage: "/images/deals/detail/deal-hero.jpg",

  riskProfile: "MEDIUM",
  expectedReturns: "18% - 30%",
  minimumEntry: "LKR 250,000",

  investmentTerm: "6 Months (Project-based)",
  entryLevel: "LKR 250,000",
  fundingRaised: "LKR 7,800,000",
  fundingGoal: "LKR 12,000,000",
  fundingProgress: 65,

  overviewTitle: "Opportunity Overview",
  overviewParagraphs: [
    `Invest in a licensed gem mining operation in the heart of Ratnapura, the "City of Gems." This project focuses on Sapphire mining in the Moatcong district, known for its high-concentration gem-bearing gravel (illam) found at depths of 10-15 meters.`,
    `The primary area of focus has already yielded significant industrial-grade corundum in initial test pits. Our team utilizes a combination of traditional pit mining techniques and modern sorting technology to maximize yield while minimizing environmental impact. Ratnapura has historically been the source of some of the world's most famous blue sapphires, and this specific claim has been geologically surveyed with promising results.`,
  ],

  detailItems: [
    { id: "1", label: "Duration", value: "6 Months (Project-based)" },
    { id: "2", label: "Expected ROI", value: "18% to 30%" },
    { id: "3", label: "Minimum Investment", value: "LKR 250,000" },
    { id: "4", label: "Location", value: "Ratnapura, Sri Lanka" },
    { id: "5", label: "Asset Type", value: "Direct Equity Participation" },
    { id: "6", label: "Payout Frequency", value: "Post-Auction Disposal" },
  ],

  highlights: [
    {
      id: "1",
      title: "Funding Goal",
      description: "Aiming for LKR 12M to complete the Phase 2 extraction cycle.",
    },
    {
      id: "2",
      title: "Profit Sharing",
      description: "Investors receive dividends immediately following the quarterly gem auction.",
    },
    {
      id: "3",
      title: "High Potential",
      description: "Site geological data shows potential for high-grade blue sapphires.",
    },
    {
      id: "4",
      title: "Transparency",
      description:
        "Detailed monthly reports with photos and yield audits sent to all participants.",
    },
  ],

  gallery: [
    {
      id: "1",
      image: "/images/deals/detail/gallery-1.jpg",
      alt: "Gem sorting process",
    },
    {
      id: "2",
      image: "/images/deals/detail/gallery-2.jpg",
      alt: "Mining site equipment",
    },
    {
      id: "3",
      image: "/images/deals/detail/gallery-3.jpg",
      alt: "Finished gemstone display",
    },
    {
      id: "4",
      image: "/images/deals/detail/gallery-4.jpg",
      alt: "Gallery placeholder",
    },
  ],

  owner: {
    name: "Sunil Perera",
    role: "Managing Director",
    company: "Ratnapura Minerals Ltd",
    avatar: "/images/deals/detail/owner.jpg",
    phoneMasked: "071 xxxxxxx",
    description:
      "Sunil has over 22 years of experience in the Sri Lankan gemstone sector and has successfully managed 14 previous extraction projects.",
  },
};
