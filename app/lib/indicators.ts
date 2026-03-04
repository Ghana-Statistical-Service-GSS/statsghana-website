export const INDICATORS = [
  "CPI",
  "PPI",
  "IIP",
  "PBCI",
  "MIEG",
  "POP2021",
  "IBES",
] as const;

export type Indicator = (typeof INDICATORS)[number];

export const INDICATOR_LABELS: Record<Indicator, string> = {
  CPI: "Inflation(YoY)",
  MIEG: "MIEG",
  PPI: "PPI",
  PBCI: "PBCI",
  IIP: "IIP",
  POP2021: "PHC",
  IBES: "IBES",
};

export const INDICATOR_TOOLTIPS: Record<Indicator, string> = {
  CPI: "Measures the rate at which prices of goods and services rise or fall. Tracked monthly across 307 items from 57 markets and 8,337 outlets nationwide, covering food, non-food, goods, and services.",
  MIEG: "Monthly Index of Economic Growth measures short-term movements in economic activity using key sector indicators in Ghana.",
  PPI: "Producer Price Index measures average changes in prices received by producers, reflecting factory gate inflation in Ghana.",
  PBCI: "Prime Building Cost Index reflects the prices of building materials in Ghana.",
  IIP: "Index of Industrial Production tracks output changes across major industries to gauge Ghana's industrial performance.",
  POP2021: "PHC refers to the Population and Housing Census, providing Ghana's most comprehensive demographic baseline.",
  IBES: "IBES summarizes Ghana's business population from enterprise surveys, indicating the size and structure of businesses.",
};
