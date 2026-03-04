"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Something Went Wrong
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Unexpected Error
            </h1>
            <p className="mt-4 text-slate-600">
              An unexpected error occurred while loading this page.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Go Home
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
