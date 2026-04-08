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
    slug: "mieg-rate",
    src: "/images/MIEG0126.png",
    title: "MIEG",
    subtitle: "Check out the latest Inflation rate",
    content: ["Inflation rate stands at 7.5 in January 2026."],
    downloads: [{ title: "Latest MIEG Bulletin (PDF)", href: "/data-statistics/economic-statistics?tab=national-accounts" }],
  },
  {
    slug: "inflation-rate",
    src: "/images/newcpi03026.png",
    title: "Inflation Rate",
    subtitle: "Check out the latest Inflation rate",
    content: ["Inflation rate stands at 3.2 in March 2026."],
    downloads: [{ title: "Latest CPI Bulletin (PDF)", href: "/data-statistics/economic-statistics?tab=price-index" }],
  },
  {
    slug: "website-security-consultancy-2026",
    src: "/images/security_consultancy.png",
    title: "Website Security Consultancy",
    subtitle: "Consultancy Services for Secure Code Review, Penetration Testing, and Patch Support for the In-House Redevelopment of the GSS Website.",
    content: [
      "The Ghana Statistical Service (GSS) is currently revamping its official website and data dissemination platform using an internal development team. As the primary repository for national data, the platform's integrity, availability, and confidentiality are paramount.",
      "To ensure the security of the new website, GSS is seeking consultancy services for secure code review, penetration testing, and patch support. The consultancy will help identify and mitigate potential vulnerabilities in the website's codebase, conduct thorough penetration testing to simulate real-world attacks, and provide ongoing patch support to address any security issues that arise.",
    ],
    downloads: [
      {
        title: "Website Security Consultancy TOR (PDF)",
        href: "https://www.dst.dk/Site/Dst/SingleFiles/GetArchiveFile.aspx?fi=8519113833011&fo=0&ext=intconsult",
      },
    ],
  },
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
  
];

export function getHeroSlide(slug: string) {
  return HERO_SLIDES.find((slide) => slide.slug === slug);
}
