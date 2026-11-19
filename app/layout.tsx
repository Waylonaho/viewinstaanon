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

            <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
              <a href="/niche/d2c-fitness-supplements" className="hover:text-white transition">Niches</a>
              <a href="/compare" className="hover:text-white transition">Compare</a>
              <a href="/tools/bio-grader" className="hover:text-white transition">Bio Grader</a>
              <a href="/tools/safe-zone" className="hidden md:inline hover:text-white transition">Safe-Zone</a>
              <a href="/tools/utm-stripper" className="hidden lg:inline hover:text-white transition">Link Cleaner</a>
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
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-slate-400 pb-4 border-b border-slate-900">
              <span className="text-slate-600 font-semibold">Industry Benchmarks:</span>
              <a href="/niche/d2c-fitness-supplements" className="hover:text-white transition">Fitness & Supplements</a>
              <a href="/niche/skincare-beauty-cosmetics" className="hover:text-white transition">Skincare & Beauty</a>
              <a href="/niche/b2b-saas-ai-tools" className="hover:text-white transition">B2B SaaS & AI</a>
              <a href="/niche/ecommerce-fashion-apparel" className="hover:text-white transition">Fashion & Apparel</a>
              <a href="/niche/personal-finance-investing" className="hover:text-white transition">Finance & Investing</a>
              <a href="/niche/digital-marketing-growth-agencies" className="hover:text-white transition">Marketing Agencies</a>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-slate-400 pb-4 border-b border-slate-900">
              <span className="text-slate-600 font-semibold">Compare Alternatives:</span>
              <a href="/vs/hypeauditor" className="hover:text-white transition">HypeAuditor Alternative</a>
              <a href="/vs/modash" className="hover:text-white transition">Modash Alternative</a>
              <a href="/vs/sprout-social" className="hover:text-white transition">Sprout Social Alternative</a>
              <a href="/vs/social-blade" className="hover:text-white transition">Social Blade Alternative</a>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} ViewInstaAnon. Zero-footprint public social intelligence.</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-slate-400">
                <a href="/restore-pro" className="text-rose-400 hover:text-rose-300 font-medium transition">Restore Pro Pass</a>
                <a
                  href="https://billing.stripe.com/p/login/28E14n6FPd3fgpK8K52VG00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Manage Subscription
                </a>
                <a href="/privacy" className="hover:text-white transition">Privacy</a>
                <a href="/terms" className="hover:text-white transition">Terms</a>
                <a href="/opt-out" className="hover:text-white transition">Opt-Out</a>
                <a href="/sitemap.xml" className="hover:text-white transition">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
