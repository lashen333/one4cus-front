// src\features\deals\server\get-deals-list-page-data.ts
import { dealsListMock } from "../mocks/deals-list.mock";

export async function getDealsPageData() {
  return dealsListMock;
}
