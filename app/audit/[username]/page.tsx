import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import DossierClient from '@/components/DossierClient';

type Props = {
  params: { username: string };
};

// Dynamic SEO Metadata for every pSEO /audit/[username] URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const clean = params.username.toLowerCase();
  const { data: audit } = await supabaseAdmin
    .from('audits')
    .select('username, display_name, niche, engagement_rate, ad_saturation_pct')
    .eq('username', clean)
    .single();

  if (!audit) {
    return { title: `@${clean} Instagram Audit & X-Ray` };
  }

  return {
    title: `@${audit.username} Instagram X-Ray: ${audit.engagement_rate}% ER, Sponsors & Viral Hooks`,
    description: `Forensic Instagram audit for ${audit.display_name} (@${audit.username}). View ${audit.ad_saturation_pct}% ad saturation breakdown, top viral Reel hooks, and bio funnel tech stack.`,
    alternates: {
      canonical: `https://viewinstaanon.com/audit/${audit.username}`,
    },
  };
}

export default async function AuditDossierPage({ params }: Props) {
  const clean = params.username.toLowerCase();

  const { data: audit } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('username', clean)
    .single();

  if (!audit) {
    notFound();
  }

  // Fetch 6 related accounts in the same niche for internal SEO link equity
  const { data: related } = await supabaseAdmin
    .from('audits')
    .select('username, engagement_rate')
    .eq('niche', audit.niche)
    .neq('username', clean)
    .limit(6);

  return <DossierClient audit={audit} relatedAudits={related || []} />;
}
