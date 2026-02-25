"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
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

  const featured = pagedNews[0];
  const remaining = pagedNews.slice(1);

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / News &amp; Events / News</p>
        <div className="mt-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white sm:p-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Newsroom</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/85 sm:text-base">
            Explore updates, feature stories, and official highlights from the
            Ghana Statistical Service.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search news..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
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
              className="min-w-[140px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
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
              className="min-w-[150px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {filteredNews.length ? (
          <>
            {featured ? (
              <Link
                href={`/news-and-events/news/${featured.slug}`}
                className="group mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md lg:grid-cols-[1.3fr_1fr]"
              >
                <div className="relative min-h-[260px]">
                  <Image
                    src={featured.imageSrc}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 780px"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Featured Story
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {featured.excerpt}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(featured.dateISO).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                    Read full story <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ) : null}

            {remaining.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news-and-events/news/${item.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/9] w-full bg-slate-100">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 360px"
                      />
                    </div>
                    <div className="flex h-full flex-col p-5">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.excerpt}</p>
                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(item.dateISO).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
            No news items match your search.
          </div>
        )}

        {filteredNews.length ? (
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
