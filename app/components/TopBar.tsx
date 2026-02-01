import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Container from "./Container";
import HeaderSearch from "./HeaderSearch";

export default function TopBar() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <Container>
        <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-[82px] w-[82px]">
              <Image
                src="/images/gss-logo.png"
                alt="Ghana Statistical Service"
                fill
                className="object-contain"
                sizes="82px"
              />
            </div>
            <div className="text-xs font-semibold uppercase leading-tight text-slate-900">
              <div>Ghana</div>
              <div>Statistical</div>
              <div>Service</div>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <HeaderSearch />

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-purple-700 bg-purple-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-purple-900"
              >
                English
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-purple-700 hover:text-purple-700"
              >
                French
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: FaXTwitter, label: "X (formerly Twitter)" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition hover:border-purple-700 hover:text-purple-700"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
