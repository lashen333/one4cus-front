// src\app\(public)\terms-and-conditions\page.tsx
import { LegalPageLayout } from "@/features/legal/components/legal-page-layout";
import { termsAndConditionsData } from "@/features/legal/data/terms-and-conditions.data";

export const metadata = {
  title: "Terms and Conditions | One4cus",
  description: "Read the Terms and Conditions for using the One4cus platform.",
};

export default function TermsAndConditionsPage() {
  return <LegalPageLayout data={termsAndConditionsData} />;
}
