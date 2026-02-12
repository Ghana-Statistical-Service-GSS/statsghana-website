import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockPressReleases } from "@/app/lib/mockPressReleases";

type PressReleaseDetailPageProps = {
  params: { slug: string };
};

export default function PressReleaseDetailPage({
  params,
}: PressReleaseDetailPageProps) {
  const item = mockPressReleases.find(
    (release) => release.slug === params.slug,
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-slate-500">
          Home / News &amp; Media /{" "}
          <Link href="/press-releases">Press Releases</Link> /{" "}
          <span className="text-slate-700">{item.title}</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Post Date:{" "}
          {new Date(item.dateISO).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
        </div>

        <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
          <p>{item.excerpt}</p>
          <p>
            This is a placeholder body for the press release detail page.
            Replace this section with the official release content when
            available.
          </p>
          <p>
            The Ghana Statistical Service remains committed to transparency and
            timely dissemination of official statistics and updates.
          </p>
        </div>
      </div>
    </div>
  );
}
