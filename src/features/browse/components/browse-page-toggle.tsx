// src\features\browse\components\browse-page-toggle.tsx
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type BrowsePageToggleProps = {
  active: "services" | "deals";
};

export function BrowsePageToggle({ active }: BrowsePageToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-full bg-[#1f78d1] p-1.5 shadow-sm">
        <Link
          href="/services"
          className={cn(
            "rounded-full px-8 py-2.5 text-sm font-medium transition",
            active === "services" ? "bg-white text-[#1f78d1]" : "text-white hover:bg-white/10",
          )}
        >
          Services
        </Link>

        <Link
          href="/deals"
          className={cn(
            "rounded-full px-8 py-2.5 text-sm font-medium transition",
            active === "deals" ? "bg-white text-[#1f78d1]" : "text-white hover:bg-white/10",
          )}
        >
          Deals
        </Link>
      </div>
    </div>
  );
}
