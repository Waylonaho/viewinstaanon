'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RestoreProPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/verify-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not verify subscription.');
        setLoading(false);
        return;
      }

      localStorage.setItem('via_pro_pass', 'true');
      setSuccess(`${data.plan} Pass verified! Unlocking your dashboard...`);
      setTimeout(() => {
        router.push('/audit/hormozi');
      }, 1200);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
          <KeyRound className="w-5 h-5" />
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-2">Restore Your Pro Pass</h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Already subscribed on another device? Enter the email address you used at Stripe checkout to unlock unlimited X-Rays and White-Label PDFs on this browser.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Stripe Checkout Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@agency.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 disabled:opacity-50 text-white font-bold text-sm transition cursor-pointer"
          >
            {loading ? 'Verifying with Stripe...' : 'Verify & Unlock Pro'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
}
