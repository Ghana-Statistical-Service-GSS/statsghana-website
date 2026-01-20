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
    id: "news-2024-agri-launch",
    title: "2024 Agriculture Census Launched",
    excerpt:
      "The Ghana Statistical Service officially launched the 2024 Agriculture Census at the MoFA press briefing, outlining key timelines and field operations.",
    dateISO: "2024-04-12",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "2024-agriculture-census-launched",
  },
  {
    id: "news-2024-data-forum",
    title: "GSS Hosts National Data Forum 2024",
    excerpt:
      "Stakeholders convened to discuss priority data gaps and partnerships that will strengthen evidence-based policy planning across Ghana.",
    dateISO: "2024-04-04",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "gss-hosts-national-data-forum-2024",
  },
  {
    id: "news-2024-demographic-trends",
    title: "Ghana Demographic Trends 2023 Report Released",
    excerpt:
      "The latest demographic trends report provides insights on population growth, age structure, and regional dynamics.",
    dateISO: "2024-03-25",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "ghana-demographic-trends-2023-report",
  },
  {
    id: "news-2024-cpi-release",
    title: "Monthly Consumer Price Index: April 2024 Release",
    excerpt:
      "The CPI release highlights inflation trends, market basket movements, and key price changes across regions.",
    dateISO: "2024-05-19",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "monthly-cpi-april-2024-release",
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
    id: "news-2024-phc-briefing",
    title: "Press Briefing on Preliminary Census Results",
    excerpt:
      "GSS shared preliminary Population and Housing Census results with media and stakeholders.",
    dateISO: "2024-03-18",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "press-briefing-on-preliminary-census-results",
  },
];
