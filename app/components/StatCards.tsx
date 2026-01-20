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
    key: "GDP",
    title: "GDP",
    value: "5.5",
    sub: "GDP - Quarter on Quarter",
    icon: BarChart3,
  },
  {
    key: "PPI",
    title: "PPI",
    value: "3.1%",
    sub: "Producer Price Index",
    icon: Factory,
  },
  {
    key: "PBCI",
    title: "PBCI",
    value: "4.2%",
    sub: "Private Business Confidence Index",
    icon: BriefcaseBusiness,
  },
  {
    key: "MIEG",
    title: "MIEG",
    value: "3.8%",
    sub: "",
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
  return (
    <section className="bg-white py-6 sm:py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {kpis.map(({ key, title, value, sub, icon: Icon }) => (
            <Card
              key={key}
              className={[
                "flex items-center gap-3 p-4",
                key === "POP" ? "lg:col-span-6 lg:max-w-md lg:mx-auto" : "",
              ].join(" ")}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{title}</p>
                <p className="text-lg font-bold text-slate-900">{value}</p>
                {sub ? <p className="text-[10px] text-slate-400">{sub}</p> : null}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
