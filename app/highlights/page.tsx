import Image from "next/image";
import Link from "next/link";
import Container from "../components/Container";
import { HERO_SLIDES } from "../lib/heroSlides";

export default function HighlightsPage() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <Container>
        <div className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Highlights</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Highlights
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Explore featured updates and publications from the Ghana Statistical
          Service.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HERO_SLIDES.map((slide) => (
            <Link
              key={slide.slug}
              href={`/highlights/${slide.slug}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-slate-900">{slide.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{slide.subtitle}</p>
                <span className="mt-3 inline-flex text-sm font-semibold text-[#241B5A]">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
