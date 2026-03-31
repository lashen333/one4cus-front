// src\features\home\server\get-home-page-data.ts
import { homePageMock } from "../mocks/home-page.mock";

export async function getHomePageData() {
  return homePageMock;
}