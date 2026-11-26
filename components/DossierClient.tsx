'use client';

import { useState, useEffect } from 'react';
import {
  DollarSign, TrendingUp, GitBranch, Grid, Lock, Download,
  Share2, ExternalLink, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { getDynamicAffiliateRecommendation } from '@/lib/affiliates';

export default function DossierClient({ audit, relatedAudits }: { audit: any; relatedAudits: any[] }) {
  const [activeTab, setActiveTab] = useState<'sponsors' | 'outliers' | 'funnel' | 'posts'>('sponsors');
  const [isPro, setIsPro] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [agencyName, setAgencyName] = useState('');

  // Check if user unlocked Pro (either via Stripe redirect ?pro=unlocked or local storage)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('pro') === 'unlocked') {
      localStorage.setItem('via_pro_pass', 'true');
      setIsPro(true);
      window.history.replaceState({}, '', `/audit/${audit.username}`);
    } else if (localStorage.getItem('via_pro_pass') === 'true') {
      setIsPro(true);
    }
  }, [audit.username]);

  const sponsors = Array.isArray(audit.detected_sponsors) ? audit.detected_sponsors : [];
  const outliers = Array.isArray(audit.outlier_posts) ? audit.outlier_posts : [];
  const posts = Array.isArray(audit.raw_posts) ? audit.raw_posts : [];
  const funnel = audit.funnel_stack || {};
  const dynamicPartner = getDynamicAffiliateRecommendation(audit);

  async function handleForceRefresh() {
    if (!isPro) {
      document.getElementById('upgrade-banner')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setRefreshing(true);
    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: audit.username, forceRefresh: true }),
      });
      window.location.reload();
    } catch {
      setRefreshing(false);
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  }

  function handleExportPDF() {
    if (!isPro) {
      document.getElementById('upgrade-banner')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.print();
  }

  function handleExportCSV() {
    if (!isPro) {
      document.getElementById('upgrade-banner')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const headers = ['Shortcode,Likes,Comments,Views,IsVideo,Caption'];
    const rows = posts.map((p: any) =>
      `"${p.shortcode}",${p.likes},${p.comments},${p.views},${p.is_video},"${(p.caption || '').replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${audit.username}-xray-export.csv`;
    a.click();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* White-Label Print Header (Only shows when Agency exports PDF) */}
      {agencyName && (
        <div className="hidden print:flex justify-between items-center border-b border-slate-300 pb-4 mb-6 text-slate-900">
          <span className="font-bold text-lg">{agencyName} — Competitive Intelligence Audit</span>
          <span className="text-xs">Prepared for @{audit.username}</span>
        </div>
      )}

      {/* Top Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                @{audit.username}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                {audit.niche || 'Creator & Brand'}
              </span>
              {isPro && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO UNLOCKED
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-slate-300 mb-2">{audit.display_name}</p>
            {audit.bio && (
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl whitespace-pre-line mb-3">
                {audit.bio}
              </p>
            )}
            {audit.bio_url && (
              <a
                href={audit.bio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {audit.bio_url}
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 print:hidden">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink ? 'Dossier Link Copied!' : 'Share Dossier'}
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
            >
              {!isPro && <Lock className="w-3 h-3 text-rose-400" />}
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>

            <button
              onClick={handleExportPDF}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white flex items-center gap-1.5 transition cursor-pointer"
            >
              {!isPro && <Lock className="w-3 h-3" />}
              <span>White-Label PDF</span>
            </button>

            <button
              onClick={handleForceRefresh}
              disabled={refreshing}
              title="Refresh Live Data"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* 4 Key KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Followers</span>
            <span className="text-xl sm:text-2xl font-extrabold text-white">
              {Number(audit.followers_count || 0).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Engagement Rate</span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">
              {audit.engagement_rate}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Ad Saturation</span>
            <span className="text-xl sm:text-2xl font-extrabold text-amber-400">
              {audit.ad_saturation_pct}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Funnel Stack</span>
            <span className="text-base sm:text-lg font-bold text-sky-400 truncate block mt-0.5">
              {funnel.bio_platform || 'Direct Link'}
            </span>
          </div>
        </div>
      </div>

      {/* White-Label Agency Customizer Bar (Pro Feature) */}
      {isPro && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-slate-300 font-medium">
            Agency Mode Active: Enter your agency name to stamp white-label PDF exports:
          </span>
          <input
            type="text"
            placeholder="e.g., Apex Growth Media"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
          />
        </div>
      )}

      {/* Interactive Tab Switcher */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-1 print:hidden">
        <button
          onClick={() => setActiveTab('sponsors')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
            activeTab === 'sponsors'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Monetization & Sponsors ({sponsors.length})
        </button>

        <button
          onClick={() => setActiveTab('outliers')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
            activeTab === 'outliers'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Viral Outlier Hooks ({outliers.length})
        </button>

        <button
          onClick={() => setActiveTab('funnel')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
            activeTab === 'funnel'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          Bio & DM Funnel Spy
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
            activeTab === 'posts'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          Recent Posts ({posts.length})
        </button>
      </div>

      {/* TAB 1: MONETIZATION & SPONSORS */}
      {activeTab === 'sponsors' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-1">Detected Brand Deals, Promo Codes & Affiliate Links</h2>
            <p className="text-xs text-slate-400 mb-6">
              Forensic scan of recent captions and bio links to identify commercial saturation and brand conflicts.
            </p>

            {sponsors.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-sm text-slate-400">
                No explicit #ad tags or third-party promo codes detected in recent posts. Likely promotes own products/services directly.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsors.map((sp: any, idx: number) => {
                  const locked = !isPro && idx >= 2;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl bg-slate-950 border border-slate-800 relative ${
                        locked ? 'select-none overflow-hidden' : ''
                      }`}
                    >
                      <div className={locked ? 'blur-sm opacity-40' : ''}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-sm">{sp.brand_or_code}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {sp.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">"{sp.evidence}"</p>
                      </div>

                      {locked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
                          <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" /> Pro Pass Required
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: VIRAL OUTLIER HOOKS */}
      {activeTab === 'outliers' && (
        <div className="space-y-4">
          {outliers.map((item: any, idx: number) => {
            const locked = !isPro && idx >= 1;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className={locked ? 'blur-md opacity-30 select-none' : ''}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.multiplier}x Above Account Baseline
                    </span>
                    <span className="text-xs text-slate-400">
                      {Number(item.likes || 0).toLocaleString()} Likes • {Number(item.comments || 0).toLocaleString()} Comments
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    Hook Pattern: <span className="text-rose-400">{item.hook_pattern}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4">{item.why_it_worked}</p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Stealable Fill-in-the-Blank Template
                    </span>
                    <p className="text-sm font-mono text-emerald-300">{item.stealable_template}</p>
                  </div>
                </div>

                {locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 p-6 text-center">
                    <Lock className="w-6 h-6 text-rose-500 mb-2" />
                    <p className="text-sm font-bold text-white mb-1">Unlock All Outlier Hook Breakdowns & Templates</p>
                    <p className="text-xs text-slate-400 mb-4 max-w-md">
                      Upgrade to Solo or Agency Pass to inspect every viral outlier and copy fill-in-the-blank templates.
                    </p>
                    <a
                      href="/#pricing"
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition"
                    >
                      Unlock Full X-Ray →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: BIO & DM FUNNEL SPY */}
      {activeTab === 'funnel' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Detected Link-in-Bio Infrastructure</span>
              <span className="text-lg font-extrabold text-white">{funnel.bio_platform || 'Custom / Direct URL'}</span>
              <p className="text-xs text-slate-400 mt-2">Primary Offer: {funnel.primary_offer || 'Brand / Content Hub'}</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">ManyChat / Comment-to-DM Automation</span>
              {funnel.uses_dm_automation ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Active DM Funnel Detected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 font-bold text-base mt-1">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>No Keyword Triggers Detected</span>
                </div>
              )}

              {Array.isArray(funnel.dm_keywords) && funnel.dm_keywords.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {funnel.dm_keywords.map((kw: string, i: number) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      "{kw}"
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RECENT POSTS FEED */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(0, isPro ? 24 : 6).map((post: any, i: number) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <p className="text-xs text-slate-300 line-clamp-3 mb-4">
                {post.caption || '(No caption text)'}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                <span>❤️ {Number(post.likes || 0).toLocaleString()} • 💬 {Number(post.comments || 0).toLocaleString()}</span>
                {post.shortcode && (
                  <a
                    href={`https://instagram.com/p/${post.shortcode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-400 hover:underline flex items-center gap-1"
                  >
                    View Post <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Persistent Dynamic Partner Recommendation Card (Always Visible Across All Tabs) */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-950 border border-sky-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {dynamicPartner.badge}
            </span>
            <span className="text-[11px] text-slate-500">Recommended Partner Stack</span>
          </div>
          <h3 className="text-base font-bold text-white">{dynamicPartner.headline}</h3>
          <p className="text-xs text-slate-400 max-w-2xl">{dynamicPartner.description}</p>
        </div>
        <a
          href={dynamicPartner.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold whitespace-nowrap inline-flex items-center gap-1.5 transition shrink-0"
        >
          {dynamicPartner.ctaText}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Persistent Upgrade Conversion Banner for Free Visitors */}
      {!isPro && (
        <div id="upgrade-banner" className="mt-6 bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-950 border border-rose-500/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">
              Want the Full 90-Day Audit & White-Label Client PDF?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Unlock all blurred sponsors, every 3x+ viral Reel hook template, raw CSV exports, and branded agency pitch decks.
            </p>
          </div>
          <a
            href="/#pricing"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white font-bold text-sm whitespace-nowrap transition"
          >
            Unlock Pro Pass ($19/mo) →
          </a>
        </div>
      )}

      {/* Programmatic SEO Internal Linking Mesh (Crawled by Googlebot) */}
      {relatedAudits.length > 0 && (
        <section className="mt-16 pt-8 border-t border-slate-800/80 print:hidden">
          <h2 className="text-base font-bold text-white mb-4">
            Related {audit.niche || 'Creator & Brand'} X-Ray Audits
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {relatedAudits.map((rel: any) => (
              <a
                key={rel.username}
                href={`/audit/${rel.username}`}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition text-left"
              >
                <span className="text-xs font-bold text-white block truncate">@{rel.username}</span>
                <span className="text-[11px] text-emerald-400 block mt-0.5">{rel.engagement_rate}% ER</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
