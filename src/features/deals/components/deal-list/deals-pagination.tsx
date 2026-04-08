// src\features\deals\components\deal-list\deals-pagination.tsx
type DealsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function DealsPagination({ currentPage, totalPages, onPageChange }: DealsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "flex size-10 items-center justify-center rounded-xl bg-[#1f78d1] text-white"
              : "flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
          }
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
      >
        ›
      </button>
    </div>
  );
}
