import { Suspense } from "react";
import ReportsGrid from "../census-reports/ReportsGrid";
import adminDataReports from "@/app/lib/adminData.json";
import type { CensusReport } from "@/app/lib/mockCensusReports";

export default function AdministrativeDataReportsPage() {
  const reports: CensusReport[] = (adminDataReports as Array<{
    id: string;
    title: string;
    description: string;
    year?: number;
    reportType: CensusReport["reportType"];
  }>).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year ?? 0,
    reportType: row.reportType,
    thumbnail: "/images/publications/census-reports/image.png",
    fileUrl: "#",
  }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Home / Publications / Administrative Data Reports
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Administrative Data Reports
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Browse official administrative data publications from Ghana
            Statistical Service, including summary reports, thematic reports,
            and technical documentation.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                Loading reports...
              </div>
            }
          >
            <ReportsGrid
              reports={reports}
              fallbackSrc="/images/publications/census-reports/image.png"
              filePrefix="publications/admin_data"
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
