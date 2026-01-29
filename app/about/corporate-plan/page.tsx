import Link from "next/link";

const PAGE_TITLE = "Corporate Plan";
const BREADCRUMB = ["About GSS", "Corporate Plan"];

const principles = [
  {
    title: "Relevance, impartiality and equal access",
    text: "Official statistics provide an indispensable element in the information system of a democratic society, serving the government, the economy and the public with data about the economic, demographic, social and environmental situation. To this end, official statistics that meet the test of practical utility are to be compiled and made available on an impartial basis by official statistical agencies to honour citizens' entitlement to public information.",
  },
  {
    title: "Professional standards and ethics",
    text: "To retain trust in official statistics, the statistical agencies need to decide according to strictly professional considerations, including scientific principles and professional ethics, on the methods and procedures for the collection, processing, storage and presentation of statistical data.",
  },
  {
    title: "Accountability and transparency",
    text: "To facilitate a correct interpretation of the data, the statistical agencies are to present information according to scientific standards on the sources, methods and procedures of the statistics.",
  },
  {
    title: "Prevention of misuse",
    text: "The statistical agencies are entitled to comment on erroneous interpretation and misuse of statistics.",
  },
  {
    title: "Sources of official statistics",
    text: "Data for statistical purposes may be drawn from all types of sources, be they statistical surveys or administrative records. Statistical agencies are to choose the source regarding quality, timeliness, costs and the burden on respondents.",
  },
  {
    title: "Confidentiality",
    text: "Individual data collected by statistical agencies for statistical compilation, whether they refer to natural or legal persons, are to be strictly confidential and used exclusively for statistical purposes.",
  },
  {
    title: "Legislation",
    text: "The laws, regulations and measures under which the statistical systems operate are to be made public.",
  },
  {
    title: "National Coordination",
    text: "Coordination among statistical agencies within countries is essential to achieve consistency and efficiency in the statistical system.",
  },
  {
    title: "Use of international standards",
    text: "The use by statistical agencies in each country of international concepts, classifications and methods promotes the consistency and efficiency of statistical systems at all official levels.",
  },
  {
    title: "International Cooperation",
    text: "Bilateral and multilateral cooperation in statistics contributes to the improvement of systems of official statistics in all countries",
  },
];

const values = ["Professionalism", "Integrity", "Accountability", "Relevance"];

export default function CorporatePlanPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>

        <div className="mt-6 space-y-6">
          {principles.map((principle) => (
            <div key={principle.title} className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-900">
                {principle.title}
              </h2>
              <p className="text-justify text-slate-700 leading-relaxed">{principle.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Vision</h2>
          <p className="mt-2 text-justify text-slate-700 leading-relaxed">
            To be the trusted provider of official statistics for good governance
          </p>
          <Link
            href="/about/vision"
            className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View Vision
          </Link>

          <h2 className="mt-6 text-xl font-bold text-slate-900">Mission</h2>
          <p className="mt-2 text-justify text-slate-700 leading-relaxed">
            To lead in the efficient collection, production, management and dissemination
            of quality Official Statistics based on international standards, using competent
            and motivated staff for evidence-based decision making, in support of national
            development.
          </p>
          <Link
            href="/about/mission"
            className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View Mission
          </Link>

          <h2 className="mt-6 text-xl font-bold text-slate-900">Core Values</h2>
          <p className="mt-2 text-justify text-slate-700 leading-relaxed">
            The core values are essential to achieving high performance levels and to create
            an organization that will foster:
          </p>
          <Link
            href="/about/core-mandate"
            className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View Core Mandate
          </Link>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
