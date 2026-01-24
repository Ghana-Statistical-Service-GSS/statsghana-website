import { Suspense } from "react";
import SocialDemographicClient from "./SocialDemographicClient";

export default function SocialDemographicPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white py-10 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
              Loading social &amp; demographic statistics...
            </div>
          </div>
        </div>
      }
    >
      <SocialDemographicClient />
    </Suspense>
  );
}
