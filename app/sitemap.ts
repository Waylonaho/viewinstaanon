import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 3600; // Refresh sitemap every hour automatically

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://viewinstaanon.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/bio-grader`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/safe-zone`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tools/utm-stripper`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/opt-out`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const { data: audits } = await supabaseAdmin
    .from('audits')
    .select('username, updated_at')
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
