'use client';

import { useState } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function OptOutPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [doneMessage, setDoneMessage] = useState('');

  async function handleRemove(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setDoneMessage('');
    try {
      const res = await fetch('/api/opt-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setDoneMessage(data.message || data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
        <ShieldAlert className="w-4 h-4" /> Public Data Governance
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-3">Profile Removal & Opt-Out</h1>
      <p className="text-sm text-slate-400 mb-8 leading-relaxed">
        ViewInstaAnon aggregates strictly publicly available business and creator metadata. If you own a public Instagram profile and wish to purge your cached audit dossier from our index, submit your handle below for immediate removal.
      </p>

      <form onSubmit={handleRemove} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">Instagram Handle to Remove</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@yourusername"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition cursor-pointer"
        >
          {loading ? 'Purging Record...' : 'Remove Profile From Index'}
        </button>

        {doneMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{doneMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}
