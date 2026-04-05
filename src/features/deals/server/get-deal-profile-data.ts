// src\features\deals\server\get-deal-profile-data.ts
import { dealProfileMock } from "../mocks/deal-profile.mock";

export async function getDealProfileData(slug: string) {
  return {
    ...dealProfileMock,
    slug,
  };
}
