import { DealsPageView } from "@/features/deals/components/deal-list/deals-page-view";
import { getDealsPageData } from "@/features/deals/server/get-deals-list-page-data";

export default async function DealsPage() {
  const data = await getDealsPageData();

  return <DealsPageView data={data} />;
}
