import type { Metadata } from "next";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

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
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
