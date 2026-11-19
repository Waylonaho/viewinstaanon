'use client';

import { useState } from 'react';
import { Scale, Search, ExternalLink } from 'lucide-react';

export default function ComparePage() {
  const [handleA, setHandleA] = useState('');
  const [handleB, setHandleB] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataA, setDataA] = useState<any>(null);
  const [dataB, setDataB] = useState<any>(null);

  async function runComparison(e: React.FormEvent) {
    e.preventDefault();
    const cleanA = handleA.trim().replace(/^@/, '').toLowerCase();
    const cleanB = handleB.trim().replace(/^@/, '').toLowerCase();
    if (!cleanA || !cleanB) return;

    setLoading(true);
    setError('');
    setDataA(null);
    setDataB(null);

    try {
      const [resA, resB] = await Promise.all([
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: cleanA }),
        }),
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: cleanB }),
        }),
      ]);

      const jsonA = await resA.json();
      const jsonB = await resB.json();

      if (!resA.ok || !resB.ok) {
        setError(jsonA.error || jsonB.error || 'Ensure both Instagram handles are public and valid.');
        setLoading(false);
        return;
      }

      setDataA(jsonA.audit);
      setDataB(jsonB.audit);
    } catch {
      setError('Comparison failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
          <Scale className="w-4 h-4" /> Media Buyer Vetting Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Side-by-Side Creator & Competitor Comparison
        </h1>
        <p className="text-sm text-slate-400">
          Compare two public Instagram accounts head-to-head on engagement rate, ad saturation, and bio funnel stack before signing a sponsorship deal.
        </p>
      </div>

      <form onSubmit={runComparison} className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Creator / Brand A</label>
            <input
              type="text"
              required
              value={handleA}
              onChange={(e) => setHandleA(e.target.value)}
              placeholder="@cbum"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Creator / Brand B</label>
            <input
              type="text"
              required
              value={handleB}
              onChange={(e) => setHandleB(e.target.value)}
              placeholder="@jeffnippard"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Running Dual Forensic X-Ray...' : 'Compare Accounts Head-to-Head'}
        </button>

        {error && (
          <p className="mt-3 text-xs text-rose-400 text-center">{error}</p>
        )}
      </form>

      {dataA && dataB && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Metric</th>
                  <th className="p-4 text-sm font-extrabold text-white">
                    <a href={`/audit/${dataA.username}`} className="hover:text-rose-400 flex items-center gap-1">
                      @{dataA.username} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </th>
                  <th className="p-4 text-sm font-extrabold text-white">
                    <a href={`/audit/${dataB.username}`} className="hover:text-rose-400 flex items-center gap-1">
                      @{dataB.username} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Primary Niche</td>
                  <td className="p-4 text-slate-200">{dataA.niche}</td>
                  <td className="p-4 text-slate-200">{dataB.niche}</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Followers</td>
                  <td className="p-4 font-bold text-white">{Number(dataA.followers_count || 0).toLocaleString()}</td>
                  <td className="p-4 font-bold text-white">{Number(dataB.followers_count || 0).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Engagement Rate</td>
                  <td className={`p-4 font-extrabold ${Number(dataA.engagement_rate) >= Number(dataB.engagement_rate) ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {dataA.engagement_rate}%
                  </td>
                  <td className={`p-4 font-extrabold ${Number(dataB.engagement_rate) >= Number(dataA.engagement_rate) ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {dataB.engagement_rate}%
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Ad Saturation (Lower = Fresher Audience)</td>
                  <td className={`p-4 font-bold ${Number(dataA.ad_saturation_pct) <= Number(dataB.ad_saturation_pct) ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {dataA.ad_saturation_pct}%
                  </td>
                  <td className={`p-4 font-bold ${Number(dataB.ad_saturation_pct) <= Number(dataA.ad_saturation_pct) ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {dataB.ad_saturation_pct}%
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Bio Funnel Infrastructure</td>
                  <td className="p-4 text-sky-400 font-semibold">{dataA.funnel_stack?.bio_platform || 'Direct Link'}</td>
                  <td className="p-4 text-sky-400 font-semibold">{dataB.funnel_stack?.bio_platform || 'Direct Link'}</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-400 font-medium">Detected Sponsors Count</td>
                  <td className="p-4 text-white">{Array.isArray(dataA.detected_sponsors) ? dataA.detected_sponsors.length : 0} brands/codes</td>
                  <td className="p-4 text-white">{Array.isArray(dataB.detected_sponsors) ? dataB.detected_sponsors.length : 0} brands/codes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
