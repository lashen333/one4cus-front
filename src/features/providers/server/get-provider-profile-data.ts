// src\features\providers\server\get-provider-profile-data.ts
import { providerProfileMock } from "../mocks/provider-profile.mock";

export async function getProviderProfileData(slug: string) {
  return {
    ...providerProfileMock,
    slug,
  };
}
