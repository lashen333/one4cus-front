import Link from "next/link";
//import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-[#f3f4f6]">
      <PageContainer className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">One4cus</h3>
            <p className="mt-4 max-w-xs text-base leading-7 text-slate-500">
              One4cus connects you with trusted local service providers for all your needs.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-slate-900">Company</h4>
            <div className="mt-4 space-y-3 text-base text-slate-500">
              <Link href="/about" className="block hover:text-slate-900">About Us</Link>
              <Link href="/privacy-policy" className="block hover:text-slate-900">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-slate-900">Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-slate-900">Support</h4>
            <div className="mt-4 space-y-3 text-base text-slate-500">
              <Link href="/help-center" className="block hover:text-slate-900">Help Center</Link>
              <Link href="/contact" className="block hover:text-slate-900">Contact Us</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-slate-900">Providers</h4>
            <div className="mt-4 space-y-3 text-base text-slate-500">
              <Link href="/become-a-provider" className="block hover:text-slate-900">Become a Provider</Link>
              <Link href="/provider-login" className="block hover:text-slate-900">Provider Login</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © 2026 One4cus. All rights reserved.
          </p>

          {/* <div className="flex items-center gap-4 text-slate-500">
            <Link href="#"><Facebook className="size-4" /></Link>
            <Link href="#"><Twitter className="size-4" /></Link>
            <Link href="#"><Instagram className="size-4" /></Link>
            <Link href="#"><Linkedin className="size-4" /></Link>
          </div> */}
        </div>
      </PageContainer>
    </footer>
  );
}