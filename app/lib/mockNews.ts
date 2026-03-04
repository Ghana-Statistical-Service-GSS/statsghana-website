export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  dateISO: string;
  imageSrc: string;
  slug: string;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const mockNews: NewsItem[] = [
  {
    id: "news-2025-data-forum",
    title: "GSS Hosts National Data Forum 2025",
    excerpt:
      "Stakeholders convened to discuss priority data gaps and partnerships that will strengthen evidence-based policy planning across Ghana.",
    dateISO: "2025-04-04",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-hosts-national-data-forum-2025",
  },
  {
    id: "news-2024-cpi-release",
    title: "Monthly Consumer Price Index: February 2028 Release",
    excerpt:
      "The CPI release highlights inflation trends, market basket movements, and key price changes across regions.",
    dateISO: "2026-03-04",
    imageSrc: "/images/newcpi02026.png",
    slug: "monthly-cpi-february-2024-release",
  },
  {
    id: "news-2024-sdgs-partnership",
    title: "GSS Partners with UN for Sustainable Development Goals",
    excerpt:
      "The partnership strengthens SDG data production and supports coordinated monitoring at national and district levels.",
    dateISO: "2024-04-22",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-partners-with-un-for-sdgs",
  },
  {
    id: "news-2026-glss",
    title: "Ghana Living Standard Survey",
    excerpt:
      "Coverage and updates from the Ghana Living Standard Survey published by the Ghana Statistical Service.",
    dateISO: "2025-02-07",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "ghana-living-standard-survey",
  },
  {
    id: "news-2026-maintenance-mode",
    title: "GSS Maintenance Mode",
    excerpt:
      "Notice from Ghana Statistical Service on scheduled platform maintenance and temporary service interruption.",
    dateISO: "2026-02-01",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-maintenance-mode",
  },
  {
    id: "news-2020-phc-fraud-alert",
    title: "PHC 2020 Fraud Alert",
    excerpt:
      "Public advisory from GSS regarding fraudulent activity related to the PHC 2020 exercise.",
    dateISO: "2020-07-15",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "phc-2020-fraud-alert",
  },
  {
    id: "news-2020-phc-disclaimer",
    title: "Disclaimer PHC 2020",
    excerpt:
      "Official disclaimer issued by the Ghana Statistical Service for PHC 2020 communications.",
    dateISO: "2020-07-10",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "disclaimer-phc-2020",
  },
];
