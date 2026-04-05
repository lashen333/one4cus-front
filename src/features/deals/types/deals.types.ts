// src\features\deals\types\deals.types.ts
export type DealStatItem = {
  id: string;
  label: string;
  value: string;
};

export type DealHighlightItem = {
  id: string;
  title: string;
  description: string;
};

export type DealGalleryItem = {
  id: string;
  image: string;
  alt: string;
};

export type DealOwner = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  phoneMasked: string;
  description: string;
};

export type DealProfileData = {
  slug: string;
  statusLabel: string;
  statusSubLabel: string;
  title: string;
  location: string;
  projectedRoi: string;
  heroImage: string;

  riskProfile: string;
  expectedReturns: string;
  minimumEntry: string;

  investmentTerm: string;
  entryLevel: string;
  fundingRaised: string;
  fundingGoal: string;
  fundingProgress: number;

  overviewTitle: string;
  overviewParagraphs: string[];

  detailItems: DealStatItem[];
  highlights: DealHighlightItem[];
  gallery: DealGalleryItem[];

  owner: DealOwner;
};
