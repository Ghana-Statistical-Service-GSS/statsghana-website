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
    slug: "gdp-performance",
    src: "/images/gdpbannerlatest.jpg",
    title: "2025 Q4 GDP Highlights",
    subtitle: "Track Ghana’s fourth-quarter growth and the 2025 annual GDP estimates.",
    content: [
      "The GDP highlight brings together Ghana's 2025 fourth-quarter results with the 2025 Annual GDP Estimates to show how the economy performed over the full year.",
      "It supports quick access to sector performance, growth trends, and headline national accounts updates for decision-making and public communication.",
    ],
    downloads: [
      {
        title: "GDP Highlights",
        href: "/data-statistics/economic-statistics?tab=national-accounts",
      },
    ],
  },
  {
    slug: "mou-signing-2026",
    src: "/images/mourelease.png",
    title: "Joint MOU Signing 2026",
    subtitle: "Strengthening data collaboration between GSS and MDAs.",
    content: [
      "25 MDAs partner with GSS to improve administrative data systems and statistical coordination.",
      "The Ghana Statistical Service (GSS) has signed a Memorandum of Understanding (MoU) with 25 Ministries, Departments and Agencies (MDAs) to strengthen collaboration in the production and use of official statistics in Ghana.",
      "The agreement, signed during a one-day ceremony held at the Movenpick Hotel in Accra, marks an important step toward strengthening coordination within Ghana's National Statistical System and improving the use of administrative data to support national development.",
      "The collaboration will focus on strengthening administrative data systems, improving data sharing across institutions, promoting adherence to national statistical standards, and enhancing the capacity of MDAs to produce and use quality data for planning, monitoring, and evaluation."
    ],
  },
  {
    slug: "inflation-rate",
    src: "/images/newcpi02026.png",
    title: "Inflation Rate",
    subtitle: "Check out the latest Inflation rate",
    content: ["Inflation rate stands at 3.3 in February 2026."],
    downloads: [{ title: "Latest CPI Bulletin (PDF)", href: "/data-statistics/economic-statistics?tab=price-index" }],
  },
  
];

export function getHeroSlide(slug: string) {
  return HERO_SLIDES.find((slide) => slide.slug === slug);
}
