"use client";

import { useEffect, useRef, useState } from "react";
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
import { INDICATORS, Indicator, INDICATOR_TOOLTIPS } from "../lib/indicators";
import { indicatorSeries } from "../lib/mockIndicators";

export default function KeyIndicators() {
  const [active, setActive] = useState<Indicator>("CPI");
  const series = indicatorSeries[active];
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<Indicator, HTMLButtonElement | null>>(
    {} as Record<Indicator, HTMLButtonElement | null>
  );
  const [slider, setSlider] = useState({ left: 0, width: 0 });
  const [hovered, setHovered] = useState<Indicator | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
            {INDICATORS.map((tab) => (
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
                  {indicatorSeries[tab].label}
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
                {INDICATOR_TOOLTIPS[hovered]}
              </div>,
              document.body
            )
          : null}
        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{series.label}</p>
              <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                Daily View <ChevronDown className="h-3 w-3" />
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
