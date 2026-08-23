// src\app\(public)\services\page.tsx
import { ServicesPageView } from "@/features/services/components/service-list/services-page-view";
import { getServicesPageData } from "@/features/services/server/get-services-list-page-data";

type ServicesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    city?: string;
    category?: string;
    verified?: string;
  }>;
};

function parseNumber(value: string | undefined, fallback: number) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 1) {
    return fallback;
  }

  return number;
}

function parseList(value: string | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;

  const data = await getServicesPageData({
    page: parseNumber(params.page, 1),
    limit: parseNumber(params.limit, 12),
    search: params.search,
    city: params.city,
    categories: parseList(params.category),
    verified: params.verified === "true",
  });

  return <ServicesPageView data={data} />;
}
