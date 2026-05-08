// src\app\(public)\services\[slug]\page.tsx
import { ServiceDetailPageView } from "@/features/services/components/service-profile/service-detail-page-view";
import { getServiceDetailData } from "@/features/services/server/get-service-profile-data";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceDetailData(slug);

  return <ServiceDetailPageView service={service} />;
}
