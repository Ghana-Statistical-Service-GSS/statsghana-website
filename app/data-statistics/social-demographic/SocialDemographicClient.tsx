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
    rows: [
      {
        program: "Enrollment Statistics",
        category: "Education",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Completion Rates Brief",
        category: "Education",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Teacher Deployment Note",
        category: "Education",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "TVET Participation Summary",
        category: "Education",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Education Gender Parity",
        category: "Education",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Literacy Indicators Update",
        category: "Education",
        month: "Aug",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  health: {
    title: "Health and Social Care",
    description: "Health service coverage, outcomes, and social care indicators.",
    subtitle: "Health & Social Care Releases",
    rows: [
      {
        program: "Health Service Coverage",
        category: "Health",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Maternal Health Update",
        category: "Health",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Child Health Profile",
        category: "Health",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Health Facility Access Note",
        category: "Health",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Social Protection Snapshot",
        category: "Social Care",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "NHIS Utilization Brief",
        category: "Health",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  housing: {
    title: "Housing and Living Conditions",
    description:
      "Housing stock, utilities access, and household living standards.",
    subtitle: "Housing & Living Conditions Releases",
    rows: [
      {
        program: "Housing Stock Update",
        category: "Housing",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Utilities Access Report",
        category: "Living Conditions",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Rent & Housing Costs",
        category: "Housing",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Household Amenities Note",
        category: "Living Conditions",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Slum Profile Summary",
        category: "Housing",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Living Standards Brief",
        category: "Living Conditions",
        month: "Aug",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  governance: {
    title: "Governance & Peace",
    description: "Governance indicators, safety, and peace-related updates.",
    subtitle: "Governance & Peace Releases",
    rows: [
      {
        program: "Governance Indicators Update",
        category: "Governance",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Peace & Safety Brief",
        category: "Peace",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Public Trust Snapshot",
        category: "Governance",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Justice Sector Summary",
        category: "Governance",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Community Safety Report",
        category: "Peace",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Civic Participation Note",
        category: "Governance",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  tourism: {
    title: "Tourism and Cultural",
    description:
      "Tourism flows, cultural participation, and hospitality indicators.",
    subtitle: "Tourism & Cultural Releases",
    rows: [
      {
        program: "Tourist Arrivals Bulletin",
        category: "Tourism",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Hospitality Performance Note",
        category: "Tourism",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Cultural Participation Report",
        category: "Culture",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Tourism Receipts Summary",
        category: "Tourism",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Heritage Sites Update",
        category: "Culture",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Domestic Tourism Snapshot",
        category: "Tourism",
        month: "Aug",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  "vital-events": {
    title: "Civil Registration and Vital Events",
    description:
      "Births, deaths, and registration coverage indicators for Ghana.",
    subtitle: "Civil Registration and Vital Events Releases",
    rows: [
      {
        program: "Birth Registration Update",
        category: "Vital Events",
        month: "Feb",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Death Registration Bulletin",
        category: "Vital Events",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Vital Statistics Summary",
        category: "Vital Events",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Cause of Death Profile",
        category: "Vital Events",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Registration Coverage Note",
        category: "Vital Events",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "CRVS Performance Review",
        category: "Vital Events",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  population: {
    title: "Population",
    description:
      "Population size, structure, and demographic indicators across Ghana.",
    subtitle: "Population Releases",
    rows: [
      {
        program: "Population Estimates",
        category: "Population",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "Age-Sex Structure Brief",
        category: "Population",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Urban-Rural Profile",
        category: "Population",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Fertility Indicators Update",
        category: "Population",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Mortality Trends Note",
        category: "Population",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Population Projections",
        category: "Population",
        month: "Aug",
        year: "2024",
        downloadUrl: "#",
      },
    ],
  },
  migration: {
    title: "Migration",
    description:
      "Internal and international migration flows, patterns, and profiles.",
    subtitle: "Migration Releases",
    rows: [
      {
        program: "Internal Migration Brief",
        category: "Migration",
        month: "Jan",
        year: "2025",
        downloadUrl: "#",
      },
      {
        program: "International Migration Snapshot",
        category: "Migration",
        month: "Dec",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Migration by Region",
        category: "Migration",
        month: "Nov",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Remittance Trends Note",
        category: "Migration",
        month: "Oct",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Border Movements Summary",
        category: "Migration",
        month: "Sep",
        year: "2024",
        downloadUrl: "#",
      },
      {
        program: "Migration Profiles Report",
        category: "Migration",
        month: "Aug",
        year: "2024",
        downloadUrl: "#",
      },
    ],
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
