import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MANAGEMENT } from "../../../lib/management";

export function generateStaticParams() {
  return MANAGEMENT.map((person) => ({ slug: person.slug }));
}

export default function ManagementProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const person = MANAGEMENT.find((item) => item.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          About GSS / Management / {person.name}
        </p>
        <div className="mt-4 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={person.photo}
              alt={person.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {person.name}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {person.position}
            </p>
            {person.directorate ? (
              <p className="mt-1 text-sm text-slate-500">{person.directorate}</p>
            ) : null}
            <p className="mt-4 text-slate-700 leading-relaxed">{person.bio}</p>

            {(person.email || person.phone) ? (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {person.email ? (
                  <p>
                    <span className="font-semibold">Email:</span> {person.email}
                  </p>
                ) : null}
                {person.phone ? (
                  <p className={person.email ? "mt-2" : ""}>
                    <span className="font-semibold">Phone:</span> {person.phone}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6">
              <Link
                href="/about/management"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Back to Management
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
