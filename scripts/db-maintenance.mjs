const rawUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
const SUPABASE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

async function runMaintenance() {
  if (!rawUrl || !SUPABASE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  if (!rawUrl.startsWith('https://') || !rawUrl.includes('.supabase.co')) {
    throw new Error(`Invalid SUPABASE_URL format. Expected https://<project-ref>.supabase.co, got: ${rawUrl}`);
  }

  const endpoint = `${rawUrl}/rest/v1/audits?select=username&followers_count=gt.0&limit=10`;

  const enrichedRes = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'count=exact',
    },
  });

  if (!enrichedRes.ok) {
    const errorBody = await enrichedRes.text();
    throw new Error(`Supabase query failed (${enrichedRes.status}) at ${endpoint}: ${errorBody}`);
  }

  const totalEnriched = enrichedRes.headers.get('content-range') || 'unknown';
  console.log(`Database health check passed. Enriched audits range: ${totalEnriched}`);
}

runMaintenance();
