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
    src: "/images/newcpi2026.png",
    title: "Inflation Rate",
    subtitle: "Check out the latest Inflation rate",
    content: ["Placeholder content for Inflation Rate. (We will replace later.)"],
    downloads: [{ title: "Latest CPI Bulletin (PDF)", href: "/downloads/cpi-latest.pdf" }],
  },
  {
    slug: "asd-2025-governance",
    src: "/images/ASD 2025 GOVERNANCE BANNER.jpg",
    title: "ASD 2025 Governance",
    subtitle: "Strengthening governance data for evidence-based decisions.",
    content: [
      "Ghana’s governance story is shaped by how people encounter public institutions every day. It shows up in the quality of services citizens receive, the fairness of administrative processes, and the degree to which people feel they are heard. The Governance Series was created to measure these experiences clearly and consistently, using evidence rather than impressions to guide national conversation and reform.",
      "Wave 2 of the Series, with a reference period of January to June 2025, deepens this understanding. The value of this second wave is simple: it shows what has changed, what remains stubborn, and where reforms must focus if Ghana is to build stronger, fairer, and more responsive institutions. The results tell an important story of progress, persistent gaps, and opportunities for action. The reference period for Wave 1 was January to December 2024.",
    ],
    downloads: [
      {
        title: "Governance Series — Wave 2 (Jan–Jun 2025) Report",
        href: "/downloads/governance-wave-2-jan-jun-2025.pdf",
      },
      {
        title: "Governance Series — Wave 1 (Jan–Dec 2024) Report",
        href: "/downloads/governance-wave-1-jan-dec-2024.pdf",
      },
    ],
  },
  {
    slug: "gdp-performance",
    src: "/images/GDP BANNER copy 1.png",
    title: "GDP Performance",
    subtitle: "Track Ghana’s growth trajectory with updated GDP indicators.",
    content: ["Placeholder content for GDP Performance. (We will replace later.)"],
    downloads: [{ title: "GDP Release (PDF)", href: "/downloads/gdp-release.pdf" }],
  },
];

export function getHeroSlide(slug: string) {
  return HERO_SLIDES.find((slide) => slide.slug === slug);
}
