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
    slug: "food-insecurity-quarterly-labour-force-release",
    title: "Food Insecurity (Quarterly Labour Force) Release",
    description:
      "Provides quarterly evidence on food insecurity patterns across regions and population groups based on the Labour Force Survey",
    image: "/images/food_insecurity_release.png",
    content: [
      "Placeholder: Add overview for the Food Insecurity release.",
      "Placeholder: Add methodology / highlights / key indicators.",
    ],
    event: {
      status: "Scheduled",
      expectedRelease: "Q3 2026",
      nextUpdate: "Fieldwork validation update due in July 2026",
    },
  },
  {
    slug: "producer-price-index-release-ppi",
    title: "Producer Price Index Release (PPI)",
    description:
      "Tracks changes in prices received by domestic producers, offering key indicators on inflationary pressures at the production level.",
    image: "/images/ppi.png",
    content: [
      "Placeholder: Add overview for the PPI release.",
      "Placeholder: Add methodology / highlights / key indicators.",
    ],
    event: {
      status: "In preparation",
      expectedRelease: "August 2026",
      nextUpdate: "Technical notes and release calendar update due in June 2026",
    },
  },
  {
    slug: "multi-dimensional-poverty-release-mpi",
    title: "Multi-Dimensional Poverty (MPI) Release",
    description:
      "Examines poverty beyond income by assessing deprivations in education, health, and living standards across regions and population groups.",
    image: "/images/mpi_release.png",
    content: [
      "Placeholder: Add overview for the MPI release.",
      "Placeholder: Add disaggregation / indicators / notes.",
    ],
    event: {
      status: "Planned",
      expectedRelease: "Q4 2026",
      nextUpdate: "Indicator framework consultation update due in September 2026",
    },
  },
];

export function getUpcomingRelease(slug: string) {
  return UPCOMING_RELEASES.find((release) => release.slug === slug);
}
