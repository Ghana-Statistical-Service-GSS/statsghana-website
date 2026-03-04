import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}
