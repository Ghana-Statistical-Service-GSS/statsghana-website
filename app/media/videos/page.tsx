"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  dateISO: string;
  eventId: string;
  eventTitle: string;
  type: "youtube" | "tiktok" | "file";
  youtubeId?: string;
  videoUrl?: string;
  thumbnail?: string;
};

const getThumbnail = (item: VideoItem) => {
  if (item.type === "youtube" && item.youtubeId) {
    return `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
  }
  if (item.type === "tiktok" && item.thumbnail) {
    return item.thumbnail;
  }
  return item.thumbnail ?? "/images/placeholder.png";
};

const getHref = (item: VideoItem) => {
  if (item.type === "youtube" && item.youtubeId) {
    return `https://www.youtube.com/watch?v=${item.youtubeId}`;
  }
  if (item.type === "tiktok" && item.videoUrl) {
    return item.videoUrl;
  }
  return item.videoUrl ?? "#";
};

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/youtube/videos", { cache: "no-store" });
        const payload = (await response.json()) as {
          ok?: boolean;
          items?: VideoItem[];
          error?: string;
        };

        if (!response.ok || !payload.ok) {
          throw new Error(
            payload.error ?? "Unable to load videos from official channels.",
          );
        }

        if (isMounted) {
          setVideos(payload.items ?? []);
        }
      } catch (fetchError) {
        if (isMounted) {
          const message =
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load videos from official channels.";
          setError(message);
          setVideos([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const events = useMemo(() => {
    const eventMap = new Map<string, string>();
    videos.forEach((item) => {
      eventMap.set(item.eventId, item.eventTitle);
    });
    return Array.from(eventMap.entries()).map(([id, title]) => ({
      id,
      title,
    }));
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (eventFilter === "all") return videos;
    return videos.filter((item) => item.eventId === eventFilter);
  }, [eventFilter, videos]);

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedVideos = filteredVideos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-white to-[#f5f1ea] py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / Media / Videos</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Videos
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Watch highlights, briefings, and event coverage from the Ghana Statistical
          Service YouTube and TikTok channels.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-slate-700">
            Select Category
          </div>
          <select
            value={eventFilter}
            onChange={(event) => {
              setEventFilter(event.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm sm:max-w-md"
          >
            <option value="all">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: pageSize }, (_, index) => (
              <div
                key={`loading-${index}`}
                className="h-80 animate-pulse rounded-xl border border-white/60 bg-white/80 shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="mt-8 grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {pagedVideos.map((item) => {
              const href = getHref(item);
              const isDisabled = href === "#";
              return (
                <div
                  key={item.id}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src={getThumbnail(item)}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                    <div className="absolute inset-0 bg-black/15" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-emerald-700 shadow-sm">
                        <Play className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                  <div className="flex h-full flex-col p-5">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {item.description}
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
                      <Link
                        href={href}
                        target={
                          item.type === "youtube" || item.type === "tiktok"
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.type === "youtube" || item.type === "tiktok"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={[
                          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition",
                          isDisabled
                            ? "cursor-not-allowed bg-slate-200 text-slate-400"
                            : "bg-emerald-700 text-white hover:bg-emerald-800",
                        ].join(" ")}
                        aria-disabled={isDisabled}
                      >
                        Watch Video
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredVideos.length ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm">
            <div className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                    onClick={() => handlePageChange(pageNumber)}
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
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {!loading && !filteredVideos.length ? (
          <div className="mt-8 rounded-2xl border border-white/60 bg-white/80 p-10 text-center text-sm text-slate-500 shadow-sm">
            {error ? (
              <>
                Unable to load videos right now.{" "}
                <Link
                  href="https://www.youtube.com/@ghanastatisticalservice/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  View the GSS YouTube channel
                </Link>
                {" or "}
                <Link
                  href="https://www.tiktok.com/@stats_ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  TikTok account.
                </Link>
              </>
            ) : (
              "No videos match this category."
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
