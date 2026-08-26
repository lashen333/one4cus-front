// src\components\layout\site-header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LeadFormModal } from "@/features/home/components/lead-form-modal";
import { pushToDataLayer } from "@/lib/analytics/gtm";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PageContainer } from "./page-container";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Deals", href: "/deals" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"provider" | "signup" | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const pathname = usePathname();

  const trackHeaderNavClick = (
    item: { label: string; href: string },
    location: "desktop_header" | "mobile_header",
  ) => {
    pushToDataLayer({
      event: "click_header_nav",
      element_name: `nav_${item.label.toLowerCase()}`,
      nav_label: item.label,
      nav_href: item.href,
      nav_location: location,
    });
  };

  const openLeadForm = (
    formType: "provider" | "signup",
    location: "desktop_header" | "mobile_header",
  ) => {
    pushToDataLayer({
      event: "click_header_cta",
      element_name: formType === "provider" ? "btn_service_provider" : "btn_signup",
      cta_label: formType === "provider" ? "List My Services/Deals" : "Sign Up",
      form_type: formType,
      nav_location: location,
    });

    setActiveForm(formType);
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        {/* Added `relative` here so absolute positioning on the nav targets this container */}
        <PageContainer className="relative flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 flex items-center"
            onClick={() => {
              pushToDataLayer({
                event: "click_header_logo",
                element_name: "nav_logo",
                nav_href: "/",
                nav_location: "desktop_header",
              });
              closeMobileMenu();
            }}
          >
            <Image
              src="/layout/Logo.png"
              alt="one4cus logo"
              width={120}
              height={40}
              priority
              className="h-22 w-auto sm:h-22 md:h-25 object-contain"
            />
          </Link>

          {/* Centered navigation pill using absolute positioning */}
          <nav className="hidden rounded-full bg-[#1c75bc] p-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:items-center lg:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => trackHeaderNavClick(item, "desktop_header")}
                  className={
                    isActive
                      ? "rounded-full bg-white px-5 py-2 text-sm font-medium text-[#1677c8]"
                      : "rounded-full px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <Button
              type="button"
              variant="secondary"
              className="h-10"
              onClick={() => openLeadForm("provider", "desktop_header")}
            >
              {" "}
              {/*href="" want to use type="button" disabled*/}
              List My Services/Deals
            </Button>

            {/*<Link
            href=""
            onClick={() => {
              pushToDataLayer({
                event: "click_header_login",
                nav_location: "desktop_header",
              });
            }}
            className="font-medium text-slate-700 transition hover:text-slate-900"
          >
            Login
          </Link>*/}

            <Button
              type="button"
              className="h-10"
              onClick={() => openLeadForm("signup", "desktop_header")}
            >
              Sign Up
            </Button>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              pushToDataLayer({
                event: isMobileMenuOpen ? "close_mobile_menu" : "open_mobile_menu",
                element_name: isMobileMenuOpen ? "btn_close_mobile_menu" : "btn_open_mobile_menu",
                nav_location: "mobile_header",
              });
              setIsMobileMenuOpen((prev) => !prev);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </PageContainer>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white shadow-sm lg:hidden">
            <PageContainer className="py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        trackHeaderNavClick(item, "mobile_header");
                        closeMobileMenu();
                      }}
                      className={
                        isActive
                          ? "rounded-xl bg-[#1677c8] px-4 py-3 text-sm font-medium text-white"
                          : "rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="h-11 w-full"
                  onClick={() => openLeadForm("provider", "mobile_header")}
                >
                  List My Services/Deals
                </Button>

                {/*<Link
                href=""
                onClick={() => {
                  pushToDataLayer({
                    event: "click_header_login",
                    nav_location: "mobile_header",
                  });
                  closeMobileMenu();
                }}
                className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>*/}

                <Button
                  type="button"
                  className="h-11 w-full"
                  onClick={() => openLeadForm("signup", "mobile_header")}
                >
                  Sign Up
                </Button>
              </div>
            </PageContainer>
          </div>
        )}
      </header>

      {activeForm ? (
        <LeadFormModal
          open={Boolean(activeForm)}
          leadType={activeForm}
          onClose={() => setActiveForm(null)}
        />
      ) : null}
    </>
  );
}
