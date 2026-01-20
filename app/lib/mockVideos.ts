export type VideoItem = {
  id: string;
  title: string;
  description: string;
  dateISO: string;
  eventId: string;
  eventTitle: string;
  type: "youtube" | "file";
  youtubeId?: string;
  videoUrl?: string;
  thumbnail?: string;
};

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

export const mockVideos: VideoItem[] = [
  {
    id: "video-ibes-2024-phase-1",
    title: "IBES 2024 Phase 1 Release Highlights",
    description:
      "Highlights from the IBES 2024 Phase 1 release event with key stakeholders.",
    dateISO: "2024-04-12",
    eventId: "ibes-2024-phase-1",
    eventTitle: "IBES 2024 Phase 1 Release",
    type: "youtube",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "video-governance-series",
    title: "Governance Series Release",
    description:
      "Launch of the Governance Series with insights from the GSS leadership.",
    dateISO: "2024-03-22",
    eventId: "governance-series",
    eventTitle: "Governance Series Release",
    type: "youtube",
    youtubeId: "3GwjfUFyY6M",
  },
  {
    id: "video-phc-briefing",
    title: "Press Briefing on Preliminary Census Results",
    description:
      "Media briefing on preliminary Population and Housing Census results.",
    dateISO: "2024-03-18",
    eventId: "phc-briefing",
    eventTitle: "PHC 2021 Preliminary Results",
    type: "file",
    videoUrl: "#",
    thumbnail: PLACEHOLDER_IMAGE,
  },
  {
    id: "video-cpi-release",
    title: "Monthly CPI Release Briefing",
    description:
      "Overview of inflation trends from the latest CPI release briefing.",
    dateISO: "2024-05-19",
    eventId: "cpi-release",
    eventTitle: "Monthly CPI Release",
    type: "file",
    videoUrl: "#",
    thumbnail: PLACEHOLDER_IMAGE,
  },
  {
    id: "video-data-forum-2024",
    title: "National Data Forum 2024",
    description:
      "Key moments from the National Data Forum featuring policy and data experts.",
    dateISO: "2024-04-04",
    eventId: "national-data-forum-2024",
    eventTitle: "National Data Forum 2024",
    type: "youtube",
    youtubeId: "9bZkp7q19f0",
  },
  {
    id: "video-agric-census-launch",
    title: "Agriculture Census Launch",
    description:
      "Coverage of the Agriculture Census launch and field operations overview.",
    dateISO: "2024-04-12",
    eventId: "agric-census-launch",
    eventTitle: "Agriculture Census Launch",
    type: "file",
    videoUrl: "#",
    thumbnail: PLACEHOLDER_IMAGE,
  },
];
