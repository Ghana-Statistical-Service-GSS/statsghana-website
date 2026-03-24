import { Suspense } from "react";
import ReportsGrid from "../census-reports/ReportsGrid";
import monthlyWrapPolicyBrief from "@/app/lib/monthlyWrapPolicyBrief.json";
import type { CensusReport } from "@/app/lib/mockCensusReports";

export default function MonthlyWrapAndPolicyBriefPage() {
  const reports: CensusReport[] = (monthlyWrapPolicyBrief as Array<{
    id: string;
    title: string;
    description: string;
    month?: string;
    year?: number;
    reportType: CensusReport["reportType"];
    fileKey?: string;
  }>).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    year: row.year ?? 0,
    reportType: row.reportType,
    thumbnail: "/images/publications/census-reports/image.png",
    fileUrl: "#",
    fileKey: row.fileKey,
  }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Home / Publications / Monthly Wrap &amp; Policy Brief
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Monthly Wrap &amp; Policy Brief
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Browse monthly wrap publications and policy briefs from Ghana
            Statistical Service, including concise analytical updates and policy
            notes for current developments.
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
              filePrefix="publications/monthlywrap_policybrief"
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
