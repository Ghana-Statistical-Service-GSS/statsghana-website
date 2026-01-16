"use client";

import { useEffect, useRef, useState } from "react";
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
import { INDICATORS, Indicator } from "../lib/indicators";
import { indicatorSeries } from "../lib/mockIndicators";

export default function KeyIndicators() {
  const [active, setActive] = useState<Indicator>("CPI");
  const series = indicatorSeries[active];
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<Indicator, HTMLButtonElement | null>>(
    {} as Record<Indicator, HTMLButtonElement | null>
  );
  const [slider, setSlider] = useState({ left: 0, width: 0 });

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

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionTitle
          title="Key Indicators"
          subtitle="Explore Ghana's key economic and industrial performance metrics. Switch between visualized dashboards to gain deeper insight into current trends."
        />
        <div className="no-scrollbar mt-6 flex justify-center overflow-x-auto">
          <div
            ref={containerRef}
            className="relative inline-flex min-w-max items-center rounded-full bg-slate-100 p-1"
          >
            <div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300"
              style={{ left: slider.left, width: slider.width }}
            />
            {INDICATORS.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                type="button"
                onClick={() => setActive(tab)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === active
                    ? "text-indigo-700"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{series.label}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                Time Series Data <ChevronDown className="h-3 w-3" />
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-400">2025</div>
          </div>
          <div className="mt-6 h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={series.data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis tickLine={false} axisLine={false} fontSize={10} width={30} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#E2E8F0",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3C2FA3"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
