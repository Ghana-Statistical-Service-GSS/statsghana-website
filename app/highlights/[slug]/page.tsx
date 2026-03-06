import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../components/Container";
import { getHeroSlide, HERO_SLIDES } from "../../lib/heroSlides";

type HighlightDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return HERO_SLIDES.map((slide) => ({ slug: slide.slug }));
}

export async function generateMetadata({
  params,
}: HighlightDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const slide = getHeroSlide(decodedSlug);

  if (!slide) {
    return {
      title: "Highlight",
      description: "Latest highlights from Ghana Statistical Service.",
    };
  }

  return {
    title: slide.title,
    description: slide.subtitle,
  };
}

export default async function HighlightDetailPage({
  params,
}: HighlightDetailPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const slide = getHeroSlide(decodedSlug);

  if (!slide) {
    notFound();
  }

  return (
    <section className="bg-white py-10 sm:py-12">
      <Container>
        <div className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/highlights" className="hover:text-slate-700">
            Highlights
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{slide.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Highlights
            </h2>
            <div className="mt-4 flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
              {HERO_SLIDES.map((item) => {
                const isActive = item.slug === slide.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/highlights/${item.slug}`}
                    className={`flex min-w-[240px] gap-3 rounded-xl border p-2 transition lg:min-w-0 ${
                      isActive
                        ? "border-purple-300 bg-purple-50 ring-1 ring-purple-200"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src={slide.src}
                alt={slide.title}
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 900px"
                className="w-full h-auto"
                priority
              />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {slide.title}
            </h1>
            <p className="mt-2 text-slate-600">{slide.subtitle}</p>

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              {(slide.content ?? []).map((paragraph, index) => (
                <p key={`${slide.slug}-content-${index}`}>{paragraph}</p>
              ))}
            </div>

            {slide.downloads?.length ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h2 className="text-lg font-bold text-slate-900">Downloads</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {slide.downloads.map((download, index) => (
                    <a
                      key={`${slide.slug}-${index}-${download.href}`}
                      href={download.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      {download.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </section>
  );
}
