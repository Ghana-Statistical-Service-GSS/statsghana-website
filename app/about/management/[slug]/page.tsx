import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Facebook,
  Globe,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import PortraitRing from "../../../components/PortraitRing";
import { getPersonSlug, MANAGEMENT } from "../../../lib/management";

export function generateStaticParams() {
  return MANAGEMENT.map((person) => ({ slug: getPersonSlug(person) }));
}

export default async function ManagementProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const person = MANAGEMENT.find(
    (item) => getPersonSlug(item) === decodedSlug
  );

  if (!person) {
    notFound();
  }

  const bioParagraphs = person.bio
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>About</span>
          <span className="mx-2">/</span>
          <Link href="/about/management" className="hover:text-slate-700">
            Management
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <PortraitRing photo={person.photo} name={person.name} />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              {person.name}
            </h1>
            <p className="mt-2 text-xl text-slate-600">{person.position}</p>
            {person.directorate ? (
              <p className="mt-1 text-sm text-slate-500">{person.directorate}</p>
            ) : null}

            {person.email ? (
              <div className="mt-5 flex items-center gap-3 text-slate-700">
                <Mail className="h-5 w-5 text-[#241B5A]" />
                <a
                  href={`mailto:${person.email}`}
                  className="text-base hover:text-[#241B5A]"
                >
                  {person.email}
                </a>
              </div>
            ) : null}

            <div className="mt-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
              <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
                {bioParagraphs.map((paragraph, index) => (
                  <p key={`${person.id}-bio-${index}`}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: X, label: "X" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Globe, label: "Website" },
                  { icon: Mail, label: "Email" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:text-[#241B5A]"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/about/management"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
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
