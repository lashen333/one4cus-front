// src\features\services\types\services.types.ts
export type ServiceCategory =
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Landscaping"
  | "IT Support"
  | "Carpentry";

export type ProviderStatus = "Verified Professionals" | "Background Checked" | "Licensed & Insured";

export type AvailabilityOption =
  | "Available Today"
  | "Accepting New Clients"
  | "Emergency Services (24/7)";

export type ServiceProviderListItem = {
  id: string;
  slug: string;
  companyName: string;
  serviceTitle: string;
  category: ServiceCategory;
  availabilityLabel: string;
  availabilityState: "available" | "booked";
  image: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  location: string;
  city: string;
  startRateLkr: number;
  pricingUnit: "hour" | "visit" | "work";
  statusTags: ProviderStatus[];
  availabilityTags: AvailabilityOption[];
};

export type ServicesPageData = {
  badge: string;
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  subtitle: string;
  searchPlaceholder: string;
  cityPlaceholder: string;
  resultCount: number;
  items: ServiceProviderListItem[];
  filters: {
    categories: ServiceCategory[];
    ratingOptions: string[];
    providerStatusOptions: ProviderStatus[];
    availabilityOptions: AvailabilityOption[];
  };
};
