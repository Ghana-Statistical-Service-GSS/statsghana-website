"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { Indicator, INDICATOR_TOOLTIPS } from "../lib/indicators";
import cpiData from "../lib/cpiData.json";
import ppiData from "../lib/ppiData.json";
import iipData from "../lib/iipData.json";
import pbciData from "../lib/pbciData.json";
import miegData from "../lib/miegData.json";
import {
  buildMonthlySeriesFromNationalArray,
  buildMonthlySeriesFromPxweb,
  buildQuarterSeriesFromPxweb,
  extractYearsFromPxweb,
  extractYearsFromPxwebQuarter,
  getLatestYear,
} from "../lib/indicatorSeries";

const INDICATOR_CONFIG = {
  CPI: {
    label: "CPI",
    rows: (cpiData as any)?.response?.data ?? [],
    columns: (cpiData as any)?.response?.columns ?? [],
    monthIndex: (cpiData as any)?.response?.columns?.findIndex((c: any) => c.code === "Month") ?? 0,
    indicatorIndex:
      (cpiData as any)?.response?.columns?.findIndex((c: any) => c.code === "Indicator") ?? 1,
    indicatorValue: "Year-on-year inflation (%)",
    regionIndex:
      (cpiData as any)?.response?.columns?.findIndex((c: any) => c.code === "Region") ?? 2,
    regionValue: "Ghana",
  },
  PPI: {
    label: "PPI",
    rows: (ppiData as any)?.response?.data ?? [],
    columns: (ppiData as any)?.response?.columns ?? [],
    monthIndex: (ppiData as any)?.response?.columns?.findIndex((c: any) => c.code === "Month") ?? 0,
    indicatorIndex:
      (ppiData as any)?.response?.columns?.findIndex((c: any) => c.code === "Indicator") ?? 1,
    indicatorValue: "Year-on-year PPI change (%)",
  },
  IIP: {
    label: "IIP",
    rows: (iipData as any)?.response?.data ?? [],
    quarterIndex: 0,
  },
  PBCI: {
    label: "PBCI",
    rows: (pbciData as any)?.PBCI?.National ?? [],
    monthIndex: 0,
  },
  MIEG: {
    label: "MIEG",
    rows:
      ((miegData as any)?.response?.data ?? []).filter((row: any) => {
        const cols = (miegData as any)?.response?.columns ?? [];
        const variableIdx = cols.findIndex((c: any) => c.code === "Variable");
        if (variableIdx === -1) return true;
        return row.key?.[variableIdx] === "Total MIEG";
      }) ?? [],
    columns: (miegData as any)?.response?.columns ?? [],
    monthIndex: (miegData as any)?.response?.columns?.findIndex((c: any) => c.code === "Month") ?? 0,
    indicatorIndex:
      (miegData as any)?.response?.columns?.findIndex((c: any) => c.code === "GDP_Series") ?? 1,
    indicatorValue: "MIEG Index Growth (year-on-year %)",
  },
} as const;

type IndicatorKey = keyof typeof INDICATOR_CONFIG;

