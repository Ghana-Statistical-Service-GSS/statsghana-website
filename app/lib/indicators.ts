export const INDICATORS = [
  "CPI",
  "MIEG",
  "PPI",
  "IIP",
  "POP2021",
  "IBES",
] as const;

export type Indicator = (typeof INDICATORS)[number];

export const INDICATOR_LABELS: Record<Indicator, string> = {
  CPI: "CPI",
  MIEG: "MIEG",
  PPI: "PPI",
  IIP: "IIP",
  POP2021: "Population (2021)",
  IBES: "Business Population (IBES)",
};
