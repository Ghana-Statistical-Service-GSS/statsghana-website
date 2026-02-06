"use client";

import Image from "next/image";
import { useState } from "react";

type BoardProfileImageProps = {
  src: string;
  alt: string;
  sizes: string;
};

export default function BoardProfileImage({
  src,
  alt,
  sizes,
}: BoardProfileImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      priority
      onError={() => setImgSrc("/images/placeholder-person.png")}
    />
  );
}
