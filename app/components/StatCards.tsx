import {
  BarChart3,
  Briefcase,
  BriefcaseBusiness,
  Factory,
  Flame,
  LineChart,
  Users,
} from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import cpiData from "../lib/cpiData.json";
import ppiData from "../lib/ppiData.json";
import iipData from "../lib/iipData.json";
import miegData from "../lib/miegData.json";
import pbciData from "../lib/pbciData.json";
import projectionData from "../lib/projectionData.json";
import gdpData from "../lib/gdpData.json";

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

type LatestMonthValue = { month: string; value: number } | null;

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

export default function StatCards() {
  const cpiRows = (cpiData as any)?.response?.data ?? [];
  const cpiColumns = (cpiData as any)?.response?.columns ?? [];
  const cpiIndicatorIdx = cpiColumns.findIndex((c: any) => c.code === "Indicator");
  const cpiMonthIdx = cpiColumns.findIndex((c: any) => c.code === "Month");
  const cpiRegionIdx = cpiColumns.findIndex((c: any) => c.code === "Region");
  const latestCpi = getLatestMonthValue(
    cpiRows.filter(
      (row: any) =>
        row.key?.[cpiIndicatorIdx] === "Year-on-year inflation (%)" &&
        row.key?.[cpiRegionIdx]?.toLowerCase?.() === "ghana"
    ),
    cpiMonthIdx
  ) as LatestMonthValue;

  const ppiRows = (ppiData as any)?.response?.data ?? [];
  const ppiColumns = (ppiData as any)?.response?.columns ?? [];
  const ppiIndicatorIdx = ppiColumns.findIndex((c: any) => c.code === "Indicator");
  const ppiMonthIdx = ppiColumns.findIndex((c: any) => c.code === "Month");
  const latestPpi = getLatestMonthValue(
    ppiRows.filter((row: any) => row.key?.[ppiIndicatorIdx] === "Year-on-year PPI change (%)"),
    ppiMonthIdx
  ) as LatestMonthValue;

  const iipRows = (iipData as any)?.response?.data ?? [];
  const latestIip = iipRows
    .map((row: any) => ({
      quarter: row.key?.[0],
      value: Number(row.values?.[0]),
    }))
    .filter((row: any) => row.quarter && Number.isFinite(row.value))
    .sort((a: any, b: any) => {
      const aMatch = String(a.quarter).match(/(\d{4})\D*Q(\d)/i);
      const bMatch = String(b.quarter).match(/(\d{4})\D*Q(\d)/i);
      const aYear = aMatch ? Number(aMatch[1]) : 0;
      const bYear = bMatch ? Number(bMatch[1]) : 0;
      const aQ = aMatch ? Number(aMatch[2]) : 0;
      const bQ = bMatch ? Number(bMatch[2]) : 0;
      if (aYear !== bYear) return bYear - aYear;
      return bQ - aQ;
    })[0];

  const miegRows = (miegData as any)?.response?.data ?? [];
  const miegColumns = (miegData as any)?.response?.columns ?? [];
  const miegSeriesIdx = miegColumns.findIndex((c: any) => c.code === "GDP_Series");
  const miegVariableIdx = miegColumns.findIndex((c: any) => c.code === "Variable");
  const miegMonthIdx = miegColumns.findIndex((c: any) => c.code === "Month");
  const latestMieg = getLatestMonthValue(
    miegRows.filter(
      (row: any) =>
        row.key?.[miegSeriesIdx] === "MIEG Index Growth (year-on-year %)" &&
        (miegVariableIdx === -1 ||
          row.key?.[miegVariableIdx] === "Total MIEG")
    ),
    miegMonthIdx
  ) as LatestMonthValue;

  const pbciRows = (pbciData as any)?.PBCI?.National ?? [];
  const latestPbci =
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
      })[0] ?? null;

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

  const kpis = [
    {
      key: "CPI",
      title: "CPI (Inflation)",
      value: latestCpi ? `${latestCpi.value.toFixed(1)}%` : "—",
      sub: latestCpi ? `Inflation - ${formatMonthWord(latestCpi.month)}` : undefined,
      icon: Flame,
    },
    {
      key: "PPI",
      title: "PPI",
      value: latestPpi ? `${latestPpi.value.toFixed(1)}%` : "—",
      sub: latestPpi
        ? `Producer Price Index - ${formatMonthWord(latestPpi.month)}`
        : undefined,
      icon: Factory,
    },
    {
      key: "IIP",
      title: "IIP",
      value: latestIip ? `${Number(latestIip.value).toFixed(1)}%` : "—",
      sub: latestIip ? `Index of Industrial Production - ${latestIip.quarter}` : undefined,
      icon: Factory,
    },
    {
      key: "PBCI",
      title: "PBCI",
      value: latestPbci ? `${latestPbci.value.toFixed(1)}%` : "—",
      sub: latestPbci
        ? `Prime Building Cost Index - ${formatMonthWord(latestPbci.month)}`
        : undefined,
      icon: BriefcaseBusiness,
    },
    {
      key: "GDP",
      title: "GDP",
      value: "—",
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
      value: latestMieg ? `${latestMieg.value.toFixed(1)}%` : "—",
      sub: latestMieg
        ? `Monthly Index of Economic Growth - ${formatMonthWord(latestMieg.month)}`
        : undefined,
      icon: LineChart,
    },
    {
      key: "UNEMP",
      title: "Unemployment",
      value: "12.8%",
      sub: "Unemployment Rate",
      icon: Briefcase,
    },
    {
      key: "POP",
      title: "Projected Population",
      value:
        projectedNational && Number.isFinite(Number(projectedNational.values?.[0]))
          ? `${Number(projectedNational.values[0]).toLocaleString()}`
          : "—",
      sub: preferredYear ? `Projected Population - ${preferredYear.year}` : undefined,
      icon: Users,
    },
  ];

  const primaryCards = kpis.slice(0, -3);
  const tailCards = kpis.slice(-3);

  return (
    <section className="bg-white py-6 sm:py-8">
      <Container>
        <div className="grid w-full items-stretch justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {primaryCards.map(
            ({
              key,
              title,
              value,
              sub,
              icon: Icon,
              gdpQuarterlyValue,
              gdpQuarterlyPeriod,
              gdpYearlyValue,
              gdpYear,
            }) => (
            <Card
              key={key}
              className="flex h-full min-h-[140px] w-full items-center gap-3 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{title}</p>
                {key === "GDP" ? (
                  <div className="mt-2 grid gap-3 text-slate-700 md:grid-cols-2 md:items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Quarterly GDP
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {gdpQuarterlyValue ?? value}
                      </p>
                      <p className="text-[10px] leading-tight text-slate-400">
                        {gdpQuarterlyPeriod ?? "2024 Q1"}
                      </p>
                    </div>
                    <div className="border-t border-slate-200 pt-3 md:border-t-0 md:border-l md:pl-3 md:pt-0">
                      <p className="text-xs font-semibold text-slate-500">
                        Annual GDP
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {gdpYearlyValue ?? value}
                      </p>
                      <p className="text-[10px] leading-tight text-slate-400">
                        {gdpYear ? `Year ${gdpYear}` : "Year 2024"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                    {sub ? (
                      <p className="text-[10px] text-slate-400">{sub}</p>
                    ) : null}
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {tailCards.map(({ key, title, value, sub, icon: Icon }, index) => (
              <Card
                key={key}
                className={[
                  "flex h-full min-h-[140px] w-full items-center gap-3 p-4",
                  ["lg:col-start-2", "lg:col-start-3", "lg:col-start-4"][index] ?? "",
                ].join(" ")}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">{title}</p>
                  <p className="text-lg font-bold text-slate-900">{value}</p>
                  {sub ? (
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  ) : null}
                </div>
              </Card>
            ))}
        </div>
      </Container>
    </section>
  );
}
