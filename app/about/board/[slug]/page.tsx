import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "../../../components/Container";
import { BOARD_MEMBERS } from "../board-data";
import BoardProfileImage from "../BoardProfileImage";

type BoardProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BOARD_MEMBERS.map((member) => ({ slug: member.slug }));
}

export default async function BoardProfilePage({
  params,
}: BoardProfilePageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug);
  const member =
    BOARD_MEMBERS.find((item) => item.slug === rawSlug) ??
    BOARD_MEMBERS.find(
      (item) => item.slug.toLowerCase() === rawSlug.toLowerCase(),
    );

  if (process.env.NODE_ENV !== "production") {
    console.log("Board profile slug:", rawSlug);
    console.log("Found member:", member?.name);
  }

  if (!member) {
    notFound();
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>About GSS / Board</span>
          <Link
            href="/about/board"
            className="text-slate-600 transition hover:text-slate-900"
          >
            &larr; Back to Board
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
          <div className="relative">
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl" />
            <div className="mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[300px] sm:w-[300px]">
              <div className="relative h-full w-full rounded-full bg-gradient-to-br from-indigo-200 via-purple-200 to-sky-200 p-[6px] shadow-lg">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-white/70 bg-white/80">
                  <BoardProfileImage
                    src={member.image}
                    alt={member.name}
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {member.name}
            </h1>
            <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {member.role}
            </span>
            {member.managementHref ? (
              <div className="mt-4">
                <Link
                  href={member.managementHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  View Management Profile
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            ) : null}

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
              {member.bio.length ? (
                member.bio.map((paragraph, idx) => (
                  <p key={`${member.slug}-bio-${idx}`}>{paragraph}</p>
                ))
              ) : (
                <p>Profile information will be updated soon.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
