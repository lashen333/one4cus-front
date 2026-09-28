// src\components\analytics\page-load-tracker.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function getPageName(pathname: string) {
  if (pathname === "/") return "homepage";
  if (pathname === "/about") return "about_us_page";
  if (pathname === "/services") return "services_page";
  if (pathname.startsWith("/services/")) return "service_profile_page";
  if (pathname === "/deals") return "deals_page";
  if (pathname.startsWith("/deals/")) return "deal_profile_page";
  if (pathname === "/contact") return "contact_page";

  return "unknown_page";
}

export function PageLoadTracker() {
  const pathname = usePathname();

  useEffect(() => {
    pushToDataLayer({
      event: "page_load",
      element_name: "page_load",
      event_value: {
        page_name: getPageName(pathname),
        section_name: "page",
        page_path: pathname,
        page_url: window.location.href,
        page_title: document.title,
      },
    });
  }, [pathname]);

  return null;
}
