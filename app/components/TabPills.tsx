"use client";

interface TabPillsProps {
  tabs: string[];
  active: string;
  className?: string;
  onChange?: (value: string) => void;
}

export default function TabPills({
  tabs,
  active,
  className = "",
  onChange,
}: TabPillsProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange?.(tab)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition hover:text-purple-700 ${
              isActive
                ? "bg-purple-700 text-white shadow-sm"
                : "text-slate-600"
            }`}
            aria-pressed={isActive}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
