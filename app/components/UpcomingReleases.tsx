import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

const releases = [
  {
    title: "Food Insecurity(Quarterly Labour Force) Release",
    description: "Provides quarterly evidence on food insecurity patterns across regions and population groups based on the Labour Force Survey",
    image: "/images/food_insecurity_release.png",
  },
  {
    title: "Producer Price Index Release(PPI)",
    description: "Tracks changes in prices received by domestic producers, offering key indicators on inflationary pressures at the production level.",
    image: "/images/ppi.png",
  },
  {
    title: "Multi-Dimensional Poverty(MPI) Release",
    description: "Examines poverty beyond income by assessing deprivations in education, health, and living standards across regions and population groups.",
    image: "/images/mpi_release.png",
  },
];

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
          subtitle="Access Ghana's official statistical platforms — your gateways to open data, reports, and analysis tools."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {releases.map((release) => (
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
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-purple-700 transition hover:text-purple-900"
                >
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
