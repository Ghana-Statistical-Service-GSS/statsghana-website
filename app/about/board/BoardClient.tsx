"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BoardItem,
  isImageKey,
  parsePersonFromFilename,
  sortBoardMembers,
} from "./board-utils";

type ListItem = {
  key?: string;
  name?: string;
  objectName?: string;
  Key?: string;
};

const PREFIXES = ["home/board/", "home/board"];

export default function BoardClient() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<{
    prefix: string | null;
    rawCount: number;
    imageCount: number;
    sampleKeys: string[];
  } | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchList = async (prefix: string) => {
      const res = await fetch(
        `/api/minio/list?prefix=${encodeURIComponent(prefix)}`,
      );
      const data = (await res.json()) as {
        ok: boolean;
        items?: ListItem[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Unable to list board images");
      }
      return data.items ?? [];
    };

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        let workingPrefix: string | null = null;
        let rawItems: ListItem[] = [];
        for (const prefix of PREFIXES) {
          try {
            const list = await fetchList(prefix);
            rawItems = list;
            if (list.length) {
              workingPrefix = prefix;
              break;
            }
            if (!workingPrefix) workingPrefix = prefix;
          } catch (err) {
            if (process.env.NODE_ENV !== "production") {
              console.log("[board list] prefix failed", prefix, err);
            }
          }
        }

        const keys = rawItems
          .map((item) => item.key ?? item.name ?? item.objectName ?? item.Key ?? "")
          .filter(Boolean)
          .filter(isImageKey);

        if (process.env.NODE_ENV !== "production") {
          console.log("[board list] prefixes tried", PREFIXES);
          console.log("[board list] working prefix", workingPrefix);
          console.log("[board list] raw count", rawItems.length);
          console.log("[board list] image count", keys.length);
          console.log("[board list] sample keys", keys.slice(0, 3));
        }

        const presigned = await Promise.all(
          keys.map(async (key) => {
            try {
              const presignRes = await fetch(
                `/api/minio/presign?key=${encodeURIComponent(key)}&expires=900`,
              );
              const presignData = (await presignRes.json()) as {
                url?: string;
                error?: string;
              };
              if (!presignRes.ok || !presignData.url) {
                throw new Error(presignData.error ?? "Unable to presign image");
              }
              const parsed = parsePersonFromFilename(key);
              return {
                key,
                url: presignData.url,
                ...parsed,
              } satisfies BoardItem;
            } catch (err) {
              if (process.env.NODE_ENV !== "production") {
                console.log("[board presign] failed", key, err);
              }
              return null;
            }
          }),
        );

        const resolved = presigned.filter(
          (item): item is BoardItem => Boolean(item),
        );

        if (isActive) {
          setItems(sortBoardMembers(resolved));
          if (process.env.NODE_ENV !== "production") {
            setDebug({
              prefix: workingPrefix,
              rawCount: rawItems.length,
              imageCount: keys.length,
              sampleKeys: keys.slice(0, 3),
            });
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load board";
        if (isActive) setError(message);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, []);

  const gridItems = useMemo(() => items, [items]);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={`board-skeleton-${idx}`}
            className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="aspect-square w-full bg-slate-100" />
            <div className="p-4">
              <div className="h-4 w-2/3 rounded bg-slate-100" />
              <div className="mt-3 h-3 w-1/3 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <>
      {process.env.NODE_ENV !== "production" && debug ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          <div>
            <span className="font-semibold">Prefix:</span>{" "}
            {debug.prefix ?? "none"}
          </div>
          <div>
            <span className="font-semibold">Raw items:</span>{" "}
            {debug.rawCount}
          </div>
          <div>
            <span className="font-semibold">Image keys:</span>{" "}
            {debug.imageCount}
          </div>
          <div className="mt-1">
            <span className="font-semibold">Sample keys:</span>{" "}
            {debug.sampleKeys.join(", ") || "none"}
          </div>
        </div>
      ) : null}

      {gridItems.length ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridItems.map((item) => (
            <div
              key={item.key}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-slate-50">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm font-medium text-slate-600">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          No board images found in MinIO for the board folder.
        </div>
      )}
    </>
  );
}
