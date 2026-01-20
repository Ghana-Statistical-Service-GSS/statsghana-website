import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Briefcase } from "lucide-react";
import { Opportunity } from "@/app/lib/mockOpportunities";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-stretch md:gap-6">
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 md:w-48 md:shrink-0">
        <div className="relative aspect-[4/3]">
          <Image
            src={opportunity.imageSrc}
            alt={opportunity.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {opportunity.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
            {opportunity.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-700" />
              {opportunity.employmentType}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-700" />
              {opportunity.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-700" />
              Deadline: {opportunity.deadline}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Post Date: {opportunity.postDate}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-semibold text-emerald-700">
            {opportunity.department}
          </div>
          <Link
            href={opportunity.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
