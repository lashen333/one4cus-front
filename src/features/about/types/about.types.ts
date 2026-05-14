// src\features\about\types\about.types.ts
export type AboutValueItem = {
  id: string;
  title: string;
  description: string;
};

export type AboutPageData = {
  hero: {
    eyebrow: string;
    title: string;
    highlightedText: string;
    description: string;
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    subtitle: string;
    items: AboutValueItem[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};