export default function KeyIndicators() {
  const [active, setActive] = useState<IndicatorKey>("CPI");
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<IndicatorKey, HTMLButtonElement | null>>(
    {} as Record<IndicatorKey, HTMLButtonElement | null>
  );
  const [slider, setSlider] = useState({ left: 0, width: 0 });
  const [hovered, setHovered] = useState<IndicatorKey | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const tabIndicators: IndicatorKey[] = ["CPI", "PPI", "IIP", "PBCI", "MIEG"];

  // Debug: inspect IIP quarter keys (remove if not needed)
  // console.log("[IIP sample keys]", (iipData as any)?.response?.data?.slice(0, 5).map((r: any) => r.key?.[0]));

  const availableYears = useMemo(() => {
    const config = INDICATOR_CONFIG[active];
    if (active === "PBCI") {
      const years = new Set<number>();
      config.rows.forEach((row: any) => {
        const year = Number(String(row.month).slice(0, 4));
        if (Number.isFinite(year)) years.add(year);
      });
      return Array.from(years).sort((a, b) => b - a);
    }
    if (active === "IIP") {
      return extractYearsFromPxwebQuarter(
        config.rows as any,
        (config as any).quarterIndex ?? 0
      );
    }
    const monthIndex = (config as any).monthIndex ?? 0;
    return extractYearsFromPxweb(config.rows as any, monthIndex);
  }, [active]);

  useEffect(() => {
    const latest = getLatestYear(availableYears);
    setActiveYear(latest);
  }, [availableYears]);

  const chartSeries = (() => {
    const config = INDICATOR_CONFIG[active];
    if (!activeYear) return [];
    if (active === "PBCI") {
      return buildMonthlySeriesFromNationalArray(
        config.rows as any,
        activeYear
      );
    }
    if (active === "IIP") {
      return buildQuarterSeriesFromPxweb(
        config.rows as any,
        {
          quarterIndex: (config as any).quarterIndex ?? 0,
        },
        activeYear
      );
    }
    return buildMonthlySeriesFromPxweb(
      config.rows as any,
      {
        monthIndex: (config as any).monthIndex ?? 0,
        indicatorIndex: (config as any).indicatorIndex,
        indicatorValue: (config as any).indicatorValue,
        regionIndex: (config as any).regionIndex,
        regionValue: (config as any).regionValue,
      },
      activeYear
    );
  })();

  useEffect(() => {
    const el = tabRefs.current[active];
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setSlider({
      left: elRect.left - containerRect.left,
      width: elRect.width,
    });
  }, [active]);

  useEffect(() => {
    if (!hovered) return;
    const target = tabRefs.current[hovered];
    if (!target) return;

    const updatePosition = () => {
      const rect = target.getBoundingClientRect();
      const tooltipWidth = 240;
      const tooltipHeight = 70;
      const x = Math.min(
        Math.max(8, rect.left + rect.width / 2 - tooltipWidth / 2),
        window.innerWidth - tooltipWidth - 8
      );
      const y = Math.max(8, rect.top - tooltipHeight - 10);
      setTooltipPos({ x, y });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [hovered]);

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionTitle
          title="Key Indicators"
          subtitle="Explore Ghana's key economic and industrial performance metrics. Switch between visualized dashboards to gain deeper insight into current trends."
        />
        <div className="no-scrollbar mt-6 flex justify-center overflow-x-auto overflow-y-visible">
          <div
            ref={containerRef}
            className="relative inline-flex min-w-max items-center rounded-full bg-slate-100 p-1"
            style={{ overflow: "visible" }}
          >
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300"
              style={{ left: slider.left, width: slider.width }}
            />
            {tabIndicators.map((tab) => (
              <div key={tab} className="relative">
                <button
                  ref={(el) => {
                    tabRefs.current[tab] = el;
                  }}
                  type="button"
                  onClick={() => setActive(tab)}
                  onMouseEnter={() => setHovered(tab)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    tab === active
                      ? "text-indigo-700"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {INDICATOR_CONFIG[tab].label}
                </button>
              </div>
            ))}
          </div>
        </div>
        {hovered && typeof window !== "undefined"
          ? createPortal(
              <div
                className="pointer-events-none fixed z-[999] w-60 rounded-md bg-slate-900 px-3 py-2 text-[11px] leading-relaxed text-white shadow-lg"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                {INDICATOR_TOOLTIPS[hovered as Indicator]}
              </div>,
              document.body
            )
          : null}
        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {INDICATOR_CONFIG[active].label}
              </p>
              <div className="mt-1 inline-flex items-center gap-2 text-xs text-slate-400">
                <span>Year</span>
                <div className="relative">
                  <select
                    value={activeYear ?? ""}
                    onChange={(event) => setActiveYear(Number(event.target.value))}
                    className="appearance-none rounded-full border border-slate-200 bg-white px-2 py-1 pr-6 text-xs text-slate-600"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-400">
              {activeYear ?? ""}
            </div>
          </div>
          <div className="mt-6 h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartSeries}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} width={30} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#E2E8F0",
                    fontSize: 12,
                  }}
                  formatter={(value: number | string) => {
                    const numeric =
                      typeof value === "number" ? value : Number(value);
                    return Number.isFinite(numeric)
                      ? numeric.toFixed(1)
                      : "—";
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3C2FA3"
                  strokeWidth={2}
                  dot={false}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
