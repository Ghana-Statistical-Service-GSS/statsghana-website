const PAGE_TITLE = "Legal Mandate";
const BREADCRUMB = ["About GSS", "Legal Mandate"];

const paragraphs = [
  "Efforts to institutionalise the collection and dissemination of statistical information in Ghana began in 1891 when the first population census in the Gold Coast was conducted. The Office of the Government Statistician was established in 1948 and was expanded and renamed the Central Bureau of Statistics in 1961. Subsequently, the Statistical Service Law, 1985 (PNDCL 135) was promulgated to establish the Ghana Statistical Service as an autonomous independent public service with a Board of Directors who report directly to the Office of the President.",
  "The Ghana Statistical Service has been consistent in performing its legal functions to serve the needs of individuals, organisations, development partners and the government without hindrance. However, the need to improve the legal framework to reflect changes in the statistics landscape worldwide has resulted in the promulgation of a new law- Statistical Service Act, 2019 (Act 1003) to replace the Statistical Service Law, 1985. The New Law establishes the Ghana Statistical Service as the central statistics producing and co-ordinating institution for the National Statistical System and to strengthen the production of quality, relevant, accurate and timely statistical information for the purpose of national development.",
];

const leadIn = "The New Law specifically mandates the Service to:";

const mandates = [
  {
    key: "a",
    text: "Provide leadership and direction for the efficient, consistent and comprehensive collection, processing, analysis, documentation and storage of statistical information within the National Statistical System;",
  },
  {
    key: "b",
    text: "Collect, compile, analyse, abstract, publish and disseminate statistical information related to the commercial, industrial, financial, social, demographic, economic and other activities and conditions of the people or this country through the conduct of surveys and national censuses, including population, housing, economic and agricultural censuses;",
  },
  {
    key: "c",
    text: "Determine the manner in which the Ministries, Departments, Agencies, District Assemblies and statutory bodies collaborate with the Service in the collection, compilation and publication of statistical information, including statistics derived from the activities of those entities;",
  },
  {
    key: "d",
    text: "Develop, create awareness and operationalize the code of ethics and practice for the production and use of data to ensure quality of statistics with respect to relevance, accuracy and reliability, coherence and comparability, sustainability, continuity, timeliness, topicality and integrity;",
  },
  {
    key: "e",
    text: "Manage a centrally organized database of",
    subItems: [
      "Commercial, industrial, financial, social, demographic and economic survey and censuses data sets at the micro and macro levels,",
      "Statistical indicators, and",
      "Metadata on the statistical processes within the National Statistical System;",
    ],
  },
  {
    key: "f",
    text: "Review, assess, classify and designate as official statistics, data produced by the Service, Ministries, Departments and Agencies, District Assemblies and other institutions within the country and report regularly on the state of official statistics to the Government and the people;",
  },
  {
    key: "g",
    text: "Promote and build statistical capacity and professional competencies using diverse interventions including the establishment and operation of a National Statistical Training Centre;",
  },
  {
    key: "h",
    text: "Prescribe and direct the pursuance of scientific independence, impartiality, responsibility and transparency in statistical production; and",
  },
  {
    key: "i",
    text: "Promote bilateral and multilateral statistics co-operation and partnership to upgrade statistics production systems in the country.",
  },
];

export default function LegalMandatePage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          {BREADCRUMB.join(" / ")}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>

        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}

        <p className="mt-4 text-slate-700 leading-relaxed">{leadIn}</p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <ol className="space-y-4 text-slate-700">
            {mandates.map((mandate) => (
              <li key={mandate.key} className="leading-relaxed">
                <span className="font-semibold">({mandate.key}) </span>
                {mandate.text}
                {mandate.subItems ? (
                  <ol className="mt-3 space-y-2 pl-6">
                    {mandate.subItems.map((item, index) => (
                      <li key={item} className="leading-relaxed">
                        <span className="font-semibold">
                          ({["i", "ii", "iii"][index]})
                        </span>{" "}
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <h2 className="mt-10 text-xl font-bold text-slate-900">
          Privacy and Confidentiality
        </h2>
        <p className="mt-4 text-slate-700 leading-relaxed">Content coming soon.</p>
      </div>
    </section>
  );
}
