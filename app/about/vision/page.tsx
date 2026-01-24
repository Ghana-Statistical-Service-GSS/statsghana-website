const PAGE_TITLE = "Vision";
const BREADCRUMB = ["About GSS", "Vision"];

export default function VisionPage() {
  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">{BREADCRUMB.join(" / ")}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          {PAGE_TITLE}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          To be the trusted provider of official statistics for good governance.
        </p>
      </div>
    </section>
  );
}
