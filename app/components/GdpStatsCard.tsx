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
    <div className="rounded-xl border border-white/50 bg-white/70 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-[11px] text-slate-500">{period}</p>
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
      className={`relative h-full w-full overflow-hidden border ${GDP_THEME.borderClass} p-0 shadow-lg transition hover:shadow-xl`}
    >
      <div className={`absolute inset-0 ${GDP_THEME.bgGradient}`} />
      <div
        className={`pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full blur-3xl ${GDP_THEME.glowClass}`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl ${GDP_THEME.glowClass}`}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      <div className="relative flex h-full flex-col gap-5 p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/40 ${GDP_THEME.iconBgClass}`}
          >
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
            GDP
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700">GDP by Production</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <GdpMiniCard {...productionQuarterly} />
            <GdpMiniCard {...productionAnnual} />
          </div>
        </div>

        <div className="border-t border-white/50 pt-4">
          <p className="text-sm font-semibold text-slate-700">GDP by Expenditure</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <GdpMiniCard {...expenditureQuarterly} />
            <GdpMiniCard {...expenditureAnnual} />
          </div>
        </div>
      </div>
    </Card>
  );
}
