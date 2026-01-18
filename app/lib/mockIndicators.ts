import { Indicator } from "./indicators";

type SeriesPoint = { period: string; value: number };

type Series = {
  label: string;
  unit?: string;
  data: SeriesPoint[];
};

export const indicatorSeries: Record<Indicator, Series> = {
  CPI: {
    label: "CPI",
    unit: "%",
    data: [
      { period: "Jan", value: 118 },
      { period: "Feb", value: 121 },
      { period: "Mar", value: 120 },
      { period: "Apr", value: 123 },
      { period: "May", value: 124 },
      { period: "Jun", value: 126 },
      { period: "Jul", value: 125 },
      { period: "Aug", value: 128 },
      { period: "Sep", value: 127 },
      { period: "Oct", value: 129 },
      { period: "Nov", value: 130 },
      { period: "Dec", value: 132 },
    ],
  },
  MIEG: {
    label: "MIEG",
    unit: "%",
    data: [
      { period: "Jan", value: 3.2 },
      { period: "Feb", value: 3.4 },
      { period: "Mar", value: 3.1 },
      { period: "Apr", value: 3.6 },
      { period: "May", value: 3.8 },
      { period: "Jun", value: 3.5 },
      { period: "Jul", value: 3.9 },
      { period: "Aug", value: 4.1 },
      { period: "Sep", value: 3.7 },
      { period: "Oct", value: 3.6 },
      { period: "Nov", value: 3.9 },
      { period: "Dec", value: 4.2 },
    ],
  },
  PPI: {
    label: "PPI",
    unit: "%",
    data: [
      { period: "Jan", value: 142 },
      { period: "Feb", value: 140 },
      { period: "Mar", value: 143 },
      { period: "Apr", value: 145 },
      { period: "May", value: 147 },
      { period: "Jun", value: 149 },
      { period: "Jul", value: 148 },
      { period: "Aug", value: 151 },
      { period: "Sep", value: 150 },
      { period: "Oct", value: 152 },
      { period: "Nov", value: 151 },
      { period: "Dec", value: 154 },
    ],
  },
  IIP: {
    label: "IIP",
    unit: "%",
    data: [
      { period: "Jan", value: 98 },
      { period: "Feb", value: 101 },
      { period: "Mar", value: 100 },
      { period: "Apr", value: 103 },
      { period: "May", value: 105 },
      { period: "Jun", value: 107 },
      { period: "Jul", value: 106 },
      { period: "Aug", value: 110 },
      { period: "Sep", value: 108 },
      { period: "Oct", value: 109 },
      { period: "Nov", value: 111 },
      { period: "Dec", value: 113 },
    ],
  },
  POP2021: {
    label: "PHC",
    unit: "Millions",
    data: [
      { period: "Jan", value: 31.2 },
      { period: "Feb", value: 31.3 },
      { period: "Mar", value: 31.4 },
      { period: "Apr", value: 31.5 },
      { period: "May", value: 31.6 },
      { period: "Jun", value: 31.7 },
      { period: "Jul", value: 31.8 },
      { period: "Aug", value: 31.9 },
      { period: "Sep", value: 32.0 },
      { period: "Oct", value: 32.1 },
      { period: "Nov", value: 32.2 },
      { period: "Dec", value: 32.3 },
    ],
  },
  IBES: {
    label: "IBES",
    unit: "Count",
    data: [
      { period: "Jan", value: 540 },
      { period: "Feb", value: 548 },
      { period: "Mar", value: 552 },
      { period: "Apr", value: 560 },
      { period: "May", value: 568 },
      { period: "Jun", value: 575 },
      { period: "Jul", value: 582 },
      { period: "Aug", value: 590 },
      { period: "Sep", value: 596 },
      { period: "Oct", value: 604 },
      { period: "Nov", value: 612 },
      { period: "Dec", value: 620 },
    ],
  },
};
