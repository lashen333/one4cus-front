// src\components\layout\site-header.tsx
import Link from "next/link";
import { publicNavigation } from "@/lib/constants/navigation";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <PageContainer className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Lashen
        </Link>

        <nav className="flex items-center gap-6">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </PageContainer>
    </header>
  );
}