import type { Metadata } from 'next';
import {
  ShieldCheck,
  BarChart3,
  Users,
  Layers,
  Sparkles,
  CheckCircle2,
  Mail,
  ExternalLink,
  Target,
  FileText,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Media Kit & Editorial Standards',
  description:
    'Official partner media kit, audience demographics, B2B software integration placements, and FTC editorial disclosure for ViewInstaAnon (Waysales LLC).',
};

export default function AboutAndMediaKitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16 space-y-16">
      {/* HERO: PARTNER MEDIA KIT HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/30 border border-slate-800 p-8 sm:p-12">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Official Partner Media Kit • 2026
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            High-Intent B2B Creator &amp; Competitor Intelligence
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            <strong>ViewInstaAnon</strong> (operated by <strong>Waysales LLC</strong>) is a zero-login Instagram diagnostic and competitive intelligence platform. We help D2C founders, boutique marketing agencies, and growth-focused creators audit sponsorship saturation, reverse-engineer 3x+ viral Reel hooks, and benchmark link-in-bio funnels.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="mailto:partners@viewinstaanon.com?subject=SaaS%20Partnership%20Inquiry%20%E2%80%94%20ViewInstaAnon"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold transition"
            >
              <Mail className="w-4 h-4" />
              Partner With Us: partners@viewinstaanon.com
            </a>
            <a
              href="#placements"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition"
            >
              View Integration Placements
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* KEY PLATFORM METRICS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs text-slate-400 block">Indexed Dossier Coverage</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">500+</span>
            <span className="text-[11px] text-emerald-400 mt-1 block">Verified brand &amp; creator audits</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs text-slate-400 block">Commercial Verticals</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">10 Hubs</span>
            <span className="text-[11px] text-sky-400 mt-1 block">D2C, SaaS, Finance, Beauty &amp; more</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs text-slate-400 block">Free Creator Utilities</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">4 Tools</span>
            <span className="text-[11px] text-amber-400 mt-1 block">Bio Grader, Safe-Zone, UTM, Compare</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-xs text-slate-400 block">Traffic Acquisition</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">100% Organic</span>
            <span className="text-[11px] text-rose-400 mt-1 block">Programmatic SEO &amp; product-led</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: AUDIENCE & BUYER PERSONAS */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Who Uses ViewInstaAnon</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            High-Intent B2B &amp; Creator Economy Audience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Visitors land on ViewInstaAnon while actively researching competitor funnels, evaluating creator ROI, or optimizing their own social conversion stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">D2C Brands &amp; Growth Teams</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              E-commerce operators and performance marketers vetting creators before signing sponsorship retainers and reverse-engineering competitor ad saturation.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              <strong>Top Software Needs:</strong> Influencer analytics, attribution, email/SMS capture, and social schedulers.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Boutique Social Agencies</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Retainer agencies using our side-by-side comparison engine and white-label PDF audit exports to pitch prospective clients with live competitor benchmarks.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              <strong>Top Software Needs:</strong> Multi-client reporting, DM automation, and AI video repurposing.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Monetized Creators &amp; Educators</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Solo creators, coaches, and newsletter operators analyzing viral outlier hooks in their niche and upgrading their link-in-bio monetization stack.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
              <strong>Top Software Needs:</strong> Creator storefronts, newsletter platforms, and comment-to-DM funnels.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PARTNERSHIP & INTEGRATION PLACEMENTS */}
      <section id="placements" className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">How We Drive Conversions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Contextual SaaS Integration Placements
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Rather than relying on generic banner ads, our platform surfaces vetted software partners at the exact moment a user uncovers a workflow bottleneck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Placement 01 • Highest Intent
                </span>
                <Layers className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                Dynamic Diagnostic Stack Recommendations
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Inside every live <code className="text-slate-300">/audit/[username]</code> report, our routing engine evaluates the profile&apos;s funnel gaps (such as missing comment-to-DM automation, static link lists, or uncaptured newsletter traffic) and recommends the exact SaaS partner built to solve that gap.
              </p>
            </div>
            <a
              href="/audit/hormozi"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition"
            >
              Inspect Live Dossier Example <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Placement 02 • Bottom-of-Funnel SEO
                </span>
                <FileText className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                Software Alternative &amp; Comparison Hubs
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Dedicated buyer-intent comparison pages (<code className="text-slate-300">/vs/hypeauditor</code>, <code className="text-slate-300">/vs/modash</code>, <code className="text-slate-300">/vs/sprout-social</code>, <code className="text-slate-300">/vs/social-blade</code>) comparing enterprise pricing, feature matrices, and recommended companion stacks.
              </p>
            </div>
            <a
              href="/vs/hypeauditor"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
            >
              View Comparison Matrix <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Placement 03 • Industry Research
                </span>
                <BarChart3 className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                10 Niche Engagement &amp; Ad Saturation Leaderboards
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Curated vertical benchmarks across D2C Fitness, Skincare, B2B SaaS, Fashion, Personal Finance, Real Estate, and Agencies—connecting brand researchers with vetted workflow partners.
              </p>
            </div>
            <a
              href="/niche/b2b-saas-ai-tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition"
            >
              Explore Niche Leaderboard <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Placement 04 • Interactive Utilities
                </span>
                <Sparkles className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                Free Creator Micro-Tools Suite
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                High-utility free tools—including our AI Bio Grader, Reels Safe-Zone Checker, UTM Link Cleaner, and Side-by-Side Creator Comparison engine—introducing relevant SaaS tools right after task completion.
              </p>
            </div>
            <a
              href="/tools/bio-grader"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition"
            >
              Try AI Bio Grader <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPLIANCE, TRAFFIC POLICY & FTC EDITORIAL DISCLOSURE */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Compliance, Traffic Integrity &amp; FTC Disclosure
            </h2>
            <p className="text-xs text-slate-400">
              Strict adherence to partner program terms, search quality standards, and FTC 16 CFR Part 255 guidelines.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">Zero Brand-Bidding Policy</h3>
              <p className="text-xs text-slate-400 mt-1">
                We never bid on partner trademarks, brand terms, or misspellings in paid search campaigns, nor do we use forced redirects or cookie-stuffing scripts.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">Public Data &amp; Privacy First</h3>
              <p className="text-xs text-slate-400 mt-1">
                All diagnostic metrics are derived exclusively from publicly accessible profile metadata, with self-service profile removal available anytime via our Opt-Out portal.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
          <p className="font-bold text-white uppercase tracking-wider text-[11px]">
            FTC Affiliate &amp; Editorial Independence Disclosure
          </p>
          <p>
            ViewInstaAnon is an independent B2B software and analytics publication owned and operated by <strong>Waysales LLC</strong>. Some outbound links to third-party software tools, creator platforms, and marketing utilities featured across our diagnostic reports, comparison matrices, and tool pages are affiliate or referral links. If you click a partner link and subscribe to a paid plan, Waysales LLC may receive a referral commission at no additional cost to you.
          </p>
          <p className="text-slate-400">
            Commercial partnerships never influence our automated diagnostic calculations, engagement rate formulas, or creator benchmark rankings.
          </p>
        </div>

        {/* DIRECT CONTACT FOOTER BAR */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <strong className="text-white">Corporate Entity:</strong> Waysales LLC (South Carolina, USA) •{' '}
            <strong className="text-white">Partner Desk:</strong>{' '}
            <a href="mailto:partners@viewinstaanon.com" className="text-rose-400 hover:underline">
              partners@viewinstaanon.com
            </a>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/opt-out" className="hover:text-white transition">Data Opt-Out</a>
          </div>
        </div>
      </section>
    </div>
  );
}
