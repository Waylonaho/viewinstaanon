import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import seedAccounts from '@/data/seed-accounts.json';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!secret || secret !== process.env.ADMIN_SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = seedAccounts.map((acc: any) => ({
    username: acc.username.toLowerCase().trim(),
    display_name: acc.display_name,
    niche: acc.niche,
    bio: `${acc.account_type} in ${acc.niche}. Primary monetization: ${acc.primary_monetization}.`,
    funnel_stack: { primary_offer: acc.primary_monetization },
    // Expired date ensures first real visitor triggers live ScrapeCreators + Gemini X-Ray
    updated_at: '2000-01-01T00:00:00.000Z',
  }));

  const { error } = await supabaseAdmin
    .from('audits')
    .upsert(rows, { onConflict: 'username', ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    seeded_count: rows.length,
    message: 'All 500 accounts seeded into Supabase and live in sitemap.xml!',
  });
}
