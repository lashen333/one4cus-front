// src\features\about\data\about-page.data.ts
import type { AboutPageData } from "../types/about.types";

export const aboutPageData: AboutPageData = {
  hero: {
    eyebrow: "About One4cus",
    title: "Find Services, Deals, and Opportunities",
    highlightedText: "Near You",
    description:
      "One4cus is built to make it easier for people to discover trusted services, great deals, and new opportunities all in one place.",
  },
  story: {
    title: "Why One4cus Exists",
    paragraphs: [
      "We understand how difficult and time-consuming it can be to search for reliable service providers or genuine opportunities.",
      "That’s why One4cus was built — to connect customers with verified professionals and businesses in a simple, convenient, and trustworthy way.",
      "Whether you are looking for local services, special deals, or investment opportunities, One4cus helps you discover the right options with confidence.",
      "Our goal is to support both customers and service providers by creating a platform where everyone can connect, grow, and succeed together.",
    ],
  },
  mission: {
    title: "Our Mission",
    description:
      "At One4cus, we believe technology should make everyday life easier while helping local businesses and communities grow stronger.",
  },
  values: {
    title: "What We Focus On",
    subtitle: "One4cus is designed around trust, simplicity, and meaningful local connections.",
    items: [
      {
        id: "trusted-connections",
        title: "Trusted Connections",
        description:
          "We help users discover service providers, businesses, and opportunities with more confidence.",
      },
      {
        id: "simple-discovery",
        title: "Simple Discovery",
        description:
          "Users can browse services, deals, and opportunities from one easy-to-use platform.",
      },
      {
        id: "local-growth",
        title: "Local Growth",
        description:
          "We support service providers and businesses by helping them reach more customers and grow their presence.",
      },
    ],
  },
  cta: {
    title: "Start Exploring One4cus",
    description:
      "Find trusted services, discover useful deals, and explore new opportunities near you.",
    primaryLabel: "Browse Services",
    primaryHref: "/services",
    secondaryLabel: "Browse Deals",
    secondaryHref: "/deals",
  },
};
