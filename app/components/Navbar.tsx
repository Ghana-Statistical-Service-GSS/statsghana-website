"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Container from "./Container";
import { NAV, NavItem } from "../lib/nav";

function DesktopNavItem({
  item,
  openKey,
  setOpenKey,
  alignRight,
}: {
  item: NavItem;
  openKey: string | null;
  setOpenKey: (value: string | null) => void;
  alignRight: boolean;
}) {
  const pathname = usePathname();
  const isOpen = openKey === item.label;
  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`text-sm font-medium transition hover:text-white hover:underline hover:underline-offset-8 ${
          isActive ? "text-white" : "text-white/90"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpenKey(item.label)}>
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : item.label)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1 text-sm font-medium text-white/90 transition hover:text-white hover:underline hover:underline-offset-8"
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        role="menu"
        className={`absolute ${
          alignRight ? "right-0" : "left-0"
        } top-full z-[200] mt-2 w-72 rounded-xl bg-white py-2 text-slate-800 shadow-lg ring-1 ring-black/10 ${
          isOpen ? "block" : "hidden"
        }`}
        onMouseLeave={() => setOpenKey(null)}
      >
        {item.children?.map((child) => (
          (() => {
            const isActive = pathname === child.href;
            return (
          <Link
            key={child.href}
            href={child.href}
            role="menuitem"
            className={`block px-4 py-2.5 text-sm transition hover:bg-slate-200 ${
              isActive ? "bg-slate-300 text-slate-900" : ""
            }`}
            onClick={() => setOpenKey(null)}
          >
            {child.label}
          </Link>
            );
          })()
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenKey(null);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenKey(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative z-[100] bg-purple-900 text-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div
            ref={navRef}
            className="hidden items-center gap-6 whitespace-nowrap lg:flex"
          >
            {NAV.map((item, index) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                openKey={openKey}
                setOpenKey={setOpenKey}
                alignRight={index >= NAV.length - 2}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="flex items-center justify-center rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="pb-6 lg:hidden">
            <div className="space-y-2 text-sm font-medium">
              {NAV.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openItem === item.label;
                const isActive = pathname === item.href;

                return (
                  <div key={item.label} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      {hasChildren ? (
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between py-2 text-left"
                          onClick={() =>
                            setOpenItem(isOpen ? null : item.label)
                          }
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={`py-2 ${isActive ? "text-white" : "text-white/90"}`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                    {hasChildren && isOpen ? (
                      <div role="menu" className="mt-2 space-y-1 pl-4 text-white/80">
                        {item.children?.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={`block py-1 text-sm ${
                              childActive ? "text-white" : "text-white/80"
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {child.label}
                          </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}