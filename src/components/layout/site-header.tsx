import Link from "next/link";
import { PageContainer } from "./page-container";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Deals", href: "/deals" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <PageContainer className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 text-lg font-bold text-slate-900">
          one4cus
        </Link>

        <nav className="hidden rounded-full bg-[#1677c8] p-2 lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => {
            const isHome = item.href === "/";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isHome
                    ? "rounded-full bg-white px-5 py-2 text-sm font-medium text-[#1677c8]"
                    : "rounded-full px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/become-a-provider" variant="secondary" className="h-10">
            Become a Provider
          </Button>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Login
          </Link>

          <Button href="/signup" className="h-10">
            Sign Up
          </Button>
        </div>
      </PageContainer>
    </header>
  );
}