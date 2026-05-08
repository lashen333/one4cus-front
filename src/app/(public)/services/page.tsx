// src\app\(public)\services\page.tsx
import { ServicesPageView } from "@/features/services/components/service-list/services-page-view";
import { getServicesPageData } from "@/features/services/server/get-services-list-page-data";

export default async function ServicesPage() {
  const data = await getServicesPageData();

  return <ServicesPageView data={data} />;
}
