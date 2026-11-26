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
  systemeio: 'https://systeme.io/?sa=sa02874346577ecdf7d2ebeec92b6f306457f0e666',
  beacons: 'https://beacons.ai/signup?c=viewinstaanon',
  // Pending PartnerStack approvals (currently routed to active fallbacks):
  manychat: 'https://systeme.io/?sa=sa02874346577ecdf7d2ebeec92b6f306457f0e666',
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
  const bioPlatform = (audit.funnel_stack?.bio_platform || '').toLowerCase();
  const primaryOffer = (audit.funnel_stack?.primary_offer || '').toLowerCase();

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

  // 2. Coaches, courses, fitness, skincare, or digital product funnels -> Systeme.io (60% lifetime recurring)
  if (
    primaryOffer.includes('course') ||
    primaryOffer.includes('coaching') ||
    primaryOffer.includes('funnel') ||
    niche.includes('fitness') ||
    niche.includes('skincare') ||
    niche.includes('coaching')
  ) {
    return {
      partnerName: 'Systeme.io',
      badge: 'All-in-One Funnel & Course Engine',
      headline: 'Launch High-Converting Sales Funnels, Courses & Email Automation Free',
      description:
        'Replace fragmented bio tools with a single funnel builder, digital storefront, and automated email sequence engineered for creator monetization.',
      ctaText: 'Build Free Funnel on Systeme.io',
      url: AFFILIATE_LINKS.systemeio,
    };
  }

  // 3. Finance, B2B SaaS, or Creator Economy educators -> Beehiiv (50%-60% recurring)
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

  // 4. Weak or missing link-in-bio storefront -> Beacons.ai
  if (
    !bioPlatform ||
    bioPlatform.includes('none') ||
    bioPlatform.includes('direct') ||
    bioPlatform.includes('linktr.ee')
  ) {
    return {
      partnerName: 'Beacons.ai',
      badge: 'Creator Storefront & Media Kit',
      headline: 'Upgrade Your Link-in-Bio Into a Monetized Creator Storefront',
      description:
        'Capture brand deals with an auto-updating media kit, sell digital downloads, and convert profile visitors on mobile in minutes.',
      ctaText: 'Claim Free Beacons Storefront',
      url: AFFILIATE_LINKS.beacons,
    };
  }

  // 5. Strong viral Reel outliers or high engagement -> OpusClip (25% recurring)
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

  // 6. Default growth, scheduling & competitor reporting -> Metricool (25%-50% recurring)
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
