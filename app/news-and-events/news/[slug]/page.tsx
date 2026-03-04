import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { mockNews } from "@/app/lib/mockNews";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const item = mockNews.find((news) => news.slug === decodedSlug);

  if (!item) {
    return {
      title: "News",
      description: "Latest updates from the Ghana Statistical Service.",
    };
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const item = mockNews.find((news) => news.slug === decodedSlug);

  if (!item) {
    notFound();
  }

  const related = mockNews.filter((news) => news.slug !== item.slug).slice(0, 3);

  return (
    <div className="bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/news-and-events/news" className="hover:text-slate-700">
            News
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{item.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <article>
            <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              News Feature
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {item.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />
              {new Date(item.dateISO).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>

            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 860px"
              />
            </div>

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>{item.excerpt}</p>
              <p>
                This update provides context, trends, and interpretation to help
                data users understand the implications of the release for policy,
                planning, and national development priorities.
              </p>
              <p>
                The Ghana Statistical Service continues to improve statistical
                dissemination and accessibility so users can rely on timely,
                quality, and relevant official statistics.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="text-lg font-bold text-slate-900">Key Takeaways</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Official figures are published with transparent methodology.</li>
                <li>Regional comparisons support evidence-based targeting.</li>
                <li>Data products will be updated as new releases become available.</li>
              </ul>
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Related News
            </h2>
            <div className="mt-4 space-y-3">
              {related.map((news) => (
                <Link
                  key={news.id}
                  href={`/news-and-events/news/${news.slug}`}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-2 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={news.imageSrc}
                      alt={news.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                      {news.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(news.dateISO).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/news-and-events/news"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Back to all news <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
