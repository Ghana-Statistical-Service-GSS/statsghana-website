"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Card from "./Card";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { titleToImageCandidates } from "../lib/resolveImage";

const portals = [
  {
    title: "StatsBank",
    description: "Explore time-series data across sectors and regions.",
    href: "https://statsbank.statsghana.gov.gh/",
  },
  {
    title: "Microdata Catalogue",
    description: "Download survey datasets and metadata for research use.",
    href: "https://microdata.statsghana.gov.gh/",
  },
  {
    title: "National Reporting Platform",
    description: "Discover key insights from Ghana's Population and Housing Census.",
    href: "https://sdgs-ghana.github.io/",
  },
  {
    title: "CPI Inflation Calculator",
    description: "Calculate historical inflation-adjusted values.",
    href: "/data-portals/cpi-inflation-calculator",
  },
  {
    title: "Open Data for Africa",
    description: "Interactive access to regional and continental data comparisons.",
    href: "https://dataportals.org/portal/ghana_opendataforafrica/",
  },
  {
    title: "Ghana Gridded Data Portal",
    description: "Visualize spatial data for planning and analysis.",
    href: "https://ghana-gridded-statistics-platform-statsghana.hub.arcgis.com/",
  },
];

const portalImages: Record<string, string> = {
  "StatsBank": "/images/statsbank.png",
  "Microdata Catalogue": "/images/microdata copy.png",
  "National Reporting Platform": "/images/nrp.png",
  "CPI Inflation Calculator": "/images/cpi_calculator.png",
  "Open Data for Africa": "/images/open_data.png",
  "Ghana Gridded Data Portal": "/images/ghana_gridded_data.png",
};

const placeholder = "/images/placeholder.png";

function PortalImage({ title }: { title: string }) {
  const candidates = useMemo(() => {
    const mapped = portalImages[title];
    const guessed = titleToImageCandidates(title);
    const list = mapped ? [mapped, ...guessed] : guessed;
    const unique = Array.from(new Set(list));
    if (!unique.includes(placeholder)) {
      unique.push(placeholder);
    }
    return unique;
  }, [title]);

  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFailed(false);
  }, [title]);

  if (failed || !candidates.length) {
    return <div className="h-full w-full rounded-xl bg-slate-200" />;
  }

  const src = candidates[index];

  return (
    <Image
      src={src}
      alt={title}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex(index + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export default function DataPortals() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionTitle
          title="Data Portals"
          subtitle="Access Ghana's official statistical platforms — your gateways to open data, reports, and analysis tools."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portals.map((portal) => (
            <Card key={portal.title} className="group flex h-full flex-col p-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100">
                <PortalImage title={portal.title} />
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-slate-900">
                  {portal.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{portal.description}</p>
                <a
                  href={portal.href}
                  target={portal.href.startsWith("http") ? "_blank" : undefined}
                  rel={portal.href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-purple-700 transition hover:text-purple-900"
                >
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
