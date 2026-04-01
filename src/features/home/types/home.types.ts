export type HeroContent = {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export type SearchChip = {
  id: string;
  label: string;
};

export type ProviderItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  phone: string;
  image: string;
  profileHref: string;
};

export type DealItem = {
  id: string;
  title: string;
  description: string;
  raisedLabel: string;
  targetLabel: string;
  raisedValue: number;
  targetValue: number;
  image: string;
  href: string;
};

export type HomePageData = {
  hero: HeroContent;
  search: {
    placeholder: string;
    buttonLabel: string;
    chips: SearchChip[];
  };
  servicesSection: {
    title: string;
    ctaLabel: string;
    ctaHref: string;
    items: ProviderItem[];
  };
  dealsSection: {
    title: string;
    ctaLabel: string;
    ctaHref: string;
    items: DealItem[];
  };
};