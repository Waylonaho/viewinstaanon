'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShieldCheck, TrendingUp, DollarSign, GitBranch, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    const clean = username.trim().replace(/^@/, '').toLowerCase();
    if (!clean) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: clean }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not audit this profile.');
        setLoading(false);
        return;
      }

      router.push(`/audit/${clean}`);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Zero-Login Instagram Competitive Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          X-Ray Any Brand or Creator’s <span className="text-rose-500">Monetization & Viral Hooks</span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
          Stop guessing before booking influencers or launching campaigns. Audit ad saturation, isolate 3x+ outlier Reel hooks, and spy on link-in-bio funnels—with zero account login.
        </p>

        {/* Search Engine Bar */}
        <form onSubmit={handleAudit} className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 flex items-center">
            <span className="pl-4 text-slate-500 font-bold text-lg">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="gymshark, hubspot, or any public handle..."
              required
              className="w-full pl-2 pr-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            {loading ? (
              <span>Running X-Ray...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Run Free X-Ray</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 max-w-xl mx-auto p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-200 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Public profiles only</span>
          <span>•</span>
          <span>No IG login required</span>
          <span>•</span>
          <span>Instant AI Dossier</span>
        </div>
      </div>

      {/* 3 Core Intelligence Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
            <DollarSign className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Sponsorship & Ad X-Ray</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Instantly see what % of a creator’s feed is paid ads, which competing brands they promoted, and whether their audience actually engages on sponsored posts.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Outlier Hook Reverse-Engineer</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Ignore vanity averages. Our engine isolates posts outperforming their baseline by 3x+ and extracts fill-in-the-blank hook templates you can deploy immediately.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
            <GitBranch className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Link-in-Bio & DM Funnel Spy</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Uncover the exact monetization stack behind any bio (Stan Store, Kajabi, Shopify) and extract every ManyChat keyword trigger they use to capture leads.
          </p>
        </div>
      </section>

      {/* Free Micro-Tools Strip */}
      <section className="mt-20 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Free Creator & Agency Utilities</h2>
            <p className="text-xs sm:text-sm text-slate-400">Browser-based tools built for social strategists—zero signup required.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/tools/bio-grader" className="group bg-slate-950 border border-slate-800 hover:border-rose-500/50 p-5 rounded-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">AI Bio Conversion Grader</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
            </div>
            <p className="text-xs text-slate-400">Score your bio’s clarity and generate 3 high-converting B2B/creator rewrites.</p>
          </a>

          <a href="/tools/safe-zone" className="group bg-slate-950 border border-slate-800 hover:border-rose-500/50 p-5 rounded-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">Reels Safe-Zone Checker</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
            </div>
            <p className="text-xs text-slate-400">Preview exact Instagram UI button dead zones on your vertical creatives before posting.</p>
          </a>

          <a href="/tools/utm-stripper" className="group bg-slate-950 border border-slate-800 hover:border-rose-500/50 p-5 rounded-xl transition">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white text-sm">Tracking & UTM Link Cleaner</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
            </div>
            <p className="text-xs text-slate-400">Strip hidden ?igsh= share trackers from Instagram & TikTok URLs in one click.</p>
          </a>
        </div>
      </section>

      {/* Self-Selling Pricing Section */}
      <section id="pricing" className="mt-24 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Upgrade for Deep Forensic History</h2>
          <p className="text-sm text-slate-400">Start free with instant public X-Rays. Upgrade when you need unlimited competitor tracking and white-label client exports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Solo Marketer Plan */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Solo Marketer</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 mb-6">For creators, media buyers, and solo growth marketers.</p>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited @username X-Ray searches</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full 90-day sponsorship & brand conflict log</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI Outlier Hook templates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Raw CSV post & engagement exports</li>
              </ul>
            </div>

            <a
              href="https://buy.stripe.com/7sYcN52pz8MZc9u8K52VG01"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm transition border border-slate-700"
            >
              Get Solo Pass
            </a>
          </div>

          {/* Agency Plan */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/60 rounded-2xl p-8 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Agency & Brand Team</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 mb-6">Built for influencer agencies pitching clients and vetting creators at scale.</p>

              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Everything in Solo Marketer</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> White-Label Client Audit PDF Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Force live data refresh anytime</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rose-400" /> Priority API processing queue</li>
              </ul>
            </div>

            <a
              href="https://buy.stripe.com/bJe00j5BL9R3ddyd0l2VG02"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white font-bold text-center text-sm transition"
            >
              Start Agency Plan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
