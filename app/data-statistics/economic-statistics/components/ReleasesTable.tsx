"use client";

import { Download } from "lucide-react";
import { ReleaseItem } from "@/app/lib/releaseTypes";

type ReleasesTableProps = {
  rows: ReleaseItem[];
  loading?: boolean;
  onDownload: (item: ReleaseItem) => void;
  downloadingKey?: string | null;
  page: number;
  totalPages: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function ReleasesTable({
  rows,
  loading = false,
  onDownload,
  downloadingKey,
  page,
  totalPages,
  totalCount,
  onPrev,
  onNext,
}: ReleasesTableProps) {
  if (loading) {
    return (
      <div className="mt-6 space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={`row-skeleton-${idx}`}
            className="h-12 animate-pulse rounded-xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Month</th>
            <th className="px-4 py-3">Quarter</th>
            <th className="px-4 py-3">Year</th>
            <th className="px-4 py-3 text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-slate-200/60 transition hover:bg-slate-50/70"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {row.title}
              </td>
              <td className="px-4 py-3">{row.category}</td>
              <td className="px-4 py-3">{row.type || "–"}</td>
              <td className="px-4 py-3">{row.month || "–"}</td>
              <td className="px-4 py-3">{row.quarter || "–"}</td>
              <td className="px-4 py-3">{row.year ?? "–"}</td>
              <td className="px-4 py-3 text-center">
                <button
                  type="button"
                  onClick={() => onDownload(row)}
                  disabled={!row.downloadKey || downloadingKey === row.id}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  {downloadingKey === row.id ? "Preparing..." : "Download"}
                </button>
              </td>
            </tr>
          ))}

          {!rows.length ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-6 text-center text-sm text-slate-500"
              >
                No releases found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 px-4 py-3 text-xs text-slate-500">
        <span>
          Showing{" "}
          {totalCount === 0 ? 0 : (page - 1) * 10 + 1}-
          {Math.min(page * 10, totalCount)} of {totalCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={page === 1}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={page === totalPages}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
