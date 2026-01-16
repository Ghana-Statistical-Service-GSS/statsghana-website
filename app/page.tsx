import DataPortals from "./components/DataPortals";
import GovMessage from "./components/GovMessage";
import Hero from "./components/Hero";
import KeyIndicators from "./components/KeyIndicators";
import StatCards from "./components/StatCards";
import UpcomingReleases from "./components/UpcomingReleases";

export default function Home() {
  return (
    <>
      <Hero />
      <StatCards />
      <KeyIndicators />
      <UpcomingReleases />
      <DataPortals />
      <GovMessage />
    </>
  );
}
