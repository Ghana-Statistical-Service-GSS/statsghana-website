import Link from "next/link";

type SitemapSection = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const sitemapLinks: SitemapSection[] = [
  {
    title: "About Us",
    links: [
      { label: "Legal Mandate", href: "/about/legal-mandate" },
      { label: "Statistical Service Act", href: "/about/statistical-service-act" },
      { label: "Corporate Plan", href: "/about/corporate-plan" },
      { label: "Management", href: "/about/management" },
      { label: "History", href: "/about/history" },
      {
        label: "National Statistical System (NSS)",
        href: "/about/national-statistical-system",
      },
      { label: "Vision", href: "/about/vision" },
      { label: "Mission", href: "/about/mission" },
      { label: "Core Mandate", href: "/about/core-mandate" },
      { label: "Privacy & Confidentiality", href: "/about/privacy-confidentiality" },
    ],
  },
  {
    title: "Data & Statistics",
    links: [
      { label: "Economic Statistics", href: "/data-statistics/economic-statistics" },
      {
        label: "Business, Industry & Trade Statistics",
        href: "/data-statistics/business-industry-and-trade-statistics",
      },
      {
        label: "Social & Demographic Statistics",
        href: "/data-statistics/social-demographic",
      },
    ],
  },
  {
    title: "Surveys & Census",
    links: [
      { label: "Surveys", href: "/census-surveys/surveys" },
      { label: "Economic Census", href: "/census-surveys/economic-census" },
      {
        label: "Population & Housing Census",
        href: "/census-surveys/population-housing-census",
      },
      { label: "Agricultural Census", href: "/census-surveys/agricultural-census" },
    ],
  },
  {
    title: "Publications",
    links: [
      { label: "Census Reports", href: "/publications/census-reports" },
      { label: "Survey Reports", href: "/publications/survey-reports" },
      {
        label: "Administrative Data Reports",
        href: "/publications/administrative-data-reports",
      },
      { label: "Statistical Governance", href: "/publications/statistical-governance" },
    ],
  },
  {
    title: "News",
    links: [
      { label: "News", href: "/news" },
      { label: "Press Release", href: "/press-releases" },
      { label: "Career & Jobs", href: "/news-and-media/opportunities" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Gallery", href: "/media/gallery" },
      { label: "Videos", href: "/media/videos" },
    ],
  },
  {
    title: "Data Portals",
    links: [
      { label: "StatsBank", href: "https://statsbank.statsghana.gov.gh/" },
      { label: "Microdata Catalog", href: "https://microdata.statsghana.gov.gh/" },
      { label: "National Reporting Platform", href: "https://sdgs-ghana.github.io/" },
      {
        label: "Open Data for Africa",
        href: "https://dataportals.org/portal/ghana_opendataforafrica/",
      },
      {
        label: "Ghana Gridded Data Portal",
        href: "https://ghana-gridded-statistics-platform-statsghana.hub.arcgis.com/",
      },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Data Request", href: "/data-request/request-data" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">Home / Sitemap</p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Sitemap
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Browse all sections of the Ghana Statistical Service website.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sitemapLinks.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-emerald-700 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
