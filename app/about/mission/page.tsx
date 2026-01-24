const PAGE_TITLE = "Mission";
const BREADCRUMB = ["About GSS", "Mission"];

export default function MissionPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          To lead in the efficient collection, production, management and
          dissemination of quality Official Statistics based on international
          standards, using competent and motivated staff for evidence-based
          decision making, in support of national development.
        </p>
      </div>
    </section>
  );
}
