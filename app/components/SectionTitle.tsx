import type { ReactNode } from "react";

interface SectionTitleProps {
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
