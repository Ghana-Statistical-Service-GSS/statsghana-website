"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";
import TabPills from "./TabPills";
import GhanaMap from "./GhanaMap";
import { INDICATORS, INDICATOR_LABELS, Indicator } from "../lib/indicators";

export default function Hero() {
  const [indicator, setIndicator] = useState<Indicator>("CPI");
  const [mode, setMode] = useState<"regions" | "districts">("regions");
  const heroBg = "/images/hero-population.png";
  const HERO_HEIGHT = "lg:h-[420px]";

  const indicatorLabels = INDICATORS.map((id) => INDICATOR_LABELS[id]);
  const labelToId = Object.fromEntries(
    INDICATORS.map((id) => [INDICATOR_LABELS[id], id])
  ) as Record<string, Indicator>;

  return (
    <section className="relative overflow-visible bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_440px] lg:gap-6">
          <div className={`relative h-[300px] w-full overflow-hidden rounded-2xl bg-slate-100 ${HERO_HEIGHT}`}>
            <Image
              src={heroBg}
              alt="Hero"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

            <button
              type="button"
              aria-label="Previous"
              className="absolute left-0 top-1/2 z-30 hidden h-20 w-16 -translate-y-1/2 items-center justify-center rounded-r-md bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/35 lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="absolute right-0 top-1/2 z-30 hidden h-20 w-16 -translate-y-1/2 items-center justify-center rounded-l-md bg-white/25 text-white backdrop-blur-sm transition hover:bg-white/35 lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute left-6 bottom-20 z-20">
              <div className="inline-flex items-center rounded-md bg-indigo-600/55 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-semibold text-white sm:text-base whitespace-nowrap">
                  Inflation Rate stands at 5.4% in December 2024
                </span>
              </div>
            </div>
            <div className="absolute left-6 bottom-6 z-20">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-800"
              >
                Read More <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className={`mt-6 w-full lg:mt-0 lg:justify-self-end ${HERO_HEIGHT}`}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Ghana at a Glance
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {INDICATOR_LABELS[indicator]}
              </span>
            </div>
            <div className="h-full">
              <GhanaMap indicator={indicator} mode={mode} onModeChange={setMode} />
            </div>
            <div className="no-scrollbar mt-4 w-full overflow-x-auto">
              <TabPills
                tabs={indicatorLabels}
                active={INDICATOR_LABELS[indicator]}
                onChange={(value) => {
                  const next = labelToId[value];
                  if (next) {
                    setIndicator(next);
                  }
                }}
                className="min-w-max"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
