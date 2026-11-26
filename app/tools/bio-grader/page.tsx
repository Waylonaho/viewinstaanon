'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, ArrowUpRight, Layers, Mail, Store } from 'lucide-react';
import { AFFILIATE_LINKS } from '@/lib/affiliates';

export default function BioGraderPage() {
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function handleGrade(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/bio-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio, niche }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-2">AI Instagram Bio Conversion Grader</h1>
      <p className="text-sm text-slate-400 mb-8">
        Score your bio’s conversion friction and generate 3 high-converting 150-character rewrites tailored to your niche.
      </p>

      <form onSubmit={handleGrade} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 mb-8">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">Your Niche / Industry</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., B2B SaaS, Fitness Coaching, D2C Skincare"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">Current Instagram Bio</label>
          <textarea
            rows={4}
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Paste your current bio here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? 'Analyzing Conversion Friction...' : 'Grade & Rewrite Bio'}
        </button>
      </form>

      {result && !result.error && (
        <div className="space-y-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-extrabold text-rose-400">{result.score}</span>
              <span className="text-[10px] text-slate-400 uppercase">/ 100</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">Conversion Diagnosis</h2>
              <p className="text-xs sm:text-sm text-slate-300">{result.critique}</p>
            </div>
          </div>

          <div className="space-y-3">
            {result.rewrites?.map((rw: any, i: number) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">{rw.angle}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(rw.text);
                      setCopiedIdx(i);
                      setTimeout(() => setCopiedIdx(null), 2000);
                    }}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIdx === i ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-white whitespace-pre-line">{rw.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link-in-Bio Destination & Funnel Stack */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
            Step 2 • Upgrade Your Bio Destination
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Where Should Your New Bio Link Send Traffic?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            A high-converting bio only works if the landing page captures leads or sales immediately on mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={AFFILIATE_LINKS.beacons}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Store className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] font-bold text-slate-500">Creator Storefront</span>
              </div>
              <h3 className="text-sm font-bold text-white">Beacons.ai</h3>
              <p className="text-xs text-slate-400">
                Launch a mobile link-in-bio shop, digital product checkout &amp; auto-updating media kit free.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-400 inline-flex items-center gap-1">
              Claim Free Store <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href={AFFILIATE_LINKS.systemeio}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-500">Full Funnel &amp; Courses</span>
              </div>
              <h3 className="text-sm font-bold text-white">Systeme.io</h3>
              <p className="text-xs text-slate-400">
                Build free opt-in funnels, host online courses &amp; automate email follow-ups in one place.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-400 inline-flex items-center gap-1">
              Build Free Funnel <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href={AFFILIATE_LINKS.beehiiv}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-slate-500">Newsletter Growth</span>
              </div>
              <h3 className="text-sm font-bold text-white">Beehiiv</h3>
              <p className="text-xs text-slate-400">
                Turn Instagram profile clicks into owned newsletter subscribers with built-in monetization.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-400 inline-flex items-center gap-1">
              Start Free on Beehiiv <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
