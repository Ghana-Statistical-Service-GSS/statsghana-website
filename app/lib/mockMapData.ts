import { Indicator } from "./indicators";

export const mockIndicatorData: Record<Indicator, Record<string, number>> = {
  CPI: {
    "Greater Accra": 5.4,
    Ashanti: 4.8,
    Eastern: 4.2,
    Central: 4.6,
    Western: 4.9,
    "Western North": 4.3,
    Volta: 4.1,
    Oti: 4.0,
    Northern: 5.1,
    "North East": 4.7,
    Savannah: 4.5,
    "Upper East": 4.4,
    "Upper West": 4.1,
    Bono: 4.3,
    "Bono East": 4.6,
    Ahafo: 4.2,
  },
  MIEG: {
    "Greater Accra": 3.8,
    Ashanti: 3.5,
    Eastern: 3.1,
    Central: 3.3,
    Western: 3.6,
    "Western North": 3.2,
    Volta: 3.0,
    Oti: 2.9,
    Northern: 3.7,
    "North East": 3.4,
    Savannah: 3.2,
    "Upper East": 3.1,
    "Upper West": 2.9,
    Bono: 3.0,
    "Bono East": 3.3,
    Ahafo: 3.1,
  },
  PPI: {
    "Greater Accra": 6.1,
    Ashanti: 5.6,
    Eastern: 5.2,
    Central: 5.4,
    Western: 5.7,
    "Western North": 5.1,
    Volta: 5.0,
    Oti: 4.9,
    Northern: 5.8,
    "North East": 5.3,
    Savannah: 5.2,
    "Upper East": 5.1,
    "Upper West": 4.9,
    Bono: 5.2,
    "Bono East": 5.5,
    Ahafo: 5.0,
  },
  IIP: {
    "Greater Accra": 4.9,
    Ashanti: 4.4,
    Eastern: 4.0,
    Central: 4.2,
    Western: 4.6,
    "Western North": 4.1,
    Volta: 3.9,
    Oti: 3.8,
    Northern: 4.7,
    "North East": 4.2,
    Savannah: 4.1,
    "Upper East": 4.0,
    "Upper West": 3.8,
    Bono: 4.1,
    "Bono East": 4.3,
    Ahafo: 4.0,
  },
  "Population (2021)": {},
  "Business Population (IBES)": {},
};

export function getStableValue(name: string, indicator: Indicator) {
  const seed = `${indicator}-${name}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return 3 + (hash % 700) / 100;
}
