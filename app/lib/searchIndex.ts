export type SearchItem = {
  label: string;
  href: string;
  keywords?: string[];
  group?: string;
};

export const searchIndex: SearchItem[] = [
  { label: "Home", href: "/", group: "General" },
  { label: "Legal Mandate", href: "/about/legal-mandate", group: "About" },
  {
    label: "Statistical Service Act",
    href: "/about/statistical-service-act",
    group: "About",
  },
  { label: "Management", href: "/about/management", group: "About" },
  { label: "History", href: "/about/history", group: "About" },
  {
    label: "National Statistical System (NSS)",
    href: "/about/national-statistical-system",
    group: "About",
  },
  { label: "Corporate Plan", href: "/about/corporate-plan", group: "About" },
  { label: "Vision", href: "/about/vision", group: "About" },
  { label: "Mission", href: "/about/mission", group: "About" },
  { label: "Core Mandate", href: "/about/core-mandate", group: "About" },
  {
    label: "Population & Housing Census",
    href: "/census-surveys/population-housing-census",
    group: "Census & Surveys",
    keywords: ["PHC"],
  },
  {
    label: "Agricultural Census",
    href: "/census-surveys/agricultural-census",
    group: "Census & Surveys",
  },
  {
    label: "Economic Census",
    href: "/census-surveys/economic-census",
    group: "Census & Surveys",
  },
  {
    label: "Surveys",
    href: "/census-surveys/surveys",
    group: "Census & Surveys",
  },
  {
    label: "Economic Statistics",
    href: "/data-statistics/economic-statistics",
    group: "Data & Statistics",
  },
  {
    label: "Business, Industry & Trade Statistics",
    href: "/data-statistics/business-industry-and-trade-statistics",
    group: "Data & Statistics",
  },
  {
    label: "Social & Demographic Statistics",
    href: "/data-statistics/social-demographic",
    group: "Data & Statistics",
  },
  {
    label: "Census Reports",
    href: "/publications/census-reports",
    group: "Publications",
  },
  {
    label: "Survey Reports",
    href: "/publications/survey-reports",
    group: "Publications",
  },
  {
    label: "Administrative Data Reports",
    href: "/publications/administrative-data-reports",
    group: "Publications",
  },
  {
    label: "Statistical Governance",
    href: "/publications/statistical-governance",
    group: "Publications",
  },
  { label: "News", href: "/news", group: "News" },
  { label: "Press Releases", href: "/press-releases", group: "News" },
  {
    label: "Career & Jobs",
    href: "/news-and-media/opportunities",
    group: "News",
    keywords: ["Opportunities", "Jobs", "Careers"],
  },
  { label: "Gallery", href: "/media/gallery", group: "Media" },
  { label: "Videos", href: "/media/videos", group: "Media" },
  {
    label: "StatsBank",
    href: "https://statsbank.statsghana.gov.gh/",
    group: "Data Portals",
  },
  {
    label: "Microdata Catalog",
    href: "https://microdata.statsghana.gov.gh/",
    group: "Data Portals",
  },
  {
    label: "National Reporting Platform",
    href: "https://sdgs-ghana.github.io/",
    group: "Data Portals",
  },
  {
    label: "Open Data for Africa",
    href: "https://dataportals.org/portal/ghana_opendataforafrica/",
    group: "Data Portals",
  },
  {
    label: "Ghana Gridded Data Portal",
    href: "https://ghana-gridded-statistics-platform-statsghana.hub.arcgis.com/",
    group: "Data Portals",
  },
  {
    label: "CPI Inflation Calculator",
    href: "/data-portals/cpi-inflation-calculator",
    group: "Data Portals",
  },
  {
    label: "Request Data",
    href: "/data-request/request-data",
    group: "Data Request",
  },
];
