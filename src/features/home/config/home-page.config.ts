// src\features\home\config\home-page.config.ts
//static data for homepage
import type { HomePageData } from "../types/home.types";

export const homePageStaticConfig: Omit<HomePageData, "servicesSection" | "dealsSection"> = {
  hero: {
    title: "Find Services & Deals Near You",
    subtitle: "Connect with local service providers and discover amazing deals in your area",
    primaryCta: {
      label: "Browse Services/Deals",
      href: "/services",
    },
    secondaryCta: {
      label: "Become a Provider",
      href: "/",
    },
  },
  search: {
    placeholder: "Search for services or deals...",
    buttonLabel: "Search",
    chips: [
      { id: "electricians", label: "Electricians" },
      { id: "plumbers", label: "Plumbers" },
      { id: "gem-mining", label: "Gem Mining" },
      { id: "handymen", label: "Handymen" },
      { id: "tutors", label: "Tutors" },
    ],
  },
};
