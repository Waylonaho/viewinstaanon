import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Allow up to 60 seconds on Vercel to process parallel batches cleanly
export const maxDuration = 60;

const PRIORITY_HANDLES = [
  'hormozi',
  'cbum',
  'nike',
  'hubspot',
  'aliabdaal',
  'garyvee',
  'thedankoe',
  'zara',
  'gymshark',
  'jeffnippard',
  'patmcgrathreal',
  'sephora',
  'shopify',
  'notionhq',
  'canva',
  'semrush',
  'liquiddeath',
  'mrbeast',
  'lewishowes',
  'codie_sanchez',
];

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') || 20), 25);

  // 1. Check which priority handles are still unenriched (followers_count = 0)
  const { data: unenrichedPriority } = await supabaseAdmin
    .from('audits')
    .select('username')
    .in('username', PRIORITY_HANDLES)
    .eq('followers_count', 0);

  let targets = (unenrichedPriority || []).map((r) => r.username);

  // 2. If priority handles are already done, grab the next unenriched seed accounts
  if (targets.length < limit) {
    const remaining = limit - targets.length;
    const { data: extraRows } = await supabaseAdmin
      .from('audits')
      .select('username')
      .eq('followers_count', 0)
      .limit(remaining);

    const extraHandles = (extraRows || [])
      .map((r) => r.username)
      .filter((u) => !targets.includes(u));

    targets = [...targets, ...extraHandles];
  }

  targets = targets.slice(0, limit);

  if (targets.length === 0) {
    return NextResponse.json({
      success: true,
      message: 'All seeded accounts are already enriched!',
      enriched: [],
    });
  }

  const baseUrl = req.nextUrl.origin;
  const results: { username: string; status: string }[] = [];

  // 3. Run in parallel chunks of 5 so ScrapeCreators + Gemini finish fast without rate limits
  const chunkSize = 5;
  for (let i = 0; i < targets.length; i += chunkSize) {
    const chunk = targets.slice(i, i + chunkSize);

    const chunkOutcomes = await Promise.all(
      chunk.map(async (username) => {
        try {
          const res = await fetch(`${baseUrl}/api/audit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, forceRefresh: true }),
          });
          return { username, status: res.ok ? 'enriched' : `failed (${res.status})` };
        } catch {
          return { username, status: 'error' };
        }
      })
    );

    results.push(...chunkOutcomes);
  }

  return NextResponse.json({
    success: true,
    processed_count: results.length,
    results,
  });
}
