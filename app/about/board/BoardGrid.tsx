"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BoardMember } from "./board-data";

type BoardGridProps = {
  members: BoardMember[];
};

const roleTone: Record<BoardMember["role"], string> = {
  "Board Chair": "bg-emerald-100 text-emerald-800",
  "Ex-Officio Member": "bg-indigo-100 text-indigo-800",
  "Board Member": "bg-slate-100 text-slate-700",
  "Board Secretary": "bg-amber-100 text-amber-800",
};

export default function BoardGrid({ members }: BoardGridProps) {
  if (!members.length) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        No board members available.
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => {
        const href = member.managementHref ?? `/about/board/${member.slug}`;
        return (
          <Link
            key={member.slug}
            href={href}
            aria-label={`View profile of ${member.name}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-square w-full border-b border-slate-100 bg-slate-50">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-100 via-sky-100 to-indigo-100" />
              <BoardCardImage src={member.image} alt={member.name} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {member.name}
              </h3>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${roleTone[member.role]}`}
              >
                {member.role}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function BoardCardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover"
      onError={() => setImgSrc("/images/placeholder-person.png")}
    />
  );
}
