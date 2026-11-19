'use client';

import { useState } from 'react';
import { Shield, Copy, Check } from 'lucide-react';

export default function UtmStripperPage() {
  const [rawUrl, setRawUrl] = useState('');
  const [cleanedUrl, setCleanedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  function cleanLink(input: string) {
    setRawUrl(input);
    try {
      const url = new URL(input.trim());
      const trackers = [
        'igsh', 'igshid', 'utm_source', 'utm_medium', 'utm_campaign',
        'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref', 's', 't'
      ];
      trackers.forEach((param) => url.searchParams.delete(param));
      setCleanedUrl(url.toString());
    } catch {
      setCleanedUrl('');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
        <Shield className="w-4 h-4" /> Zero-Footprint Link Utility
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Instagram & Social Link Tracker Stripper</h1>
      <p className="text-sm text-slate-400 mb-8">
        When you copy a link inside Instagram or TikTok, hidden parameters like <code className="text-rose-400">?igsh=...</code> attach your personal profile ID to the URL. Paste any link below to strip tracking tags instantly.
      </p>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">Paste Tracked Social URL</label>
          <input
            type="url"
            value={rawUrl}
            onChange={(e) => cleanLink(e.target.value)}
            placeholder="https://www.instagram.com/reel/C8xYz123/?igsh=MzRlODBiNWFlZA=="
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        {cleanedUrl && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Clean, Untraceable URL Ready
            </span>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-mono text-white break-all">{cleanedUrl}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(cleanedUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
