import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import Container from "./Container";
import HeaderSearch from "./HeaderSearch";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/statsghana",
    icon: Facebook,
  },
  {
    label: "X",
    href: "https://x.com/StatsGhana",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stats_ghana/?utm_source",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ghana-statistical-service/posts/?feedView=all",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ghanastatisticalservice",
    icon: Youtube,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@stats_ghana",
    icon: FaTiktok,
  },
] as const;

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
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 transition hover:border-purple-700 hover:text-purple-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
