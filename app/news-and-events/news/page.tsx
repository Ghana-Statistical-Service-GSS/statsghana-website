"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockNews } from "@/app/lib/mockNews";

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<"all" | number>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const years = useMemo(() => {
    const yearSet = new Set(
      mockNews.map((item) => new Date(item.dateISO).getFullYear()),
    );
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = mockNews.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.excerpt, item.dateISO]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const yearValue = new Date(item.dateISO).getFullYear();
      const matchesYear =
        yearFilter === "all" ? true : yearValue === yearFilter;

      return matchesQuery && matchesYear;
    });

    return filtered.sort((a, b) => {
      const aTime = new Date(a.dateISO).getTime();
      const bTime = new Date(b.dateISO).getTime();
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });
  }, [query, sortOrder, yearFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, yearFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedNews = filteredNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-white to-[#f5f1ea] py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / News &amp; Events / News</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          News
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Explore updates, announcements, and highlights from the Ghana
          Statistical Service.
        </p>

        <div className="mt-6 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-3 sm:mt-0">
            <select
              value={yearFilter}
              onChange={(event) =>
                setYearFilter(
                  event.target.value === "all"
                    ? "all"
                    : Number(event.target.value),
                )
              }
              className="min-w-[140px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as "newest" | "oldest")
              }
              className="min-w-[150px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {filteredNews.length ? (
          <div className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pagedNews.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                </div>
                <div className="flex h-full flex-col p-5">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {item.excerpt}
                  </p>
                  <div className="mt-3 text-xs text-slate-500">
                    Post Date:{" "}
                    {new Date(item.dateISO).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                  <div className="mt-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition group-hover:bg-emerald-800">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/60 bg-white/80 p-10 text-center text-sm text-slate-500 shadow-sm">
            No news items match your search.
          </div>
        )}

        {filteredNews.length ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm">
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
                      "rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition",
                      pageNumber === currentPage
                        ? "bg-emerald-700 text-white"
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
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
