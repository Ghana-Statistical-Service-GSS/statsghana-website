"use client";

import { useMemo, useState, useEffect } from "react";

type HealthResponse = {
  ok: boolean;
  bucket: string;
  endpoint: string;
  canList: boolean;
  sampleKeys: string[];
  error?: string;
};

type ListItem = {
  key: string;
  size?: number;
  lastModified?: string;
};

export default function MinioTestPage() {
  const [prefix, setPrefix] = useState("");
  const [objectKey, setObjectKey] = useState("");
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);

  const [presignUrl, setPresignUrl] = useState<string | null>(null);
  const [presignLoading, setPresignLoading] = useState(false);
  const [presignError, setPresignError] = useState<string | null>(null);

  const [listQuery, setListQuery] = useState("");
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [rowLoadingKey, setRowLoadingKey] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const q = listQuery.trim().toLowerCase();
    if (!q) return listItems;
    return listItems.filter((item) => item.key.toLowerCase().includes(q));
  }, [listItems, listQuery]);

  const formatSize = (size?: number) => {
    if (size === undefined) return "-";
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const datePart = date.toLocaleDateString("en-CA");
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} ${timePart}`;
  };

  const loadList = async (currentPrefix = "") => {
    setListLoading(true);
    setListError(null);
    try {
      const res = await fetch(
        `/api/minio/list?prefix=${encodeURIComponent(currentPrefix)}`,
      );
      const data = (await res.json()) as {
        ok: boolean;
        items: ListItem[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Unable to load files");
      }
      setListItems(data.items ?? []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to load files";
      setListError(message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    void loadList("");
  }, []);

  const handleHealthCheck = async () => {
    setHealthLoading(true);
    setHealthError(null);
    setHealth(null);
    try {
      const res = await fetch(`/api/minio/health?prefix=${encodeURIComponent(prefix)}`);
      const data = (await res.json()) as HealthResponse;
      if (!res.ok) {
        throw new Error(data.error ?? "Health check failed");
      }
      setHealth(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to check connection";
      setHealthError(message);
    } finally {
      setHealthLoading(false);
    }
  };

  const handlePresign = async () => {
    if (!objectKey.trim()) {
      setPresignError("Enter an object key to generate a link.");
      return;
    }
    setPresignLoading(true);
    setPresignError(null);
    setPresignUrl(null);
    try {
      const res = await fetch(
        `/api/minio/presign?key=${encodeURIComponent(objectKey.trim())}`,
      );
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Unable to generate link");
      }
      setPresignUrl(data.url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to generate link";
      setPresignError(message);
    } finally {
      setPresignLoading(false);
    }
  };

  const handleRowDownload = async (key: string) => {
    setRowLoadingKey(key);
    try {
      const res = await fetch(
        `/api/minio/presign?key=${encodeURIComponent(key)}&expires=600`,
      );
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Unable to generate link");
      }
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to generate link";
      setListError(message);
    } finally {
      setRowLoadingKey(null);
    }
  };

  return (
    <div className="bg-white py-10">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            MinIO Test
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Use this page to validate the MinIO connection and generate a
            presigned download link.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Prefix (optional)
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={prefix}
                  onChange={(event) => setPrefix(event.target.value)}
                  placeholder="e.g. reports/2024/"
                  className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
                <button
                  type="button"
                  onClick={handleHealthCheck}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={healthLoading}
                >
                  {healthLoading ? "Checking..." : "Check Connection"}
                </button>
              </div>
              {healthError ? (
                <p className="mt-2 text-sm text-rose-600">{healthError}</p>
              ) : null}
              {health ? (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold">OK:</span>{" "}
                    {health.ok ? "true" : "false"}
                  </div>
                  <div>
                    <span className="font-semibold">Can List:</span>{" "}
                    {health.canList ? "true" : "false"}
                  </div>
                  <div>
                    <span className="font-semibold">Bucket:</span>{" "}
                    {health.bucket}
                  </div>
                  <div>
                    <span className="font-semibold">Endpoint:</span>{" "}
                    {health.endpoint}
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Sample Keys:</span>
                    {health.sampleKeys.length ? (
                      <ul className="mt-1 list-disc pl-5">
                        {health.sampleKeys.map((key) => (
                          <li key={key}>{key}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="ml-2 text-slate-500">None</span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Object key
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={objectKey}
                  onChange={(event) => setObjectKey(event.target.value)}
                  placeholder="e.g. reports/2024/summary.pdf"
                  className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
                <button
                  type="button"
                  onClick={handlePresign}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={presignLoading}
                >
                  {presignLoading ? "Generating..." : "Generate Download Link"}
                </button>
              </div>
              {presignError ? (
                <p className="mt-2 text-sm text-rose-600">{presignError}</p>
              ) : null}
              {presignUrl ? (
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold">URL:</span>{" "}
                  <a
                    href={presignUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-emerald-700 hover:underline"
                  >
                    {presignUrl}
                  </a>
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Bucket Files (dsucdr1)
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    value={listQuery}
                    onChange={(event) => setListQuery(event.target.value)}
                    placeholder="Search files…"
                    className="w-full min-w-[200px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 sm:w-64"
                  />
                  <button
                    type="button"
                    onClick={() => loadList(prefix)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={listLoading}
                  >
                    {listLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>
              {listError ? (
                <p className="mt-2 text-sm text-rose-600">{listError}</p>
              ) : null}
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">File</th>
                      <th className="px-4 py-3 font-semibold">Last Modified</th>
                      <th className="px-4 py-3 font-semibold">Size</th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {listLoading ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-sm text-slate-400"
                        >
                          Loading files...
                        </td>
                      </tr>
                    ) : filteredItems.length ? (
                      filteredItems.map((item) => (
                        <tr key={item.key} className="hover:bg-slate-50/60">
                          <td className="px-4 py-3">
                            <span className="block max-w-[260px] truncate sm:max-w-[420px]">
                              {item.key}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {formatDate(item.lastModified)}
                          </td>
                          <td className="px-4 py-3">{formatSize(item.size)}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => handleRowDownload(item.key)}
                              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                              disabled={rowLoadingKey === item.key}
                            >
                              {rowLoadingKey === item.key
                                ? "Preparing..."
                                : "Download"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-sm text-slate-400"
                        >
                          No files found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
