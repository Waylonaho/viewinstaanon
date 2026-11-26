import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { BarChart3, ArrowUpRight, Sparkles } from 'lucide-react';
import { getDynamicAffiliateRecommendation } from '@/lib/affiliates';

const NICHE_MAP: Record<string, { title: string; dbName: string; summary: string }> = {
  'd2c-fitness-supplements': {
    title: 'D2C Fitness & Supplements',
    dbName: 'D2C Fitness & Supplements',
    summary: 'Benchmark engagement rates, supplement sponsorship saturation, and viral fitness Reel hooks across top athletes and D2C brands.',
  },
  'skincare-beauty-cosmetics': {
    title: 'Skincare, Beauty & Cosmetics',
    dbName: 'Skincare, Beauty & Cosmetics',
    summary: 'Audit creator brand deals, affiliate storefronts, and high-converting beauty tutorial hooks across top dermatologists and makeup founders.',
  },
  'b2b-saas-ai-tools': {
    title: 'B2B SaaS & AI Tools',
    dbName: 'B2B SaaS & AI Tools',
    summary: 'Analyze how top AI educators, developer advocates, and SaaS brands convert Instagram Reels into software trials and newsletter subscribers.',
  },
  'ecommerce-fashion-apparel': {
    title: 'Ecommerce Fashion & Apparel',
    dbName: 'Ecommerce Fashion & Apparel',
    summary: 'Compare organic engagement vs. promotional ad saturation across global fashion houses and high-growth D2C apparel creators.',
  },
  'personal-finance-investing': {
    title: 'Personal Finance & Investing',
    dbName: 'Personal Finance & Investing',
    summary: 'Inspect affiliate product disclosures, course funnels, and ManyChat keyword triggers across leading personal finance educators.',
  },
  'real-estate-architecture': {
    title: 'Real Estate & Architecture',
    dbName: 'Real Estate & Architecture',
    summary: 'Benchmark luxury real estate brokers, commercial investors, and architectural studios on Instagram engagement and lead-capture funnels.',
  },
  'food-beverage-coffee-brands': {
    title: 'Food, Beverage & Coffee Brands',
    dbName: 'Food, Beverage & Coffee Brands',
    summary: 'Explore recipe hook patterns, cookbook launches, and CPG brand partnerships across specialty coffee and culinary creators.',
  },
  'pet-care-accessories': {
    title: 'Pet Care & Accessories',
    dbName: 'Pet Care & Accessories',
    summary: 'Evaluate audience buying intent, D2C pet merchandise stores, and sponsored brand frequency among top pet accounts.',
  },
  'digital-marketing-growth-agencies': {
    title: 'Digital Marketing & Growth Agencies',
    dbName: 'Digital Marketing & Growth Agencies',
    summary: 'See which agency founders and SaaS marketing platforms win on Instagram using viral carousel frameworks and DM lead magnets.',
  },
  'productivity-creator-economy-educators': {
    title: 'Productivity & Creator Economy Educators',
    dbName: 'Productivity & Creator Economy Educators',
    summary: 'Reverse-engineer Notion template sellers, cohort educators, and creator-economy leaders on bio funnels and outlier hooks.',
  },
};

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const niche = NICHE_MAP[params.slug.toLowerCase()];
  if (!niche) return { title: 'Instagram Industry Benchmarks' };

  return {
    title: `${niche.title} Instagram Benchmarks & Top Creators (2026)`,
    description: niche.summary,
    alternates: { canonical: `https://viewinstaanon.com/niche/${params.slug.toLowerCase()}` },
  };
}

export default async function NicheLeaderboardPage({ params }: Props) {
  const slug = params.slug.toLowerCase();
  const niche = NICHE_MAP[slug];
  if (!niche) notFound();

  const { data: accounts } = await supabaseAdmin
    .from('audits')
    .select('username, display_name, followers_count, engagement_rate, ad_saturation_pct, funnel_stack')
    .eq('niche', niche.dbName)
    .order('followers_count', { ascending: false })
    .limit(60);

  const list = accounts || [];
  const enriched = list.filter((a) => Number(a.followers_count || 0) > 0);
  const avgER =
    enriched.length > 0
      ? (enriched.reduce((sum, a) => sum + Number(a.engagement_rate || 0), 0) / enriched.length).toFixed(2)
      : '2.40';
  const avgAdPct =
    enriched.length > 0
      ? Math.round(enriched.reduce((sum, a) => sum + Number(a.ad_saturation_pct || 0), 0) / enriched.length)
      : 19;

  const nichePartner = getDynamicAffiliateRecommendation({
    niche: niche.dbName,
    engagement_rate: Number(avgER),
    ad_saturation_pct: avgAdPct,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
          <BarChart3 className="w-4 h-4" /> 2026 Industry Benchmark Report
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          {niche.title} <span className="text-rose-500">Instagram X-Ray Index</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {niche.summary}
        </p>
      </div>

      {/* Niche Benchmark Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 block">Tracked Accounts</span>
          <span className="text-2xl font-extrabold text-white mt-1 block">{list.length} Profiles</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 block">Niche Avg. Engagement Rate</span>
          <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">{avgER}%</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 block">Niche Avg. Ad Saturation</span>
          <span className="text-2xl font-extrabold text-amber-400 mt-1 block">{avgAdPct}%</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4">Creator / Brand</th>
                <th className="p-4">Followers</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Ad Load</th>
                <th className="p-4">Primary Monetization / Funnel</th>
                <th className="p-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {list.map((acc) => {
                const isReady = Number(acc.followers_count || 0) > 0;
                return (
                  <tr key={acc.username} className="hover:bg-slate-950/50 transition">
                    <td className="p-4">
                      <a href={`/audit/${acc.username}`} className="font-bold text-white hover:text-rose-400 block">
                        @{acc.username}
                      </a>
                      <span className="text-xs text-slate-400">{acc.display_name}</span>
                    </td>
                    <td className="p-4 text-slate-200 font-medium">
                      {isReady ? Number(acc.followers_count).toLocaleString() : 'Live on Click'}
                    </td>
                    <td className="p-4 font-bold text-emerald-400">
                      {isReady ? `${acc.engagement_rate}%` : '—'}
                    </td>
                    <td className="p-4 font-bold text-amber-400">
                      {isReady ? `${acc.ad_saturation_pct}%` : '—'}
                    </td>
                    <td className="p-4 text-xs text-slate-300 max-w-xs truncate">
                      {acc.funnel_stack?.bio_platform || acc.funnel_stack?.primary_offer || 'Creator / Brand'}
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={`/audit/${acc.username}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-white text-xs font-semibold transition"
                      >
                        X-Ray <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Niche-Specific Recommended SaaS Partner Card */}
      <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-950 border border-sky-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {nichePartner.badge}
            </span>
            <span className="text-[11px] text-slate-500">Top {niche.title} Growth Stack</span>
          </div>
          <h3 className="text-base font-bold text-white">{nichePartner.headline}</h3>
          <p className="text-xs text-slate-400 max-w-2xl">{nichePartner.description}</p>
        </div>
        <a
          href={nichePartner.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold whitespace-nowrap inline-flex items-center gap-1.5 transition shrink-0"
        >
          {nichePartner.ctaText}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Cross-Link Other Niche Indexes */}
      <div className="border-t border-slate-800 pt-8">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-rose-400" /> Explore All 10 Industry Benchmark Indexes
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(NICHE_MAP).map(([key, val]) => (
            <a
              key={key}
              href={`/niche/${key}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                key === slug
                  ? 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
              }`}
            >
              {val.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
