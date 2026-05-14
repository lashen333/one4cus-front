// src\app\(public)\about\page.tsx
import { AboutPageView } from "@/features/about/components/about-page-view";
import { aboutPageData } from "@/features/about/data/about-page.data";

export const metadata = {
  title: "About Us | One4cus",
  description:
    "Learn about One4cus, a platform built to help people find trusted services, deals, and opportunities near them.",
};

export default function AboutPage() {
  return <AboutPageView data={aboutPageData} />;
}
