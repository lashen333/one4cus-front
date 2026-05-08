// src\components\layout\site-header.tsx
"use client";

import { Button } from "@/components/ui/button";
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
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur ">
      <PageContainer className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 flex items-center" onClick={closeMobileMenu}>
          <Image
            src="/layout/Logo.png"
            alt="one4cus logo"
            width={120}
            height={40}
            priority
            className="h-8 w-auto sm:h-12 md:h-16 object-contain"
          />
        </Link>

        <nav className="hidden rounded-full bg-[#1c75bc] p-2 lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
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
          <Button href="/" variant="secondary" className="h-10">
            Become a Provider
          </Button>

          <Link
            href="/"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Login
          </Link>

          <Button href="/" className="h-10">
            Sign Up
          </Button>
        </div>
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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
                    onClick={closeMobileMenu}
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
              <Button href="/" variant="secondary" className="h-11 w-full">
                Become a Provider
              </Button>

              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>

              <Button href="/" className="h-11 w-full">
                Sign Up
              </Button>
            </div>
          </PageContainer>
        </div>
      )}
    </header>
  );
}
