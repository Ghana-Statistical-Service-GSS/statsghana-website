import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  BriefcaseBusiness,
  Factory,
  Flame,
  LineChart,
  Minus,
  Scale,
  Users,
  Wheat,
} from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import GdpStatsCard from "./GdpStatsCard";
import cpiData from "../lib/cpiData.json";
import ppiData from "../lib/ppiData.json";
import iipData from "../lib/iipData.json";
import miegData from "../lib/miegData.json";
import pbciData from "../lib/pbciData.json";
import projectionData from "../lib/projectionData.json";
import gdpData from "../lib/gdpData.json";
import { computeDelta } from "../lib/statsCardDelta";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseMonthValue(value: string) {
  const match = value.match(/(\d{4})\D?(\d{1,2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!year || !month) return null;
  return { year, month };
}

function formatMonthWord(value: string) {
  const parsed = parseMonthValue(value);
  if (!parsed) return value;
  return `${MONTH_NAMES[parsed.month - 1]} ${parsed.year}`;
}


function parseYearValue(raw: string) {
  const match = String(raw).match(/(\d{4})/);
  if (!match) return null;
  const year = Number(match[1]);
  return Number.isFinite(year) ? year : null;
}

function parseQuarterValue(raw: string) {
  const match = String(raw).match(/(\d{4})\D*Q(\d)/i);
  if (!match) return null;
  const year = Number(match[1]);
  const quarter = Number(match[2]);
  if (!Number.isFinite(year) || !Number.isFinite(quarter)) return null;
  return { year, quarter };
}

function getLatestTwoMonthValues(
  rows: Array<{ key: string[]; values: string[] }>,
  monthIndex: number
) {
  const parsed = rows
    .map((row) => {
      const month = row.key?.[monthIndex];
      const numeric = Number(row.values?.[0]);
      const meta = month ? parseMonthValue(month) : null;
      if (!month || !meta || !Number.isFinite(numeric)) return null;
      return { month, value: numeric, year: meta.year, m: meta.month };
    })
    .filter(Boolean) as Array<{ month: string; value: number; year: number; m: number }>;

  parsed.sort((a, b) => (b.year !== a.year ? b.year - a.year : b.m - a.m));
  return {
    latest: parsed[0] ?? null,
    previous: parsed[1] ?? null,
  };
}

function getLatestTwoQuarterValues(
  rows: Array<{ key: string[]; values: string[] }>
) {
  const parsed = rows
    .map((row) => {
      const quarterRaw = row.key?.[0];
      const value = Number(row.values?.[0]);
      const meta = parseQuarterValue(quarterRaw);
      if (!meta || !Number.isFinite(value)) return null;
      return { quarterRaw, value, year: meta.year, q: meta.quarter };
    })
    .filter(Boolean) as Array<{ quarterRaw: string; value: number; year: number; q: number }>;

  parsed.sort((a, b) => (b.year !== a.year ? b.year - a.year : b.q - a.q));
  return {
    latest: parsed[0] ?? null,
    previous: parsed[1] ?? null,
  };
}

const CARD_LINKS: Record<string, string> = {
  CPI: "/data-statistics/economic-statistics?tab=price-index",
  PPI: "/data-statistics/economic-statistics?tab=price-index",
  IIP: "/data-statistics/economic-statistics?tab=national-accounts",
  PBCI: "/data-statistics/economic-statistics?tab=price-index",
  GDP: "/data-statistics/economic-statistics?tab=national-accounts",
  MIEG: "/data-statistics/economic-statistics?tab=national-accounts",
  UNEMP: "/publications/survey-reports?q=unemployment",
  POP: "/publications/survey-reports?q=projected+population",
  MPI: "/publications/survey-reports?q=multidimensional+poverty",
  FOOD: "/publications/survey-reports?q=food+insecurity",
};

const KPI_THEMES: Record<
  string,
  {
    bgGradient: string;
    borderClass: string;
    iconBgClass: string;
    accentTextClass: string;
    glowClass: string;
  }
> = {
  CPI: {
    bgGradient: "bg-gradient-to-br from-[#F6F4FF] via-white to-[#E9F1FF]",
    borderClass: "border-indigo-200/60",
    iconBgClass: "bg-indigo-500/15 text-indigo-700",
    accentTextClass: "text-indigo-700",
    glowClass: "bg-indigo-400/20",
  },
  PPI: {
    bgGradient: "bg-gradient-to-br from-[#F3FBF6] via-white to-[#E8F6FF]",
    borderClass: "border-emerald-200/60",
    iconBgClass: "bg-emerald-500/15 text-emerald-700",
    accentTextClass: "text-emerald-700",
    glowClass: "bg-emerald-400/20",
  },
  IIP: {
    bgGradient: "bg-gradient-to-br from-[#FDF5F0] via-white to-[#F5E9FF]",
    borderClass: "border-amber-200/60",
    iconBgClass: "bg-amber-500/15 text-amber-700",
    accentTextClass: "text-amber-700",
    glowClass: "bg-amber-400/20",
  },
  PBCI: {
    bgGradient: "bg-gradient-to-br from-[#F5F7FF] via-white to-[#EAF8FF]",
    borderClass: "border-sky-200/60",
    iconBgClass: "bg-sky-500/15 text-sky-700",
    accentTextClass: "text-sky-700",
    glowClass: "bg-sky-400/20",
  },
  MIEG: {
    bgGradient: "bg-gradient-to-br from-[#F3F9FF] via-white to-[#E9F3FF]",
    borderClass: "border-blue-200/60",
    iconBgClass: "bg-blue-500/15 text-blue-700",
    accentTextClass: "text-blue-700",
    glowClass: "bg-blue-400/20",
  },
  GDP: {
    bgGradient: "bg-gradient-to-br from-[#F8F5FF] via-white to-[#F2EDFF]",
    borderClass: "border-violet-200/60",
    iconBgClass: "bg-violet-500/15 text-violet-700",
    accentTextClass: "text-violet-700",
    glowClass: "bg-violet-400/20",
  },
  UNEMP: {
    bgGradient: "bg-gradient-to-br from-[#FFF7F2] via-white to-[#FCEFEA]",
    borderClass: "border-rose-200/60",
    iconBgClass: "bg-rose-500/15 text-rose-700",
    accentTextClass: "text-rose-700",
    glowClass: "bg-rose-400/20",
  },
  POP: {
    bgGradient: "bg-gradient-to-br from-[#F6FBFF] via-white to-[#EAF4FF]",
    borderClass: "border-cyan-200/60",
    iconBgClass: "bg-cyan-500/15 text-cyan-700",
    accentTextClass: "text-cyan-700",
    glowClass: "bg-cyan-400/20",
  },
  // Multidimensional Poverty Index — purple
  MPI: {
    bgGradient: "bg-gradient-to-br from-[#FDF4FF] via-white to-[#F5E8FF]",
    borderClass: "border-purple-200/60",
    iconBgClass: "bg-purple-500/15 text-purple-700",
    accentTextClass: "text-purple-700",
    glowClass: "bg-purple-400/20",
  },
  // Food Insecurity — orange
  FOOD: {
    bgGradient: "bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFF0DB]",
    borderClass: "border-orange-200/60",
    iconBgClass: "bg-orange-500/15 text-orange-700",
    accentTextClass: "text-orange-700",
    glowClass: "bg-orange-400/20",
  },
};

type StatsCardProps = {
  indicatorKey: string;
  title: string;
  currentValue?: number | null;
  valueDisplay: string;
  periodLabel?: string;
  icon: typeof Flame;
  prevValue?: number | null;
  prevLabel?: string;
  deltaType?: "pp" | "percent" | "raw";
  positiveIsGood?: boolean;
  children?: ReactNode;
};

type KPIEntry = {
  key: string;
  title: string;
  icon: typeof Flame;
  value: string;
  currentValue?: number | null;
  periodLabel?: string;
  prevValue?: number | null;
  prevLabel?: string;
  deltaType?: "pp" | "percent" | "raw";
  positiveIsGood?: boolean;
  gdpProductionQuarterlyValue?: string;
  gdpProductionQuarterlyPeriod?: string;
  gdpProductionAnnualValue?: string;
  gdpProductionYear?: string;
  gdpExpenditureQuarterlyValue?: string;
  gdpExpenditureQuarterlyPeriod?: string;
  gdpExpenditureAnnualValue?: string;
  gdpExpenditureYear?: string;
};

function StatsCard({
  indicatorKey,
  title,
  currentValue,
  valueDisplay,
  periodLabel,
  icon: Icon,
  prevValue,
  prevLabel,
  deltaType = "pp",
  positiveIsGood = true,
  children,
}: StatsCardProps) {
  const theme = KPI_THEMES[indicatorKey] ?? KPI_THEMES.CPI;
  const delta = computeDelta(
    Number.isFinite(Number(currentValue)) ? Number(currentValue) : null,
    prevValue ?? null,
    deltaType
  );
  const showDelta = prevValue !== null && prevValue !== undefined && delta.formatted;
  const trendUp = delta.sign === "up";
  const trendFlat = delta.sign === "flat";
  const trendGood = positiveIsGood ? trendUp : delta.sign === "down";
  const trendColor = trendGood ? "text-emerald-700" : "text-rose-600";

  return (
    <Card
      className={`relative h-full min-h-[200px] w-full overflow-hidden border ${theme.borderClass} p-0 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className={`absolute inset-0 ${theme.bgGradient}`} />
      <div
        className={`pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full blur-3xl ${theme.glowClass}`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl ${theme.glowClass}`}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      <div className="relative flex h-full flex-col p-5">
        <div className="flex flex-1 flex-col justify-center">
          {/* Zone 1: icon left, indicator key right */}
          <div className="flex w-full items-center justify-between">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/40 ${theme.iconBgClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase ${theme.accentTextClass}`}>
              {indicatorKey}
            </span>
          </div>

          {/* Zone 2 + 3: centered title + value (footer remains left-aligned) */}
          <div className="mt-3 flex flex-col items-center text-center">
            <p className="text-sm font-semibold text-slate-600">{title}</p>
            <p
              className={
                indicatorKey === "POP"
                  ? "mb-3 mt-1 text-2xl font-extrabold leading-none tracking-tight tabular-nums text-slate-900"
                  : "mb-3 mt-1 text-center text-4xl font-extrabold leading-none text-slate-900"
              }
            >
              {valueDisplay}
            </p>
          </div>

          {children ? (
            <div className="border-t border-white/50 pt-2.5">{children}</div>
          ) : null}

          <div className="my-3 h-px w-full bg-slate-200/60" />

          {/* Zone 4: footer slightly lifted for visual balance */}
          <div className="mt-1 pb-1">
            {periodLabel ? (
              <p className="text-xs text-slate-400">{periodLabel}</p>
            ) : null}
            {showDelta ? (
              <div className={`flex items-center gap-2${periodLabel ? " mt-1" : ""}`}>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-bold ${trendColor}`}
                >
                  {trendFlat ? (
                    <Minus className="h-4 w-4" />
                  ) : trendUp ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {delta.formatted}
                </span>
                <span className="text-xs text-slate-400">
                  vs {prevLabel ?? "previous"}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function StatCards() {
  const cpiRows = (cpiData as any)?.response?.data ?? [];
  const cpiColumns = (cpiData as any)?.response?.columns ?? [];
  const cpiIndicatorIdx = cpiColumns.findIndex((c: any) => c.code === "Indicator");
  const cpiMonthIdx = cpiColumns.findIndex((c: any) => c.code === "Month");
  const cpiRegionIdx = cpiColumns.findIndex((c: any) => c.code === "Region");
  const { latest: latestCpi, previous: prevCpi } = getLatestTwoMonthValues(
    cpiRows.filter(
      (row: any) =>
        row.key?.[cpiIndicatorIdx] === "Year-on-year inflation (%)" &&
        row.key?.[cpiRegionIdx]?.toLowerCase?.() === "ghana"
    ),
    cpiMonthIdx
  );

  const ppiRows = (ppiData as any)?.response?.data ?? [];
  const ppiColumns = (ppiData as any)?.response?.columns ?? [];
  const ppiIndicatorIdx = ppiColumns.findIndex((c: any) => c.code === "Indicator");
  const ppiMonthIdx = ppiColumns.findIndex((c: any) => c.code === "Month");
  const { latest: latestPpi, previous: prevPpi } = getLatestTwoMonthValues(
    ppiRows.filter((row: any) => row.key?.[ppiIndicatorIdx] === "Year-on-year PPI change (%)"),
    ppiMonthIdx
  );

  const iipRows = (iipData as any)?.response?.data ?? [];
  const { latest: latestIip, previous: prevIip } = getLatestTwoQuarterValues(iipRows);

  const miegRows = (miegData as any)?.response?.data ?? [];
  const miegColumns = (miegData as any)?.response?.columns ?? [];
  const miegSeriesIdx = miegColumns.findIndex((c: any) => c.code === "GDP_Series");
  const miegVariableIdx = miegColumns.findIndex((c: any) => c.code === "Variable");
  const miegMonthIdx = miegColumns.findIndex((c: any) => c.code === "Month");
  const { latest: latestMieg, previous: prevMieg } = getLatestTwoMonthValues(
    miegRows.filter(
      (row: any) =>
        row.key?.[miegSeriesIdx] === "MIEG Index Growth (year-on-year %)" &&
        (miegVariableIdx === -1 ||
          row.key?.[miegVariableIdx] === "Total MIEG")
    ),
    miegMonthIdx
  );

  const pbciRows = (pbciData as any)?.PBCI?.National ?? [];
  const pbciSorted =
    pbciRows
      .filter((entry: any) => Number.isFinite(Number(entry.inflation)))
      .map((entry: any) => ({
        month: entry.month,
        value: Number(entry.inflation),
      }))
      .sort((a: any, b: any) => {
        const aParsed = parseMonthValue(a.month);
        const bParsed = parseMonthValue(b.month);
        if (!aParsed || !bParsed) return 0;
        if (aParsed.year !== bParsed.year) return bParsed.year - aParsed.year;
        return bParsed.month - aParsed.month;
      });
  const latestPbci = pbciSorted[0] ?? null;
  const prevPbci = pbciSorted[1] ?? null;

  const projectionRows = (projectionData as any)?.response?.data ?? [];
  const projectionColumns = (projectionData as any)?.response?.columns ?? [];
  const projRegionIdx = projectionColumns.findIndex(
    (col: any) => col.code === "Geographic_Area"
  );
  const projYearIdx = projectionColumns.findIndex(
    (col: any) => col.code === "Year" || col.code === "Time"
  );
  const currentYear = new Date().getFullYear();
  const yearValues = Array.from(
    new Set(
      projectionRows
        .map((row: any) => row.key?.[projYearIdx])
        .filter(Boolean)
    )
  );
  const yearOptions = yearValues
    .map((raw) => ({ raw, year: Number(String(raw).slice(0, 4)) }))
    .filter((entry) => Number.isFinite(entry.year));
  const preferredYear =
    yearOptions.find((entry) => entry.year === currentYear) ??
    yearOptions.sort((a, b) => b.year - a.year)[0];

  const projectedNational = projectionRows.find(
    (row: any) =>
      row.key?.[projRegionIdx]?.toLowerCase?.() === "ghana" &&
      row.key?.[projYearIdx] === preferredYear?.raw
  );

  const annualGdpProductionRows =
    (gdpData as any)?.annualProduction?.response?.data ??
    (gdpData as any)?.annual?.response?.data ??
    [];
  const annualGdpExpenditureRows =
    (gdpData as any)?.annualExpenditure?.response?.data ??
    (gdpData as any)?.annual?.response?.data ??
    [];
  const annualGdpProductionLatest = annualGdpProductionRows
    .map((row: any) => {
      const year = parseYearValue(row.key?.[0]);
      return { year, value: Number(row.values?.[0]) };
    })
    .filter((row: any) => Number.isFinite(row.year) && Number.isFinite(row.value))
    .sort((a: any, b: any) => b.year - a.year)[0];
  const annualGdpExpenditureLatest = annualGdpExpenditureRows
    .map((row: any) => {
      const year = parseYearValue(row.key?.[0]);
      return { year, value: Number(row.values?.[0]) };
    })
    .filter((row: any) => Number.isFinite(row.year) && Number.isFinite(row.value))
    .sort((a: any, b: any) => b.year - a.year)[0];

  const quarterlyGdpProductionRows =
    (gdpData as any)?.quarterlyProduction?.response?.data ??
    (gdpData as any)?.quarterly?.response?.data ??
    [];
  const quarterlyGdpExpenditureRows =
    (gdpData as any)?.quarterlyExpenditure?.response?.data ??
    (gdpData as any)?.quarterly?.response?.data ??
    [];
  const quarterlyGdpProductionLatest = quarterlyGdpProductionRows
    .map((row: any) => {
      const parsed = parseQuarterValue(row.key?.[0]);
      return { year: parsed?.year, quarter: parsed?.quarter, value: Number(row.values?.[0]) };
    })
    .filter(
      (row: any) =>
        Number.isFinite(row.year) && Number.isFinite(row.quarter) && Number.isFinite(row.value)
    )
    .sort((a: any, b: any) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.quarter - a.quarter;
    })[0];
  const quarterlyGdpExpenditureLatest = quarterlyGdpExpenditureRows
    .map((row: any) => {
      const parsed = parseQuarterValue(row.key?.[0]);
      return { year: parsed?.year, quarter: parsed?.quarter, value: Number(row.values?.[0]) };
    })
    .filter(
      (row: any) =>
        Number.isFinite(row.year) && Number.isFinite(row.quarter) && Number.isFinite(row.value)
    )
    .sort((a: any, b: any) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.quarter - a.quarter;
    })[0];

  const kpis: KPIEntry[] = [
    {
      key: "CPI",
      title: "CPI (Inflation)",
      currentValue: latestCpi?.value ?? null,
      value: latestCpi ? `${latestCpi.value.toFixed(1)}%` : "—",
      periodLabel: latestCpi ? formatMonthWord(latestCpi.month) : undefined,
      prevValue: prevCpi?.value ?? null,
      prevLabel: prevCpi ? formatMonthWord(prevCpi.month) : undefined,
      deltaType: "pp",
      positiveIsGood: false,
      icon: Flame,
    },
    {
      key: "PPI",
      title: "PPI",
      currentValue: latestPpi?.value ?? null,
      value: latestPpi ? `${latestPpi.value.toFixed(1)}%` : "—",
      periodLabel: latestPpi ? formatMonthWord(latestPpi.month) : undefined,
      prevValue: prevPpi?.value ?? null,
      prevLabel: prevPpi ? formatMonthWord(prevPpi.month) : undefined,
      deltaType: "pp",
      positiveIsGood: false,
      icon: Factory,
    },
    {
      key: "IIP",
      title: "IIP",
      currentValue: latestIip?.value ?? null,
      value: latestIip ? `${Number(latestIip.value).toFixed(1)}%` : "—",
      periodLabel: latestIip ? `${latestIip.quarterRaw}` : undefined,
      prevValue: prevIip?.value ?? null,
      prevLabel: prevIip ? `${prevIip.quarterRaw}` : undefined,
      deltaType: "pp",
      positiveIsGood: true,
      icon: Factory,
    },
    {
      key: "PBCI",
      title: "PBCI",
      currentValue: latestPbci?.value ?? null,
      value: latestPbci ? `${latestPbci.value.toFixed(1)}%` : "—",
      periodLabel: latestPbci ? formatMonthWord(latestPbci.month) : undefined,
      prevValue: prevPbci?.value ?? null,
      prevLabel: prevPbci ? formatMonthWord(prevPbci.month) : undefined,
      deltaType: "pp",
      positiveIsGood: false,
      icon: BriefcaseBusiness,
    },
    {
      key: "GDP",
      title: "GDP",
      value: "—",
      currentValue: null,
      // Quarterly values include % for display consistency
      gdpProductionQuarterlyValue: quarterlyGdpProductionLatest
        ? `${quarterlyGdpProductionLatest.value.toFixed(1)}%`
        : "—",
      gdpProductionQuarterlyPeriod: quarterlyGdpProductionLatest
        ? `${quarterlyGdpProductionLatest.year} Q${quarterlyGdpProductionLatest.quarter}`
        : "—",
      gdpProductionAnnualValue: annualGdpProductionLatest
        ? `${annualGdpProductionLatest.value.toFixed(1)}%`
        : "—",
      gdpProductionYear: annualGdpProductionLatest
        ? String(annualGdpProductionLatest.year)
        : "—",
      gdpExpenditureQuarterlyValue: quarterlyGdpExpenditureLatest
        ? `${quarterlyGdpExpenditureLatest.value.toFixed(1)}%`
        : "—",
      gdpExpenditureQuarterlyPeriod: quarterlyGdpExpenditureLatest
        ? `${quarterlyGdpExpenditureLatest.year} Q${quarterlyGdpExpenditureLatest.quarter}`
        : "—",
      gdpExpenditureAnnualValue: annualGdpExpenditureLatest
        ? `${annualGdpExpenditureLatest.value.toFixed(1)}%`
        : "—",
      gdpExpenditureYear: annualGdpExpenditureLatest
        ? String(annualGdpExpenditureLatest.year)
        : "—",
      icon: BarChart3,
    },
    {
      key: "MIEG",
      title: "MIEG",
      currentValue: latestMieg?.value ?? null,
      value: latestMieg ? `${latestMieg.value.toFixed(1)}%` : "—",
      periodLabel: latestMieg ? formatMonthWord(latestMieg.month) : undefined,
      prevValue: prevMieg?.value ?? null,
      prevLabel: prevMieg ? formatMonthWord(prevMieg.month) : undefined,
      deltaType: "pp",
      positiveIsGood: true,
      icon: LineChart,
    },
    // Unemployment Rate — Ghana Statistical Service Q3 2025 Labour Force Survey
    {
      key: "UNEMP",
      title: "Unemployment Rate",
      currentValue: 13.0,
      value: "13.0%",
      periodLabel: "GSS LFS · Q3 2025",
      prevValue: 12.6,
      prevLabel: "Q2 2025",
      deltaType: "pp",
      positiveIsGood: false,
      icon: Briefcase,
    },
    {
      key: "POP",
      title: "Projected Population",
      currentValue:
        projectedNational && Number.isFinite(Number(projectedNational.values?.[0]))
          ? Number(projectedNational.values[0])
          : null,
      value:
        projectedNational && Number.isFinite(Number(projectedNational.values?.[0]))
          ? `${Number(projectedNational.values[0]).toLocaleString()}`
          : "—",
      periodLabel: preferredYear ? String(preferredYear.year) : undefined,
      deltaType: "raw",
      icon: Users,
    },
    
    // Multidimensional Poverty Index — Ghana Statistical Service MPI Report (Q3 2025)
    // Source: https://www.myjoyonline.com/multidimensional-poverty-drops-to-21-9-in-ghana-gss/
    {
      key: "MPI",
      title: "Multidimensional Poverty",
      currentValue: 21.9,
      value: "21.9%",
      periodLabel: "GSS · Q3 2025",
      prevValue: 23.9,
      prevLabel: "Q1 2025",
      deltaType: "pp",
      positiveIsGood: false,
      icon: Scale,
    },
    // Food Insecurity — Ghana Statistical Service Quarterly Food Insecurity Report (Q3 2025)
    // Source: https://www.myjoyonline.com/food-insecurity-rises-to-38-1-12-5m-ghanaians-struggle-to-access-food-gss/
    {
      key: "FOOD",
      title: "Food Insecurity",
      currentValue: 38.1,
      value: "38.1%",
      periodLabel: "GSS · Q3 2025",
      prevValue: 35.3,
      prevLabel: "Q1 2024",
      deltaType: "pp",
      positiveIsGood: false,
      icon: Wheat,
    },
  ];

  const gdpCard = kpis.find((item) => item.key === "GDP");
  const smallCards = kpis.filter((item) => item.key !== "GDP");

  const topRowKeys = ["CPI", "PPI", "IIP", "PBCI"];
  const bottomRowKeys = ["MIEG", "UNEMP", "POP", "MPI", "FOOD"];

  const topRowCards = smallCards.filter((item) => topRowKeys.includes(item.key));
  const bottomRowCards = smallCards.filter((item) => bottomRowKeys.includes(item.key));

  return (
    <section className="bg-white py-4 sm:py-6">
      <Container>
        <div className="mt-6 space-y-6">
          {/*
           * CPI row — CPI, PPI, IIP, PBCI + GDP as the 5th card, all same height.
           * items-stretch ensures GDP card height matches its neighbours.
           * xl: 5-col  |  sm: 2-col (GDP is full-width on the last row at sm)
           */}
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {topRowCards.map(
              ({
                key,
                title,
                currentValue,
                value,
                periodLabel,
                icon: Icon,
                prevValue,
                prevLabel,
                deltaType,
                positiveIsGood,
              }) => (
                <Link key={key} href={CARD_LINKS[key] ?? "#"} className="block h-full min-w-0">
                  <StatsCard
                    indicatorKey={key}
                    title={title}
                    currentValue={currentValue}
                    valueDisplay={value}
                    periodLabel={periodLabel}
                    icon={Icon}
                    prevValue={prevValue}
                    prevLabel={prevLabel}
                    deltaType={deltaType as StatsCardProps["deltaType"]}
                    positiveIsGood={positiveIsGood}
                  />
                </Link>
              )
            )}
            {gdpCard ? (
              <Link href={CARD_LINKS["GDP"]} className="block h-full min-w-0">
                <GdpStatsCard
                  productionAnnual={{
                    label: "Annual",
                    value: gdpCard.gdpProductionAnnualValue ?? "—",
                    period: gdpCard.gdpProductionYear
                      ? `Year ${gdpCard.gdpProductionYear}`
                      : "—",
                  }}
                  productionQuarterly={{
                    label: "Quarterly",
                    value: gdpCard.gdpProductionQuarterlyValue ?? "—",
                    period: gdpCard.gdpProductionQuarterlyPeriod ?? "—",
                  }}
                  expenditureAnnual={{
                    label: "Annual",
                    value: gdpCard.gdpExpenditureAnnualValue ?? "—",
                    period: gdpCard.gdpExpenditureYear
                      ? `Year ${gdpCard.gdpExpenditureYear}`
                      : "—",
                  }}
                  expenditureQuarterly={{
                    label: "Quarterly",
                    value: gdpCard.gdpExpenditureQuarterlyValue ?? "—",
                    period: gdpCard.gdpExpenditureQuarterlyPeriod ?? "—",
                  }}
                />
              </Link>
            ) : null}
          </div>

          {/* MIEG row — 5 indicator + social cards  |  xl: 5-col  md: 3-col  sm: 2-col */}
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {bottomRowCards.map(
              ({
                key,
                title,
                currentValue,
                value,
                periodLabel,
                icon: Icon,
                prevValue,
                prevLabel,
                deltaType,
                positiveIsGood,
              }) => (
                <Link key={key} href={CARD_LINKS[key] ?? "#"} className="block h-full">
                  <StatsCard
                    indicatorKey={key}
                    title={title}
                    currentValue={currentValue}
                    valueDisplay={value}
                    periodLabel={periodLabel}
                    icon={Icon}
                    prevValue={prevValue}
                    prevLabel={prevLabel}
                    deltaType={deltaType as StatsCardProps["deltaType"]}
                    positiveIsGood={positiveIsGood}
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
