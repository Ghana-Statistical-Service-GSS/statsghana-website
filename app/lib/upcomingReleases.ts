export type UpcomingRelease = {
  slug: string;
  title: string;
  description: string;
  image: string;
  content?: string[];
  event?: {
    status: string;
    expectedRelease: string;
    nextUpdate: string;
  };
};

export const UPCOMING_RELEASES: UpcomingRelease[] = [
  {
    slug: "gdp-release",
    title: "Gross Domestic Product (GDP)",
    description:
      "Presents Ghana's 2025 Q4 GDP results, 2025 Annual GDP Estimates, and 2025 MIEG highlights for tracking overall economic performance.",
    image: "/images/upcomingrelease/upcominggdp.jpg",
    content: [
      "This release brings together Ghana's 2025 fourth-quarter GDP results and the 2025 Annual GDP Estimates to provide a fuller view of economic performance across the year.",
      "It also features the 2025 December MIEG highlights to support month-by-month tracking of economic activity and strengthen short-term economic analysis.",
    ],
    event: {
      status: "Scheduled",
      expectedRelease: "17th March 2026",
      nextUpdate: "Data will be posted on StatsBank and website.",
    },
  },
  {
    slug: "producer-price-index-release-ppi",
    title: "Producer Price Index Release (PPI)",
    description:
      "Tracks changes in prices received by domestic producers, offering key indicators on inflationary pressures at the production level.",
    image: "/images/upcomingrelease/ppirelease.png",
    content: [
      "This release presents Ghana's Producer Price Index (PPI) for February 2026 and is scheduled for publication in March 2026.",
      "It highlights month-on-month and year-on-year producer price changes, with key movements across major industrial sectors.",
    ],
    event: {
      status: "In preparation",
      expectedRelease: "March 2026",
      nextUpdate: "Next PPI update expected in April 2026",
    },
  },
  {
    slug: "statsbank-2-release",
    title: "StatsBank 2.0 Release",
    description:
      "Announces StatsBank 2.0, an enhanced version of the current StatsBank with easier accessibility and more powerful features.",
    image: "/images/upcomingrelease/statsbank.png",
    content: [
      "StatsBank 2.0 introduces a faster and simpler way to access Ghana's official statistics.",
      "The new version includes improved discovery, cleaner navigation, and expanded tools for exploring and using statistical data.",
    ],
    event: {
      status: "Scheduled",
      expectedRelease: "March 2026",
      nextUpdate: "User manual and feature highlights to be released in March 2026",
    },
  },
];

export function getUpcomingRelease(slug: string) {
  return UPCOMING_RELEASES.find((release) => release.slug === slug);
}
