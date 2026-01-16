export const INDICATORS = [
  "CPI",
  "MIEG",
  "PPI",
  "IIP",
  "PBCI"
] as const;

export type Indicator = (typeof INDICATORS)[number];
