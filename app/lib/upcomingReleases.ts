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
    slug: "pbci-march-2026-release",
    title: "Prime Building Cost Index (PBCI)",
    description:
      "Presents the March 2026 Prime Building Cost Index bulletin and supporting release materials.",
    image: "/images/PBCI INVITE.png",
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
    slug: "mvam-october-december-2025-release",
    title: "MVAM Report Release",
    description:
      "Presents the MVAM report release for the October 2025 to December 2025 period.",
    image: "/images/mVAM web 2 copy.png",
    content: [
      "This release presents findings from the Mobile Vulnerability Analysis and Mapping survey for the October 2025 to December 2025 period.",
      "The MVAM report supports timely reporting and evidence use on food security conditions.",
    ],
    event: {
      status: "Released",
      expectedRelease: "April 2026",
      nextUpdate: "Report is available under survey reports.",
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
