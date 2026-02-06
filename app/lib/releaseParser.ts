import { ReleaseItem } from "./releaseTypes";

const MONTH_LABELS: Record<string, string> = {
  M01: "Jan",
  M02: "Feb",
  M03: "Mar",
  M04: "Apr",
  M05: "May",
  M06: "Jun",
  M07: "Jul",
  M08: "Aug",
  M09: "Sep",
  M10: "Oct",
  M11: "Nov",
  M12: "Dec",
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

export function parseReleaseFromKey(key: string): ReleaseItem {
  const base = key.split("/").pop() ?? key;
  const withoutExt = base.replace(/\.[^.]+$/, "");
  const normalized = normalize(withoutExt);

  const yearMatch = normalized.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? Number(yearMatch[0]) : undefined;

  const quarterMatch = normalized.match(/\bq([1-4])\b/);
  const quarter = quarterMatch ? `Q${quarterMatch[1]}` : undefined;

  const monthMatch = normalized.match(/\b(20\d{2}m\d{2}|m\d{2})\b/);
  let month: string | undefined;
  if (monthMatch) {
    const code = monthMatch[0].toUpperCase();
    const short = code.startsWith("20") ? code.slice(-3) : code;
    month = MONTH_LABELS[short];
  }

  let category = "Others";
  if (normalized.includes("production")) {
    category = "GDP by Production";
  } else if (normalized.includes("expenditure")) {
    category = "GDP by Expenditure";
  } else if (
    normalized.includes("gross national income") ||
    normalized.includes("gni") ||
    normalized.includes("national income")
  ) {
    category = "Gross National Income";
  } else if (normalized.includes("others") || normalized.includes("other")) {
    category = "Others";
  } else if (normalized.includes("newsletter")) {
    category = "Others";
  }

  let type = "Other";
  if (normalized.includes("quarter") || quarter) {
    type = "Quarterly";
  } else if (normalized.includes("annual")) {
    type = "Annual";
  }

  return {
    id: key,
    key,
    title: withoutExt,
    category,
    type,
    month,
    quarter,
    year,
    downloadKey: key,
  };
}
