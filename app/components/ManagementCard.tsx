"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ManagementPerson } from "../lib/management";
import { getPersonSlug } from "../lib/management";

const placeholder = "/images/placeholder-person.png";

export default function ManagementCard({
  person,
  variant = "grid",
}: {
  person: ManagementPerson;
  variant?: "featured" | "lead" | "grid";
}) {
  const [src, setSrc] = useState(person.photo);

  useEffect(() => {
    setSrc(person.photo);
  }, [person.photo]);

  const isFeatured = variant === "featured";
  const isLead = variant === "lead";
  const wrapperClasses = isFeatured
    ? "flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md lg:flex-row"
    : isLead
    ? "flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md lg:flex-row"
    : "flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md";

  const imageClasses = isFeatured
    ? "relative aspect-square w-full lg:w-[260px]"
    : isLead
    ? "relative aspect-square w-full lg:w-[260px]"
    : "relative aspect-square w-full";

  return (
    <div className={`${wrapperClasses} group`}>
      <Link
        href={`/about/management/${encodeURIComponent(getPersonSlug(person))}`}
        aria-label={`View ${person.name} profile`}
        className={`${imageClasses} block`}
      >
        <Image
          src={src}
          alt={person.name}
          fill
          className="object-cover"
          sizes={isFeatured ? "360px" : "400px"}
          onError={() => setSrc(placeholder)}
        />
      </Link>
      <Link
        href={`/about/management/${encodeURIComponent(getPersonSlug(person))}`}
        className="flex flex-1 flex-col gap-2 p-5"
      >
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#241B5A]">
          {person.name}
        </h3>
        <p className="text-sm font-medium text-slate-600">{person.position}</p>
        {person.directorate ? (
          <p className="text-sm text-slate-500">{person.directorate}</p>
        ) : null}
      </Link>
    </div>
  );
}
