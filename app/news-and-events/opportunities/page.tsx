"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { opportunities } from "@/app/lib/opportunities";

export default function OpportunityPage() {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<"all" | number>("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const years = useMemo(() => {
    const yearSet = new Set(
      opportunities.map((item) => new Date(item.dateISO).getFullYear()),
    );
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return opportunities.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.excerpt, item.dateISO, item.documentKey]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const yearValue = new Date(item.dateISO).getFullYear();
      const matchesYear =
        yearFilter === "all" ? true : yearValue === yearFilter;

      return matchesQuery && matchesYear;
    });
  }, [query, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / News &amp; Events / Career &amp; Jobs</p>

        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-white sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-400 p-2.5">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl text-slate-900 font-extrabold sm:text-4xl">Career &amp; Jobs</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                Career opportunities at the Ghana Statistical Service (GSS).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search career and job opportunities..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-[#241B5A] focus:outline-none focus:ring-2 focus:ring-[#241B5A]/20"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 sm:mt-0">
            <select
              value={yearFilter}
              onChange={(event) =>
                {
                  setYearFilter(
                    event.target.value === "all"
                      ? "all"
                      : Number(event.target.value),
                  );
                  setPage(1);
                }
              }
              className="min-w-[140px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredItems.length ? (
          <div className="mt-8 space-y-4">
            {pagedItems.map((item) => {
              const date = new Date(item.dateISO);
              const day = date.toLocaleDateString("en-US", { day: "2-digit" });
              const monthYear = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              });

              return (
                <Link
                  key={item.id}
                  href={`/news-and-events/opportunities/${item.slug}`}
                  className="group grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#241B5A]/30 hover:shadow-md sm:grid-cols-[80px_1fr] sm:items-start"
                >
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-2xl font-extrabold leading-none text-slate-900">{day}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {monthYear}
                    </p>
                  </div>

                  <div>
                    <p className="inline-flex rounded-full bg-[#241B5A]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#241B5A]">
                      Opportunity
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-[#241B5A]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#241B5A]">
                      Read full release <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
            No press releases match your search.
          </div>
        )}

        {filteredItems.length ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                      pageNumber === currentPage
                        ? "bg-[#241B5A] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
