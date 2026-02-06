"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryTabs from "./CategoryTabs";
import ReleaseFilters from "./ReleaseFilters";
import ReleasesTable from "./ReleasesTable";
import { parseReleaseFromKey } from "@/app/lib/releaseParser";
import { ReleaseItem } from "@/app/lib/releaseTypes";

type NationalAccountsReleasesProps = {
  title?: string;
  subtitle?: string;
};

const CATEGORY_PRIORITY = [
  "GDP by Production Approach",
  "GDP by Expenditure Approach",
  "Gross National Income",
  "GDP Newsletters",
];

const MONTH_ORDER: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

function normalize(value?: string) {
  return String(value ?? "").toLowerCase().replace(/\s+/g, " ").trim();
}

function unique(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

export default function NationalAccountsReleases({
  title,
  subtitle,
}: NationalAccountsReleasesProps) {
  const [rows, setRows] = useState<ReleaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [quarterFilter, setQuarterFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "/api/economic-statistics/national-accounts",
        );
        if (!response.ok) {
          throw new Error("Unable to load National Accounts releases");
        }
        const data = await response.json();
        const incoming = Array.isArray(data?.rows) ? data.rows : [];

        const mapped: ReleaseItem[] = incoming.map((row: any) => {
          const parsed = parseReleaseFromKey(
            row.downloadKey ?? row.program ?? "",
          );
          const yearValue =
            row.year && !Number.isNaN(Number(row.year))
              ? Number(row.year)
              : parsed.year;
          const categoryLabel =
            String(row.category ?? "").trim() || "Others";

          return {
            id: row.id ?? parsed.id,
            key: row.id ?? parsed.id,
            title: row.program ?? parsed.title,
            category: categoryLabel,
            type: row.type || parsed.type || "Other",
            month: row.month || parsed.month,
            quarter: row.quarter ? `Q${row.quarter}` : parsed.quarter,
            year: yearValue,
            downloadKey: row.downloadKey,
          };
        });

        if (isActive) {
          setRows(mapped);
        }
      } catch (err) {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Failed to load data");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, []);

  const categories = useMemo(() => {
    const items = unique(rows.map((row) => row.category));
    const priority = CATEGORY_PRIORITY.filter((cat) => items.includes(cat));
    const remaining = items
      .filter((cat) => !CATEGORY_PRIORITY.includes(cat) && cat !== "Others")
      .sort((a, b) => a.localeCompare(b));
    const hasOthers = items.includes("Others");
    return [
      "All Categories",
      ...priority,
      ...remaining,
      ...(hasOthers ? ["Others"] : []),
    ];
  }, [rows]);

  useEffect(() => {
    if (selectedCategory !== "all") return;
    if (!categories.length) return;
    setSelectedCategory("all");
    setCategoryFilter("all");
  }, [categories, selectedCategory]);

  const filterOptions = useMemo(() => {
    return {
      categories: unique(rows.map((row) => row.category)),
      types: unique(rows.map((row) => row.type)),
      months: unique(rows.map((row) => row.month)),
      quarters: unique(rows.map((row) => row.quarter)),
      years: Array.from(
        new Set(rows.map((row) => row.year).filter((y) => y) as number[]),
      ).sort((a, b) => b - a),
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = normalize(query);
    return rows.filter((row) => {
      const matchesCategoryTab =
        selectedCategory === "all" || row.category === selectedCategory;
      const matchesQuery = normalizedQuery
        ? normalize(
            [
              row.title,
              row.category,
              row.type,
              row.month,
              row.quarter,
              row.year,
            ]
              .filter(Boolean)
              .join(" "),
          ).includes(normalizedQuery)
        : true;
      const matchesCategory =
        categoryFilter === "all" || row.category === categoryFilter;
      const matchesType = typeFilter === "all" || row.type === typeFilter;
      const matchesMonth = monthFilter === "all" || row.month === monthFilter;
      const matchesQuarter =
        quarterFilter === "all" || row.quarter === quarterFilter;
      const matchesYear =
        yearFilter === "all" || String(row.year ?? "") === yearFilter;

      return (
        matchesCategoryTab &&
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
    selectedCategory,
    query,
    categoryFilter,
    typeFilter,
    monthFilter,
    quarterFilter,
    yearFilter,
  ]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;
      if (yearA !== yearB) return yearB - yearA;
      const quarterA = a.quarter ? Number(a.quarter.replace(/\\D/g, "")) : 0;
      const quarterB = b.quarter ? Number(b.quarter.replace(/\\D/g, "")) : 0;
      if (quarterA !== quarterB) return quarterB - quarterA;
      const monthA = a.month ? MONTH_ORDER[a.month] ?? 0 : 0;
      const monthB = b.month ? MONTH_ORDER[b.month] ?? 0 : 0;
      if (monthA !== monthB) return monthB - monthA;
      return a.title.localeCompare(b.title);
    });
  }, [filteredRows]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    setPage(1);
  }, [
    selectedCategory,
    query,
    categoryFilter,
    typeFilter,
    monthFilter,
    quarterFilter,
    yearFilter,
  ]);

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const handleDownload = async (item: ReleaseItem) => {
    if (!item.downloadKey) return;
    setDownloadingKey(item.id);
    try {
      const response = await fetch(
        `/api/minio/presign?key=${encodeURIComponent(
          item.downloadKey,
        )}&expires=900`,
      );
      if (!response.ok) throw new Error("Failed to prepare download");
      const data = await response.json();
      if (data?.url) {
        const anchor = document.createElement("a");
        anchor.href = data.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.click();
      }
    } finally {
      setDownloadingKey(null);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="mb-4">
        {title ? (
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        ) : null}
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>

      <CategoryTabs
        tabs={categories.map((label) => ({
          label,
          value: label === "All Categories" ? "all" : label,
        }))}
        activeCategory={selectedCategory}
        onChange={(value) => {
          setSelectedCategory(value);
          setCategoryFilter(value === "all" ? "all" : value);
        }}
        loading={loading}
      />

      <div className="mt-4">
        <ReleaseFilters
          query={query}
          onQueryChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          category={categoryFilter}
          onCategoryChange={(value) => {
            setCategoryFilter(value);
            if (value === "all") {
              setSelectedCategory("all");
            } else {
              setSelectedCategory(value);
            }
          }}
          type={typeFilter}
          onTypeChange={(value) => {
            setTypeFilter(value);
            setPage(1);
          }}
          month={monthFilter}
          onMonthChange={(value) => {
            setMonthFilter(value);
            setPage(1);
          }}
          quarter={quarterFilter}
          onQuarterChange={(value) => {
            setQuarterFilter(value);
            setPage(1);
          }}
          year={yearFilter}
          onYearChange={(value) => {
            setYearFilter(value);
            setPage(1);
          }}
          options={filterOptions}
          loading={loading}
        />
      </div>

      <div className="mt-6">
        <ReleasesTable
          rows={pagedRows}
          loading={loading}
          onDownload={handleDownload}
          downloadingKey={downloadingKey}
          page={currentPage}
          totalPages={totalPages}
          totalCount={filteredRows.length}
          onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        />
      </div>
    </div>
  );
}
