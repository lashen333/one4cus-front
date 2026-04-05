import { ServicesPageView } from "@/features/services/components/services-page-view";
import { getServicesPageData } from "@/features/services/server/get-services-page-data";

export default async function ServicesPage() {
  const data = await getServicesPageData();

  return <ServicesPageView data={data} />;
}
