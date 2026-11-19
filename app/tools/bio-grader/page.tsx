'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

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
        <div className="space-y-6">
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
    </div>
  );
}
