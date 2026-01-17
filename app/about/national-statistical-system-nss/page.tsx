const PAGE_TITLE = "National Statistical System (NSS)";
const BREADCRUMB = ["About GSS", "National Statistical System (NSS)"];

const paragraphs = [
  "The usefulness of statistics to support policy formulation, decision-making, monitoring and evaluation of socio-economic development programmes and projects, has long been recognized. Beginning with the setting up, in 1948, of the office of the Government Statistician, the system has continued to evolve, as have the data requirements. The types of statistics required to plan and monitor socio-economic development have also increased significantly in number and in complexity. An additional set of statistical data would be required, with the expansion of uses, i.e., to monitor the progress towards the achievement of several major initiatives such as the Millennium Development Goals (MDGs), the Growth and Poverty Reduction Strategy (2006 to 2009), and the New Partnership for African Development (NEPAD).",
  "The Ghana Statistical Service (GSS) is the central agency in Ghana, mandated to produce and disseminate official statistics. The sector ministries, by virtue of their functions, also produce official statistics, which are relevant to their respective work programmes. With the decentralisation of public administration to the 170 districts in the country, the production of official statistics has also dispersed to the districts. Inadequate statistical infrastructure in many of the sector ministries, and currently the districts, is a major constraint in the production of reliable and timely statistical data for the country. Many of the districts have, thus far, been unable to establish statistical units within the districts that could effectively generate and use the required statistical data. Given that the need for statistical data as well as their production cuts across, geographical areas of the country, sectors and administrative districts, it is essential that the many aspects of the production of statistical data be well coordinated, standardized and harmonised.",
];

export default function NationalStatisticalSystemPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-justify text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
