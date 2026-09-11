// src/components/analytics/page-exit-tracker.tsx
// Tracks when the user leaves One4cus entirely:
// closes tab, closes browser, clicks browser back out of site, or navigates to another domain.

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
        element_name: "page_exited",
        event_value: {
          page_name: "global",
          section_name: "page_lifecycle",
          exit_type: exitType,
          page_path: window.location.pathname,
          page_url: window.location.href,
          page_title: document.title,
        },
      });
    }

    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Do not count same-page anchor clicks as exits
      if (href.startsWith("#") || href.startsWith("javascript:")) return;

      // These should be tracked separately as contact clicks, not page exits
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let targetUrl: URL;

      try {
        targetUrl = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Internal One4cus navigation should NOT fire page_exited
      if (targetUrl.origin === window.location.origin) {
        isInternalNavigation = true;
        return;
      }

      // External website navigation should fire page_exited
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
      // Browser back/forward can leave the site.
      // pagehide will confirm if the page is actually unloaded.
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
