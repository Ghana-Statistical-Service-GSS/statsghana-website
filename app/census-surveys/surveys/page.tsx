"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";

type UpcomingSurvey = {
  title: string;
  theme: string;
  period: string;
};

type OngoingSurvey = {
  title: string;
  theme: string;
  period: string;
  status: string;
};

type CompletedSurvey = {
  title: string;
  shortName?: string;
  theme: string;
  period: string;
  reportUrl: string;
};

const upcomingSurveys: UpcomingSurvey[] = [
  {
    title: "Survey Title 1",
    theme: "Demographics",
    period: "To be announced",
  },
  {
    title: "Survey Title 2",
    theme: "Agriculture",
    period: "To be published",
  },
  {
    title: "Survey Title 3",
    theme: "Business",
    period: "To be announced",
  },
  {
    title: "Survey Title 4",
    theme: "Other",
    period: "To be published",
  },
];

const ongoingSurveys: OngoingSurvey[] = [
  {
    title: "IBES 2024 Phase 1 | Business Listing",
    theme: "Business",
    period: "2024 - 2025",
    status: "In Progress",
  },
  {
    title: "IBES 2024 Phase 2 | Sampled Survey",
    theme: "Business",
    period: "2024 - late 2025",
    status: "In Progress",
  },
  {
    title: "Survey Title 3",
    theme: "Health",
    period: "Ongoing",
    status: "Ongoing",
  },
  {
    title: "Survey Title 4",
    theme: "Education",
    period: "Ongoing",
    status: "Data collection",
  },
];

const completedSurveys: CompletedSurvey[] = [
  {
    title: "Agricultural Census",
    shortName: "Ag Census",
    theme: "Demographics",
    period: "2017",
    reportUrl: "/publications",
  },
  {
    title: "National Demographic and Health Survey",
    shortName: "NDHS",
    theme: "Business",
    period: "2022/23",
    reportUrl: "/publications",
  },
  {
    title: "Ghana Living Standards Survey (GLSS)",
    shortName: "GLSS",
    theme: "Demographics",
    period: "2016/17",
    reportUrl: "/publications",
  },
  {
    title: "Integrated Business Establishment Survey (IBES)",
    shortName: "IBES",
    theme: "Health",
    period: "Phase 1 Phase 2 2024 (upcoming)",
    reportUrl: "/publications",
  },
];

function normalize(value: unknown) {
  return String(value ?? "").toLowerCase().trim();
}

function includesAny(haystackParts: Array<unknown>, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;
  const haystack = normalize(haystackParts.join(" "));
  return haystack.includes(normalizedQuery);
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("");
}

export default function SurveysPage() {
  const [upcomingQuery, setUpcomingQuery] = useState("");
  const [ongoingQuery, setOngoingQuery] = useState("");
  const [completedQuery, setCompletedQuery] = useState("");

  const upcomingInputRef = useRef<HTMLInputElement>(null);
  const ongoingInputRef = useRef<HTMLInputElement>(null);
  const completedInputRef = useRef<HTMLInputElement>(null);

  const filteredUpcoming = useMemo(() => {
    return upcomingSurveys.filter((row) =>
      includesAny([row.title, row.theme, row.period], upcomingQuery),
    );
  }, [upcomingQuery]);

  const filteredOngoing = useMemo(() => {
    return ongoingSurveys.filter((row) =>
      includesAny([row.title, row.theme, row.period, row.status], ongoingQuery),
    );
  }, [ongoingQuery]);

  const filteredCompleted = useMemo(() => {
    return completedSurveys.filter((row) => {
      const initials = getInitials(row.shortName ?? row.title);
      return includesAny(
        [
          row.title,
          row.shortName,
          initials,
          row.theme,
          row.period,
        ],
        completedQuery,
      );
    });
  }, [completedQuery]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Home / Census &amp; Surveys / Surveys
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Surveys
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Explore the array of surveys conducted by the Ghana Statistical
            Service (GSS). Stay updated with upcoming and ongoing surveys, and
            access completed survey reports.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Upcoming Surveys
                </h2>
                <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-end">
                  <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      ref={upcomingInputRef}
                      value={upcomingQuery}
                      onChange={(event) => setUpcomingQuery(event.target.value)}
                      placeholder="Search upcoming…"
                      className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                    {upcomingQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setUpcomingQuery("");
                          upcomingInputRef.current?.focus();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
                        aria-label="Clear upcoming search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>
                  <select className="w-full min-w-[130px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:w-auto">
                    <option>Show all</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/70 text-slate-700">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Survey</th>
                      <th className="px-5 py-3 font-semibold">Theme</th>
                      <th className="px-5 py-3 font-semibold">Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredUpcoming.length ? (
                      filteredUpcoming.map((row) => (
                        <tr key={`${row.title}-${row.period}`}>
                          <td className="px-5 py-3">{row.title}</td>
                          <td className="px-5 py-3">{row.theme}</td>
                          <td className="px-5 py-3">{row.period}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-5 py-6 text-center text-sm text-slate-400"
                        >
                          No surveys match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Ongoing Surveys
                </h2>
                <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-end">
                  <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      ref={ongoingInputRef}
                      value={ongoingQuery}
                      onChange={(event) => setOngoingQuery(event.target.value)}
                      placeholder="Search ongoing…"
                      className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                    {ongoingQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setOngoingQuery("");
                          ongoingInputRef.current?.focus();
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
                        aria-label="Clear ongoing search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </div>
                  <select className="w-full min-w-[130px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:w-auto">
                    <option>Show all</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50/70 text-slate-700">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Survey</th>
                      <th className="px-5 py-3 font-semibold">Theme</th>
                      <th className="px-5 py-3 font-semibold">Period</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredOngoing.length ? (
                      filteredOngoing.map((row) => (
                        <tr key={`${row.title}-${row.period}`}>
                          <td className="px-5 py-3">{row.title}</td>
                          <td className="px-5 py-3">{row.theme}</td>
                          <td className="px-5 py-3">{row.period}</td>
                          <td className="px-5 py-3">{row.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-5 py-6 text-center text-sm text-slate-400"
                        >
                          No surveys match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Completed Surveys
              </h2>
              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-end">
                <div className="relative w-full min-w-[180px] sm:w-56 md:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={completedInputRef}
                    value={completedQuery}
                    onChange={(event) => setCompletedQuery(event.target.value)}
                    placeholder="Search completed…"
                    className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs text-slate-700 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  {completedQuery ? (
                    <button
                      type="button"
                      onClick={() => {
                        setCompletedQuery("");
                        completedInputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
                      aria-label="Clear completed search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </div>
                <select className="w-full min-w-[130px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:w-auto">
                  <option>Show all</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 text-slate-700">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Survey</th>
                    <th className="px-5 py-3 font-semibold">Theme</th>
                    <th className="px-5 py-3 font-semibold">Period</th>
                    <th className="px-5 py-3 font-semibold">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCompleted.length ? (
                    filteredCompleted.map((row) => (
                      <tr key={`${row.title}-${row.period}`}>
                        <td className="px-5 py-3">{row.title}</td>
                        <td className="px-5 py-3">{row.theme}</td>
                        <td className="px-5 py-3">{row.period}</td>
                        <td className="px-5 py-3">
                          <Link
                            href={row.reportUrl}
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                          >
                            ReadMore
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-6 text-center text-sm text-slate-400"
                      >
                        No surveys match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
