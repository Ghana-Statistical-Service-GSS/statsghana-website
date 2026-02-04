import ReportsGrid from "./ReportsGrid";
import censusReports from "@/app/lib/census.json";
import type { CensusReport } from "@/app/lib/mockCensusReports";

export default function CensusReportsPage() {
  const reports: CensusReport[] = (censusReports as Array<{
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
            Home / Publications / Census Reports
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Census Reports
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Browse official census publications from Ghana Statistical Service,
            including summary reports, thematic reports, and technical
            documentation.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <ReportsGrid
            reports={reports}
            fallbackSrc="/images/publications/census-reports/image.png"
            filePrefix="publications/census"
          />
        </div>
      </section>
    </div>
  );
}
