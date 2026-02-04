"use client";

import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen,
  Building2,
  Cross,
  HeartPulse,
  Home,
  Landmark,
  Plane,
  Users,
} from "lucide-react";
import ProgramTable, {
  ProgramRow,
} from "../economic-statistics/components/ProgramTable";

const HERO_BG = "/images/economic-statistics/hero-bg.png";

type CategoryKey =
  | "education"
  | "health"
  | "housing"
  | "governance"
  | "tourism"
  | "vital-events"
  | "population"
  | "migration";

type CategoryContent = {
  title: string;
  description: string;
  subtitle: string;
  rows: ProgramRow[];
};

const CATEGORY_CONTENT: Record<CategoryKey, CategoryContent> = {
  education: {
    title: "Education",
    description:
      "School enrollment, completion, and education system indicators.",
    subtitle: "Education Releases",
    rows: [],
  },
  health: {
    title: "Health and Social Care",
    description: "Health service coverage, outcomes, and social care indicators.",
    subtitle: "Health & Social Care Releases",
    rows: [],
  },
  housing: {
    title: "Housing and Living Conditions",
    description:
      "Housing stock, utilities access, and household living standards.",
    subtitle: "Housing & Living Conditions Releases",
    rows: [],
  },
  governance: {
    title: "Governance & Peace",
    description: "Governance indicators, safety, and peace-related updates.",
    subtitle: "Governance & Peace Releases",
    rows: [],
  },
  tourism: {
    title: "Tourism and Cultural",
    description:
      "Tourism flows, cultural participation, and hospitality indicators.",
    subtitle: "Tourism & Cultural Releases",
    rows: [],
  },
  "vital-events": {
    title: "Civil Registration and Vital Events",
    description:
      "Births, deaths, and registration coverage indicators for Ghana.",
    subtitle: "Civil Registration and Vital Events Releases",
    rows: [],
  },
  population: {
    title: "Population",
    description:
      "Population size, structure, and demographic indicators across Ghana.",
    subtitle: "Population Releases",
    rows: [],
  },
  migration: {
    title: "Migration",
    description:
      "Internal and international migration flows, patterns, and profiles.",
    subtitle: "Migration Releases",
    rows: [],
  },
};

const CATEGORY_ITEMS: Array<{
  key: CategoryKey;
  label: string;
  icon: typeof BookOpen;
}> = [
  {
    key: "education",
    label: "Education",
    icon: BookOpen,
  },
  {
    key: "health",
    label: "Health and Social Care",
    icon: HeartPulse,
  },
  {
    key: "housing",
    label: "Housing and Living Conditions",
    icon: Home,
  },
  {
    key: "governance",
    label: "Governance & Peace",
    icon: Building2,
  },
  {
    key: "tourism",
    label: "Tourism and Cultural",
    icon: Cross,
  },
  {
    key: "vital-events",
    label: "Civil Registration and Vital Events",
    icon: Landmark,
  },
  {
    key: "population",
    label: "Population",
    icon: Users,
  },
  {
    key: "migration",
    label: "Migration",
    icon: Plane,
  },
];

export default function SocialDemographicClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") as CategoryKey | null;
  const defaultCategory = CATEGORY_ITEMS[0].key;
  const [activeKey, setActiveKey] = useState<CategoryKey>(
    categoryParam ?? defaultCategory,
  );

  useEffect(() => {
    if (categoryParam && categoryParam !== activeKey) {
      setActiveKey(categoryParam);
    }
  }, [categoryParam, activeKey]);

  const activeContent = useMemo(() => CATEGORY_CONTENT[activeKey], [activeKey]);

  const handleCategoryChange = (key: CategoryKey) => {
    setActiveKey(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", key);
    router.replace(`${pathname}?${params.toString()}`);
  };

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
                  Social &amp; Demographic Statistics
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Social &amp; Demographic Statistics
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
                Explore Ghana&apos;s social conditions and demographic dynamics,
                covering education, health, housing, governance, and population
                trends to support planning and service delivery.
              </p>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      <section className="relative -mt-10 px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 px-4 py-4 shadow-sm backdrop-blur">
            <div className="flex flex-wrap gap-3">
              {CATEGORY_ITEMS.map((item) => {
                const isActive = item.key === activeKey;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleCategoryChange(item.key)}
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
