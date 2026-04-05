// src\features\services\components\services-pagination.tsx
type ServicesPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ServicesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ServicesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
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
            page === currentPage
              ? "flex size-10 items-center justify-center rounded-xl bg-[#1f78d1] text-white"
              : "flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
          }
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600"
      >
        ›
      </button>
    </div>
  );
}
