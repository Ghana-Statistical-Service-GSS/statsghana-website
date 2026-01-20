export type GalleryEvent = {
  id: string;
  title: string;
  date?: string;
  coverImage: string;
  photos: { id: string; src: string; alt: string }[];
};

const PLACEHOLDER = "/images/placeholder.png";

const buildPhotos = (prefix: string, count: number, label: string) =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `${prefix}-${number}`,
      src: `/images/gallery/${prefix}/photo-${number}.jpg`,
      alt: `${label} photo ${index + 1}`,
    };
  });

export const galleryEvents: GalleryEvent[] = [
  {
    id: "ibes-2024-phase-1",
    title: "IBES 2024 Phase 1 Release",
    date: "April 12, 2024",
    coverImage: PLACEHOLDER,
    photos: buildPhotos("ibes-2024-phase-1", 18, "IBES 2024 Phase 1"),
  },
  {
    id: "governance-series",
    title: "Governance Series Release",
    date: "March 22, 2024",
    coverImage: PLACEHOLDER,
    photos: buildPhotos("governance-series", 16, "Governance Series"),
  },
];
