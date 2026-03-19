export type PressRelease = {
  id: string;
  title: string;
  excerpt: string;
  dateISO: string;
  imageSrc: string;
  slug: string;
  documentKey: string;
  sourcePage: 1 | 2;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const pressReleases: PressRelease[] = [
  {
  id: "press-2026-ibes-open-space",
  title: "GSS Expands Business Data Collection to Include Mobile and Open-Space Enterprises",
  excerpt: "The survey identified 82,920 mobile business operators nationwide. Women account for 64,237 operators, representing 77.5 percent, while 52,000 operators, representing over 60 percent, are aged between 15 and 35 years.",
  dateISO: "2026-03-19",
  imageSrc: "/images/ibesrelease.jpeg",
  slug: "press-2026-ibes-open-space",
  documentKey: "newsevent/pressrelease/IBES_18.3.2026 press release pdf.pdf",
  sourcePage: 1
},
  {
    id: "press-2026-mou-signing-wth-mdas",
    title: "Joint MOU Signing between Ghana Statistical Service and Ministries, Departments, and Agencies (MDAs) to Strengthen Data Collaboration",
    excerpt:
      "25 MDAs partner with GSS to improve administrative data systems and statistical coordination",
    dateISO: "2026-03-12",
    imageSrc: "/images/mourelease.png",
    slug: "press-2026-mou-signing-wth-mdas",
    documentKey:
      "newsevent/pressrelease/MoU Press Release_12.3.26.pdf",
    sourcePage: 1,
  }
  ,
  {
    id: "press-2025-gits-press-release",
    title:
      "Ghana's Tourism Sector Attracts GHS15.42 billion from International Visitors",
    excerpt:
      "GSS released findings from the Ghana International Travellers Survey highlighting tourism's contribution and baseline evidence for Ghana's Tourism Satellite Account.",
    dateISO: "2025-09-24",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "ghanas-tourism-sector-attracts-ghs-15-42-billion-from-international-visitors",
    documentKey: "newsevent/pressrelease/GITS_24.09.25 Press Release.pdf",
    sourcePage: 1,
  },
  {
    id: "press-2025-icbt-q4-press-release",
    title:
      "Informal Cross-Border Trade Valued at GH¢7.4 Billion in Fourth Quarter of 2024",
    excerpt:
      "Informal cross-border trade between Ghana and its land neighbours was valued at GH¢7.4 billion in the fourth quarter of 2024.",
    dateISO: "2025-10-22",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "informal-cross-border-trade-valued-at-ghc-7-4-billion-q4-2024",
    documentKey: "newsevent/pressrelease/ICBT Q4 Press Release _ 22.10.2025.pdf",
    sourcePage: 1,
  },
  {
    id: "press-2025-slum-conditions-urban-areas",
    title:
      "Slum Conditions in Ghana's Urban Areas Concentrated in Northern, Savannah, and Oti Regions",
    excerpt:
      "The Slums and Informal Settlements thematic report provides national evidence to support better urban planning and service delivery.",
    dateISO: "2025-12-03",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "slum-conditions-in-ghanas-urban-areas",
    documentKey: "newsevent/pressrelease/Slum Report_Press Release.pdf",
    sourcePage: 1,
  },
  {
    id: "press-2025-world-statistics-day",
    title: "World Statistics Day",
    excerpt:
      "On World Statistics Day, GSS joined the global statistical community to highlight the role of quality data in national development.",
    dateISO: "2025-10-20",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "world-statistics-day",
    documentKey:
      "newsevent/pressrelease/World Statistics Day_Draft Press Release.pdf",
    sourcePage: 1,
  },
  {
    id: "press-2025-world-food-day",
    title:
      "Number of Ghanaians in food crisis increases by 7.3 percent between Q1 and Q4 2024",
    excerpt:
      "Food security statistics from 2024 show an increase in the number of people in food crisis, informing responses for vulnerable households.",
    dateISO: "2025-10-16",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "number-of-ghanaians-in-food-crisis-increases-q1-q4-2024",
    documentKey: "newsevent/pressrelease/World_Food_Day_Press_Release.pdf",
    sourcePage: 1,
  },
  {
    id: "press-2024-international-day-of-zero-waste",
    title: "International Day of Zero Waste press release",
    excerpt:
      "Census statistics highlight waste management patterns, including indiscriminate dumping, to support policy and behavioural change.",
    dateISO: "2024-03-30",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "international-day-of-zero-waste-press-release",
    documentKey:
      "newsevent/pressrelease/6_International Day of Zero Waste press release from GSS.pdf",
    sourcePage: 2,
  },
  {
    id: "press-2024-world-health-day",
    title: "World Health Day press release",
    excerpt:
      "Health-related indicators from national data provide evidence on insurance coverage and inequality outcomes across population groups.",
    dateISO: "2024-03-29",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "world-health-day-press-release",
    documentKey:
      "newsevent/pressrelease/7_World Health Day press release from GSS_29032024.pdf",
    sourcePage: 2,
  },
  {
    id: "press-2024-world-malaria-day",
    title: "World Malaria Day press release",
    excerpt:
      "Malaria prevalence indicators among children were released to support targeted interventions and monitoring.",
    dateISO: "2024-04-25",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "world-malaria-day-press-release",
    documentKey:
      "newsevent/pressrelease/8_World Malaria Day press release from GSS.pdf",
    sourcePage: 2,
  },
  {
    id: "press-2024-world-immunization-week",
    title: "World Immunization Week press release",
    excerpt:
      "Immunization data showed improvements in full vaccination coverage among children according to the national schedule.",
    dateISO: "2024-04-23",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "world-immunization-week-press-release",
    documentKey:
      "newsevent/pressrelease/9_World Immunization Week press release from GSS_23042024 (1).pdf",
    sourcePage: 2,
  },
  {
    id: "press-2024-world-population-day",
    title: "World Population Day 2024 press release",
    excerpt:
      "Population projections and age-structure indicators were released to support planning and policy discussions on demographic change.",
    dateISO: "2024-07-11",
    imageSrc: PLACEHOLDER_IMAGE,
    slug: "world-population-day-2024-press-release",
    documentKey:
      "newsevent/pressrelease/10_World Population Day 2024 press release from GSS_shared.pdf",
    sourcePage: 2,
  },
];
