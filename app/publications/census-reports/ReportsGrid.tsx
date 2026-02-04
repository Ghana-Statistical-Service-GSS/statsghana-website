"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { CensusReport } from "@/app/lib/mockCensusReports";
import {
  buildKeyIndex,
  extractKey,
  isAllowedFile,
  isImageFile,
  matchKeyForReport,
} from "@/app/lib/minioFileMatch";

type ReportsGridProps = {
  reports: CensusReport[];
  fallbackSrc?: string;
  filePrefix?: string;
};

type SortOrder = "newest" | "oldest";

const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

function ReportImage({
  src,
  alt,
  fallbackSrc,
  priority,
  imageKey,
}: {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  imageKey?: string | null;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    let isActive = true;

    const loadImage = async () => {
      if (!imageKey) return;
      try {
        const res = await fetch(
          `/api/minio/presign?key=${encodeURIComponent(imageKey)}&expires=900`,
        );
        if (!res.ok) return;
        const data = await res.json();
        if (isActive && data?.url) {
          setCurrentSrc(data.url);
        }
      } catch (err) {
        // fallback handled by onError
      }
    };

    loadImage();

    return () => {
      isActive = false;
    };
  }, [imageKey]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 34vw, 100vw"
      className="object-contain object-center"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      priority={priority}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function ReportsGrid({
  reports,
  fallbackSrc,
  filePrefix = "publications/census",
}: ReportsGridProps) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<"all" | number>("all");
  const [typeFilter, setTypeFilter] =
    useState<"all" | CensusReport["reportType"]>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);
  const [fileKeys, setFileKeys] = useState<string[]>([]);
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [fileDebug, setFileDebug] = useState<{
    prefix: string | null;
    rawCount: number;
    keyCount: number;
    sample: string[];
  }>({ prefix: null, rawCount: 0, keyCount: 0, sample: [] });
  const pageSize = 9;

  const years = useMemo(() => {
    const yearSet = new Set(reports.map((item) => item.year));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [reports]);

  const reportTypes = useMemo(() => {
    const types = new Set(reports.map((item) => item.reportType).filter(Boolean));
    return Array.from(types).sort();
  }, [reports]);

  useEffect(() => {
    let isActive = true;
    const prefixes = [filePrefix, `${filePrefix}/`];

    const loadKeys = async () => {
      setFileLoading(true);
      setFileError(null);

      try {
        let allItems: any[] = [];
        let success = false;

        for (const prefix of prefixes) {
          const res = await fetch(`/api/minio/list?prefix=${encodeURIComponent(prefix)}`);
          if (!res.ok) continue;
          const data = await res.json().catch(() => null);
          if (data?.ok && Array.isArray(data.items)) {
            allItems = data.items;
            success = true;
            if (isActive) {
              setFileDebug((prev) => ({
                ...prev,
                prefix,
                rawCount: data.items.length,
              }));
            }
            break;
          }
        }

        if (!success) {
          throw new Error("Unable to load files from MinIO.");
        }

        const keys = allItems
          .map((item) => extractKey(item))
          .filter((key) => key && isAllowedFile(key));
        const imageList = allItems
          .map((item) => extractKey(item))
          .filter((key) => key && isImageFile(key));

        if (isActive) {
          setFileKeys(keys);
          setImageKeys(imageList);
          setFileDebug((prev) => ({
            ...prev,
            keyCount: keys.length,
            sample: keys.slice(0, 3),
          }));
        }
      } catch (err) {
        if (isActive) {
          setFileError("Unable to load report files.");
        }
      } finally {
        if (isActive) {
          setFileLoading(false);
        }
      }
    };

    loadKeys();

    return () => {
      isActive = false;
    };
  }, []);

  const keyIndex = useMemo(() => buildKeyIndex(fileKeys), [fileKeys]);
  const imageIndex = useMemo(() => buildKeyIndex(imageKeys), [imageKeys]);

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = reports.filter((report) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          report.title,
          report.description,
          report.year.toString(),
          report.reportType,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesYear =
        yearFilter === "all" ? true : report.year === yearFilter;
      const matchesType =
        typeFilter === "all" ? true : report.reportType === typeFilter;

      return matchesQuery && matchesYear && matchesType;
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") return b.year - a.year;
      return a.year - b.year;
    });
  }, [query, reports, sortOrder, typeFilter, yearFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, yearFilter, typeFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleDownload = async (report: CensusReport, key: string | null) => {
    if (!key) return;
    setDownloadingId(report.id);
    try {
      const res = await fetch(
        `/api/minio/presign?key=${encodeURIComponent(key)}&expires=900`,
      );
      if (!res.ok) throw new Error("Failed to presign");
      const data = await res.json();
      if (data?.url) {
        window.open(data.url, "_blank", "noopener");
      }
    } catch (err) {
      console.error("Presign failed", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reports..."
            className="w-full rounded-full border border-slate-200 bg-slate-50/70 px-4 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value === "all"
                  ? "all"
                  : (event.target.value as CensusReport["reportType"]),
              )
            }
            className="min-w-[170px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
          >
            <option value="all">All Types</option>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as SortOrder)
            }
            className="min-w-[150px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {process.env.NODE_ENV !== "production" ? (
        <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-xs text-slate-600 shadow-sm">
          <div>MinIO prefix: {fileDebug.prefix ?? "none"}</div>
          <div>Items: {fileDebug.rawCount} • Files: {fileDebug.keyCount}</div>
          <div>
            Sample: {fileDebug.sample.length ? fileDebug.sample.join(", ") : "—"}
          </div>
          {fileError ? <div className="text-rose-600">Error: {fileError}</div> : null}
        </div>
      ) : null}

      {filteredReports.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagedReports.map((report, index) => {
            const matchedKey = matchKeyForReport(
              report.title,
              report.id,
              keyIndex,
            );
            const matchedImageKey = matchKeyForReport(
              report.title,
              report.id,
              imageIndex,
            );
            const isDisabled = !matchedKey || fileLoading || Boolean(fileError);
            const isDownloading = downloadingId === report.id;
            return (
              <div
                key={report.id}
                className="flex h-full flex-col items-stretch overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm md:flex-row"
              >
                <div className="relative w-full bg-slate-50 p-3 md:w-[34%] md:shrink-0">
                  <div className="relative h-full w-full" />
                </div>
                <div className="flex h-full flex-1 flex-col p-5 md:w-[66%]">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {report.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {report.description}
                  </p>
                  <div className="mt-4 text-xs font-semibold text-slate-500">
                    {report.year} • {report.reportType}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleDownload(report, matchedKey)}
                      disabled={isDisabled || isDownloading}
                      className={[
                        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition",
                        isDisabled
                          ? "cursor-not-allowed bg-slate-200 text-slate-400"
                          : "bg-emerald-700 text-white hover:bg-emerald-800",
                      ].join(" ")}
                      aria-disabled={isDisabled}
                    >
                      <Download className="h-4 w-4" />
                      {isDisabled
                        ? "No file"
                        : isDownloading
                        ? "Preparing..."
                        : "Download"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          No reports match your search.
        </div>
      )}

      {filteredReports.length ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
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
  );
}
