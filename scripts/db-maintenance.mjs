const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function runMaintenance() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  // 1. Legitimate read: Count enriched dossiers ready for sitemap/indexing
  const enrichedRes = await fetch(
    `${SUPABASE_URL}/rest/v1/audits?select=username&followers_count=gt.0&limit=10`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'count=exact',
      },
    }
  );

  if (!enrichedRes.ok) {
    throw new Error(`Supabase query failed with status ${enrichedRes.status}`);
  }

  const totalEnriched = enrichedRes.headers.get('content-range') || 'unknown';
  console.log(`Database health check passed. Enriched audits range: ${totalEnriched}`);
}

runMaintenance();
