// src\app\(public)\deals\page.tsx
import { DealsPageView } from "@/features/deals/components/deal-list/deals-page-view";
import { getDealsPageData } from "@/features/deals/server/get-deals-list-page-data";

type DealsPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
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

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  const data = await getDealsPageData({
    page: parseNumber(params.page, 1),
    limit: parseNumber(params.limit, 12),
    search: params.search,
    categories: parseList(params.category),
    verified: params.verified === "true",
  });

  return <DealsPageView data={data} />;
}
