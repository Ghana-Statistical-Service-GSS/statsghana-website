"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";
import GhanaMap from "./GhanaMap";
import { INDICATORS, INDICATOR_LABELS, INDICATOR_TOOLTIPS, Indicator } from "../lib/indicators";

export default function Hero() {
  const [indicator, setIndicator] = useState<Indicator>("CPI");
  const [mode, setMode] = useState<"regions" | "districts">("regions");
  const HERO_HEIGHT = "lg:h-[420px]";
  const slides = [
    {
      src: "/images/cpi.png",
      title: "Inflation Rate",
      subtitle: "Check out the latest Inflation rate",
    },
    {
      src: "/images/ASD 2025 GOVERNANCE BANNER.jpg",
      title: "ASD 2025 Governance",
      subtitle: "Strengthening governance data for evidence-based decisions.",
    },
    {
      src: "/images/GDP BANNER copy 1.png",
      title: "GDP Performance",
      subtitle: "Track Ghana’s growth trajectory with updated GDP indicators.",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  const indicatorLabels = INDICATORS.map((id) => INDICATOR_LABELS[id]);
  const labelToId = Object.fromEntries(
    INDICATORS.map((id) => [INDICATOR_LABELS[id], id])
  ) as Record<string, Indicator>;
  const labelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!hoveredLabel) return;
    const target = labelRefs.current[hoveredLabel];
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
  }, [hoveredLabel]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative overflow-visible bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_460px] lg:gap-6">
          <div className={`relative h-[300px] w-full overflow-hidden rounded-2xl bg-slate-100 ${HERO_HEIGHT}`}>
            <Image
              src={slides[activeSlide].src}
              alt={slides[activeSlide].title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
              }
              className="absolute left-4 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 lg:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 lg:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute left-6 bottom-6 z-20">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-800"
              >
                Read More <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <div className={`relative h-[300px] ${HERO_HEIGHT}`}>
              <div className="pointer-events-none absolute left-0 right-0 top-2 z-10 px-2">
                <div className="grid grid-cols-3 items-center">
                  <div />
                  <h3 className="text-center text-sm font-semibold text-slate-700">
                    Ghana at a Glance
                  </h3>
                  <div className="text-right text-xs font-semibold text-slate-400">
                    {INDICATOR_LABELS[indicator]}
                  </div>
                </div>
              </div>
              <GhanaMap indicator={indicator} mode={mode} onModeChange={setMode} />
            </div>
            <div className="mt-4">
              <div className="no-scrollbar flex gap-2 overflow-x-auto overflow-y-visible">
                {indicatorLabels.map((label) => {
                  const isActive = labelToId[label] === indicator;
                  return (
                    <div key={label} className="group relative">
                      <button
                        ref={(el) => {
                          labelRefs.current[label] = el;
                        }}
                        type="button"
                        onClick={() => {
                          const next = labelToId[label];
                          if (next) {
                            setIndicator(next);
                          }
                        }}
                        onMouseEnter={() => setHoveredLabel(label)}
                        onMouseLeave={() => setHoveredLabel(null)}
                        className={`min-h-[40px] max-w-[140px] rounded-full px-3 py-2 text-center text-xs font-semibold leading-tight transition whitespace-normal ${
                          isActive
                            ? "bg-purple-700 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:text-purple-700"
                        }`}
                      >
                        {label}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {hoveredLabel && typeof window !== "undefined"
              ? createPortal(
                  <div
                    className="pointer-events-none fixed z-[999] w-60 rounded-md bg-slate-900 px-3 py-2 text-[11px] leading-relaxed text-white shadow-lg"
                    style={{ left: tooltipPos.x, top: tooltipPos.y }}
                  >
                    {INDICATOR_TOOLTIPS[labelToId[hoveredLabel]]}
                  </div>,
                  document.body
                )
              : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
