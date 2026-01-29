const PAGE_TITLE = "History";
const BREADCRUMB = ["About GSS", "History"];

const paragraphs = [
  "1891 marked the beginning of organised official statistics in Ghana with the conduct of the first population census in the territory then known as the Gold Coast. This pioneering exercise laid the foundation for systematic data collection and the use of statistics for administrative and developmental purposes.",
  "In 1948, following the end of the Second World War and in response to increasing administrative and planning needs, the colonial government established the Office of the Government Statistician. The Office was mandated to coordinate statistical activities and provide data to support governance and socio-economic planning. This marked the first formal institutional framework for the production of official statistics in the country.",
  "As Ghana moved towards independence and the demand for comprehensive economic and social data increased, the statistical system underwent further reorganisation. In 1961, the Office of the Government Statistician was expanded and reconstituted as the Central Bureau of Statistics (CBS) under the Statistics Act, 1961. Operating within the Ministry of Finance and Economic Planning, the CBS was responsible for coordinating statistical activities, conducting surveys and censuses, and producing economic and social statistics to support national development planning.",
  "A major institutional transformation occurred in 1985 when the Provisional National Defence Council (PNDC) enacted the Statistical Service Law, 1985 (PNDC Law 135). This law abolished the Central Bureau of Statistics and formally established the Ghana Statistical Service (GSS) as an autonomous public service institution within the Ghana Public Services. The law created the Statistical Service Board as the governing body of the Service, reporting directly to the Presidency. The Board comprised a chairman and five other members appointed by the President, with the Government Statistician serving as an ex-officio member. This legal framework strengthened the independence of official statistics and positioned the GSS as the principal authority for statistical production and coordination in the country.",
  "Following its establishment, GSS expanded its institutional presence nationwide, setting up a Head Office, 10 Regional Offices, and over 100 District Offices to support decentralised data collection and service delivery. Over the years, the Service conducted major national activities including population and housing censuses, economic and agricultural censuses, household and establishment surveys, and the compilation of critical socio-economic indicators. These statistical outputs became central to national development planning, policy formulation, monitoring and evaluation, and private sector development.",
  "In response to evolving national and global data demands, advancements in technology, and the increasing importance of evidence-based decision-making, the legal framework governing official statistics was reviewed. This culminated in the enactment of the Statistical Service Act, 2019 (Act 1003). The Act repealed PNDC Law 135 and reaffirmed the Ghana Statistical Service as the central statistics producing and coordinating institution for the National Statistical System. It strengthened the professional independence of the Service, enhanced quality assurance mechanisms, and improved coordination among Ministries, Departments and Agencies, District Assemblies and other data-producing institutions.",
  "Following the passage of Act 1003, the GSS adopted modern statistical methods, expanded the use of administrative and alternative data sources, and implemented strategic reforms to enhance data quality, accessibility and timeliness. In 2020, the Service launched its Five-Year Corporate Plan (2020–2024), focusing on institutional strengthening, digital transformation, capacity development and improved user engagement.",
  "In 2022, the National Statistical Advisory Committee was inaugurated to provide strategic guidance and strengthen coordination within the National Statistical System, further reinforcing the role of the GSS in the governance of official statistics.",
  "Today, the Ghana Statistical Service remains a cornerstone of Ghana’s development architecture, providing credible, relevant and timely statistical information to support policymaking, track national development outcomes, promote accountability, and guide both public and private sector decision-making.",
];

export default function HistoryPage() {
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
