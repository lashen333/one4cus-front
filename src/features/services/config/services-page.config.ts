// src\features\services\config\services-page.config.ts
import type { ServicesPageData } from "../types/services-list.types";

export const servicesPageStaticConfig: Omit<ServicesPageData, "items" | "pagination"> = {
  badge: "Over 10,000 Verified Professionals",
  title: {
    prefix: "Find the Perfect",
    highlight: "Service Provider",
    suffix: "for Your Needs",
  },
  subtitle:
    "Connect with top-rated local professionals. From plumbing to IT support, discover verified experts ready to help you today.",
  searchPlaceholder: "What service are you looking for?",
  cityPlaceholder: "Zip or City",
  resultCount: 0,
  filters: {
    categories: [
      "Plumbing",
      "Electrical",
      "Cleaning",
      "Landscaping",
      "IT Support",
      "Carpentry",
      "Caregiver",
      "Consulting",
      "Architectural Design",
      "Other",
    ],
    ratingOptions: ["5.0", "4.0 & Up", "3.0 & Up"],
    providerStatusOptions: ["Verified Professionals", "Background Checked", "Licensed & Insured"],
    availabilityOptions: ["Available Today", "Accepting New Clients", "Emergency Services (24/7)"],
  },
};
