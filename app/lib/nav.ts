import { slugify } from "./slugify";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const withChildren = (base: string, children: string[]): NavItem => ({
  label: base,
  href: `/${slugify(base)}`,
  children: children.map((child) => ({
    label: child,
    href: `/${slugify(base)}/${slugify(child)}`,
  })),
});

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Legal Mandate", href: "/about/legal-mandate" },
      {
        label: "Statistical Service Act",
        href: "/about/statistical-service-act",
      },
      { label: "Management", href: "/about/management" },
      { label: "Board", href: "/about/board" },
      { label: "History", href: "/about/history" },
      {
        label: "National Statistical System (NSS)",
        href: "/about/national-statistical-system",
      },
      { label: "Corporate Plan", href: "/about/corporate-plan" },
      { label: "Vision", href: "/about/vision" },
      { label: "Mission", href: "/about/mission" },
      { label: "Core Mandate", href: "/about/core-mandate" },
      {
        label: "Privacy & Confidentiality",
        href: "/about/privacy-confidentiality",
      },
    ],
  },
  {
    label: "Census & Surveys",
    href: "/census-surveys",
    children: [
      {
        label: "Population & Housing Census",
        href: "/census-surveys/population-housing-census",
      },
      {
        label: "Agricultural Census",
        href: "/census-surveys/agricultural-census",
      },
      {
        label: "Economic Census",
        href: "/census-surveys/economic-census",
      },
      {
        label: "Surveys",
        href: "/census-surveys/surveys",
      },
    ],
  },
  {
    label: "Data & Statistics",
    href: "/data-statistics",
    children: [
      {
        label: "Economic Statistics",
        href: "/data-statistics/economic-statistics",
      },

      {
        label: "Business, Industry & Trade Statistics",
        href: "/data-statistics/business-industry-and-trade-statistics",
      },
    ],
  },
  withChildren("Publications", [
    "Census Reports",
    "Survey Reports",
    "Administrative Data Reports",
    "Statistical Governance",
  ]),
  {
    label: "News & Events",
    href: "/news-and-events",
    children: [
      { label: "News", href: "/news-and-events/news" },
      { label: "Press Releases", href: "/news-and-events/press-releases" },
      { label: "Career & Jobs", href: "/news-and-events/opportunities" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Gallery", href: "/media/gallery" },
      { label: "Videos", href: "/media/videos" },
    ],
  },
  {
    label: "Data Portals",
    href: "/data-portals",
    children: [
      { label: "StatsBank", href: "https://statsbank.statsghana.gov.gh/" },
      {
        label: "Microdata Catalog",
        href: "https://microdata.statsghana.gov.gh/",
      },
      {
        label: "National Reporting platform",
        href: "https://sdgs-ghana.github.io/",
      },
      { label: "CPI Inflation Calculator", href: "https://statsghana.gov.gh/CPI_Inflation_Cal.html" },
      {
        label: "Open Data for Africa",
        href: "https://dataportals.org/portal/ghana_opendataforafrica/",
      },
      {
        label: "Ghana Gridded Data portal",
        href: "https://ghana-gridded-statistics-platform-statsghana.hub.arcgis.com/",
      },
    ],
  },
  {
    label: "Data Request",
    href: "/data-request",
    children: [
      { label: "Request Data", href: "/data-request/request-data" },
      {
        label: "Dataset Downloads",
        href: "https://microdata.statsghana.gov.gh/",
      },
    ],
  },
];
