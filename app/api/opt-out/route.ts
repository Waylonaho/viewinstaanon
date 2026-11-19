import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    const clean = (username || '').trim().replace(/^@/, '').toLowerCase();

    if (!clean) {
      return NextResponse.json({ error: 'Please enter a valid handle.' }, { status: 400 });
    }

    await supabaseAdmin.from('audits').delete().eq('username', clean);

    return NextResponse.json({
      success: true,
      message: `@${clean} has been removed from our public index.`,
    });
  } catch {
    return NextResponse.json({ error: 'Removal request failed. Please try again.' }, { status: 500 });
  }
}
