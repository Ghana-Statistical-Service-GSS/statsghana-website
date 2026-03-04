import { BOARD_MEMBERS } from "../about/board/board-data";
import { getPersonSlug, MANAGEMENT } from "../lib/management";
import { mockNews } from "../lib/mockNews";
import { pressReleases } from "../lib/pressReleases";
import { UPCOMING_RELEASES } from "../lib/upcomingReleases";
import { HERO_SLIDES } from "../lib/heroSlides";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://statsghana.gov.gh";

const staticRoutes = [
  "/",
  "/about/board",
  "/about/core-mandate",
  "/about/corporate-plan",
  "/about/history",
  "/about/legal-mandate",
  "/about/management",
  "/about/mission",
  "/about/national-statistical-system",
  "/about/national-statistical-system-nss",
  "/about/privacy-confidentiality",
  "/about/statistical-service-act",
  "/about/vision",
  "/census-surveys/agricultural-census",
  "/census-surveys/economic-census",
  "/census-surveys/population-housing-census",
  "/census-surveys/surveys",
  "/data-request/request-data",
  "/data-statistics/business-industry-and-trade-statistics",
  "/data-statistics/economic-statistics",
  "/faqs",
  "/highlights",
  "/media/gallery",
  "/media/videos",
  "/news-and-events/news",
  "/news-and-events/opportunities",
  "/news-and-events/press-releases",
  "/news-and-media/gallery",
  "/news-and-media/videos",
  "/publications/administrative-data-reports",
  "/publications/census-reports",
  "/publications/statistical-governance",
  "/publications/survey-reports",
  "/releases/upcoming",
  "/sitemap",
];

function toXmlUrl(path: string, lastModified: string) {
  const url = `${SITE_URL}${path}`;
  return [
    "  <url>",
    `    <loc>${url}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    "  </url>",
  ].join("\n");
}

export async function GET() {
  const lastModified = new Date().toISOString();
  const routes = [
    ...staticRoutes,
    ...BOARD_MEMBERS.map((member) => `/about/board/${member.slug}`),
    ...MANAGEMENT.map((person) => `/about/management/${getPersonSlug(person)}`),
    ...HERO_SLIDES.map((slide) => `/highlights/${slide.slug}`),
    ...mockNews.map((item) => `/news-and-events/news/${item.slug}`),
    ...pressReleases.map((item) => `/news-and-events/press-releases/${item.slug}`),
    ...UPCOMING_RELEASES.map((item) => `/releases/upcoming/${item.slug}`),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((path) => toXmlUrl(path, lastModified)),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
