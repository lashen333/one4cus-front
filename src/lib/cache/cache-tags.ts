// src\lib\cache\cache-tags.ts
//this file for Instead of writing string tags everywhere manually,we keep all cache tag names in one safe central file.

export const CACHE_TAGS = {
  home: "home",

  services: "services",
  service: (slug: string) => `service:${slug}`,

  deals: "deals",
  deal: (slug: string) => `deal:${slug}`,

  providers: "providers",
  provider: (slug: string) => `provider:${slug}`,
} as const;
