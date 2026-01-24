"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchIndex } from "@/app/lib/searchIndex";

const COLLAPSE_DELAY_MS = 200;

function highlightMatch(label: string, query: string) {
  if (!query) return [label];
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  return label.split(regex);
}

export default function HeaderSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return searchIndex.filter((item) => {
      const haystack = [item.label, item.keywords?.join(" ") ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  const showDropdown = isOpen && query.trim().length > 0;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length, query]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    if (!query.trim()) {
      closeTimerRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, COLLAPSE_DELAY_MS);
    }
  };

  const handleSelect = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filtered.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) handleSelect(item.href);
    }
  };

  return (
    <div
      ref={containerRef}
      className={[
        "relative h-12 overflow-visible transition-all duration-200 ease-out",
        isOpen ? "w-full sm:w-72" : "w-12",
      ].join(" ")}
      onMouseEnter={() => {
        setIsOpen(true);
        clearCloseTimer();
      }}
      onMouseLeave={() => {
        if (!showDropdown) scheduleClose();
      }}
    >
      <div className="flex h-12 items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 ease-out hover:border-purple-700 hover:text-purple-700">
        <div className="flex h-12 w-12 items-center justify-center rounded-full">
          <Search className="h-6 w-12" strokeWidth={2.5} />
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="header-search-listbox"
          className={[
            "h-full w-full bg-transparent px-2 text-sm text-slate-700 outline-none transition-all duration-200 ease-out",
            isOpen ? "opacity-100" : "pointer-events-none opacity-0",
          ].join(" ")}
        />
        {isOpen ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-500 hover:text-purple-700 sm:hidden"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {showDropdown ? (
        <div
          id="header-search-listbox"
          role="listbox"
          className="absolute left-0 z-[9999] mt-3 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          {filtered.map((item, index) => (
            <button
              key={`${item.label}-${item.href}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(item.href)}
              className={[
                "flex w-full flex-col gap-1 px-4 py-3 text-left text-sm transition",
                index === activeIndex ? "bg-emerald-50" : "hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="font-semibold text-slate-900">
                {highlightMatch(item.label, query).map((part, idx) =>
                  part.toLowerCase() === query.trim().toLowerCase() ? (
                    <mark
                      key={`${part}-${idx}`}
                      className="bg-emerald-100 text-emerald-700"
                    >
                      {part}
                    </mark>
                  ) : (
                    <span key={`${part}-${idx}`}>{part}</span>
                  ),
                )}
              </span>
              {item.group ? (
                <span className="text-xs text-slate-500">{item.group}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
