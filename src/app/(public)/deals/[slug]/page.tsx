import { DealProfilePageView } from "@/features/deals/components/deal-profile-page-view";
import { getDealProfileData } from "@/features/deals/server/get-deal-profile-data";

type DealDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  const { slug } = await params;
  const deal = await getDealProfileData(slug);

  return <DealProfilePageView deal={deal} />;
}
