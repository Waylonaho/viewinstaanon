export interface AffiliateRecommendation {
  partnerName: string;
  badge: string;
  headline: string;
  description: string;
  ctaText: string;
  url: string;
}

export const AFFILIATE_LINKS = {
  metricool: 'https://i.mtr.cool/viewinstaanon',
  hypeauditor: 'https://hypeauditor.com/?source=vviewinstaanon',
  beehiiv: 'https://www.beehiiv.com/?via=waylon-aho',
  opusclip: 'https://opus.pro/?via=waylon',
  // Swap these two once your PartnerStack approvals come through:
  manychat: 'https://i.mtr.cool/viewinstaanon',
  latersocial: 'https://i.mtr.cool/viewinstaanon',
};

export function getDynamicAffiliateRecommendation(audit: {
  niche?: string;
  followers_count?: number;
  engagement_rate?: number;
  ad_saturation_pct?: number;
  outlier_posts?: any[];
  funnel_stack?: {
    bio_platform?: string;
    primary_offer?: string;
    uses_dm_automation?: boolean;
  };
}): AffiliateRecommendation {
  const niche = (audit.niche || '').toLowerCase();
  const followers = Number(audit.followers_count || 0);
  const adPct = Number(audit.ad_saturation_pct || 0);
  const er = Number(audit.engagement_rate || 0);
  const outliers = Array.isArray(audit.outlier_posts) ? audit.outlier_posts : [];

  // 1. High-follower brand/creator vetting or heavy sponsorship saturation -> HypeAuditor (20%-50% commission)
  if (followers >= 100000 || adPct >= 20) {
    return {
      partnerName: 'HypeAuditor',
      badge: 'Enterprise Vetting & Fraud Audit',
      headline: 'Run Deep Audience Authenticity & Multi-Platform Influencer Checks',
      description:
        'Before signing sponsorship retainers on high-reach accounts, verify fake-follower ratios, audience demographics, and historical campaign ROI with HypeAuditor.',
      ctaText: 'Audit Audience on HypeAuditor',
      url: AFFILIATE_LINKS.hypeauditor,
    };
  }

  // 2. Finance, B2B SaaS, or Creator Economy educators -> Beehiiv (50%-60% recurring)
  if (
    niche.includes('finance') ||
    niche.includes('saas') ||
    niche.includes('educator') ||
    niche.includes('investing') ||
    niche.includes('business')
  ) {
    return {
      partnerName: 'Beehiiv',
      badge: 'Audience Ownership Stack',
      headline: 'Convert Instagram Traffic Into an Owned Newsletter Asset',
      description:
        'Accounts in this vertical generate significantly higher LTV when moving followers off rented social algorithms into a monetized newsletter funnel.',
      ctaText: 'Launch Free on Beehiiv',
      url: AFFILIATE_LINKS.beehiiv,
    };
  }

  // 3. Strong viral Reel outliers or high engagement -> OpusClip (25% recurring)
  if (outliers.length >= 2 || er >= 2.5) {
    return {
      partnerName: 'OpusClip',
      badge: 'Viral Reel Multiplier',
      headline: 'Turn Long-Form Videos Into High-Retention Reels in 1 Click',
      description:
        'This account wins with high-velocity short-form hooks. Use AI clipping, dynamic captions, and virality scoring to publish 10x more Reels per week.',
      ctaText: 'Try OpusClip Free',
      url: AFFILIATE_LINKS.opusclip,
    };
  }

  // 4. Default growth, scheduling & competitor reporting -> Metricool (25%-50% recurring)
  return {
    partnerName: 'Metricool',
    badge: 'All-in-One Social & Competitor Suite',
    headline: 'Schedule Reels, Track Competitors & Automate Client Reports',
    description:
      'Manage Instagram publishing, best-time-to-post analytics, and multi-channel competitor benchmarks from a single free dashboard.',
    ctaText: 'Start Free With Metricool',
    url: AFFILIATE_LINKS.metricool,
  };
}
