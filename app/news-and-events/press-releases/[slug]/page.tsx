import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Download, FileText } from "lucide-react";
import { pressReleases } from "@/app/lib/pressReleases";
import { presignGetUrl } from "@/app/lib/minio";

type PressReleaseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PressReleaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const item = pressReleases.find((release) => release.slug === decodedSlug);

  if (!item) {
    return {
      title: "Press Releases",
      description: "Official statements from the Ghana Statistical Service.",
    };
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function PressReleaseDetailPage({
  params,
}: PressReleaseDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const item = pressReleases.find((release) => release.slug === decodedSlug);

  if (!item) {
    notFound();
  }

  const related = pressReleases
    .filter((release) => release.slug !== item.slug)
    .slice(0, 3);

  let documentUrl: string | null = null;
  try {
    documentUrl = await presignGetUrl(item.documentKey, 3600);
  } catch {
    documentUrl = null;
  }

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news-and-events/press-releases" className="hover:text-slate-700">
            Press Releases
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{item.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <article>
            <div className="rounded-2xl border border-[#241B5A]/20 bg-[#241B5A]/5 p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#241B5A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#241B5A]">
                <FileText className="h-3.5 w-3.5" /> Official Press Release
              </p>
              <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {item.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4" />
                {new Date(item.dateISO).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="relative mt-6 aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 860px"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-xl font-bold text-slate-900">Statement</h2>
              <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
                <p>{item.excerpt}</p>
                <p>
                  This press release is issued to inform stakeholders, partners,
                  media, and the general public about key updates from the Ghana
                  Statistical Service and to support transparent communication of
                  official data products.
                </p>
                <p>
                  Additional technical notes and supporting tables will be
                  published through official channels where applicable.
                </p>
                {documentUrl ? (
                  <p>
                    <a
                      href={documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#241B5A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a1441]"
                    >
                      <Download className="h-4 w-4" />
                      Open full release (PDF)
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-slate-500">
                    PDF document is currently unavailable.
                  </p>
                )}
              </div>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              More Releases
            </h2>
            <div className="mt-4 space-y-3">
              {related.map((release) => (
                <Link
                  key={release.id}
                  href={`/news-and-events/press-releases/${release.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white p-3 transition hover:border-[#241B5A]/30 hover:bg-white"
                >
                  <p className="text-sm font-semibold text-slate-900">{release.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(release.dateISO).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              href="/news-and-events/press-releases"
              className="mt-4 inline-flex text-sm font-semibold text-[#241B5A] hover:text-[#1a1441]"
            >
              Back to press releases
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
