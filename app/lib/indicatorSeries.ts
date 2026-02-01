export type Point = { monthIndex: number; label: string; value: number | null };

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseMonthToIndex(input: string): { year: number; month: number } | null {
  if (!input) return null;
  const ym = input.match(/(\d{4})M(\d{2})/i);
  if (ym) {
    const year = Number(ym[1]);
    const month = Number(ym[2]);
    if (year && month >= 1 && month <= 12) return { year, month };
  }
  const iso = input.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const year = Number(iso[1]);
    const month = Number(iso[2]);
    if (year && month >= 1 && month <= 12) return { year, month };
  }
  const q = input.match(/(\d{4})\D*Q(\d)/i);
  if (q) {
    const year = Number(q[1]);
    const quarter = Number(q[2]);
    const month = quarter * 3;
    if (year && month >= 1 && month <= 12) return { year, month };
  }
  return null;
}

export function parseQuarter(value: string): { year: number; quarter: number } | null {
  if (!value) return null;
  const match = String(value).match(/(\d{4})\s*-?\s*Q([1-4])/i);
  if (!match) return null;
  const year = Number(match[1]);
  const quarter = Number(match[2]);
  if (!year || quarter < 1 || quarter > 4) return null;
  return { year, quarter };
}

export function monthLabelFromIndex(monthIndex: number) {
  return MONTH_LABELS[monthIndex - 1] ?? "";
}

function parseValue(raw: unknown): number | null {
  const num = Number(raw);
  return Number.isFinite(num) ? num : null;
}

export function buildMonthlySeries(
  values: Array<{ month: string; value: number | null }>,
  year: number
): Point[] {
  const points: Point[] = MONTH_LABELS.map((label, index) => ({
    monthIndex: index + 1,
    label,
    value: null,
  }));

  values.forEach(({ month, value }) => {
    const parsed = parseMonthToIndex(month);
    if (!parsed || parsed.year !== year) return;
    points[parsed.month - 1].value = value;
  });

  return points;
}

export function extractYearsFromPxwebQuarter(
  rows: Array<{ key: string[] }>,
  quarterIndex: number
): number[] {
  const years = new Set<number>();
  rows.forEach((row) => {
    const raw = row.key?.[quarterIndex];
    const parsed = parseQuarter(raw);
    if (parsed) years.add(parsed.year);
  });
  return Array.from(years).sort((a, b) => b - a);
}

export function buildQuarterSeriesFromPxweb(
  rows: Array<{ key: string[]; values: unknown[] }>,
  options: {
    quarterIndex: number;
    indicatorIndex?: number;
    indicatorValue?: string;
    regionIndex?: number;
    regionValue?: string;
  },
  year: number
) {
  const points = ["Q1", "Q2", "Q3", "Q4"].map((label, idx) => ({
    label,
    value: null as number | null,
    quarter: idx + 1,
  }));

  rows.forEach((row) => {
    const rawQuarter = row.key?.[options.quarterIndex];
    const parsed = parseQuarter(rawQuarter);
    if (!parsed || parsed.year !== year) return;
    if (
      typeof options.indicatorIndex === "number" &&
      options.indicatorValue &&
      row.key?.[options.indicatorIndex] !== options.indicatorValue
    ) {
      return;
    }
    if (
      typeof options.regionIndex === "number" &&
      options.regionValue &&
      row.key?.[options.regionIndex] !== options.regionValue
    ) {
      return;
    }
    const numeric = parseValue(row.values?.[0]);
    points[parsed.quarter - 1].value = numeric;
  });

  return points;
}

export function extractYearsFromPxweb(
  rows: Array<{ key: string[] }>,
  monthIndex: number
): number[] {
  const years = new Set<number>();
  rows.forEach((row) => {
    const raw = row.key?.[monthIndex];
    const parsed = parseMonthToIndex(raw);
    if (parsed) years.add(parsed.year);
  });
  return Array.from(years).sort((a, b) => b - a);
}

export function buildMonthlySeriesFromPxweb(
  rows: Array<{ key: string[]; values: unknown[] }>,
  options: {
    monthIndex: number;
    indicatorIndex?: number;
    indicatorValue?: string;
    regionIndex?: number;
    regionValue?: string;
  },
  year: number
): Point[] {
  const values: Array<{ month: string; value: number | null }> = [];

  rows.forEach((row) => {
    const monthRaw = row.key?.[options.monthIndex];
    if (!monthRaw) return;
    if (
      typeof options.indicatorIndex === "number" &&
      options.indicatorValue &&
      row.key?.[options.indicatorIndex] !== options.indicatorValue
    ) {
      return;
    }
    if (
      typeof options.regionIndex === "number" &&
      options.regionValue &&
      row.key?.[options.regionIndex] !== options.regionValue
    ) {
      return;
    }
    values.push({ month: monthRaw, value: parseValue(row.values?.[0]) });
  });

  return buildMonthlySeries(values, year);
}

export function buildMonthlySeriesFromNationalArray(
  rows: Array<{ month: string; inflation: number | null }>,
  year: number
): Point[] {
  return buildMonthlySeries(
    rows.map((row) => ({
      month: row.month,
      value: parseValue(row.inflation),
    })),
    year
  );
}

export function getLatestYear(years: number[]) {
  return years.length ? years[0] : null;
}
