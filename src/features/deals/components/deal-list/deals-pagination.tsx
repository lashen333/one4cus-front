// src\features\deals\components\deal-list\deals-pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type DealsPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>();

  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);

  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  return Array.from(pages).sort((a, b) => a - b);
}

export function DealsPagination({ currentPage, totalPages }: DealsPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  function getPageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    if (!params.get("limit")) {
      params.set("limit", "12");
    }

    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          scroll={false}
          data-analytics-event="pagination_click"
          data-page-name="deals_page"
          data-section-name="listing_section"
          data-element-name="pagination_previous"
          data-pagination-page={currentPage - 1}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          ‹
        </Link>
      ) : (
        <span className="flex size-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300">
          ‹
        </span>
      )}

      {pages.map((page, index) => {
        const previousPage = pages[index - 1];
        const shouldShowDots = previousPage && page - previousPage > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {shouldShowDots ? <span className="text-slate-400">...</span> : null}

            <Link
              href={getPageHref(page)}
              scroll={false}
              data-analytics-event="pagination_click"
              data-page-name="deals_page"
              data-section-name="listing_section"
              data-element-name={`pagination_page_${page}`}
              data-pagination-page={page}
              className={
                page === currentPage
                  ? "flex size-10 items-center justify-center rounded-xl bg-[#1f78d1] text-white"
                  : "flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
              }
            >
              {page}
            </Link>
          </div>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          scroll={false}
          data-analytics-event="pagination_click"
          data-page-name="deals_page"
          data-section-name="listing_section"
          data-element-name="pagination_next"
          data-pagination-page={currentPage + 1}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
        >
          ›
        </Link>
      ) : (
        <span className="flex size-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-300">
          ›
        </span>
      )}
    </div>
  );
}
