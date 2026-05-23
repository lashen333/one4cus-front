// src\features\services\components\service-list\services-pagination.tsx
import Link from "next/link";

type ServicesPaginationProps = {
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

function getPageHref(page: number) {
  return `/services?page=${page}`;
}

export function ServicesPagination({ currentPage, totalPages }: ServicesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          scroll={false}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
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
              className={
                page === currentPage
                  ? "flex size-10 items-center justify-center rounded-xl bg-[#1f78d1] text-white"
                  : "flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
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
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
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
