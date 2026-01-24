import Link from "next/link";
import { ArrowRight, CalendarClock, Download, FileText } from "lucide-react";

const editions = [
  {
    year: "2021",
    title: "PHC 2021",
    description:
      "Latest national census results and thematic reports supporting SDGs and national development planning.",
    bullets: [
      "Thematic reports",
      "District & regional outputs",
      "Digital access to key tables",
    ],
    accent: "purple",
    viewHref: "https://census2021.statsghana.gov.gh",
    external: true,
  },
  {
    year: "2010",
    title: "PHC 2010",
    description:
      "Enhanced analysis products and updated classifications supporting development monitoring.",
    bullets: [
      "Analytical reports",
      "Community profiles",
      "Migration & urbanisation insights",
    ],
    accent: "teal",
    viewHref: "/census-surveys/population-housing-census/2010",
    external: false,
  },
  {
    year: "2000",
    title: "PHC 2000",
    description:
      "Expanded thematic outputs and improved geographic disaggregation for policy and research use.",
    bullets: [
      "Regional & district profiles",
      "Housing conditions",
      "Population structure indicators",
    ],
    accent: "amber",
    viewHref: "/census-surveys/population-housing-census/2000",
    external: false,
  },
  {
    year: "1984",
    title: "PHC 1984",
    description:
      "Foundation census series supporting national planning and baseline demographic statistics.",
    bullets: [
      "National population counts",
      "Settlement & housing characteristics",
      "Key tables & reports",
    ],
    accent: "emerald",
    viewHref: "/census-surveys/population-housing-census/1984",
    external: false,
  },
];

const accentStyles = {
  emerald: {
    badge: "bg-emerald-600",
    dot: "text-emerald-600",
    button: "bg-emerald-700 hover:bg-emerald-800",
    outline:
      "text-emerald-700 border-emerald-200 hover:border-emerald-300 hover:text-emerald-800",
  },
  amber: {
    badge: "bg-amber-500",
    dot: "text-amber-500",
    button: "bg-amber-600 hover:bg-amber-700",
    outline:
      "text-amber-700 border-amber-200 hover:border-amber-300 hover:text-amber-800",
  },
  teal: {
    badge: "bg-teal-600",
    dot: "text-teal-600",
    button: "bg-teal-700 hover:bg-teal-800",
    outline:
      "text-teal-700 border-teal-200 hover:border-teal-300 hover:text-teal-800",
  },
  purple: {
    badge: "bg-[#241B5A]",
    dot: "text-[#241B5A]",
    button: "bg-[#241B5A] hover:bg-[#1c1445]",
    outline:
      "text-[#241B5A] border-slate-200 hover:border-slate-300 hover:text-[#1c1445]",
  },
} as const;

type AccentKey = keyof typeof accentStyles;

const typedEditions = editions as Array<
  (typeof editions)[number] & { accent: AccentKey }
>;

export default function PopulationHousingCensusPage() {
  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          Home / Census &amp; Surveys / Population &amp; Housing Census
        </p>

        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Population &amp; Housing Census (PHC)
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">
          Explore Ghana&apos;s Population &amp; Housing Census editions, offering
          comprehensive demographic data and insights to support planning,
          policy making, and national development.
        </p>

        <div className="mt-8 border-t border-slate-200/70" />

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900">PHC Editions</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse through Ghana&apos;s official Population &amp; Housing Census
            editions. Select an edition below to view highlights, reports, and
            related resources.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {typedEditions.map((edition) => {
            const accent = accentStyles[edition.accent];
            return (
              <div
                key={edition.year}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white ${accent.badge}`}
                >
                  {edition.year}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {edition.title}
                </h3>
                <p className="mt-2 text-slate-600">{edition.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {edition.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className={`${accent.dot} mt-1 text-base`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {edition.external ? (
                    <a
                      href={edition.viewHref}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition ${accent.button}`}
                    >
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={edition.viewHref}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition ${accent.button}`}
                    >
                      View details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  <a
                    href="#"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${accent.outline}`}
                  >
                    <Download className="h-4 w-4" />
                    Download reports
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-700/40 bg-gradient-to-r from-emerald-50 via-white to-amber-50 p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-slate-900">
              Upcoming PHC 2030
            </h3>
            <p className="mt-2 text-slate-600">
              Next PHC projected for 2030. Planning phase underway for robust
              data collection and national engagement.
            </p>
            <Link
              href="#"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <CalendarClock className="h-6 w-6 text-emerald-700" />
              </div>
              <span>Timeline for release to be announced</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <FileText className="h-6 w-6 text-emerald-700" />
              </div>
              <span>Reports and datasets will be published here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
