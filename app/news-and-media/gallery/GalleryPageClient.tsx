"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { galleryEvents } from "@/app/lib/mockGallery";
import Pagination from "@/app/components/gallery/Pagination";
import LightboxModal from "@/app/components/gallery/LightboxModal";

const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

function GalleryImage({
  src,
  alt,
  fallbackSrc,
}: {
  src: string;
  alt: string;
  fallbackSrc: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 320px"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}

export default function GalleryPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  const eventParam = searchParams.get("event") ?? galleryEvents[0]?.id;
  const pageParam = Number(searchParams.get("page") ?? "1");

  const selectedEvent =
    galleryEvents.find((event) => event.id === eventParam) ?? galleryEvents[0];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const pageSize = 12;
  const totalPhotos = selectedEvent.photos.length;
  const totalPages = Math.max(1, Math.ceil(totalPhotos / pageSize));
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const visiblePhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return selectedEvent.photos.slice(startIndex, startIndex + pageSize);
  }, [currentPage, selectedEvent.photos]);

  useEffect(() => {
    if (pageParam !== currentPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("event", selectedEvent.id);
      params.set("page", currentPage.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [currentPage, pageParam, pathname, router, searchParams, selectedEvent.id]);

  const updateQuery = (eventId: string, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", eventId);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleEventChange = (eventId: string) => {
    updateQuery(eventId, 1);
  };

  const handlePageChange = (page: number) => {
    updateQuery(selectedEvent.id, page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePhotoClick = (index: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    setLightboxIndex(startIndex + index);
    setLightboxOpen(true);
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalPhotos);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-white to-[#f5f1ea] py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Home / News &amp; Media / Gallery</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Gallery
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Explore highlights from key GSS events and releases through photos.
        </p>

        <div className="mt-6">
          <select
            value={selectedEvent.id}
            onChange={(event) => handleEventChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm sm:max-w-md"
          >
            {galleryEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {selectedEvent.title}
            </h2>
            {selectedEvent.date ? (
              <p className="text-sm text-slate-500">{selectedEvent.date}</p>
            ) : null}
          </div>
          <p className="text-sm text-slate-500">
            Showing {startIndex}-{endIndex} of {totalPhotos} photos
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {visiblePhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => handlePhotoClick(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <GalleryImage
                src={photo.src}
                alt={photo.alt}
                fallbackSrc="/images/placeholder.png"
              />
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            totalItems={totalPhotos}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        photos={selectedEvent.photos}
        startIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
