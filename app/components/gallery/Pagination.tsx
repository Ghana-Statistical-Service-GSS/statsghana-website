type PaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const ELLIPSIS = "ellipsis" as const;

const buildPages = (
  totalPages: number,
  currentPage: number,
): Array<number | typeof ELLIPSIS> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  pages.add(currentPage);
  pages.add(Math.max(1, currentPage - 1));
  pages.add(Math.min(totalPages, currentPage + 1));

  return Array.from(pages)
    .sort((a, b) => a - b)
    .flatMap((page, index, arr) => {
      if (index === 0) return [page];
      const prev = arr[index - 1];
      if (page - prev > 1) return [ELLIPSIS, page];
      return [page];
    });
};

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = buildPages(totalPages, currentPage);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm">
      <div className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages.map((page, index) => {
          if (page === ELLIPSIS) {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                …
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition",
                page === currentPage
                  ? "bg-emerald-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
