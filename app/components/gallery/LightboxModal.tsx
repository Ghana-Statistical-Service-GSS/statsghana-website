"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxPhoto = { id: string; src: string; alt: string };

type LightboxModalProps = {
  isOpen: boolean;
  photos: LightboxPhoto[];
  startIndex: number;
  onClose: () => void;
};

const BLUR_DATA_URL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

export default function LightboxModal({
  isOpen,
  photos,
  startIndex,
  onClose,
}: LightboxModalProps) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (isOpen) {
      setIndex(startIndex);
    }
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, photos.length]);

  if (!isOpen) return null;

  const current = photos[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev - 1 + photos.length) % photos.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev + 1) % photos.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 900px"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="absolute bottom-6 text-sm text-white/80">
        {current.alt}
      </div>
    </div>
  );
}
