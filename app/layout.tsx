import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ViewInstaAnon — B2B Creator & Competitor Instagram X-Ray",
    template: "%s | ViewInstaAnon"
  },
  description: "Zero-login Instagram competitor intelligence. Audit creator sponsorships, isolate 3x+ viral Reel hooks, and reverse-engineer link-in-bio funnels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-rose-500/30 selection:text-rose-200">
        {/* Global Navigation */}
        <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                ViewInsta<span className="text-rose-500">Anon</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full">
                B2B X-Ray
              </span>
            </a>

            <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
              <a href="/tools/bio-grader" className="hover:text-white transition">Bio Grader</a>
              <a href="/tools/safe-zone" className="hover:text-white transition">Safe-Zone</a>
              <a href="/tools/utm-stripper" className="hover:text-white transition">Link Cleaner</a>
              <a
                href="/#pricing"
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-3.5 py-1.5 rounded-lg transition text-xs"
              >
                Pro Pass
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full border-t border-slate-800/80 py-8 px-4 mt-16 text-xs text-slate-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} ViewInstaAnon. Zero-footprint public social intelligence.</p>
            <div className="flex flex-wrap justify-center gap-5 text-slate-400">
              <a href="/" className="hover:text-white transition">X-Ray Search</a>
              <a href="/tools/bio-grader" className="hover:text-white transition">AI Bio Grader</a>
              <a href="/tools/safe-zone" className="hover:text-white transition">Reel Safe-Zone</a>
              <a href="/tools/utm-stripper" className="hover:text-white transition">UTM Stripper</a>
              <a
                href="https://billing.stripe.com/p/login/28E14n6FPd3fgpK8K52VG00"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Manage Subscription
              </a>
              <a href="/sitemap.xml" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
