// src\lib\config\site.ts
export const siteConfig = {
  name: "One4Cus",
  description: "Marketplace for services and deals",

  branding: {
    logo: "/logo.svg",
  },

  nav: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Deals",
      href: "/deals",
    },
  ],

  footer: {
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy",
      },
      {
        label: "Terms of Service",
        href: "/terms",
      },
    ],
  },

  social: {
    twitter: "",
    facebook: "",
    instagram: "",
  },
} as const;
