"use client";

import { Search, X } from "lucide-react";

type FilterOptions = {
  categories: string[];
  types: string[];
  months: string[];
  quarters: string[];
  years: number[];
};

type ReleaseFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  month: string;
  onMonthChange: (value: string) => void;
  quarter: string;
  onQuarterChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  options: FilterOptions;
  loading?: boolean;
};

export default function ReleaseFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  type,
  onTypeChange,
  month,
  onMonthChange,
  quarter,
  onQuarterChange,
  year,
  onYearChange,
  options,
  loading = false,
}: ReleaseFiltersProps) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-3">
        <div className="h-10 w-56 animate-pulse rounded-full bg-slate-100" />
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`filter-skeleton-${idx}`}
            className="h-10 w-32 animate-pulse rounded-full bg-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search releases..."
          className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <option value="all">All Categories</option>
          {options.categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <option value="all">All Types</option>
          {options.types.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(event) => onMonthChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <option value="all">All Months</option>
          {options.months.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={quarter}
          onChange={(event) => onQuarterChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <option value="all">All Quarters</option>
          {options.quarters.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <option value="all">All Years</option>
          {options.years.map((value) => (
            <option key={value} value={String(value)}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
