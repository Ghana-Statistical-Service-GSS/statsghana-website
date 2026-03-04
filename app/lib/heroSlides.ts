export type HeroSlide = {
  slug: string;
  title: string;
  subtitle: string;
  src: string;
  content?: string[];
  downloads?: { title: string; href: string }[];
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    slug: "inflation-rate",
    src: "/images/newcpi02026.png",
    title: "Inflation Rate",
    subtitle: "Check out the latest Inflation rate",
    content: ["Inflation rate stands at 3.3 in February 2026."],
    downloads: [{ title: "Latest CPI Bulletin (PDF)", href: "/data-statistics/economic-statistics" }],
  },
  {
    slug: "asd-2025-governance",
    src: "/images/ASD 2025 GOVERNANCE BANNER.jpg",
    title: "ASD 2025 Governance",
    subtitle: "Strengthening governance data for evidence-based decisions.",
    content: [
      "Ghana’s governance story is shaped by how people encounter public institutions every day. It shows up in the quality of services citizens receive, the fairness of administrative processes, and the degree to which people feel they are heard. The Governance Series was created to measure these experiences clearly and consistently, using evidence rather than impressions to guide national conversation and reform.",
      "Wave 2 of the Series, with a reference period of January to June 2025, deepens this understanding. The value of this second wave is simple: it shows what has changed, what remains stubborn, and where reforms must focus if Ghana is to build stronger, fairer, and more responsive institutions. The results tell an important story of progress, persistent gaps, and opportunities for action. The reference period for Wave 1 was June to December 2024.",
    ],
    downloads: [
      {
        title: "Governance Series — Wave 2  Report",
        href: "/publications/survey-reports",
      },
      {
        title: "Governance Series — Wave 1  Report",
        href: "/publications/survey-reports",
      },
    ],
  },
  {
    slug: "gdp-performance",
    src: "/images/GDPBANNER.jpg",
    title: "GDP Performance",
    subtitle: "Track Ghana’s growth trajectory with updated GDP indicators.",
    content: ["Ghana's economy grew by 6.3 in the second quarter of 2025."],
    downloads: [{ title: "GDP Release (PDF)", href: "/data-statistics/economic-statistics" }],
  },
];

export function getHeroSlide(slug: string) {
  return HERO_SLIDES.find((slide) => slide.slug === slug);
}
