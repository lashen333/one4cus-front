// src\features\providers\components\provider-profile-page-view.tsx
import type { ProviderProfileData } from "../types/providers.types";
import { ProviderAboutSection } from "./provider-about-section";
import { ProviderProfileHero } from "./provider-profile-hero";
import { ProviderReviewsSection } from "./provider-reviews-section";
import { ProviderServicesSection } from "./provider-services-section";

type ProviderProfilePageViewProps = {
  provider: ProviderProfileData;
};

export function ProviderProfilePageView({ provider }: ProviderProfilePageViewProps) {
  return (
    <main>
      <ProviderProfileHero provider={provider} />
      <ProviderAboutSection title={provider.aboutTitle} description={provider.aboutDescription} />
      <ProviderServicesSection title={provider.servicesTitle} items={provider.services} />
      <ProviderReviewsSection title={provider.reviewsTitle} items={provider.reviews} />
    </main>
  );
}
