// src\features\home\types\home.types.ts
export type HomeHero = {
    title:string;
    subtitle:string;
    primaryActionLabel:string;
    secondaryActionLabel:string;
};

export type HomePageData = {
    hero: HomeHero;
};