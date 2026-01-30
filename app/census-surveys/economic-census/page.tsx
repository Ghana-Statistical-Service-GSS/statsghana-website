"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const HERO_BG = "/images/economiccensus/hero-bg.jpg";
const IMG_WELDING = "/images/economiccensus/welding.jpg";
const IMG_PORT = "/images/economiccensus/port.jpg";
const IMG_CALLCENTER = "/images/economiccensus/callcenter.jpg";
const IMG_OFFICE = "/images/economiccensus/office.jpg";
const CTA_BG = "/images/economiccensus/office.jpg";
const TIMELINE_BG = HERO_BG;
const INDUSTRIAL_BG = HERO_BG;
const IBES_BG = HERO_BG;

const industrialItems = [
  {
    year: "2004",
    title: "2004 Industrial Census",
    text: "Complete enumerations of Ghana's industries conducted.",
    downloadUrl: "#",
  },
  {
    year: "1987",
    title: "1987 Industrial Census",
    text: "Complete enumerations of Ghana's industries conducted.",
    downloadUrl: "#",
  },
  {
    year: "1962",
    title: "1962 Industrial Census",
    text: "Complete enumerations of Ghana's industries conducted.",
    downloadUrl: "#",
  },
];

type IbesPhaseKey = "phase1" | "phase2";

type IbesPhaseContent = {
  pill: "Phase 1" | "Phase 2";
  phaseLabel: string;
  phaseType: "Census" | "Survey";
  bandTitle: string;
  body: string;
  downloadUrl: string;
  status?: { left: string; right: string };
};

type IbesCard = {
  year: "2014" | "2024";
  titleLeft: string;
  phases: Record<IbesPhaseKey, IbesPhaseContent>;
  defaultPhase: IbesPhaseKey;
};

const ibesCards: IbesCard[] = [
  {
    year: "2024",
    titleLeft: "IBES 2024",
    defaultPhase: "phase2",
    phases: {
      phase1: {
        pill: "Phase 1",
        phaseLabel: "Phase 1 is a",
        phaseType: "Census",
        bandTitle: "Listing & Frame Update",
        body: "Full enumeration to update the business register.",
        downloadUrl: "#",
      },
      phase2: {
        pill: "Phase 2",
        phaseLabel: "Phase 2 is a",
        phaseType: "Survey",
        bandTitle: "Sampled Survey",
        body: "Data collection is still in progress.",
        downloadUrl: "#",
        status: { left: "Started late 2025", right: "Data collection ending soon" },
      },
    },
  },
  {
    year: "2014",
    titleLeft: "IBES 2014",
    defaultPhase: "phase1",
    phases: {
      phase1: {
        pill: "Phase 1",
        phaseLabel: "Phase 1 is a",
        phaseType: "Census",
        bandTitle: "Listing & Frame Update",
        body: "Full enumeration to update the business register.",
        downloadUrl: "#",
      },
      phase2: {
        pill: "Phase 2",
        phaseLabel: "Phase 2 is a",
        phaseType: "Survey",
        bandTitle: "Sampled Survey",
        body: "Sample survey module focusing on detailed economic characteristics of establishments.",
        downloadUrl: "#",
      },
    },
  },
];

