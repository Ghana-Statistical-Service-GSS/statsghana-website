import type { ReactNode } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="relative z-50">
        <TopBar />
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
