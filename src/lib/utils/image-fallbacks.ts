// src\lib\utils\image-fallbacks.ts

const OTHER_SERVICE_IMAGES = [
  "/images/placeholders/other1.png",
  "/images/placeholders/other2.png",
  "/images/placeholders/other3.png",
  "/images/placeholders/other4.png",
  "/images/placeholders/other5.png",
];

function getStableImageIndex(seed: string, totalImages: number) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash) % totalImages;
}

function getOtherServiceFallbackImage(seed?: string | null) {
  const safeSeed = seed?.trim() || "other-service";
  const imageIndex = getStableImageIndex(safeSeed, OTHER_SERVICE_IMAGES.length);

  return OTHER_SERVICE_IMAGES[imageIndex];
}

export function getServiceFallbackImage(category?: string | null, seed?: string | null) {
  const value = category?.toLowerCase() ?? "";

  if (value.includes("plumb")) return "/images/categories/plumbing.png";
  if (value.includes("clean")) return "/images/categories/cleaning.png";
  if (value.includes("electric")) return "/images/categories/electrical.png";
  if (value.includes("landscap")) return "/images/categories/landscaping.svg";
  if (value.includes("it")) return "/images/categories/it-support.png";
  if (value.includes("carp")) return "/images/categories/carpentry.png";
  if (value.includes("care") || value.includes("caregiver") || value.includes("care giver")) {
    return "/images/categories/caregiver.png";
  }

  return getOtherServiceFallbackImage(seed);
}

export function getDealFallbackImage(category?: string | null) {
  const value = category?.toLowerCase() ?? "";

  if (value.includes("real")) return "/images/categories/real-estate.png";
  if (value.includes("investment")) return "/images/categories/investment.jpg";
  if (value.includes("resource")) return "/images/categories/natural-resources.png";
  if (value.includes("agri")) return "/images/categories/agriculture.png";
  if (value.includes("energy")) return "/images/categories/renewable-energy.png";
  if (value.includes("tourism")) return "/images/categories/tourism.png";
  if (value.includes("tech")) return "/images/categories/tech.jpg";

  return "/images/placeholders/deal.png";
}

export function getProviderInitials(name?: string | null) {
  if (!name) return "P";

  const words = name.trim().split(/\s+/);

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
