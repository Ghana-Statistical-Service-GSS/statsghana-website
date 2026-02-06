import type { ReactNode } from "react";
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
  Users,
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

function getLatestMonthValue(
  rows: Array<{ key: string[]; values: string[] }>,
  monthIndex: number
) {
  let latest: { month: string; value: number } | null = null;
  rows.forEach((row) => {
    const month = row.key?.[monthIndex];
    const numeric = Number(row.values?.[0]);
    if (!month || !Number.isFinite(numeric)) return;
    const parsed = parseMonthValue(month);
    if (!parsed) return;
    if (
      !latest ||
      parsed.year > parseMonthValue(latest.month)!.year ||
      (parsed.year === parseMonthValue(latest.month)!.year &&
        parsed.month > parseMonthValue(latest.month)!.month)
    ) {
      latest = { month, value: numeric };
    }
  });
  return latest;
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
  gdpQuarterlyValue?: string;
  gdpQuarterlyPeriod?: string;
  gdpYearlyValue?: string;
  gdpYear?: string;
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
      className={`relative h-full min-h-[160px] w-full overflow-hidden border ${theme.borderClass} p-0 shadow-lg transition hover:shadow-xl`}
    >
      <div className={`absolute inset-0 ${theme.bgGradient}`} />
      <div
        className={`pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full blur-3xl ${theme.glowClass}`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl ${theme.glowClass}`}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      <div className="relative flex h-full flex-col items-center gap-4 p-5 text-center">
        <div className="flex items-start justify-between">
          <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 ${theme.iconBgClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className={`text-xs font-semibold uppercase tracking-wide ${theme.accentTextClass}`}>
            {indicatorKey}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p
            className={[
              "text-3xl font-extrabold leading-none text-slate-900 sm:text-4xl",
              indicatorKey === "POP" ? "tracking-tight tabular-nums sm:text-5xl" : "",
            ].join(" ")}
          >
            {valueDisplay}
          </p>
          {periodLabel ? (
            <p className="text-xs text-slate-500">
              {title} · {periodLabel}
            </p>
          ) : null}
        </div>
        {children ? (
          <div className="border-t border-white/50 pt-3">{children}</div>
        ) : null}
        {showDelta ? (
          <div className="mt-auto flex items-center justify-center gap-2 border-t border-white/50 pt-3 text-xs text-slate-600">
            <span
              className={`inline-flex items-center gap-1 font-semibold ${trendColor}`}
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
            <span className="text-slate-500">
              vs {prevLabel ?? "previous"}
            </span>
          </div>
        ) : null}
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

  const annualGdpRows = (gdpData as any)?.annual?.response?.data ?? [];
  const annualGdpLatest = annualGdpRows
    .map((row: any) => {
      const year = parseYearValue(row.key?.[0]);
      return {
        year,
        value: Number(row.values?.[0]),
      };
    })
    .filter((row: any) => Number.isFinite(row.year) && Number.isFinite(row.value))
    .sort((a: any, b: any) => b.year - a.year)[0];

  const quarterlyGdpRows = (gdpData as any)?.quarterly?.response?.data ?? [];
  const quarterlyGdpLatest = quarterlyGdpRows
    .map((row: any) => {
      const parsed = parseQuarterValue(row.key?.[0]);
      return {
        year: parsed?.year,
        quarter: parsed?.quarter,
        value: Number(row.values?.[0]),
      };
    })
    .filter(
      (row: any) =>
        Number.isFinite(row.year) &&
        Number.isFinite(row.quarter) &&
        Number.isFinite(row.value)
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
      gdpQuarterlyValue: quarterlyGdpLatest
        ? quarterlyGdpLatest.value.toFixed(1)
        : "—",
      gdpQuarterlyPeriod: quarterlyGdpLatest
        ? `${quarterlyGdpLatest.year} Q${quarterlyGdpLatest.quarter}`
        : "—",
      gdpYearlyValue: annualGdpLatest ? annualGdpLatest.value.toFixed(1) : "—",
      gdpYear: annualGdpLatest ? String(annualGdpLatest.year) : "—",
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
    {
      key: "UNEMP",
      title: "Unemployment Rate",
      currentValue: 12.8,
      value: "12.8%",
      periodLabel: "Unemployment Rate",
      deltaType: "pp",
      positiveIsGood: true,
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
  ];

  const gdpCard = kpis.find((item) => item.key === "GDP");
  const smallCards = kpis.filter((item) => item.key !== "GDP");
  const topRowKeys = ["CPI", "PPI", "IIP", "PBCI"];
  const bottomRowKeys = ["MIEG", "UNEMP", "POP"];
  const topRowCards = smallCards.filter((item) => topRowKeys.includes(item.key));
  const bottomRowCards = smallCards.filter((item) => bottomRowKeys.includes(item.key));

  return (
    <section className="bg-white py-4 sm:py-6">
      <Container>
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <div className="space-y-6">
              <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
                    <StatsCard
                      key={key}
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
                  )
                )}
              </div>
              <div className="flex justify-center">
                <div className="grid w-full max-w-5xl grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
                      <StatsCard
                        key={key}
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
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {gdpCard ? (
              <GdpStatsCard
                productionAnnual={{
                  label: "Annual GDP",
                  value: gdpCard.gdpYearlyValue ?? "—",
                  period: gdpCard.gdpYear ? `Year ${gdpCard.gdpYear}` : "—",
                }}
                productionQuarterly={{
                  label: "Quarterly GDP",
                  value: gdpCard.gdpQuarterlyValue ?? "—",
                  period: gdpCard.gdpQuarterlyPeriod ?? "—",
                }}
                expenditureAnnual={{
                  label: "Annual GDP",
                  value: "5.7",
                  period: "Year 2026",
                }}
                expenditureQuarterly={{
                  label: "Quarterly GDP",
                  value: "6.5",
                  period: "2025 Q2",
                }}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
