import {
  BarChart3,
  Briefcase,
  BriefcaseBusiness,
  Factory,
  Flame,
  LineChart,
  Users,
} from "lucide-react";
import Card from "./Card";
import Container from "./Container";

const kpis = [
  {
    key: "CPI",
    title: "CPI (Inflation)",
    value: "5.4%",
    sub: "Inflation - January",
    icon: Flame,
  },
  {
    key: "PPI",
    title: "PPI",
    value: "3.1%",
    sub: "Producer Price Index - January",
    icon: Factory,
  },
  {
    key: "IIP",
    title: "IIP",
    value: "7.6%",
    sub: "Index of Industrial Production - January",
    icon: Factory,
  },
  {
    key: "PBCI",
    title: "PBCI",
    value: "4.2%",
    sub: "Private Business Confidence Index - January",
    icon: BriefcaseBusiness,
  },
  {
    key: "GDP",
    title: "GDP",
    value: "5.5",
    gdpQuarterlyValue: "5.5",
    gdpQuarterlyPeriod: "2024 Q1",
    gdpYearlyValue: "5.5",
    gdpYear: "2024",
    icon: BarChart3,
  },
  {
    key: "MIEG",
    title: "MIEG",
    value: "3.8%",
    sub: "Monthly Index of Economic Growth - January",
    icon: LineChart,
  },
  {
    key: "UNEMP",
    title: "Unemployment",
    value: "12.8%",
    sub: "Unemployment Rate",
    icon: Briefcase,
  },
  {
    key: "POP",
    title: "Projected Population",
    value: "32.3M",
    sub: "Updated: 14 Jan 2026",
    icon: Users,
  },
];

export default function StatCards() {
  const primaryCards = kpis.slice(0, -3);
  const tailCards = kpis.slice(-3);

  return (
    <section className="bg-white py-6 sm:py-8">
      <Container>
        <div className="grid w-full items-stretch justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {primaryCards.map(
            ({
              key,
              title,
              value,
              sub,
              icon: Icon,
              gdpQuarterlyValue,
              gdpQuarterlyPeriod,
              gdpYearlyValue,
              gdpYear,
            }) => (
            <Card
              key={key}
              className="flex h-full min-h-[140px] w-full items-center gap-3 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{title}</p>
                {key === "GDP" ? (
                  <div className="mt-2 grid gap-3 text-slate-700 md:grid-cols-2 md:items-start">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Quarterly GDP
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {gdpQuarterlyValue ?? value}
                      </p>
                      <p className="text-[10px] leading-tight text-slate-400">
                        {gdpQuarterlyPeriod ?? "2024 Q1"}
                      </p>
                    </div>
                    <div className="border-t border-slate-200 pt-3 md:border-t-0 md:border-l md:pl-3 md:pt-0">
                      <p className="text-xs font-semibold text-slate-500">
                        Yearly GDP
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {gdpYearlyValue ?? value}
                      </p>
                      <p className="text-[10px] leading-tight text-slate-400">
                        {gdpYear ? `Year ${gdpYear}` : "Year 2024"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                    {sub ? (
                      <p className="text-[10px] text-slate-400">{sub}</p>
                    ) : null}
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {tailCards.map(({ key, title, value, sub, icon: Icon }, index) => (
              <Card
                key={key}
                className={[
                  "flex h-full min-h-[140px] w-full items-center gap-3 p-4",
                  ["lg:col-start-2", "lg:col-start-3", "lg:col-start-4"][index] ?? "",
                ].join(" ")}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">{title}</p>
                  <p className="text-lg font-bold text-slate-900">{value}</p>
                  {sub ? (
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  ) : null}
                </div>
              </Card>
            ))}
        </div>
      </Container>
    </section>
  );
}