function IbesTimelineCard({ card }: { card: IbesCard }) {
  const [phase, setPhase] = useState<IbesPhaseKey>(card.defaultPhase);
  const active = card.phases[phase];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 shadow-sm">
      <div className="relative">
        <div className="w-[60%] bg-emerald-700 px-5 py-3 text-white">
          <span className="text-xl font-extrabold">{card.titleLeft}</span>
        </div>

        <div className="absolute right-0 top-0 h-full w-[48%] border-l border-slate-200/60 bg-amber-50/80 [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
          <div className="flex h-full flex-col">
            <div className="ml-auto flex w-full">
              {(["phase1", "phase2"] as IbesPhaseKey[]).map((key) => {
                const selected = phase === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPhase(key)}
                    className={[
                      "flex-1 border-b border-slate-200/70 px-3 py-2 text-sm font-semibold",
                      selected
                        ? "bg-white/70 text-slate-900 shadow-[inset_0_-2px_0_0_rgba(202,138,4,0.7)]"
                        : "bg-transparent text-slate-600 hover:bg-white/40",
                    ].join(" ")}
                  >
                    {key === "phase1" ? "Phase 1" : "Phase 2"}
                  </button>
                );
              })}
            </div>
            {/* <div className="flex flex-1 items-center justify-center px-4">
              <div className="text-right leading-tight">
                <div className="font-semibold text-slate-700">
                  {active.phaseLabel}
                </div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {active.phaseType}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-200/50 bg-slate-50/60 px-5 py-3">
        <span className="inline-flex items-center rounded-full bg-emerald-700/80 px-4 py-1 text-sm font-bold text-white">
          {active.pill}
        </span>
        <span className="font-semibold text-slate-800">{active.bandTitle}</span>
      </div>

      <div className="px-5 pt-4 text-slate-600">{active.body}</div>

      <div className="flex justify-end px-5 pb-4 pt-3">
        <a
          href={active.downloadUrl}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Download reports
        </a>
      </div>

      {active.status ? (
        <div className="flex flex-wrap gap-x-6 gap-y-2 bg-emerald-800/90 px-5 py-3 text-sm text-white">
          <span className="font-semibold">{active.status.left}</span>
          <span className="opacity-95">{active.status.right}</span>
        </div>
      ) : null}
    </div>
  );
}

export default function EconomicCensusPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-white/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/60 to-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-sm text-slate-500">
            Home / Census &amp; Surveys / Economic Census
          </p>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Economic Census
              </h1>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Explore Ghana&apos;s Economic Census, tracking the evolution of
                businesses and industries over time to provide key economic
                insights and data-driven decision-making.
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Learn about IBES Methodology
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white p-3 shadow-sm ring-1 ring-slate-200/40">
              <div className="grid gap-3 lg:h-[280px] lg:grid-cols-[2fr_1fr]">
                <div className="grid gap-3 lg:grid-rows-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                    <Image
                      src={IMG_WELDING}
                      alt="Industrial activity"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 340px, 100vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                    <Image
                      src={IMG_CALLCENTER}
                      alt="Business services"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 340px, 100vw"
                    />
                  </div>
                </div>
                <div className="grid gap-3 lg:grid-rows-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                    <Image
                      src={IMG_PORT}
                      alt="Port operations"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 200px, 100vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                    <Image
                      src={IMG_OFFICE}
                      alt="Office work"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 200px, 100vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-12">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Economic Census 
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-sm">
            <div className="absolute inset-0 -z-10">
              <Image
                src={TIMELINE_BG}
                alt=""
                fill
                className="object-cover opacity-10"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-white/75" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2">
              <div className="relative p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Industrial Census
                </h3>
                <div className="mt-3 h-px bg-slate-300/60" />

                <div className="relative mt-6 pl-12">
                  <div className="absolute left-4 top-0 bottom-0 border-l border-dashed border-slate-300/70" />
                  <div className="absolute left-7 top-0 bottom-0 border-l border-dashed border-slate-300/50" />

                  <div className="space-y-6">
                    {industrialItems.map((item) => (
                      <div key={item.year} className="relative">
                        <div className="absolute -left-[34px] top-7 h-4 w-4 rounded-full border border-amber-300 bg-amber-200 shadow-sm" />
                        <div className="absolute -left-[18px] top-9 h-px w-4 bg-slate-300/60" />
                        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm">
                          <div className="border-b border-slate-200/60 bg-amber-50/80 px-5 py-3">
                            <p className="text-xl font-extrabold text-slate-900">
                              {item.title}
                            </p>
                          </div>
                          <div className="px-5 py-4 text-slate-600 leading-relaxed">
                            {item.text}
                            <div className="mt-4 flex justify-end">
                              <a
                                href={item.downloadUrl}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                              >
                                <Download className="h-4 w-4" />
                                Download reports
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-slate-900">Integrated Business Establishment Survey (IBES)</h3>
                <div className="mt-3 h-px bg-slate-300/60" />

                <div className="mt-6 space-y-6">
                  {ibesCards.map((card) => (
                    <div key={card.year} className="relative">
                      <div className="hidden lg:block absolute -left-10 top-10 h-4 w-4 rounded-full border border-emerald-800/30 bg-emerald-700 shadow-sm" />
                      <div className="hidden lg:block absolute -left-6 top-[44px] h-px w-6 bg-slate-300/70" />
                      <IbesTimelineCard card={card} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={CTA_BG}
                    alt="IBES Phase 2 CTA"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                  <div className="absolute inset-0 bg-white/75" />
                  <div className="relative z-10 p-5">
                    <h4 className="text-lg font-semibold text-slate-900">
                      2024 IBES Phase 2
                    </h4>
                    <p className="mt-2 text-sm text-slate-600">
                      Data collection of sampled firms is ending soon.
                    </p>
                    <Link
                      href="#"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                    >
                      ReadMore
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-300/70" />
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-slate-300/60" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Key Points</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                Complete enumerations of Ghana&apos;s industries were conducted in
                1962, 1987, and 2004.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                IBES involves Phase 1 (Census) for business registry updates,
                and Phase 2 (Survey) to collect detailed economic data.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={CTA_BG}
            alt="IBES Phase 2 CTA"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                2024 IBES Phase 2
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Data collection is ending soon with sampled surveys collected
                late 2025.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              ReadMore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
