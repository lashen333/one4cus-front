// src\features\providers\mocks\provider-profile.mock.ts
import type { ProviderProfileData } from "../types/providers.types";

export const providerProfileMock: ProviderProfileData = {
  slug: "rms-rajapaksha",
  name: "R.M.S.Rajapaksha",
  avatar: "/images/providers/provider-profile-main.jpg",
  phoneMasked: "071xxxxxxx",
  averageRating: 4,
  reviewCount: 124,
  aboutTitle: "About R.M.S.Rajapaksha",
  aboutDescription:
    "Sarah is a highly experienced and reliable home cleaner with over 10 years in the business. She specializes in deep cleaning, eco-friendly practices, and takes pride in leaving every home spotless and fresh. Her attention to detail and commitment to customer satisfaction have earned her a loyal clientele. She's passionate about creating a clean and comfortable living environment for her clients, using only the best products and techniques. Whether it's a regular clean or a one-off deep clean, Sarah ensures impeccable results every time.",
  servicesTitle: "Services Offered",
  reviewsTitle: "Customer Reviews",
  services: [
    {
      id: "service-1",
      title: "Standard Home Cleaning",
      description:
        "Dusting, vacuuming, mopping, kitchen & bathroom cleaning, and general tidying up.",
      priceLabel: "$60/hr",
      ctaLabel: "Book Service",
    },
    {
      id: "service-2",
      title: "Deep Cleaning Service",
      description:
        "Thorough cleaning, including baseboards, windows (interior), appliances (exterior), and detailed grout scrubbing.",
      priceLabel: "$90/hr",
      ctaLabel: "Book Service",
    },
    {
      id: "service-3",
      title: "Eco-Friendly Cleaning",
      description:
        "Using all-natural, non-toxic, and environmentally safe cleaning products for a healthier home.",
      priceLabel: "$70/hr",
      ctaLabel: "Book Service",
    },
    {
      id: "service-4",
      title: "Move-In/Move-Out Cleaning",
      description:
        "Comprehensive cleaning to prepare a home for new occupants or ensure a smooth departure.",
      priceLabel: "$120 (flat fee)",
      ctaLabel: "Book Service",
    },
  ],
  reviews: [
    {
      id: "review-1",
      name: "Emily R.",
      avatar: "/images/reviews/reviewer-1.jpg",
      rating: 5,
      comment:
        "Sarah did an amazing job! My house has never been cleaner. She was punctual, professional, and very thorough. Highly recommend her services!",
      reviewedOn: "Reviewed on October 26, 2023",
    },
    {
      id: "review-2",
      name: "Mark L.",
      avatar: "/images/reviews/reviewer-2.jpg",
      rating: 4,
      comment:
        "Good service overall. Sarah was efficient and the house looked great. There was a minor spot missed in the kitchen, but nothing major. Would use again.",
      reviewedOn: "Reviewed on September 15, 2023",
    },
    {
      id: "review-3",
      name: "Jessica P.",
      avatar: "/images/reviews/reviewer-3.jpg",
      rating: 5,
      comment:
        "Absolutely fantastic! Sarah transformed my apartment. She's incredibly detailed and friendly. Will definitely be booking again.",
      reviewedOn: "Reviewed on August 1, 2023",
    },
    {
      id: "review-4",
      name: "David K.",
      avatar: "/images/reviews/reviewer-4.jpg",
      rating: 5,
      comment:
        "Professional and courteous. Sarah went above and beyond my expectations. My home feels brand new. Thank you!",
      reviewedOn: "Reviewed on July 10, 2023",
    },
  ],
};
