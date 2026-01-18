import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Download } from "lucide-react";

const HERO_BANNER = "/images/agricpage/agricgreen.jpg";
const CENSUS_PHOTO = "/images/agricpage/agric-cocoa.jpg";

export default function AgriculturalCensusPage() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          Home / Surveys &amp; Census / Agricultural Census
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Agricultural Census
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          Explore Ghana&apos;s Agricultural Census, offering vital data on the
          agricultural sector for informed decision-making and sustainable
          development.
        </p>

        <div className="mt-8 border-t border-slate-200/70" />

        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Census Highlights
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600 leading-relaxed">
            A wide range of Agricultural Surveys editions to access insights
            and reports on Ghana&apos;s agricultural sector.
          </p>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={HERO_BANNER}
            alt="Agricultural census overview"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1000px, 100vw"
          />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:px-10 sm:py-12">
            <p className="max-w-3xl text-lg font-semibold text-slate-900">
              A wide range of Agricultural Surveys have been conducted and can
              be explored on our Surveys page &gt;
            </p>
            <Link
              href="/census-surveys/surveys"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Visit the Surveys page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Census Highlights
          </h2>
        </div>

        <div className="relative mt-6 min-h-[420px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm lg:min-h-[520px]">
          <Image
            src={CENSUS_PHOTO}
            alt="Agricultural Census 2017/18"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 1000px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute left-0 top-0 z-20">
            <div className="rounded-br-2xl bg-amber-500/80 px-8 py-4 text-white">
              <span className="text-2xl font-extrabold sm:text-3xl">
                2017/18
              </span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-10">
              <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/70 p-7 shadow-sm backdrop-blur-md sm:p-10">
                <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Agricultural Census 2017/18
                </h3>
                <div className="mt-4 h-px w-full bg-slate-300/70" />
                <p className="mt-5 text-lg text-slate-700 leading-relaxed">
                  Comprehensive national agricultural census with updated
                  statistical methodologies
                </p>
                <ul className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed sm:text-lg">
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-700" />
                    <span>
                      Detailed crop, livestock, and aquaculture data collected
                      at community, household and farm levels
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-700" />
                    <span>
                      Invaluable resource for shaping agricultural policies and
                      rural development strategies
                    </span>
                  </li>
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="#"
                    className="inline-flex w-full min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:w-auto"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300/60 bg-white/80 px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-white sm:w-auto"
                  >
                    <Download className="h-4 w-4" />
                    Download reports
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-700/30 bg-gradient-to-r from-emerald-50 via-white to-amber-50 p-6 shadow-sm sm:p-8 md:flex md:items-center md:justify-between md:gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-extrabold text-slate-900">
              The next Agricultural Census is pending.
            </h3>
            <p className="mt-2 text-slate-600">Stay tuned for updates.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
              {/* <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Download reports
              </Link> */}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-slate-600 md:mt-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <CalendarClock className="h-6 w-6 text-emerald-700" />
            </div>
            <span>Timeline for release to be announced</span>
          </div>
        </div>
      </div>
    </section>
  );
}
