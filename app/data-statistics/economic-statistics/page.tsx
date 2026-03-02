import { Suspense } from "react";
import EconomicStatisticsPage from "./EconomicStatisticsPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-white" />}>
      <EconomicStatisticsPage />
    </Suspense>
  );
}
