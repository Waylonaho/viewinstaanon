export interface AffiliateRecommendation {
  partnerName: string;
  badge: string;
  headline: string;
  description: string;
  ctaText: string;
  url: string;
}

// Replace these default URLs with your tracked PartnerStack / Impact / direct links as each approves
export const AFFILIATE_LINKS = {
  manychat: 'https://manychat.com',
  beehiiv: 'https://www.beehiiv.com',
  stanstore: 'https://www.stan.store',
  metricool: 'https://metricool.com',
  opusclip: 'https://www.opus.pro',
};

export function getDynamicAffiliateRecommendation(audit: {
  niche?: string;
  engagement_rate?: number;
  ad_saturation_pct?: number;
  funnel_stack?: {
    bio_platform?: string;
    primary_offer?: string;
    dm_automation_detected?: boolean;
  };
}): AffiliateRecommendation {
  const niche = (audit.niche || '').toLowerCase();
  const bioPlatform = (audit.funnel_stack?.bio_platform || '').toLowerCase();
  const adPct = Number(audit.ad_saturation_pct || 0);
  const er = Number(audit.engagement_rate || 0);

  // 1. Finance, B2B SaaS, or Creator Economy educators -> Beehiiv (50% recurring)
  if (
    niche.includes('finance') ||
    niche.includes('saas') ||
    niche.includes('educator') ||
    niche.includes('productivity')
  ) {
    return {
      partnerName: 'Beehiiv',
      badge: 'Audience Ownership Stack',
      headline: 'Convert Instagram Traffic Into an Owned Newsletter Asset',
      description:
        'Accounts in this vertical see 3x higher LTV when moving followers off rented social algorithms into a monetized newsletter funnel.',
      ctaText: 'Launch Free on Beehiiv',
      url: AFFILIATE_LINKS.beehiiv,
    };
  }

  // 2. Basic Linktree or missing storefront -> Stan Store (20% recurring)
  if (bioPlatform.includes('linktree') || bioPlatform.includes('none') || !bioPlatform) {
    return {
      partnerName: 'Stan Store',
      badge: 'Bio Funnel Upgrade',
      headline: 'Replace Static Link Lists With a 1-Tap Creator Storefront',
      description:
        'This profile is leaving bio clicks on the table. High-converting creators use Stan Store to sell digital guides, coaching, and lead magnets directly inside Instagram.',
      ctaText: 'Try Stan Store Free',
      url: AFFILIATE_LINKS.stanstore,
    };
  }

  // 3. High ad saturation or agency/brand profile -> Metricool (20% lifetime recurring)
  if (adPct >= 25 || niche.includes('agency') || niche.includes('marketing')) {
    return {
      partnerName: 'Metricool',
      badge: 'Agency & Brand Workflow',
      headline: 'Automate Multi-Channel Scheduling & White-Label Reporting',
      description:
        'With heavy promotional cadence detected, managing Reels, carousels, and competitor benchmarks from one dashboard saves 6+ hours per week.',
      ctaText: 'Start Free With Metricool',
      url: AFFILIATE_LINKS.metricool,
    };
  }

  // 4. Default high-engagement / Reel-driven accounts -> ManyChat
  return {
    partnerName: 'ManyChat',
    badge: er >= 2.5 ? 'High-Engagement Bottleneck' : 'DM Funnel Multiplier',
    headline: 'Turn Reel Comments Into Automated DM Leads on Autopilot',
    description:
      'Instead of telling viewers "link in bio," top creators trigger instant automated DMs whenever someone comments a keyword—boosting conversions up to 4x.',
    ctaText: 'Automate DMs With ManyChat',
    url: AFFILIATE_LINKS.manychat,
  };
}
