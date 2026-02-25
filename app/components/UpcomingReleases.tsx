import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { UPCOMING_RELEASES } from "../lib/upcomingReleases";

export default function UpcomingReleases() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionTitle
          title={
            <>
              Upcoming <span className="text-purple-700">Releases</span>
            </>
          }
          subtitle="Stay ahead with Ghana's latest statistical releases — timely data and insights to inform decisions across every sector."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {UPCOMING_RELEASES.map((release) => (
            <Card key={release.title} className="flex h-full flex-col p-4">
              <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={release.image}
                  alt={release.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 360px, 90vw"
                />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-slate-900">
                  {release.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{release.description}</p>
                <Link
                  href={`/releases/upcoming/${release.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-purple-700 transition hover:text-purple-900"
                >
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
