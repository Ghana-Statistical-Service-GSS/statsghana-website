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
    slug: "cpi-release",
    title: "Consumer Price Index(CPI)",
    description:
      "Presents Ghana's February 2026 inflation rate from the Consumer Price Index (CPI), including national and regional price highlights.",
    image: "/images/upcomingrelease/cpirelease.png",
    content: [
      "This release covers the February 2026 CPI inflation rate for Ghana.",
      "It includes key year-on-year and month-on-month inflation movements across major divisions.",
    ],
    event: {
      status: "Scheduled",
      expectedRelease: "March 2026",
      nextUpdate: "Next CPI update expected in April 2026",
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
