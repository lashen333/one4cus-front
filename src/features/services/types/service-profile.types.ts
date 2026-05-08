// src\features\services\types\service-profile.types.ts
export type ServiceParentProvider = {
  id: string;
  name: string;
  avatar: string | null;
  phoneMasked: string;
  whatsappMasked: string;
  city: string;
  district: string;
  province: string;
  location: string;
  description: string;
};

export type ServiceDetailData = {
  id: string;
  slug: string;
  title: string;
  category: string;
  statusLabel: string;
  image: string;

  description: string;
  location: string;
  priceLabel: string;
  availabilityLabel: string;
  warrantyLabel: string;
  experienceLabel: string;

  detailItems: {
    id: string;
    label: string;
    value: string;
  }[];

  provider: ServiceParentProvider;
};
