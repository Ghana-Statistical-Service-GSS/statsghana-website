import Link from "next/link";
import { Facebook, Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Container from "./Container";

const followIcons = [
  { label: "facebook", icon: Facebook },
  { label: "X", icon: FaXTwitter },
  { label: "tiktok", icon: Music2 },
  { label: "youtube", icon: Youtube },
  { label: "instagram", icon: Instagram },
  { label: "linkedin", icon: Linkedin },
];

const usefulLinks = [
  { label: "Data Request", href: "/data-request" },
  { label: "Data & Statistics", href: "/data-statistics" },
  { label: "Publications", href: "/publications" },
  { label: "Press Releases", href: "/press-releases" },
];

const quickLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Data & Statistics", href: "/data-statistics" },
  { label: "Publications", href: "/publications" },
  { label: "Press Release", href: "/press-releases" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <Container>
        <div className="grid gap-8 py-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 text-white/80">
            <p className="font-semibold text-white">Ghana Statistical Service</p>
            <p>Finance Drive, Accra</p>
            <p>P.O.Box GP 1098</p>
            <p>info@statsghana.gov.gh</p>
            <p>Tel: +233302664304</p>
          </div>
          <div className="space-y-3">
            <p className="font-semibold">Follow Us</p>
            <div className="space-y-2 text-white/70">
              {followIcons.map(({ label, icon: Icon }) => (
                <span key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="capitalize">{label}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Useful Links</p>
            {usefulLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Quick Links</p>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/70">
          Ghana Statistical Service © 2026 | Ghana
        </div>
      </Container>
    </footer>
  );
}
