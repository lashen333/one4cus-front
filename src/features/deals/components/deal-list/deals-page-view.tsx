// src\features\deals\components\deal-list\deals-page-view.tsx
import type { DealsListingPageData } from "../../types/deals-list.types";
import { DealsListClient } from "./deals-list-client";

type DealsPageViewProps = {
  data: DealsListingPageData;
};

export function DealsPageView({ data }: DealsPageViewProps) {
  return <DealsListClient data={data} />;
}
