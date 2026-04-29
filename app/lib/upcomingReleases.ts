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
    slug: "annual-inflation-2025-release",
    title: "2025 Annual Inflation Release",
    description:
      "Launches the 2025 edition of the Annual Inflation report on 30th April 2026.",
    image: "/images/upcomingrelease/annualinflation.png",
    content: [
      "The Ghana Statistical Service will release the 2025 edition of the Annual Inflation report on 30th April 2026.",
      "The release will be streamed live on Facebook and Zoom, with participation also available at the physical launch location.",
    ],
    event: {
      status: "Scheduled",
      expectedRelease: "30th April 2026",
      nextUpdate: "Streaming live on Facebook and Zoom, with a physical launch location.",
    },
  },
  {
    slug: "pbci-march-2026-release",
    title: "Prime Building Cost Index (PBCI)",
    description:
      "Presents the March 2026 Prime Building Cost Index bulletin and supporting release materials.",
    image: "/images/upcomingrelease/PBCI INVITE.png",
    content: [
      "This release provides the March 2026 Prime Building Cost Index update, including the bulletin, annexes, presentation, and infographics.",
      "The PBCI tracks changes in prices of building materials and supports monitoring of construction cost movements in Ghana.",
    ],
    event: {
      status: "Released",
      expectedRelease: "March 2026",
      nextUpdate: "Documents are available under Price Indices releases.",
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
