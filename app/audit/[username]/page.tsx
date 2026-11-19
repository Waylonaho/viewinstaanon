import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import DossierClient from '@/components/DossierClient';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const clean = params.username.toLowerCase();
  const { data: audit } = await supabaseAdmin
    .from('audits')
    .select('username, display_name, niche, followers_count, engagement_rate, ad_saturation_pct')
    .eq('username', clean)
    .single();

  if (!audit) {
    return { title: `@${clean} Instagram Audit & X-Ray`, robots: { index: false, follow: true } };
  }

  const isEnriched = Number(audit.followers_count || 0) > 0;

  return {
    title: `@${audit.username} Instagram X-Ray: ${audit.engagement_rate}% ER, Sponsors & Viral Hooks`,
    description: `Forensic Instagram audit for ${audit.display_name} (@${audit.username}). View ${audit.ad_saturation_pct}% ad saturation breakdown, top viral Reel hooks, and bio funnel tech stack.`,
    robots: isEnriched ? { index: true, follow: true } : { index: false, follow: true },
    alternates: {
      canonical: `https://viewinstaanon.com/audit/${audit.username}`,
    },
  };
}

export default async function AuditDossierPage({ params }: Props) {
  const clean = params.username.toLowerCase();

  let { data: audit } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('username', clean)
    .single();

  if (!audit) {
    notFound();
  }

  // Auto-enrich seeded stub on first real visitor view
  if (Number(audit.followers_count || 0) === 0) {
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://viewinstaanon.com';
      const res = await fetch(`${baseUrl}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: clean, forceRefresh: true }),
        cache: 'no-store',
      });
      if (res.ok) {
        const refreshed = await res.json();
        if (refreshed.audit) audit = refreshed.audit;
      }
    } catch {
      // Fallback gracefully to stub if rate-limited
    }
  }

  const { data: related } = await supabaseAdmin
    .from('audits')
    .select('username, engagement_rate')
    .eq('niche', audit.niche)
    .neq('username', clean)
    .limit(6);

  return <DossierClient audit={audit} relatedAudits={related || []} />;
}
