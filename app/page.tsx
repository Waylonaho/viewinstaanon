import { supabaseAdmin } from '@/lib/supabase';
import HomeSearchClient from '@/components/HomeSearchClient';

export const revalidate = 600; // Refresh featured dossiers every 10 minutes

export default async function HomePage() {
  const { data: featured } = await supabaseAdmin
    .from('audits')
    .select('username, display_name, niche, followers_count, engagement_rate')
    .order('updated_at', { ascending: false })
    .limit(6);

  return <HomeSearchClient featuredAudits={featured || []} />;
}
