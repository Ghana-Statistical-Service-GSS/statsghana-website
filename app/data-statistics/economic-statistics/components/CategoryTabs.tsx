"use client";

type CategoryTab = {
  label: string;
  value: string;
};

type CategoryTabsProps = {
  tabs: CategoryTab[];
  activeCategory: string;
  onChange: (value: string) => void;
  loading?: boolean;
};

export default function CategoryTabs({
  tabs,
  activeCategory,
  onChange,
  loading = false,
}: CategoryTabsProps) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 pb-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`tab-skeleton-${idx}`}
            className="h-9 w-36 animate-pulse rounded-full bg-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {tabs.map((tab) => {
        const isActive = tab.value === activeCategory;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={[
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-md"
                : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
