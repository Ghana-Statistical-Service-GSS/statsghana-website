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
import cpiData from "../lib/cpiData.json";
import ppiData from "../lib/ppiData.json";
import iipData from "../lib/iipData.json";
import miegData from "../lib/miegData.json";
import phc2021Data from "../lib/phc2021Data.json";
import projectionData from "../lib/projectionData.json";
import ibesData from "../lib/ibesData.json";
import pbciData from "../lib/pbciData.json";

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

type MonthMeta = {
  raw: string;
  year: number;
  month: number;
};

type CpiDimensions = {
  monthCode: string;
  indicatorCode: string;
  regionCode: string;
  indicatorValue: string;
  regionLabels: Record<string, string>;
};

type PpiDimensions = {
  monthCode: string;
  indicatorCode: string;
  indicatorValue: string;
};

type IipDimensions = {
  quarterCode: string;
  indicatorCode: string;
  indicatorValue: string;
};

type MiegDimensions = {
  monthCode: string;
  seriesCode: string;
  seriesValue: string;
  variableCode: string | null;
  variableValue: string | null;
};

type ProjectionDimensions = {
  yearCode: string;
  regionCode: string;
};

type PbciDimensions = {
  monthCode: string;
};

function parseMonth(value: string): MonthMeta | null {
  const match = value.match(/(\d{4})\D?(\d{1,2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!year || !month) return null;
  return { raw: value, year, month };
}

function computeLatestMonth(values: string[]) {
  const parsed = values
    .map(parseMonth)
    .filter((item): item is MonthMeta => Boolean(item));
  if (!parsed.length) return null;
  return parsed.reduce((latest, current) => {
    if (current.year > latest.year) return current;
    if (current.year === latest.year && current.month > latest.month) return current;
    return latest;
  });
}

function formatMonthLabel(value: string) {
  const parsed = parseMonth(value);
  if (!parsed) return value;
  return `${parsed.year}M${String(parsed.month).padStart(2, "0")}`;
}

function parseYearValue(value: string): number | null {
  const match = String(value).match(/(\d{4})/);
  if (!match) return null;
  const year = Number(match[1]);
  return Number.isFinite(year) ? year : null;
}

function findDimensionKey(dimension: Record<string, unknown>, target: string) {
  const key = Object.keys(dimension).find(
    (name) => name.toLowerCase() === target.toLowerCase(),
  );
  return key ?? null;
}

function normalizeRegionName(name: string) {
  return name.replace(/\\s+Region$/i, "").trim();
}

function extractRegionValues(
  data: Record<string, any>,
  regionCode: string,
  regionLabels: Record<string, string>,
) {
  const columns = data?.columns ?? [];
  const dataRows = data?.data ?? [];
  const regionIdx = columns.findIndex(
    (column: any) => column.code === regionCode,
  );
  if (regionIdx === -1) {
    return { map: new Map<string, number>(), national: null };
  }

  const map = new Map<string, number>();
  let national: number | null = null;

  dataRows.forEach((row: any) => {
    const regionKey = row.key?.[regionIdx];
    if (!regionKey) return;
    const label = regionLabels[regionKey] ?? regionKey;
    const numeric = Number(row.values?.[0]);
    if (!Number.isFinite(numeric)) return;
    const labelLower = String(label).toLowerCase();
    const keyLower = String(regionKey).toLowerCase();
    if (
      labelLower === "ghana" ||
      labelLower.includes("ghana") ||
      keyLower === "ghana" ||
      keyLower.includes("ghana")
    ) {
      national = numeric;
      return;
    }
    map.set(normalizeRegionName(label), numeric);
  });

  return { map, national };
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
  const [cpiMeta, setCpiMeta] = useState<MonthMeta[]>([]);
  const [cpiYear, setCpiYear] = useState<number | null>(null);
  const [cpiMonth, setCpiMonth] = useState<string | null>(null);
  const [cpiValues, setCpiValues] = useState<Map<string, number>>(new Map());
  const [cpiNational, setCpiNational] = useState<number | null>(null);
  const [cpiHasRegions, setCpiHasRegions] = useState(true);
  const [cpiDims, setCpiDims] = useState<CpiDimensions | null>(null);
  const [cpiLoading, setCpiLoading] = useState(false);
  const [cpiError, setCpiError] = useState<string | null>(null);
  const [ppiMeta, setPpiMeta] = useState<MonthMeta[]>([]);
  const [ppiYear, setPpiYear] = useState<number | null>(null);
  const [ppiMonth, setPpiMonth] = useState<string | null>(null);
  const [ppiNational, setPpiNational] = useState<number | null>(null);
  const [ppiDims, setPpiDims] = useState<PpiDimensions | null>(null);
  const [ppiLoading, setPpiLoading] = useState(false);
  const [ppiError, setPpiError] = useState<string | null>(null);
  const [iipMeta, setIipMeta] = useState<string[]>([]);
  const [iipYear, setIipYear] = useState<number | null>(null);
  const [iipQuarter, setIipQuarter] = useState<string | null>(null);
  const [iipNational, setIipNational] = useState<number | null>(null);
  const [iipDims, setIipDims] = useState<IipDimensions | null>(null);
  const [iipLoading, setIipLoading] = useState(false);
  const [iipError, setIipError] = useState<string | null>(null);
  const [miegMeta, setMiegMeta] = useState<MonthMeta[]>([]);
  const [miegYear, setMiegYear] = useState<number | null>(null);
  const [miegMonth, setMiegMonth] = useState<string | null>(null);
  const [miegNational, setMiegNational] = useState<number | null>(null);
  const [miegDims, setMiegDims] = useState<MiegDimensions | null>(null);
  const [miegLoading, setMiegLoading] = useState(false);
  const [miegError, setMiegError] = useState<string | null>(null);
  const [phcMap, setPhcMap] = useState<Map<string, number>>(new Map());
  const [phcNational, setPhcNational] = useState<number | null>(null);
  const [projectionYear, setProjectionYear] = useState<number | null>(null);
  const [projectionYearOptions, setProjectionYearOptions] = useState<
    Array<{ year: number; raw: string }>
  >([]);
  const [projectionMap, setProjectionMap] = useState<Map<string, number>>(
    new Map()
  );
  const [projectionNational, setProjectionNational] = useState<number | null>(null);
  const [projectionDims, setProjectionDims] = useState<ProjectionDimensions | null>(
    null
  );
  const [projectionLoading, setProjectionLoading] = useState(false);
  const [projectionError, setProjectionError] = useState<string | null>(null);
  const [ibesYear, setIbesYear] = useState<"2014" | "2024">("2024");
  const [ibesMap, setIbesMap] = useState<Map<string, number>>(new Map());
  const [ibesNational, setIbesNational] = useState<number | null>(null);
  const [pbciMeta, setPbciMeta] = useState<MonthMeta[]>([]);
  const [pbciYear, setPbciYear] = useState<number | null>(null);
  const [pbciMonth, setPbciMonth] = useState<string | null>(null);
  const [pbciNational, setPbciNational] = useState<number | null>(null);
  const [pbciDims, setPbciDims] = useState<PbciDimensions | null>(null);

  useEffect(() => {
    if (
      indicator === "PPI" ||
      indicator === "IIP" ||
      indicator === "MIEG" ||
      indicator === "PBCI"
    ) {
      setHovered(null);
    }
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "IBES") return;
    const yearData =
      (ibesData as any)?.IBES?.[ibesYear] ??
      (ibesData as any)?.IBES?.["2024"] ??
      null;

    if (!yearData) {
      setIbesMap(new Map());
      setIbesNational(null);
      return;
    }

    const map = new Map<string, number>();
    Object.entries(yearData).forEach(([key, value]) => {
      if (key.toLowerCase() === "national") {
        setIbesNational(Number(value));
        return;
      }
      map.set(normalizeRegionName(key), Number(value));
    });
    setIbesMap(map);
  }, [indicator, ibesYear]);

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

  useEffect(() => {
    if (indicator !== "CPI") return;
    let isActive = true;

    const loadMeta = () => {
      try {
        setCpiError(null);
        const data = (cpiData as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === "Month");
        const indicatorIdx = columns.findIndex((c: any) => c.code === "Indicator");

        if (monthIdx === -1 || indicatorIdx === -1) {
          throw new Error("Missing Month or Indicator columns");
        }

        const monthSet = new Set<string>();
        for (const row of rows) {
          if (row.key?.[indicatorIdx] !== "Year-on-year inflation (%)") continue;
          const month = row.key?.[monthIdx];
          if (month) monthSet.add(month);
        }

        const months = Array.from(monthSet);
        const parsed = months
          .map(parseMonth)
          .filter((item: MonthMeta | null): item is MonthMeta => Boolean(item));
        const yearCounts = parsed.reduce((acc, item) => {
          acc[item.year] = (acc[item.year] ?? 0) + 1;
          return acc;
        }, {} as Record<number, number>);
        const yearTotals = Object.keys(yearCounts).length;
        const latest = computeLatestMonth(months);

        const dims: CpiDimensions = {
          monthCode: "Month",
          indicatorCode: "Indicator",
          regionCode: "Region",
          indicatorValue: "Year-on-year inflation (%)",
          regionLabels: {},
        };

        if (isActive) {
          console.log("[CPI meta] using local JSON", {
            monthCode: dims.monthCode,
            indicatorCode: dims.indicatorCode,
            regionCode: dims.regionCode,
            indicatorValue: dims.indicatorValue,
          });
          console.log("[CPI meta] year counts", { yearCounts, yearTotals });
          setCpiMeta(parsed);
          setCpiDims(dims);
          if (latest) {
            setCpiYear(latest.year);
            setCpiMonth(latest.raw);
          }
        }
      } catch (error) {
        if (isActive) {
          setCpiError("Unable to load CPI metadata.");
        }
      }
    };

    loadMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "PPI") return;
    let isActive = true;

    const loadMeta = () => {
      try {
        setPpiError(null);
        const data = (ppiData as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === "Month");
        const indicatorIdx = columns.findIndex((c: any) => c.code === "Indicator");

        if (monthIdx === -1 || indicatorIdx === -1) {
          throw new Error("Missing Month or Indicator columns");
        }

        const monthSet = new Set<string>();
        for (const row of rows) {
          if (row.key?.[indicatorIdx] !== "Year-on-year PPI change (%)") continue;
          const month = row.key?.[monthIdx];
          if (month) monthSet.add(month);
        }

        const months = Array.from(monthSet);
        const parsed = months
          .map(parseMonth)
          .filter((item: MonthMeta | null): item is MonthMeta => Boolean(item));
        const latest = computeLatestMonth(months);

        const dims: PpiDimensions = {
          monthCode: "Month",
          indicatorCode: "Indicator",
          indicatorValue: "Year-on-year PPI change (%)",
        };

        if (isActive) {
          setPpiMeta(parsed);
          setPpiDims(dims);
          if (latest) {
            setPpiYear(latest.year);
            setPpiMonth(latest.raw);
          }
        }
      } catch (error) {
        if (isActive) {
          setPpiError("Unable to load PPI metadata.");
        }
      }
    };

    loadMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "IIP") return;
    let isActive = true;

    const loadMeta = () => {
      try {
        setIipError(null);
        const data = (iipData as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const quarterIdx = columns.findIndex((c: any) => c.code === "Quarter");
        const indicatorIdx = columns.findIndex((c: any) => c.code === "Indicator");

        if (quarterIdx === -1 || indicatorIdx === -1) {
          throw new Error("Missing Quarter or Indicator columns");
        }

        const quarterSet = new Set<string>();
        for (const row of rows) {
          if (row.key?.[indicatorIdx] !== "Year-on-year IIP change (%)") continue;
          const quarter = row.key?.[quarterIdx];
          if (quarter) quarterSet.add(quarter);
        }

        const quarters = Array.from(quarterSet);
        const latest = quarters.slice().sort().pop() ?? null;

        const dims: IipDimensions = {
          quarterCode: "Quarter",
          indicatorCode: "Indicator",
          indicatorValue: "Year-on-year IIP change (%)",
        };

        if (isActive) {
          setIipMeta(quarters);
          setIipDims(dims);
          if (latest) {
            const match = latest.match(/(\d{4})/);
            if (match) setIipYear(Number(match[1]));
            setIipQuarter(latest);
          }
        }
      } catch (error) {
        if (isActive) {
          setIipError("Unable to load IIP metadata.");
        }
      }
    };

    loadMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "MIEG") return;
    let isActive = true;

    const loadMeta = () => {
      try {
        setMiegError(null);
        const data = (miegData as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === "Month");
        const seriesIdx = columns.findIndex((c: any) => c.code === "GDP_Series");
        const variableIdx = columns.findIndex((c: any) => c.code === "Variable");

        if (monthIdx === -1 || seriesIdx === -1) {
          throw new Error("Missing Month or GDP_Series columns");
        }

        const monthSet = new Set<string>();
        for (const row of rows) {
          if (row.key?.[seriesIdx] !== "MIEG Index Growth (year-on-year %)") continue;
          if (variableIdx !== -1 && row.key?.[variableIdx] !== "Total MIEG") {
            continue;
          }
          const month = row.key?.[monthIdx];
          if (month) monthSet.add(month);
        }

        const months = Array.from(monthSet);
        const parsed = months
          .map(parseMonth)
          .filter((item: MonthMeta | null): item is MonthMeta => Boolean(item));
        const latest = computeLatestMonth(months);

        const dims: MiegDimensions = {
          monthCode: "Month",
          seriesCode: "GDP_Series",
          seriesValue: "MIEG Index Growth (year-on-year %)",
          variableCode: variableIdx !== -1 ? "Variable" : null,
          variableValue: variableIdx !== -1 ? "Total MIEG" : null,
        };

        if (isActive) {
          setMiegMeta(parsed);
          setMiegDims(dims);
          if (latest) {
            setMiegYear(latest.year);
            setMiegMonth(latest.raw);
          }
        }
      } catch (error) {
        if (isActive) {
          setMiegError("Unable to load MIEG metadata.");
        }
      }
    };

    loadMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "POP2021") return;
    let isActive = true;

    const loadPhc = () => {
      try {
        setProjectionError(null);
        const data = (phc2021Data as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const regionIdx = columns.findIndex((c: any) => c.code === "Geographic_Area");

        if (regionIdx === -1) {
          throw new Error("Missing Geographic_Area column");
        }

        const map = new Map<string, number>();
        let national: number | null = null;

        rows.forEach((row: any) => {
          const regionKey = row.key?.[regionIdx];
          if (!regionKey) return;
          const label = regionKey;
          const numeric = Number(row.values?.[0]);
          if (!Number.isFinite(numeric)) return;
          const lower = String(label).toLowerCase();
          if (lower === "ghana" || lower.includes("ghana")) {
            national = numeric;
            return;
          }
          map.set(normalizeRegionName(label), numeric);
        });

        if (isActive) {
          setPhcMap(map);
          setPhcNational(national);
        }
      } catch (error) {
        if (isActive) {
          setProjectionError("Unable to load PHC data.");
          setPhcMap(new Map());
          setPhcNational(null);
        }
      }
    };

    loadPhc();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "POP2021") return;
    let isActive = true;

    const loadProjectionMeta = () => {
      try {
        setProjectionError(null);
        const data = (projectionData as any)?.response ?? {};
        const columns = data.columns ?? [];
        const rows = data.data ?? [];
        const regionIdx = columns.findIndex((c: any) => c.code === "Geographic_Area");
        const yearIdx = columns.findIndex(
          (c: any) => c.code === "Year" || c.code === "Time",
        );

        if (regionIdx === -1 || yearIdx === -1) {
          throw new Error("Missing Geographic_Area or Year/Time column");
        }

        const yearSet = new Set<string>();
        rows.forEach((row: any) => {
          const rawYear = row.key?.[yearIdx];
          if (rawYear) yearSet.add(rawYear);
        });

        const yearOptions = Array.from(yearSet)
          .map((raw) => {
            const year = parseYearValue(raw);
            return year ? { raw, year } : null;
          })
          .filter(Boolean) as Array<{ raw: string; year: number }>;

        const currentYear = new Date().getFullYear();
        const preferred =
          yearOptions.find((opt) => opt.year === currentYear) ||
          yearOptions.slice().sort((a, b) => b.year - a.year)[0] ||
          null;

        if (isActive) {
          setProjectionYearOptions(yearOptions);
          setProjectionDims({ yearCode: columns[yearIdx].code, regionCode: columns[regionIdx].code });
          if (preferred) {
            setProjectionYear(preferred.year);
          }
        }
      } catch (error) {
        if (isActive) {
          setProjectionError("Unable to load projection metadata.");
          setProjectionYearOptions([]);
          setProjectionDims(null);
        }
      }
    };

    loadProjectionMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "POP2021" || !projectionDims || !projectionYear) return;
    let isActive = true;

    const loadProjection = () => {
      setProjectionLoading(true);
      setProjectionError(null);
      try {
        const data = (projectionData as any)?.response ?? {};
        const columns = data?.columns ?? [];
        const rows = data?.data ?? [];
        const regionIdx = columns.findIndex((c: any) => c.code === projectionDims.regionCode);
        const yearIdx = columns.findIndex((c: any) => c.code === projectionDims.yearCode);

        const targetRaw = projectionYearOptions.find((opt) => opt.year === projectionYear)?.raw;

        const filtered =
          regionIdx !== -1 && yearIdx !== -1 && targetRaw
            ? rows.filter((row: any) => row.key?.[yearIdx] === targetRaw)
            : [];

        const map = new Map<string, number>();
        let national: number | null = null;

        filtered.forEach((row: any) => {
          const regionKey = row.key?.[regionIdx];
          if (!regionKey) return;
          const label = regionKey;
          const numeric = Number(row.values?.[0]);
          if (!Number.isFinite(numeric)) return;
          const lower = String(label).toLowerCase();
          if (lower === "ghana" || lower.includes("ghana")) {
            national = numeric;
            return;
          }
          map.set(normalizeRegionName(label), numeric);
        });

        if (isActive) {
          setProjectionMap(map);
          setProjectionNational(national);
        }
      } catch (error) {
        if (isActive) {
          setProjectionError("Unable to load projection data.");
          setProjectionMap(new Map());
          setProjectionNational(null);
        }
      } finally {
        if (isActive) {
          setProjectionLoading(false);
        }
      }
    };

    loadProjection();

    return () => {
      isActive = false;
    };
  }, [indicator, projectionYear, projectionDims, projectionYearOptions]);

  useEffect(() => {
    if (indicator !== "PBCI") return;
    let isActive = true;

    const loadMeta = () => {
      try {
        const entries = (pbciData as any)?.PBCI?.National ?? [];
        const parsed = entries
          .map((entry: any) => parseMonth(entry.month))
          .filter((item: MonthMeta | null): item is MonthMeta => Boolean(item));
        const latest = computeLatestMonth(entries.map((entry: any) => entry.month));
        const dims: PbciDimensions = { monthCode: "month" };

        if (isActive) {
          setPbciMeta(parsed);
          setPbciDims(dims);
          if (latest) {
            setPbciYear(latest.year);
            setPbciMonth(latest.raw);
          }
        }
      } catch (error) {
        if (isActive) {
          setPbciMeta([]);
          setPbciDims(null);
          setPbciMonth(null);
          setPbciYear(null);
        }
      }
    };

    loadMeta();

    return () => {
      isActive = false;
    };
  }, [indicator]);

  useEffect(() => {
    if (indicator !== "PBCI" || !pbciMonth || !pbciDims) return;
    let isActive = true;

    const loadData = () => {
      try {
        const entries = (pbciData as any)?.PBCI?.National ?? [];
        const matched = entries.find((entry: any) => entry.month === pbciMonth);
        const numeric = Number(matched?.inflation);
        if (isActive) {
          setPbciNational(Number.isFinite(numeric) ? numeric : null);
        }
      } catch (error) {
        if (isActive) {
          setPbciNational(null);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [indicator, pbciMonth, pbciDims]);

  useEffect(() => {
    if (indicator !== "CPI" || !cpiMonth || !cpiDims) return;
    let isActive = true;

    const loadData = async () => {
      setCpiLoading(true);
      setCpiError(null);
      try {
        const data = (cpiData as any)?.response ?? {};
        console.log("[CPI data] response", {
          columns: Array.isArray(data?.columns)
            ? data.columns.map((col: { code: string }) => col.code)
            : [],
          dataCount: Array.isArray(data?.data) ? data.data.length : 0,
        });
        const columns = data?.columns ?? [];
        const rows = data?.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === cpiDims.monthCode);
        const indicatorIdx = columns.findIndex(
          (c: any) => c.code === cpiDims.indicatorCode,
        );
        const regionIdx = columns.findIndex((c: any) => c.code === cpiDims.regionCode);

        const filtered = {
          columns,
          data:
            monthIdx !== -1 && indicatorIdx !== -1 && regionIdx !== -1
              ? rows.filter(
                  (row: any) =>
                    row.key?.[monthIdx] === cpiMonth &&
                    row.key?.[indicatorIdx] === cpiDims.indicatorValue,
                )
              : [],
        };

        const { map, national } = extractRegionValues(
          filtered,
          cpiDims.regionCode,
          cpiDims.regionLabels,
        );
        console.log("[CPI data] region sample", Array.from(map.entries()).slice(0, 5));
        if (isActive) {
          setCpiValues(map);
          setCpiNational(national);
          setCpiHasRegions(map.size > 0);
        }
      } catch (error) {
        if (isActive) {
          setCpiError("No data found for the selected month.");
          setCpiValues(new Map());
          setCpiHasRegions(true);
        }
      } finally {
        if (isActive) {
          setCpiLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [indicator, cpiMonth, cpiDims]);

  useEffect(() => {
    if (indicator !== "PPI" || !ppiMonth || !ppiDims) return;
    let isActive = true;

    const loadData = () => {
      setPpiLoading(true);
      setPpiError(null);
      try {
        const data = (ppiData as any)?.response ?? {};
        const columns = data?.columns ?? [];
        const rows = data?.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === ppiDims.monthCode);
        const indicatorIdx = columns.findIndex(
          (c: any) => c.code === ppiDims.indicatorCode,
        );

        const filtered =
          monthIdx !== -1 && indicatorIdx !== -1
            ? rows.filter(
                (row: any) =>
                  row.key?.[monthIdx] === ppiMonth &&
                  row.key?.[indicatorIdx] === ppiDims.indicatorValue,
              )
            : [];

        const firstNumeric = filtered
          .map((row: any) => Number(row?.values?.[0]))
          .find((num: number) => Number.isFinite(num));

        if (isActive) {
          setPpiNational(firstNumeric ?? null);
        }
      } catch (error) {
        if (isActive) {
          setPpiError("No data found for the selected month.");
          setPpiNational(null);
        }
      } finally {
        if (isActive) {
          setPpiLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [indicator, ppiMonth, ppiDims]);

  useEffect(() => {
    if (indicator !== "IIP" || !iipQuarter || !iipDims) return;
    let isActive = true;

    const loadData = () => {
      setIipLoading(true);
      setIipError(null);
      try {
        const data = (iipData as any)?.response ?? {};
        const columns = data?.columns ?? [];
        const rows = data?.data ?? [];
        const quarterIdx = columns.findIndex((c: any) => c.code === iipDims.quarterCode);
        const indicatorIdx = columns.findIndex(
          (c: any) => c.code === iipDims.indicatorCode,
        );

        const filtered =
          quarterIdx !== -1 && indicatorIdx !== -1
            ? rows.filter(
                (row: any) =>
                  row.key?.[quarterIdx] === iipQuarter &&
                  row.key?.[indicatorIdx] === iipDims.indicatorValue,
              )
            : [];

        const firstNumeric = filtered
          .map((row: any) => Number(row?.values?.[0]))
          .find((num: number) => Number.isFinite(num));

        if (isActive) {
          setIipNational(firstNumeric ?? null);
        }
      } catch (error) {
        if (isActive) {
          setIipError("No data found for the selected quarter.");
          setIipNational(null);
        }
      } finally {
        if (isActive) {
          setIipLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [indicator, iipQuarter, iipDims]);

  useEffect(() => {
    if (indicator !== "MIEG" || !miegMonth || !miegDims) return;
    let isActive = true;

    const loadData = () => {
      setMiegLoading(true);
      setMiegError(null);
      try {
        const data = (miegData as any)?.response ?? {};
        const columns = data?.columns ?? [];
        const rows = data?.data ?? [];
        const monthIdx = columns.findIndex((c: any) => c.code === miegDims.monthCode);
        const seriesIdx = columns.findIndex((c: any) => c.code === miegDims.seriesCode);
        const variableIdx =
          miegDims.variableCode
            ? columns.findIndex((c: any) => c.code === miegDims.variableCode)
            : -1;

        const filtered =
          monthIdx !== -1 && seriesIdx !== -1
            ? rows.filter(
                (row: any) =>
                  row.key?.[monthIdx] === miegMonth &&
                  row.key?.[seriesIdx] === miegDims.seriesValue &&
                  (variableIdx === -1 ||
                    row.key?.[variableIdx] === miegDims.variableValue),
              )
            : [];

        const firstNumeric = filtered
          .map((row: any) => Number(row?.values?.[0]))
          .find((num: number) => Number.isFinite(num));

        if (isActive) {
          setMiegNational(firstNumeric ?? null);
        }
      } catch (error) {
        if (isActive) {
          setMiegError("No data found for the selected month.");
          setMiegNational(null);
        }
      } finally {
        if (isActive) {
          setMiegLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, [indicator, miegMonth, miegDims]);

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

  const { valueByName, minValue, maxValue, nationalValue } = useMemo(() => {
    const map = new Map<string, number>();
    let min = Infinity;
    let max = -Infinity;
    const indicatorData = mockIndicatorData[indicator] as Record<string, number>;

    paths.forEach(({ name }) => {
      const value =
        indicator === "CPI"
          ? cpiValues.get(name)
          : indicator === "IBES"
          ? ibesMap.get(name)
          : indicator === "POP2021"
          ? projectionMap.get(name)
          : indicator === "PPI"
          ? undefined
          : indicator === "IIP"
          ? undefined
          : indicator === "MIEG"
          ? undefined
          : indicator === "PBCI"
          ? undefined
          : indicatorData[name] ?? getStableValue(name, indicator);
      const numericValue = Number(value);
      if (Number.isFinite(numericValue)) {
        map.set(name, numericValue);
        min = Math.min(min, numericValue);
        max = Math.max(max, numericValue);
      } else {
        map.set(name, NaN);
      }
    });

    if (min === Infinity || max === -Infinity) {
      min = 0;
      max = 1;
    }

    if (indicator === "CPI") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: cpiNational,
      };
    }
    if (indicator === "PPI") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: ppiNational,
      };
    }
    if (indicator === "IIP") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: iipNational,
      };
    }
    if (indicator === "MIEG") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: miegNational,
      };
    }
    if (indicator === "IBES") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: ibesNational,
      };
    }
    if (indicator === "POP2021") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: projectionNational,
      };
    }
    if (indicator === "PBCI") {
      return {
        valueByName: map,
        minValue: min,
        maxValue: max,
        nationalValue: pbciNational,
      };
    }

    return { valueByName: map, minValue: min, maxValue: max, nationalValue: null };
  }, [
    indicator,
    paths,
    cpiValues,
    cpiNational,
    ppiNational,
    iipNational,
    miegNational,
    ibesNational,
    pbciNational,
    projectionMap,
    projectionNational,
  ]);

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
        {indicator === "CPI" ||
        indicator === "PPI" ||
        indicator === "IIP" ||
        indicator === "MIEG" ||
        indicator === "POP2021" ||
        indicator === "IBES" ||
        indicator === "PBCI" ? (
          <div className="absolute right-4 top-4 z-20 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white/90 p-2 text-[10px] text-slate-600 shadow-sm">
            {indicator === "IBES" ? (
              <select
                value={ibesYear}
                onChange={(event) =>
                  setIbesYear(event.target.value as "2014" | "2024")
                }
                className="rounded-full border border-slate-200 bg-white px-2 py-1"
              >
                {["2024", "2014"].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            ) : indicator === "IIP" ? (
              <select
                value={iipQuarter ?? ""}
                onChange={(event) => setIipQuarter(event.target.value)}
                className="rounded-full border border-slate-200 bg-white px-2 py-1"
              >
                {iipMeta
                  .slice()
                  .sort((a, b) => {
                    const aMatch = a.match(/(\d{4})\D*Q(\d)/i);
                    const bMatch = b.match(/(\d{4})\D*Q(\d)/i);
                    const aYear = aMatch ? Number(aMatch[1]) : 0;
                    const bYear = bMatch ? Number(bMatch[1]) : 0;
                    const aQ = aMatch ? Number(aMatch[2]) : 0;
                    const bQ = bMatch ? Number(bMatch[2]) : 0;
                    if (aYear !== bYear) return bYear - aYear;
                    return bQ - aQ;
                  })
                  .map((quarter) => (
                    <option key={quarter} value={quarter}>
                      {quarter}
                    </option>
                  ))}
              </select>
            ) : indicator === "POP2021" ? (
              <select
                value={projectionYear ?? ""}
                onChange={(event) => setProjectionYear(Number(event.target.value))}
                className="rounded-full border border-slate-200 bg-white px-2 py-1"
              >
                {projectionYearOptions
                  .slice()
                  .sort((a, b) => b.year - a.year)
                  .map((opt) => (
                    <option key={opt.raw} value={opt.year}>
                      {opt.year}
                    </option>
                  ))}
              </select>
            ) : indicator === "PBCI" ? (
              <>
                <select
                  value={pbciYear ?? ""}
                  onChange={(event) => {
                    const nextYear = Number(event.target.value);
                    setPbciYear(nextYear);
                    const available = pbciMeta
                      .filter((item) => item.year === nextYear)
                      .sort((a, b) => b.month - a.month);
                    if (available.length) {
                      setPbciMonth(available[0].raw);
                    }
                  }}
                  className="rounded-full border border-slate-200 bg-white px-2 py-1"
                >
                  {Array.from(new Set(pbciMeta.map((item) => item.year)))
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
                <select
                  value={pbciMonth ?? ""}
                  onChange={(event) => setPbciMonth(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-2 py-1"
                >
                  {pbciMeta
                    .filter((item) => item.year === pbciYear)
                    .sort((a, b) => b.month - a.month)
                    .map((item) => (
                      <option key={item.raw} value={item.raw}>
                        {formatMonthLabel(item.raw)}
                      </option>
                    ))}
                </select>
              </>
            ) : (
              <>
                <select
                  value={
                    indicator === "CPI"
                      ? cpiYear ?? ""
                      : indicator === "PPI"
                      ? ppiYear ?? ""
                      : miegYear ?? ""
                  }
                  onChange={(event) => {
                    const nextYear = Number(event.target.value);
                    if (indicator === "CPI") {
                      setCpiYear(nextYear);
                    } else if (indicator === "PPI") {
                      setPpiYear(nextYear);
                    } else {
                      setMiegYear(nextYear);
                    }
                    const available = (
                      indicator === "CPI"
                        ? cpiMeta
                        : indicator === "PPI"
                        ? ppiMeta
                        : miegMeta
                    )
                      .filter((item) => item.year === nextYear)
                      .sort((a, b) => b.month - a.month);
                    if (available.length) {
                      if (indicator === "CPI") {
                        setCpiMonth(available[0].raw);
                      } else if (indicator === "PPI") {
                        setPpiMonth(available[0].raw);
                      } else {
                        setMiegMonth(available[0].raw);
                      }
                    }
                  }}
                  className="rounded-full border border-slate-200 bg-white px-2 py-1"
                >
                  {Array.from(
                    new Set(
                      (
                        indicator === "CPI"
                          ? cpiMeta
                          : indicator === "PPI"
                          ? ppiMeta
                          : miegMeta
                      ).map((item) => item.year),
                    ),
                  )
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
                <select
                  value={
                    indicator === "CPI"
                      ? cpiMonth ?? ""
                      : indicator === "PPI"
                      ? ppiMonth ?? ""
                      : miegMonth ?? ""
                  }
                  onChange={(event) => {
                    if (indicator === "CPI") {
                      setCpiMonth(event.target.value);
                    } else if (indicator === "PPI") {
                      setPpiMonth(event.target.value);
                    } else {
                      setMiegMonth(event.target.value);
                    }
                  }}
                  className="rounded-full border border-slate-200 bg-white px-2 py-1"
                >
                  {(
                    indicator === "CPI"
                      ? cpiMeta
                      : indicator === "PPI"
                      ? ppiMeta
                      : miegMeta
                  )
                    .filter((item) => {
                      const year =
                        indicator === "CPI"
                          ? cpiYear
                          : indicator === "PPI"
                          ? ppiYear
                          : miegYear;
                      return item.year === year;
                    })
                    .sort((a, b) => b.month - a.month)
                    .map((item) => (
                      <option key={item.raw} value={item.raw}>
                        {indicator === "MIEG" ? formatMonthLabel(item.raw) : item.raw}
                      </option>
                    ))}
                </select>
              </>
            )}
          </div>
        ) : null}
        <div className="absolute left-4 top-4 z-20 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/40 bg-white/35 text-center shadow-sm backdrop-blur-md">
          <div className="text-lg font-extrabold leading-none text-slate-800">
            {indicator === "POP2021" ? (
              <div className="flex flex-col gap-1 text-center">
                <div className="text-[10px] font-semibold text-slate-600">
                  PHC 2021
                </div>
                <div className="text-base font-extrabold leading-none text-slate-800">
                  {phcNational !== null ? phcNational.toLocaleString() : "—"}
                </div>
                <div className="text-[10px] font-semibold text-slate-600">
                  Projected {projectionYear ?? ""}
                </div>
                <div className="text-base font-extrabold leading-none text-slate-800">
                  {projectionNational !== null
                    ? projectionNational.toLocaleString()
                    : "—"}
                </div>
              </div>
            ) : indicator === "IBES" ? (
              ibesNational !== null ? `${ibesNational.toLocaleString()}` : "—"
            ) : indicator === "PBCI" ? (
              pbciNational !== null ? `${pbciNational.toFixed(1)}` : "—"
            ) : indicator === "CPI" ||
              indicator === "PPI" ||
              indicator === "IIP" ||
              indicator === "MIEG" ? (
              nationalValue !== null ? `${nationalValue.toFixed(1)}` : "—"
            ) : (
              NATIONAL_VALUES[indicator as keyof typeof NATIONAL_VALUES]?.value ?? "—"
            )}
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
              const rawValue = valueByName.get(normalizeRegionName(name));
              const value = Number(rawValue);
              const isHovered = hovered?.name === name;
              const isSelected = selected === name;
              const fill = Number.isFinite(value) ? getColor(value) : COLOR_BUCKETS[0];
              const hasRegionalHover =
                indicator !== "PPI" &&
                indicator !== "IIP" &&
                indicator !== "MIEG" &&
                indicator !== "PBCI";
              return (
                <path
                  key={name}
                  d={d}
                  fill={fill}
                  stroke={isSelected ? "#241B5A" : "#E2E8F0"}
                  strokeWidth={isSelected ? 1.2 : 0.6}
                  onMouseEnter={
                    hasRegionalHover
                      ? () =>
                          setHovered({
                            name,
                            value: Number.isFinite(value) ? value : NaN,
                          })
                      : undefined
                  }
                  onMouseLeave={hasRegionalHover ? () => setHovered(null) : undefined}
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

      {indicator === "CPI" && cpiLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-slate-500">
          Loading CPI data...
        </div>
      ) : null}
      {indicator === "PPI" && ppiLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-slate-500">
          Loading PPI data...
        </div>
      ) : null}
      {indicator === "IIP" && iipLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-slate-500">
          Loading IIP data...
        </div>
      ) : null}
      {indicator === "MIEG" && miegLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-slate-500">
          Loading MIEG data...
        </div>
      ) : null}
      {indicator === "POP2021" && projectionLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-slate-500">
          Loading population data...
        </div>
      ) : null}
      {indicator === "CPI" && !cpiLoading && !cpiError && !cpiHasRegions ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          No regional inflation figures for this period (national figure only).
        </div>
      ) : null}
      {indicator === "PPI" && !ppiLoading && !ppiError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          No regional figures for PPI (national figure only).
        </div>
      ) : null}
      {indicator === "IIP" && !iipLoading && !iipError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          No regional figures for IIP (national figure only).
        </div>
      ) : null}
      {indicator === "MIEG" && !miegLoading && !miegError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          No regional figures for MIEG (national figure only).
        </div>
      ) : null}
      {indicator === "POP2021" && !projectionLoading && !projectionError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          Showing PHC 2021 and projected population by region.
        </div>
      ) : null}
      {indicator === "CPI" && cpiError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-rose-600">
          {cpiError}
        </div>
      ) : null}
      {indicator === "PPI" && ppiError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-rose-600">
          {ppiError}
        </div>
      ) : null}
      {indicator === "IIP" && iipError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-rose-600">
          {iipError}
        </div>
      ) : null}
      {indicator === "MIEG" && miegError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-rose-600">
          {miegError}
        </div>
      ) : null}
      {indicator === "PBCI" ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          No regional figures for PBCI (national figure only).
        </div>
      ) : null}
      {indicator === "IBES" && !ibesMap.size ? (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800 shadow-sm">
          IBES values are shown by region (selected year).
        </div>
      ) : null}
      {indicator === "POP2021" && projectionError ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-xs text-rose-600">
          {projectionError}
        </div>
      ) : null}

      {hovered ? (
        <div
          className="absolute z-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <p className="font-semibold text-slate-900">{hovered.name}</p>
          {indicator === "POP2021" ? (
            <>
              <p className="text-slate-500">
                PHC 2021:{" "}
                {phcMap.get(normalizeRegionName(hovered.name))?.toLocaleString?.() ??
                  "—"}
              </p>
              <p className="text-slate-500">
                Projected {projectionYear ?? ""}:{" "}
                {projectionMap
                  .get(normalizeRegionName(hovered.name))
                  ?.toLocaleString?.() ?? "—"}
              </p>
            </>
          ) : (
            <p className="text-slate-500">
              {indicator}: {Number.isFinite(hovered.value) ? hovered.value.toFixed(1) : "—"}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
