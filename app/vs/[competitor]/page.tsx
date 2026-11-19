import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const COMPETITORS: Record<string, {
  name: string;
  price: string;
  tagline: string;
  painPoint: string;
  rows: { feature: string; us: string; them: string }[];
}> = {
  hypeauditor: {
    name: 'HypeAuditor',
    price: '$299+/mo',
    tagline: 'Zero-Login HypeAuditor Alternative for Brand Buyers & Agencies',
    painPoint: 'HypeAuditor locks basic influencer vetting behind annual enterprise contracts and aggressive sales demos. ViewInstaAnon gives you instant sponsorship saturation, brand conflict logs, and viral hook breakdowns for $0 to start—and $19/mo for unlimited access.',
    rows: [
      { feature: 'Starting Price', us: 'Free ($19/mo Unlimited)', them: '$299+/month (Annual Contract)' },
      { feature: 'Account / Sales Call Required', us: 'Zero Login, Instant Access', them: 'Mandatory Sales Demo' },
      { feature: 'Ad Saturation & Promo Code X-Ray', us: 'Included on Every Audit', them: 'Enterprise Tier Only' },
      { feature: 'AI Viral Outlier Hook Templates', us: 'Included', them: 'Not Available' },
      { feature: 'Link-in-Bio & ManyChat Funnel Spy', us: 'Included', them: 'Not Available' },
      { feature: 'White-Label Client Audit PDFs', us: '$49/mo Agency Plan', them: '$499+/mo Enterprise' },
    ],
  },
  modash: {
    name: 'Modash',
    price: '$199+/mo',
    tagline: 'Lightweight Modash Alternative Built for Rapid Creator Vetting',
    painPoint: 'Modash is built for massive enterprise rosters, forcing smaller agencies and D2C brands to pay $2,400+/year for features they rarely touch. Run instant side-by-side creator comparisons and spot competing brand deals in seconds.',
    rows: [
      { feature: 'Monthly Cost', us: 'Free / $19 Solo / $49 Agency', them: '$199–$299/month' },
      { feature: 'Zero-Footprint Public Lookup', us: '100% Anonymous, No Login', them: 'Account & Seat Limits' },
      { feature: 'Competing Sponsor Conflict Log', us: 'Instant AI Extraction', them: 'Manual Feed Scrolling' },
      { feature: 'Side-by-Side Creator Comparison', us: 'Free Head-to-Head Tool', them: 'Paid Seat Required' },
      { feature: 'ManyChat DM Funnel Detection', us: 'Automatic', them: 'Not Available' },
    ],
  },
  'sprout-social': {
    name: 'Sprout Social',
    price: '$249/seat/mo',
    tagline: 'Zero-Login Instagram Competitor Analysis Without Sprout Social',
    painPoint: 'Sprout Social requires connecting your own Meta business tokens via OAuth and charges per user seat. ViewInstaAnon lets your entire marketing team reverse-engineer competitor Reel hooks and bio funnels without connecting a single social account.',
    rows: [
      { feature: 'OAuth / Meta Login Required', us: 'Never (100% Zero-Login)', them: 'Mandatory Meta Connection' },
      { feature: 'Pricing Model', us: '$19/mo Flat (No Seat Fees)', them: '$249 per user / month' },
      { feature: '3x+ Outlier Reel Hook Templates', us: 'AI-Generated on Every Scan', them: 'Raw Engagement Charts Only' },
      { feature: 'Bio Tech Stack & Funnel Spy', us: 'Included', them: 'Not Available' },
      { feature: 'Setup Time', us: '5 Seconds', them: 'Days of Onboarding' },
    ],
  },
  'social-blade': {
    name: 'Social Blade',
    price: 'Legacy UI',
    tagline: 'Modern Social Blade Alternative With AI Monetization & Hook X-Ray',
    painPoint: 'Social Blade only shows raw follower deltas—it cannot tell you how a creator makes money, which brands sponsor them, or which Reel hooks drove their viral spikes. ViewInstaAnon turns public profile data into actionable B2B intelligence.',
    rows: [
      { feature: 'Sponsorship & Affiliate X-Ray', us: 'Full Brand & Code Detection', them: 'Not Available' },
      { feature: 'AI Outlier Hook Breakdowns', us: '3x+ Outlier Templates', them: 'Not Available' },
      { feature: 'Bio Funnel & DM Trigger Spy', us: 'Stan Store / ManyChat Detection', them: 'Not Available' },
      { feature: 'White-Label Client Pitch PDFs', us: '1-Click Export', them: 'Cluttered Ad-Heavy Pages' },
      { feature: 'User Interface', us: 'Clean Dark-Mode B2B Suite', them: '2012 Legacy Tables' },
    ],
  },
};

type Props = { params: { competitor: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = COMPETITORS[params.competitor.toLowerCase()];
  if (!data) return { title: 'Competitor Comparison' };

  return {
    title: `${data.name} Alternative (2026) — ${data.tagline}`,
    description: data.painPoint,
    alternates: { canonical: `https://viewinstaanon.com/vs/${params.competitor.toLowerCase()}` },
  };
}

export default function CompetitorVsPage({ params }: Props) {
  const data = COMPETITORS[params.competitor.toLowerCase()];
  if (!data) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" /> ViewInstaAnon vs. {data.name}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          The Best Free & Affordable <span className="text-rose-500">{data.name} Alternative</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {data.painPoint}
        </p>
      </div>

      {/* Comparison Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400">Capability</th>
                <th className="p-4 text-sm font-extrabold text-rose-400">ViewInstaAnon</th>
                <th className="p-4 text-sm font-bold text-slate-400">{data.name} ({data.price})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {data.rows.map((row, i) => (
                <tr key={i}>
                  <td className="p-4 font-medium text-slate-200">{row.feature}</td>
                  <td className="p-4 font-bold text-emerald-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0" /> {row.us}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <X className="w-4 h-4 text-slate-600 shrink-0" /> {row.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Action Box */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-2">Test Drive ViewInstaAnon Free — Zero Login</h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-xl mx-auto">
          Run your first forensic creator or brand X-Ray right now. No credit card, no sales call, and no Instagram account connection required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="/"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition"
          >
            Run Free Instagram X-Ray <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/compare"
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Compare 2 Creators Side-by-Side
          </a>
        </div>
      </div>
    </div>
  );
}
