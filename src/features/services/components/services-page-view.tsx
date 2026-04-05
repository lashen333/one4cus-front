// src\features\services\components\services-page-view.tsx
import type { ServicesPageData } from "../types/services.types";
import { ServicesListClient } from "./services-list-client";

type ServicesPageViewProps = {
  data: ServicesPageData;
};

export function ServicesPageView({ data }: ServicesPageViewProps) {
  return <ServicesListClient data={data} />;
}
