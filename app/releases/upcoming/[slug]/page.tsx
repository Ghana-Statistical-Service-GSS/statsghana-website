import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../../components/Container";
import {
  getUpcomingRelease,
  UPCOMING_RELEASES,
} from "../../../lib/upcomingReleases";

type UpcomingReleasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return UPCOMING_RELEASES.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: UpcomingReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const release = getUpcomingRelease(decodedSlug);

  if (!release) {
    return {
      title: "Upcoming Release | StatsGhana",
      description: "Upcoming statistical releases by Ghana Statistical Service.",
    };
  }

  return {
    title: `${release.title} | StatsGhana`,
    description: release.description,
  };
}

export default async function UpcomingReleasePage({
  params,
}: UpcomingReleasePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const release = getUpcomingRelease(decodedSlug);

  if (!release) {
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
          <Link href="/releases/upcoming" className="hover:text-slate-700">
            Releases
          </Link>
          <span className="mx-2">/</span>
          <span>Upcoming</span>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{release.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Upcoming Releases
            </h2>
            <div className="mt-4 flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
              {UPCOMING_RELEASES.map((item) => {
                const isActive = item.slug === release.slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/releases/upcoming/${item.slug}`}
                    className={`flex min-w-[240px] gap-3 rounded-xl border p-2 transition lg:min-w-0 ${
                      isActive
                        ? "border-purple-300 bg-purple-50 ring-1 ring-purple-200"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={item.image}
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
                      <p className="mt-0.5 text-xs text-slate-500">
                        Upcoming release
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <Image
                src={release.image}
                alt={release.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {release.title}
            </h1>
            <p className="mt-2 text-slate-600">{release.description}</p>

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              {(release.content ?? []).map((paragraph, index) => (
                <p key={`${release.slug}-content-${index}`}>{paragraph}</p>
              ))}
            </div>

            {release.event ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h2 className="text-lg font-bold text-slate-900">Upcoming Event</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">Status</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {release.event.status}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Expected Release
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {release.event.expectedRelease}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Next Update
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {release.event.nextUpdate}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </section>
  );
}
