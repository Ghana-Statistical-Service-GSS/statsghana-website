import { Suspense } from "react";
import GalleryPageClient from "./GalleryPageClient";
import { listObjects, presignGetUrl } from "@/app/lib/minio";

const GALLERY_SOURCES = [
  {
    id: "data-producers-forum",
    title: "Data Producers Forum",
    description: "Photo highlights from the Data Producers Forum.",
    prefix: "media/gallery/",
  },
];

const IMAGE_EXTENSION_PATTERN = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
};

type GalleryEvent = {
  id: string;
  title: string;
  description: string;
  photos: GalleryPhoto[];
};

export const dynamic = "force-dynamic";

const buildAltFromKey = (
  key: string,
  fallbackIndex: number,
  eventTitle: string,
) => {
  const filename = key.split("/").pop() ?? "";
  const withoutExtension = filename.replace(/\.[^/.]+$/, "");
  const normalized = withoutExtension.replace(/[-_]+/g, " ").trim();

  if (!normalized) {
    return `${eventTitle} photo ${fallbackIndex + 1}`;
  }

  return normalized;
};

async function getGalleryEvents(): Promise<GalleryEvent[]> {
  const events = await Promise.all(
    GALLERY_SOURCES.map(async (source) => {
      try {
        const items = await listObjects(source.prefix);
        const imageItems = items
          .filter((item) => item.key && IMAGE_EXTENSION_PATTERN.test(item.key))
          .sort((a, b) => {
            const aTime = a.lastModified ? new Date(a.lastModified).getTime() : 0;
            const bTime = b.lastModified ? new Date(b.lastModified).getTime() : 0;
            return bTime - aTime;
          });

        const photoResults = await Promise.allSettled(
          imageItems.map(async (item, index) => {
            const src = await presignGetUrl(item.key, 3600);
            return {
              id: `${source.id}-${index + 1}`,
              src,
              alt: buildAltFromKey(item.key, index, source.title),
            };
          }),
        );

        const photos = photoResults
          .filter(
            (result): result is PromiseFulfilledResult<GalleryPhoto> =>
              result.status === "fulfilled",
          )
          .map((result) => result.value);

        return {
          id: source.id,
          title: source.title,
          description: source.description,
          photos,
        };
      } catch {
        return {
          id: source.id,
          title: source.title,
          description: source.description,
          photos: [],
        };
      }
    }),
  );

  return events;
}

export default async function MediaGalleryPage() {
  const events = await getGalleryEvents();

  return (
    <Suspense
      fallback={
        <div className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Loading gallery...
            </div>
          </div>
        </div>
      }
    >
      <GalleryPageClient events={events} />
    </Suspense>
  );
}
