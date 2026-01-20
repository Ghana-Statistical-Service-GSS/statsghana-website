"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildPathD,
  computeBounds,
  createProjector,
  FeatureCollection,
  getFeatureName,
  isValidGeometry,
} from "../lib/geojsonToSvg";
import { Indicator } from "../lib/indicators";
import { getStableValue, mockIndicatorData } from "../lib/mockMapData";

const VIEW_WIDTH = 420;
const VIEW_HEIGHT = 520;
const COLOR_BUCKETS = ["#EAE6F9", "#D2CAF3", "#B1A2E8", "#7E6AD8", "#3C2FA3"];
const NATIONAL_VALUES: Record<Indicator, { value: string }> = {
  CPI: { value: "5.4%" },
  MIEG: { value: "3.8%" },
  PPI: { value: "3.1%" },
  PBCI: { value: "4.2%" },
  IIP: { value: "2.6%" },
  POP2021: { value: "30.8M" },
  IBES: { value: "1.2M" },
};

const STATSBANK_LINKS: Record<Indicator, string> = {
  CPI: "https://statsbank.statsghana.gov.gh/",
  MIEG: "https://statsbank.statsghana.gov.gh/",
  PPI: "https://statsbank.statsghana.gov.gh/",
  PBCI: "https://statsbank.statsghana.gov.gh/",
  IIP: "https://statsbank.statsghana.gov.gh/",
  POP2021: "https://statsbank.statsghana.gov.gh/",
  IBES: "https://statsbank.statsghana.gov.gh/",
};

interface GhanaMapProps {
  indicator: Indicator;
  mode?: "regions" | "districts";
  onModeChange?: (mode: "regions" | "districts") => void;
}

interface TooltipState {
  name: string;
  value: number;
}

export default function GhanaMap({
  indicator,
  mode = "regions",
  onModeChange,
}: GhanaMapProps) {
  const [regionsData, setRegionsData] = useState<FeatureCollection | null>(null);
  const [districtsData, setDistrictsData] = useState<FeatureCollection | null>(
    null
  );
  const [hovered, setHovered] = useState<TooltipState | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const [regionsResponse, districtsResponse] = await Promise.all([
          fetch("/Regions.gh.json"),
          fetch("/District.gh.json"),
        ]);
        const regionsJson = (await regionsResponse.json()) as FeatureCollection;
        const districtsJson = (await districtsResponse.json()) as FeatureCollection;
        if (isActive) {
          setRegionsData(regionsJson);
          setDistrictsData(districtsJson);
        }
      } catch (error) {
        if (isActive) {
          setRegionsData(null);
          setDistrictsData(null);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, []);

  const activeFeatures = useMemo(() => {
    const source = mode === "districts" ? districtsData : regionsData;
    const features = source?.features ?? [];
    return features.filter((feature) => isValidGeometry(feature.geometry));
  }, [mode, regionsData, districtsData]);

  const paths = useMemo(() => {
    if (!activeFeatures.length) return [];
    const bounds = computeBounds(activeFeatures);
    const projector = createProjector(bounds, VIEW_WIDTH, VIEW_HEIGHT, 18);

    const mapped = activeFeatures
      .map((feature) => {
        if (!isValidGeometry(feature.geometry)) return null;
        const name = getFeatureName(feature.properties ?? undefined);
        const d = buildPathD(feature.geometry, projector);
        return { name, d };
      })
      .filter((item): item is { name: string; d: string } => Boolean(item));

    if (process.env.NODE_ENV !== "production") {
      const skipped = (mode === "districts" ? districtsData : regionsData)?.features.filter(
        (feature) => !isValidGeometry(feature.geometry)
      ).length;
      if (skipped) {
        console.warn(
          `[GhanaMap] Skipped ${skipped} features with null/invalid geometry`
        );
      }
    }

    return mapped;
  }, [activeFeatures, mode, districtsData, regionsData]);

  const { valueByName, minValue, maxValue } = useMemo(() => {
    const map = new Map<string, number>();
    let min = Infinity;
    let max = -Infinity;
    const indicatorData = mockIndicatorData[indicator] as Record<string, number>;

    paths.forEach(({ name }) => {
      const value = indicatorData[name] ?? getStableValue(name, indicator);
      map.set(name, value);
      min = Math.min(min, value);
      max = Math.max(max, value);
    });

    if (min === Infinity || max === -Infinity) {
      min = 0;
      max = 1;
    }

    return { valueByName: map, minValue: min, maxValue: max };
  }, [indicator, paths]);

  const getColor = (value: number) => {
    if (maxValue === minValue) return COLOR_BUCKETS[2];
    const t = (value - minValue) / (maxValue - minValue);
    const idx = Math.min(COLOR_BUCKETS.length - 1, Math.floor(t * COLOR_BUCKETS.length));
    return COLOR_BUCKETS[idx];
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hovered) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const tooltipWidth = 150;
    const tooltipHeight = 60;
    const x = Math.min(
      Math.max(12, event.clientX - rect.left + 12),
      rect.width - tooltipWidth - 8
    );
    const y = Math.min(
      Math.max(12, event.clientY - rect.top + 12),
      rect.height - tooltipHeight - 8
    );
    setTooltipPos({ x, y });
  };

  const handleModeChange = (nextMode: "regions" | "districts") => {
    onModeChange?.(nextMode);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="relative h-[300px] w-full sm:h-[340px]">
        <div className="absolute left-4 top-4 z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/40 bg-white/35 text-center shadow-sm backdrop-blur-md">
          <div className="text-lg font-extrabold leading-none text-slate-800">
            {NATIONAL_VALUES[indicator].value}
          </div>
          <div className="mt-1 text-[10px] font-semibold leading-tight text-slate-600">
            National
          </div>
        </div>
        {paths.length ? (
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="h-full w-full"
            role="img"
            aria-label="Ghana administrative map"
          >
            {paths.map(({ name, d }) => {
              const value = valueByName.get(name) ?? getStableValue(name, indicator);
              const isHovered = hovered?.name === name;
              const isSelected = selected === name;
              const fill = getColor(value);
              return (
                <path
                  key={name}
                  d={d}
                  fill={fill}
                  stroke={isSelected ? "#241B5A" : "#E2E8F0"}
                  strokeWidth={isSelected ? 1.2 : 0.6}
                  onMouseEnter={() => setHovered({ name, value })}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(name)}
                  className="transition"
                  style={{ opacity: isHovered ? 0.9 : 1 }}
                />
              );
            })}
          </svg>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-400">
            Loading map...
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-500">
        <div className="flex items-center gap-2">
          <span>Low</span>
          <div className="flex items-center gap-1">
            {COLOR_BUCKETS.map((color) => (
              <span
                key={color}
                className="h-2.5 w-4 rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-slate-400">View</span>
          <div className="flex items-center rounded-full bg-slate-100 p-1">
            {(["regions", "districts"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleModeChange(item)}
                className={`rounded-full px-2 py-1 text-[10px] font-semibold transition ${
                  item === mode
                    ? "bg-purple-700 text-white"
                    : "text-slate-500 hover:text-purple-700"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>


      {hovered ? (
        <div
          className="absolute z-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <p className="font-semibold text-slate-900">{hovered.name}</p>
          <p className="text-slate-500">
            {indicator}: {hovered.value.toFixed(1)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
