"use client";

import { useMemo, useState } from "react";
import { Download, Search, X } from "lucide-react";

export type ProgramRow = {
  id?: string;
  program: string;
  category: string;
  type?: string;
  month: string;
  quarter?: string;
  year: string;
  downloadUrl: string;
  downloadKey?: string;
  fileLabel?: string;
};

type ProgramTableProps = {
  title?: string;
  subtitle?: string;
  rows: ProgramRow[];
  showType?: boolean;
};

function normalize(value: unknown) {
  return String(value ?? "").toLowerCase().trim();
}

function includesAny(haystackParts: Array<unknown>, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;
  const haystack = normalize(haystackParts.join(" "));
  return haystack.includes(normalizedQuery);
}

export default function ProgramTable({
  title,
  subtitle,
  rows,
  showType = false,
}: ProgramTableProps) {
  const [query, setQuery] = useState("");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [quarterFilter, setQuarterFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const filterOptions = useMemo(() => {
    const unique = (values: Array<string | undefined>) =>
      Array.from(new Set(values.filter(Boolean) as string[]));

    return {
      categories: unique(rows.map((row) => row.category)),
      types: unique(rows.map((row) => row.type)),
      months: unique(rows.map((row) => row.month)),
      quarters: unique(rows.map((row) => row.quarter)),
      years: unique(rows.map((row) => row.year)),
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = includesAny(
        [row.program, row.category, row.type, row.month, row.quarter, row.year],
        query,
      );
      const matchesCategory =
        categoryFilter === "all" || row.category === categoryFilter;
      const matchesType = typeFilter === "all" || row.type === typeFilter;
      const matchesMonth = monthFilter === "all" || row.month === monthFilter;
      const matchesQuarter =
        quarterFilter === "all" || row.quarter === quarterFilter;
      const matchesYear = yearFilter === "all" || row.year === yearFilter;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesType &&
        matchesMonth &&
        matchesQuarter &&
        matchesYear
      );
    });
  }, [
    rows,
    query,
    categoryFilter,
    typeFilter,
    monthFilter,
    quarterFilter,
    yearFilter,
  ]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleDownload = async (key: string) => {
    setLoadingKey(key);
    try {
      const response = await fetch(
        `/api/minio/presign?key=${encodeURIComponent(key)}&expires=600`,
      );
      if (!response.ok) throw new Error("Failed to presign download");
      const data = await response.json();
      if (data?.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      }
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/75 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-slate-200/60 px-5 py-4">
        <div>
          {title ? (
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search releases…"
              className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
            >
              <option value="all">All Categories</option>
              {filterOptions.categories.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {showType ? (
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
              >
                <option value="all">All Types</option>
                {filterOptions.types.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ) : null}

            <select
              value={monthFilter}
              onChange={(event) => {
                setMonthFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
            >
              <option value="all">All Months</option>
              {filterOptions.months.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              value={quarterFilter}
              onChange={(event) => {
                setQuarterFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
            >
              <option value="all">All Quarters</option>
              {filterOptions.quarters.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(event) => {
                setYearFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
            >
              <option value="all">All Years</option>
              {filterOptions.years.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 text-slate-700">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              {showType ? (
                <th className="px-5 py-3 font-semibold">Type</th>
              ) : null}
              <th className="px-5 py-3 font-semibold">Month</th>
              <th className="px-5 py-3 font-semibold">Quarter</th>
              <th className="px-5 py-3 font-semibold">Year</th>
              <th className="px-5 py-3 font-semibold">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {pagedRows.length ? (
              pagedRows.map((row) => (
                <tr
                  key={
                    row.id ??
                    `${row.program}-${row.category}-${row.month}-${row.quarter ?? ""}-${row.year}`
                  }
                  className="transition hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3">{row.program}</td>
                  <td className="px-5 py-3">{row.category}</td>
                  {showType ? (
                    <td
                      className={`px-5 py-3 ${row.type ? "" : "text-slate-400"}`}
                    >
                      {row.type ?? "—"}
                    </td>
                  ) : null}
                  <td className="px-5 py-3">{row.month}</td>
                  <td className={`px-5 py-3 ${row.quarter ? "" : "text-slate-400"}`}>
                    {row.quarter ?? "—"}
                  </td>
                  <td className="px-5 py-3">{row.year}</td>
                  <td className="px-5 py-3">
                    {row.downloadKey ? (
                      <button
                        type="button"
                        onClick={() => handleDownload(row.downloadKey!)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {loadingKey === row.downloadKey
                          ? "Preparing..."
                          : row.fileLabel ?? "Download"}
                      </button>
                    ) : (
                      <a
                        href={row.downloadUrl}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {row.fileLabel ?? "Download"}
                      </a>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showType ? 7 : 6}
                  className="px-5 py-6 text-center text-sm text-slate-400"
                >
                  <div>No results found.</div>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Clear search
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-slate-200/60 px-5 py-4 text-xs text-slate-500">
          <span>
            Showing {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, filteredRows.length)} of{" "}
            {filteredRows.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
