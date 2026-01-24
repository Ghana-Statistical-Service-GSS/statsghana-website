"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Minus, Plus, Search } from "lucide-react";
import { faqCategories } from "./faqData";

const toneStyles = {
  red: {
    badge: "bg-rose-100 text-rose-600",
    title: "text-rose-700",
    dot: "bg-rose-500",
  },
  green: {
    badge: "bg-emerald-100 text-emerald-600",
    title: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  teal: {
    badge: "bg-teal-100 text-teal-600",
    title: "text-teal-700",
    dot: "bg-teal-500",
  },
  blue: {
    badge: "bg-blue-100 text-blue-600",
    title: "text-blue-700",
    dot: "bg-blue-500",
  },
  navy: {
    badge: "bg-slate-200 text-slate-700",
    title: "text-slate-800",
    dot: "bg-slate-500",
  },
  orange: {
    badge: "bg-amber-100 text-amber-700",
    title: "text-amber-700",
    dot: "bg-amber-500",
  },
};

const normalize = (value: string) => value.toLowerCase().trim();

export default function FAQsClient() {
  const [query, setQuery] = useState("");
  const [openByCategory, setOpenByCategory] = useState<Record<string, string | null>>(
    {},
  );

  const filteredCategories = useMemo(() => {
    const normalized = normalize(query);
    if (!normalized) return faqCategories;

    return faqCategories
      .map((category) => {
        const matchesCategory = normalize(category.title).includes(normalized);
        const matchingItems = category.items.filter((item) =>
          normalize(`${item.question} ${item.answer}`).includes(normalized),
        );

        if (matchesCategory || matchingItems.length > 0) {
          return { ...category, items: matchingItems };
        }
        return null;
      })
      .filter((category): category is (typeof faqCategories)[number] => category !== null);
  }, [query]);

  const categories = filteredCategories;

  return (
    <div className="space-y-10 pb-12">
      <section className="relative overflow-hidden py-10 sm:py-12">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            <div>
              <p className="text-sm text-slate-500">Home / FAQs</p>
              <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
                Frequently Asked Questions (FAQs)
              </h1>
              <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
                Find quick answers about GSS data, reports, StatsBank, and services.
              </p>
              <div className="relative mt-6 w-full max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {categories.length ? (
              categories.map((category) => {
                const tone = toneStyles[category.tone];
                const Icon = category.icon;
                const openId = openByCategory[category.id] ?? null;
                return (
                  <div
                    key={category.id}
                    className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tone.badge}`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <h2 className={`text-sm font-semibold ${tone.title}`}>
                          {category.title}
                        </h2>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 text-slate-400"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-4 divide-y divide-slate-100">
                      {category.items.length ? (
                        category.items.map((item) => {
                          const isOpen = openId === item.id;
                          return (
                            <div key={item.id} className="py-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenByCategory((prev) => ({
                                    ...prev,
                                    [category.id]: isOpen ? null : item.id,
                                  }))
                                }
                                className="flex w-full items-start gap-3 text-left"
                              >
                                <span
                                  className={`mt-2 h-1.5 w-1.5 rounded-full ${tone.dot}`}
                                />
                                <span className="flex-1 text-sm font-medium text-slate-800">
                                  {item.question}
                                </span>
                                {isOpen ? (
                                  <Minus className="mt-1 h-4 w-4 text-slate-400" />
                                ) : (
                                  <Plus className="mt-1 h-4 w-4 text-slate-400" />
                                )}
                              </button>
                              {isOpen && (
                                <div className="mt-2 pl-4 text-sm text-slate-600">
                                  {Array.isArray(item.answer) ? (
                                    <ul className="list-disc space-y-1 pl-4">
                                      {item.answer.map((line) => (
                                        <li key={line}>{line}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p>{item.answer}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="py-3 text-sm text-slate-500">
                          No matching questions.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-slate-200/70 bg-white p-6 text-sm text-slate-500 shadow-sm md:col-span-2">
                No FAQs match your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
