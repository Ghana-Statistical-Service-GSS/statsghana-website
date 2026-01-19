export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

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
    label: "About GSS",
    href: "/about",
    children: [
      { label: "Legal Mandate", href: "/about/legal-mandate" },
      { label: "Management", href: "/about/management" },
      { label: "History", href: "/about/history" },
      {
        label: "National Statistical System (NSS)",
        href: "/about/national-statistical-system-nss",
      },
      { label: "Corporate Plan", href: "/about/corporate-plan" },
      { label: "Statistical Service Act", href: "/about/statistical-service-act" },
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
      {
        label: "Social & Demographic Statistics",
        href: "/data-statistics/social-and-demographic-statistics",
      },
    ],
  },
  withChildren("Publications", [
    "Census Reports",
    "Survey Reports",
    "Administrative Data Reports",
    "Statistical Frameworks",
  ]),
  withChildren("News & Media", [
    "News",
    "Press Releases",
    "Gallery",
    "Videos",
    "Opportunities",
  ]),
  withChildren("Data Portals", [
    "StatsBank",
    "Microdata Catalog",
    "National Reporting platform",
    "CPI Inflation Calculator",
    "Open Data for Africa",
    "Ghana Gridded Data portal",
  ]),
  withChildren("Data Request", [
    "Request Data",
    "Microdata Access",
    "Data Access Policy",
  ]),
];
