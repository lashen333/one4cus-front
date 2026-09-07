// src\components\analytics\page-exit-tracker.tsx
//to track the user close browser move to another domain or click back button on the browser
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { useEffect } from "react";

export function PageExitTracker() {
  useEffect(() => {
    let isInternalNavigation = false;
    let isExternalNavigation = false;
    let hasTrackedExit = false;

    function pushPageExit(
      exitType: "tab_close_or_browser_exit" | "external_navigation" | "browser_navigation",
    ) {
      if (hasTrackedExit) return;

      hasTrackedExit = true;

      pushToDataLayer({
        event: "page_exited",
        page_name: "global",
        section_name: "page_lifecycle",
        element_name: "page_exited",
        exit_type: exitType,
        page_path: window.location.pathname,
        page_url: window.location.href,
        page_title: document.title,
      });
    }

    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      if (href.startsWith("#") || href.startsWith("javascript:")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let targetUrl: URL;

      try {
        targetUrl = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (targetUrl.origin === window.location.origin) {
        isInternalNavigation = true;
        return;
      }

      if (targetUrl.protocol === "http:" || targetUrl.protocol === "https:") {
        isExternalNavigation = true;
        pushPageExit("external_navigation");
      }
    }

    function handlePageHide() {
      if (isInternalNavigation) return;

      if (isExternalNavigation) {
        pushPageExit("external_navigation");
        return;
      }

      pushPageExit("tab_close_or_browser_exit");
    }

    function handlePopState() {
      isInternalNavigation = false;
    }

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
