import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://viewinstaanon.com';

  const nicheSlugs = [
    'd2c-fitness-supplements',
    'skincare-beauty-cosmetics',
    'b2b-saas-ai-tools',
    'ecommerce-fashion-apparel',
    'personal-finance-investing',
    'real-estate-architecture',
    'food-beverage-coffee-brands',
    'pet-care-accessories',
    'digital-marketing-growth-agencies',
    'productivity-creator-economy-educators',
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/vs/hypeauditor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/vs/modash`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/vs/sprout-social`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/vs/social-blade`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/tools/bio-grader`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/safe-zone`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/utm-stripper`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...nicheSlugs.map((slug) => ({
      url: `${baseUrl}/niche/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/opt-out`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // ANTI-SPAM FILTER: Only include enriched profiles with real metrics in sitemap.xml
  const { data: audits } = await supabaseAdmin
    .from('audits')
    .select('username, updated_at')
    .gt('followers_count', 0)
    .order('updated_at', { ascending: false })
    .limit(5000);

  const dynamicRoutes: MetadataRoute.Sitemap = (audits || []).map((row) => ({
    url: `${baseUrl}/audit/${row.username}`,
    lastModified: row.updated_at ? new Date(row.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
