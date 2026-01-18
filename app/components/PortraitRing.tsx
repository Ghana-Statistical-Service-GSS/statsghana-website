"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const fallback = "/images/placeholder-person.png";

export default function PortraitRing({
  photo,
  name,
}: {
  photo: string;
  name: string;
}) {
  const [src, setSrc] = useState(photo);

  useEffect(() => {
    setSrc(photo);
  }, [photo]);

  return (
    <div className="relative mx-auto h-[320px] w-[320px] sm:h-[360px] sm:w-[360px] lg:h-[380px] lg:w-[380px]">
      <div
        className="absolute inset-0 rounded-full p-[10px] shadow-sm"
        style={{
          background:
            "conic-gradient(from 180deg, #1FA6A0, #241B5A, #E0B04D, #1FA6A0)",
        }}
      >
        <div className="h-full w-full rounded-full bg-white p-[10px]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-200">
            <Image
              src={src}
              alt={name}
              fill
              className="object-cover"
              sizes="380px"
              onError={() => setSrc(fallback)}
            />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 left-14 h-6 w-6 rounded-full bg-[#E0B04D] ring-4 ring-white" />
      <div className="absolute -bottom-4 right-8 h-24 w-24 overflow-hidden rounded-full bg-white shadow-md ring-1 ring-slate-200">
        <Image
          src="/images/gss-logo.png"
          alt="GSS logo"
          fill
          className="object-contain p-3"
          sizes="96px"
        />
      </div>
    </div>
  );
}
