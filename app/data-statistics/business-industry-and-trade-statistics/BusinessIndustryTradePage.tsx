"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Briefcase, Factory, Ship, TrendingUp } from "lucide-react";
import ProgramTable, {
  ProgramRow,
} from "../economic-statistics/components/ProgramTable";

const HERO_BG = "/images/economic-statistics/hero-bg.png";

type BizKey = "business" | "price-index" | "trade" | "industry";

type BizContent = {
  title: string;
  description: string;
  subtitle: string;
  rows: ProgramRow[];
};

const BIZ_CONTENT: Record<BizKey, BizContent> = {
  business: {
    title: "Business",
    description:
      "Track business demography, registrations, and enterprise activity across Ghana.",
    subtitle: "Business Releases",
    rows: [
      {
        program: "Business Register Update",
        category: "Enterprise",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "New Registrations Bulletin",
        category: "Enterprise",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "SME Performance Note",
        category: "SME",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Business Confidence Snapshot",
        category: "Business Outlook",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Enterprise Size Distribution",
        category: "Enterprise",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Business Demography Report",
        category: "Enterprise",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  "price-index": {
    title: "Price Index",
    description:
      "Monitor inflation and price movements with consumer and producer price indices.",
    subtitle: "Price Index Releases",
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
  trade: {
    title: "Trade",
    description:
      "Understand Ghana's trade performance across exports, imports, and balance of trade.",
    subtitle: "Trade Releases",
    rows: [
      {
        program: "Monthly External Trade Bulletin",
        category: "External Trade",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Exports Summary",
        category: "Exports",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Imports Summary",
        category: "Imports",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Balance of Trade",
        category: "External Trade",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Trade Partner Highlights",
        category: "External Trade",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Quarterly Trade Brief",
        category: "External Trade",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Exports Summary",
        category: "Exports",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Imports Summary",
        category: "Imports",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  industry: {
    title: "Industry",
    description:
      "Review manufacturing, construction, and utilities data across Ghana's industrial sector.",
    subtitle: "Industry Releases",
    rows: [
      {
        program: "Manufacturing Output Report",
        category: "Manufacturing",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Construction Activity Note",
        category: "Construction",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Mining & Quarrying Bulletin",
        category: "Mining",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Energy & Utilities Update",
        category: "Utilities",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Industrial Employment Brief",
        category: "Industry",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Manufacturing Output Report",
        category: "Manufacturing",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
};

const CATEGORY_ITEMS: Array<{
  key: BizKey;
  label: string;
  icon: typeof TrendingUp;
}> = [
  {
    key: "business",
    label: "Business",
    icon: Briefcase,
  },
  {
    key: "price-index",
    label: "Price Index",
    icon: TrendingUp,
  },
  {
    key: "trade",
    label: "Trade",
    icon: Ship,
  },
  {
    key: "industry",
    label: "Industry",
    icon: Factory,
  },
];

export default function BusinessIndustryTradePage() {
  const [activeKey, setActiveKey] = useState<BizKey>("price-index");
  const activeContent = useMemo(() => BIZ_CONTENT[activeKey], [activeKey]);

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
                  Business, Industry &amp; Trade Statistics
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Business, Industry &amp; Trade Statistics
              </h1>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                Explore Ghana&apos;s business, industry, and trade statistics,
                including price indices, trade flows, and industrial
                performance. These releases from the Ghana Statistical Service
                (GSS) provide insights to support evidence-based decision-making.
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
            />
          </div>
        </div>
      </section>
    </div>
  );
}
