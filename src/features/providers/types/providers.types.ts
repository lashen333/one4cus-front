// src\features\providers\types\providers.types.ts
export type ProviderServiceItem = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  ctaLabel: string;
};

export type ProviderReviewItem = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  reviewedOn: string;
};

export type ProviderProfileData = {
  slug: string;
  name: string;
  avatar: string;
  phoneMasked: string;
  averageRating: number;
  reviewCount: number;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  reviewsTitle: string;
  services: ProviderServiceItem[];
  reviews: ProviderReviewItem[];
};
