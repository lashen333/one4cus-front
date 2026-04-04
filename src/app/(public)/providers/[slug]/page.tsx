// src\app\(public)\providers\[slug]\page.tsx
import { ProviderProfilePageView } from "@/features/providers/components/provider-profile-page-view";
import { getProviderProfileData } from "@/features/providers/server/get-provider-profile-data";

type ProviderDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { slug } = await params;
  const provider = await getProviderProfileData(slug);

  return <ProviderProfilePageView provider={provider} />;
}
