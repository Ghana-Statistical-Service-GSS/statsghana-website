import {
  BarChart3,
  Briefcase,
  Flame,
  LineChart,
  Users,
} from "lucide-react";
import Card from "./Card";
import Container from "./Container";

const stats = [
  {
    label: "Projected Population",
    value: "32.3M",
    note: "Updated: 14 Jan 2026",
    icon: Users,
  },
  {
    label: "Unemployment Rate",
    value: "12.8%",
    note: "",
    icon: Briefcase,
  },
  {
    label: "Inflation - January",
    value: "5.4%",
    note: "",
    icon: Flame,
  },
  {
    label: "MIEG",
    value: "3.8%",
    note: "",
    icon: LineChart,
  },
  {
    label: "GDP - Quarter on Quarter",
    value: "5.5",
    note: "",
    icon: BarChart3,
  },
];

export default function StatCards() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map(({ label, value, note, icon: Icon }) => (
            <Card key={label} className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700/10 text-purple-700">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500">{label}</p>
                <p className="text-lg font-bold text-slate-900">{value}</p>
                {note ? (
                  <p className="text-[10px] text-slate-400">{note}</p>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
