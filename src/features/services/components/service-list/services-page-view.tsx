// src\features\services\components\service-list\services-page-view.tsx
import type { ServicesPageData } from "../../types/services-list.types";
import { ServicesListClient } from "./services-list-client";

type ServicesPageViewProps = {
  data: ServicesPageData;
};

export function ServicesPageView({ data }: ServicesPageViewProps) {
  return <ServicesListClient data={data} />;
}
