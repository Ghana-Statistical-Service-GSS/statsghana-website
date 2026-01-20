export const INDICATORS = [
  "CPI",
  "MIEG",
  "PPI",
  "PBCI",
  "IIP",
  "POP2021",
  "IBES",
] as const;

export type Indicator = (typeof INDICATORS)[number];

export const INDICATOR_LABELS: Record<Indicator, string> = {
  CPI: "CPI",
  MIEG: "MIEG",
  PPI: "PPI",
  PBCI: "PBCI",
  IIP: "IIP",
  POP2021: "PHC",
  IBES: "IBES",
};

export const INDICATOR_TOOLTIPS: Record<Indicator, string> = {
  CPI: "Consumer Price Index tracks changes in the cost of a standard basket of goods and services to monitor inflation in Ghana.",
  MIEG: "Monthly Index of Economic Growth measures short-term movements in economic activity using key sector indicators in Ghana.",
  PPI: "Producer Price Index measures average changes in prices received by producers, reflecting factory gate inflation in Ghana.",
  PBCI: "Private Business Confidence Index reflects business expectations about economic conditions and investment outlook in Ghana.",
  IIP: "Index of Industrial Production tracks output changes across major industries to gauge Ghana's industrial performance.",
  POP2021: "PHC refers to the Population and Housing Census, providing Ghana's most comprehensive demographic baseline.",
  IBES: "IBES summarizes Ghana's business population from enterprise surveys, indicating the size and structure of businesses.",
};
