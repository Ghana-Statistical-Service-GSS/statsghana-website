export default function GlobalLoading() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Loading
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Preparing your page...
          </h1>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-emerald-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
