import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe verification is not configured yet.' }, { status: 500 });
    }

    // 1. Look up Stripe customer by checkout email
    const custRes = await fetch(
      `https://api.stripe.com/v1/customers?email=${encodeURIComponent(cleanEmail)}&limit=5`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );
    const custData = await custRes.json();
    const customers = custData?.data || [];

    if (customers.length === 0) {
      return NextResponse.json(
        { error: 'No subscription found for that email. Ensure you use the exact email entered at Stripe checkout.' },
        { status: 404 }
      );
    }

    // 2. Check if any matching customer has an active or trialing subscription
    for (const customer of customers) {
      const subRes = await fetch(
        `https://api.stripe.com/v1/subscriptions?customer=${customer.id}&status=all&limit=5`,
        { headers: { Authorization: `Bearer ${stripeKey}` } }
      );
      const subData = await subRes.json();
      const activeSub = (subData?.data || []).find(
        (s: any) => s.status === 'active' || s.status === 'trialing'
      );

      if (activeSub) {
        return NextResponse.json({
          unlocked: true,
          plan: activeSub.items?.data?.[0]?.price?.unit_amount >= 4900 ? 'Agency' : 'Solo',
        });
      }
    }

    return NextResponse.json(
      { error: 'Your subscription is inactive or canceled. Reactivate via Manage Subscription in the footer.' },
      { status: 403 }
    );
  } catch {
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 });
  }
}
