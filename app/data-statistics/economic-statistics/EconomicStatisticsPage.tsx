"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BarChart3, Briefcase, Leaf, TrendingUp } from "lucide-react";
import ProgramTable, {
  ProgramRow,
} from "./components/ProgramTable";

const HERO_BG = "/images/economic-statistics/hero-bg.png";

type EconKey =
  | "national-accounts"
  | "price-index"
  | "agri-env"
  | "services";

type EconContent = {
  title: string;
  description: string;
  subtitle: string;
  rows: ProgramRow[];
};

const ECON_CONTENT: Record<EconKey, EconContent> = {
  "national-accounts": {
    title: "National Accounts",
    description:
      "Track Ghana's GDP, sector contributions, and macroeconomic trends with official national accounts.",
    subtitle: "National Accounts Releases",
    rows: [
      {
        program: "Quarterly GDP Bulletin",
        category: "GDP",
        month: "Jan",
        quarter: "Q1",
        year: "2025",
        downloadUrl: "#",
        fileLabel: "PDF",
      },
      {
        program: "Annual National Accounts",
        category: "GDP",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
        fileLabel: "PDF",
      },
      {
        program: "Sector Weights Update",
        category: "National Accounts",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Supply & Use Tables",
        category: "Input-Output",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Quarterly GDP Bulletin",
        category: "GDP",
        month: "Sep",
        quarter: "Q3",
        year: "2024",
        downloadUrl: "#",
        fileLabel: "PDF",
      },
      {
        program: "Annual National Accounts",
        category: "GDP",
        month: "Dec",
        year: "2023",
        downloadUrl: "#",
      },
    ],
  },
  "price-index": {
    title: "Price Indices",
    description:
      "Monitor inflation and price movements with consumer and producer price indices.",
    subtitle: "Price Indices Releases",
    rows: [
      {
        program: "CPI Bulletin",
        category: "Inflation",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "CPI Regional Summary",
        category: "Inflation",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "PPI Release",
        category: "Producer Prices",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Inflation Outlook Note",
        category: "Inflation",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "CPI Bulletin",
        category: "Inflation",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Market Basket Update",
        category: "Consumer Prices",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  "agri-env": {
    title: "Agriculture & Environment",
    description:
      "Explore output, productivity, and sustainability indicators across Ghana's agro-ecological zones.",
    subtitle: "Agriculture & Environment Releases",
    rows: [
      {
        program: "Crop Production Bulletin",
        category: "Agriculture",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Livestock Update",
        category: "Agriculture",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Fisheries Snapshot",
        category: "Environment",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Rainfall & Climate Note",
        category: "Environment",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Land Use Report",
        category: "Environment",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Agricultural Outlook",
        category: "Agriculture",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  services: {
    title: "Services",
    description:
      "See the performance of Ghana's growing services sector, from finance to tourism.",
    subtitle: "Services Releases",
    rows: [
      {
        program: "ICT Services Bulletin",
        category: "ICT",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Financial Services Update",
        category: "Finance",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Tourism Arrivals Report",
        category: "Tourism",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Hospitality Activity Note",
        category: "Hospitality",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Transport Services Summary",
        category: "Transport",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Business Services Index",
        category: "Professional Services",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
};

const CATEGORY_ITEMS: Array<{
  key: EconKey;
  label: string;
  icon: typeof BarChart3;
}> = [
  {
    key: "national-accounts",
    label: "National Accounts",
    icon: BarChart3,
  },
  {
    key: "price-index",
    label: "Price Indices",
    icon: TrendingUp,
  },
  {
    key: "agri-env",
    label: "Agriculture & Environment",
    icon: Leaf,
  },
  {
    key: "services",
    label: "Services",
    icon: Briefcase,
  },
];

export default function EconomicStatisticsPage() {
  const [activeKey, setActiveKey] = useState<EconKey>("national-accounts");
  const [nationalRows, setNationalRows] = useState<ProgramRow[]>(
    ECON_CONTENT["national-accounts"].rows,
  );
  const [priceRows, setPriceRows] = useState<ProgramRow[]>(
    ECON_CONTENT["price-index"].rows,
  );
  const [agriRows, setAgriRows] = useState<ProgramRow[]>(
    ECON_CONTENT["agri-env"].rows,
  );
  const [serviceRows, setServiceRows] = useState<ProgramRow[]>(
    ECON_CONTENT["services"].rows,
  );

  useEffect(() => {
    const loadRows = async () => {
      try {
        const response = await fetch(
          "/api/economic-statistics/national-accounts",
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data?.rows?.length) {
          setNationalRows(
            data.rows.map((row: ProgramRow) => ({
              ...row,
              downloadUrl: row.downloadUrl || "#",
            })),
          );
        }
      } catch {
        // keep fallback rows
      }
    };

    loadRows();
  }, []);

  useEffect(() => {
    const loadRows = async () => {
      try {
        const response = await fetch("/api/economic-statistics/price-index");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.rows?.length) {
          setPriceRows(
            data.rows.map((row: ProgramRow) => ({
              ...row,
              downloadUrl: row.downloadUrl || "#",
            })),
          );
        }
      } catch {
        // keep fallback rows
      }
    };

    loadRows();
  }, []);

  useEffect(() => {
    const loadRows = async () => {
      try {
        const response = await fetch("/api/economic-statistics/agri-env");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.rows?.length) {
          setAgriRows(
            data.rows.map((row: ProgramRow) => ({
              ...row,
              downloadUrl: row.downloadUrl || "#",
            })),
          );
        }
      } catch {
        // keep fallback rows
      }
    };

    loadRows();
  }, []);

  useEffect(() => {
    const loadRows = async () => {
      try {
        const response = await fetch("/api/economic-statistics/services");
        if (!response.ok) return;
        const data = await response.json();
        if (data?.rows?.length) {
          setServiceRows(
            data.rows.map((row: ProgramRow) => ({
              ...row,
              downloadUrl: row.downloadUrl || "#",
            })),
          );
        }
      } catch {
        // keep fallback rows
      }
    };

    loadRows();
  }, []);

  const activeContent = useMemo(() => {
    if (activeKey === "national-accounts") {
      return { ...ECON_CONTENT[activeKey], rows: nationalRows };
    }
    if (activeKey === "price-index") {
      return { ...ECON_CONTENT[activeKey], rows: priceRows };
    }
    if (activeKey === "agri-env") {
      return { ...ECON_CONTENT[activeKey], rows: agriRows };
    }
    if (activeKey === "services") {
      return { ...ECON_CONTENT[activeKey], rows: serviceRows };
    }
    return ECON_CONTENT[activeKey];
  }, [activeKey, nationalRows, priceRows, agriRows, serviceRows]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/60 pt-8 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white/60 to-white" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-sm text-slate-600">
                Home <span className="mx-2 text-slate-400">/</span> Data &amp;
                Statistics <span className="mx-2 text-slate-400">/</span>{" "}
                <span className="font-medium text-slate-800">
                  Economic Statistics
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Economic Statistics
              </h1>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                Explore Ghana&apos;s Economic Statistics, covering National
                Accounts, Price Indices, Trade, Agriculture, Environment,
                Services, and Industry. These statistics provided by the Ghana
                Statistical Service (GSS) offer a comprehensive view of the
                country&apos;s economic performance across various sectors to
                support effective decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 px-4 py-4 shadow-sm backdrop-blur">
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1">
              {CATEGORY_ITEMS.map((item) => {
                const isActive = item.key === activeKey;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveKey(item.key)}
                    className={[
                      "relative flex min-w-[150px] flex-1 items-center gap-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold transition md:flex-col",
                      isActive
                        ? "bg-slate-50 text-slate-900 shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-50/70",
                    ].join(" ")}
                  >
                    <Icon
                      aria-hidden="true"
                      className={[
                        "h-6 w-6 transition-colors",
                        isActive ? "text-emerald-700" : "text-slate-400",
                      ].join(" ")}
                    />
                    <span className="text-xs sm:text-sm">{item.label}</span>
                    <span
                      className={[
                        "absolute bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full",
                        isActive ? "bg-emerald-600" : "bg-transparent",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-16">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={HERO_BG}
            alt=""
            fill
            className="object-cover opacity-[0.08]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/95 to-white" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-slate-900">
              {activeContent.title}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {activeContent.description}
            </p>
          </div>

          <div className="mt-8">
            <ProgramTable
              title={`${activeContent.title} Releases`}
              subtitle={activeContent.subtitle}
              rows={activeContent.rows}
              showType={activeKey === "national-accounts"}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
