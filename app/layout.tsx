import type { Metadata } from "next";
import Script from "next/script";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

const GA_ID = "G-VV5CC7V3TQ";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://statsghana.gov.gh";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ghana Statistical Service",
    template: "%s | Ghana Statistical Service",
  },
  verification: {
    google: "xV73Lnp37P4wIPo7-l8dBSmX5x2XDhCN4VCyPqhBAlc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
