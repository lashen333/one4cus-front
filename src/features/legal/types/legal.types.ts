// src\features\legal\types\legal.types.ts
//this file for the all legel page types
export type LegalParagraph = {
  id: string;
  text: string;
};

export type LegalListItem = {
  id: string;
  text: string;
};

export type LegalSubSection = {
  id: string;
  title: string;
  paragraphs?: LegalParagraph[];
  items?: LegalListItem[];
};

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: LegalParagraph[];
  subsections?: LegalSubSection[];
};

export type LegalPageData = {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
};
