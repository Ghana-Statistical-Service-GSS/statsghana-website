import { BarChart3 } from "lucide-react";
import Card from "./Card";

type MiniCard = {
  label: string;
  value: string;
  period: string;
};

type GdpStatsCardProps = {
  productionAnnual: MiniCard;
  productionQuarterly: MiniCard;
  expenditureAnnual: MiniCard;
  expenditureQuarterly: MiniCard;
};

const GDP_THEME = {
  bgGradient: "bg-gradient-to-br from-[#F8F5FF] via-white to-[#F2EDFF]",
  borderClass: "border-violet-200/60",
  iconBgClass: "bg-violet-500/15 text-violet-700",
  glowClass: "bg-violet-400/20",
};

function GdpMiniCard({ label, value, period }: MiniCard) {
  return (
    <div className="rounded-lg border border-white/50 bg-white/70 p-2.5 shadow-sm">
      <p className="truncate text-[10px] font-semibold text-slate-500">{label}</p>
      <p className="mt-0.5 text-lg font-extrabold leading-tight text-slate-900">{value}</p>
      <p className="truncate text-[9px] text-slate-400">{period}</p>
    </div>
  );
}

export default function GdpStatsCard({
  productionAnnual,
  productionQuarterly,
  expenditureAnnual,
  expenditureQuarterly,
}: GdpStatsCardProps) {
  return (
    <Card
      className={`relative h-full w-full overflow-hidden border ${GDP_THEME.borderClass} p-0 shadow-sm transition-shadow hover:shadow-md`}
    >
      <div className={`absolute inset-0 ${GDP_THEME.bgGradient}`} />

      {/* Breathing glow orbs */}
      <div
        className={`pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full blur-3xl animate-pulse ${GDP_THEME.glowClass}`}
        style={{ animationDuration: "3s" }}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl animate-pulse ${GDP_THEME.glowClass}`}
        style={{ animationDuration: "3s", animationDelay: "1.5s" }}
      />

      {/* Pulsing border glow ring — visual distinction from regular cards */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-violet-400/50 animate-pulse"
        style={{ animationDuration: "3s" }}
      />

      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative flex h-full min-h-[200px] flex-col p-5">
        {/* Zone 1: header — icon left, GDP label right */}
        <div className="flex items-center justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/40 ${GDP_THEME.iconBgClass}`}
          >
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-violet-700">
            GDP
          </span>
        </div>

        {/* Two compact sections stacked: Production then Expenditure */}
        <div className="mt-3 flex flex-1 flex-col gap-2.5">
          <div>
            <p className="mb-1.5 text-[11px] font-semibold text-slate-600">Growth by Production</p>
            <div className="grid grid-cols-2 gap-2">
              <GdpMiniCard {...productionQuarterly} />
              <GdpMiniCard {...productionAnnual} />
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-semibold text-slate-600">Growth by Expenditure</p>
            <div className="grid grid-cols-2 gap-2">
              <GdpMiniCard {...expenditureQuarterly} />
              <GdpMiniCard {...expenditureAnnual} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
