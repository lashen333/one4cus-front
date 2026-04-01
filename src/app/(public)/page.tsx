// src\app\(public)\page.tsx
import { HomePageView } from "@/features/home/components/home-page-view";
import { getHomePageData } from "@/features/home/server/get-home-page-data";

export default async function HomePage() {
  const data = await getHomePageData();

  return <HomePageView data={data} />;
}