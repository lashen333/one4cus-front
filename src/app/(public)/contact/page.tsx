// src\app\(public)\contact\page.tsx

import { PageContainer } from "@/components/layout/page-container";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ContactPageTracker } from "./contact-page-tracker";

export const metadata = {
  title: "Contact Us | One4cus",
  description: "Contact the One4cus team for support, inquiries, and assistance.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactPageTracker />

      <section className="bg-[#f3f8fc] py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[#cfe1f5] bg-white px-4 py-2 text-sm font-semibold text-[#1f78d1]">
              Contact One4cus
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              We’re here to help
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Have a question about services, deals, opportunities, or provider listings? Contact
              the One4cus team and we’ll get back to you.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="py-14 md:py-20">
        <PageContainer>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#e6f0fb] text-[#1f78d1]">
                <Mail className="size-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">Email Support</h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">Send us your inquiry anytime.</p>

              <Link
                href="mailto:one4cus.support@gmail.com"
                data-analytics-event="contact_link_click"
                data-page-name="contact_us_page"
                data-section-name="hero_section"
                data-element-name="email_link_click"
                data-link-label="one4cus.support@gmail.com"
                data-link-href="mailto:one4cus.support@gmail.com"
                data-contact-method="email"
                className="mt-4 inline-flex text-sm font-semibold text-[#1f78d1] hover:underline"
              >
                one4cus.support@gmail.com
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#e6f0fb] text-[#1f78d1]">
                <MessageCircle className="size-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">General Inquiries</h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                For provider listings, business opportunities, and platform questions.
              </p>

              <p className="mt-4 text-sm font-semibold text-slate-800">Response time may vary</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#e6f0fb] text-[#1f78d1]">
                <MapPin className="size-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">Location</h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                One4cus currently supports users, service providers, and businesses in Sri Lanka.
              </p>

              <p className="mt-4 text-sm font-semibold text-slate-800">Sri Lanka</p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#1f78d1] px-6 py-10 text-center md:px-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Need help finding a service or opportunity?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-50 md:text-base">
              Explore trusted services and available deals on One4cus, or contact us if you need
              help understanding how the platform works.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/services"
                data-analytics-event="click_section_cta"
                data-page-name="contact_us_page"
                data-section-name="hero_section"
                data-element-name="btn_browse_services_contact"
                data-cta-label="Browse Services"
                data-cta-href="/services"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#1f78d1] transition hover:bg-blue-50"
              >
                Browse Services
              </Link>

              <Link
                href="/deals"
                data-analytics-event="click_section_cta"
                data-page-name="contact_us_page"
                data-section-name="hero_section"
                data-element-name="btn_browse_deals_contact"
                data-cta-label="Browse Deals"
                data-cta-href="/deals"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/50 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Deals
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
