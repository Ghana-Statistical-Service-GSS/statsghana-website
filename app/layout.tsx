import type { Metadata } from "next";
import SiteLayout from "./components/SiteLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghana Statistical Service",
  description: "Official homepage of the Ghana Statistical Service",
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
