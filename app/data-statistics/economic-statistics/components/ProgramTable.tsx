"use client";

import { useMemo, useState } from "react";
import { Download, Search, X } from "lucide-react";

export type ProgramRow = {
  program: string;
  category: string;
  month: string;
  year: string;
  downloadUrl: string;
  fileLabel?: string;
};

type ProgramTableProps = {
  title?: string;
  subtitle?: string;
  rows: ProgramRow[];
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
}: ProgramTableProps) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      includesAny([row.program, row.category, row.month, row.year], query),
    );
  }, [query, rows]);

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/75 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-slate-200/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {title ? (
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search releases…"
            className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 text-slate-700">
            <tr>
              <th className="px-5 py-3 font-semibold">Program</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Month</th>
              <th className="px-5 py-3 font-semibold">Year</th>
              <th className="px-5 py-3 font-semibold">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredRows.length ? (
              filteredRows.map((row) => (
                <tr
                  key={`${row.program}-${row.category}-${row.month}-${row.year}`}
                  className="transition hover:bg-slate-50/60"
                >
                  <td className="px-5 py-3">{row.program}</td>
                  <td className="px-5 py-3">{row.category}</td>
                  <td className="px-5 py-3">{row.month}</td>
                  <td className="px-5 py-3">{row.year}</td>
                  <td className="px-5 py-3">
                    <a
                      href={row.downloadUrl}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {row.fileLabel ?? "Download"}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
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
    </div>
  );
}
