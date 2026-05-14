// src\app\(public)\privacy-policy\page.tsx
import { LegalPageLayout } from "@/features/legal/components/legal-page-layout";
import { privacyPolicyData } from "@/features/legal/data/privacy-policy.data";

export const metadata = {
  title: "Privacy Policy | One4cus",
  description: "Read the Privacy Policy for using the One4cus platform.",
};

export default function PrivacyPolicyPage() {
  return <LegalPageLayout data={privacyPolicyData} />;
}
