const PAGE_TITLE = "National Statistical System (NSS)";
const BREADCRUMB = ["About GSS", "National Statistical System (NSS)"];

const paragraphs = [
  "The National Statistical System comprises a network of institutions involved in the production, coordination, dissemination and use of official statistics in Ghana. At the centre of the system is the Ghana Statistical Service (GSS) is mandated to produce and disseminate official statistics and coordinate statistical activities across the country. The service is also responsible for overseeing the National Statistical System (NSS), ensuring coordination, standardisation, and quality assurance of official statistics across the country.",
  "Sector Ministries, Departments and Agencies (MDAs) also produce official statistics in line with their respective mandates, generating data across key sectors such as health, education, finance, labour and agriculture. With the decentralisation of public administration to the Metropolitan, Municipal and District Assemblies (MMDAs), the production of official statistics has increasingly extended to the district level.",
  "The NSS evolved from the establishment of the Office of the Government Statistician in 1948, which marked the beginning of a coordinated institutional framework for the production of official statistics in Ghana. Since then, the system has continued to develop in response to changing national development priorities and expanding data requirements.",
  "Over time, the range and complexity of statistics required to support planning, monitoring and evaluation of socio-economic development have increased significantly. In addition to traditional demographic and economic data, new statistical requirements emerged to support the monitoring of major national, regional and global development initiatives.",
  "Given that the need for statistical data and their production cut across geographical areas, sectors and administrative levels, effective coordination within the NSS is essential. The harmonisation and standardisation of statistical concepts, definitions, methodologies and production processes are critical to ensuring data quality, comparability and coherence across the system.",
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
