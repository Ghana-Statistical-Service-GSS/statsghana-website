export default function OpportunitiesPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f5f1ea] via-white to-[#f5f1ea] py-10 sm:py-12">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-amber-100/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          Home / News &amp; Events / Career &amp; Jobs
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Career &amp; Jobs
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Career opportunities at the Ghana Statistical Service (GSS).
        </p>

        <div className="mt-6 rounded-2xl border border-white/60 bg-white/80 p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Vacant Positions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            There are currently no openings available.
          </p>
        </div>
      </div>
    </div>
  );
}
