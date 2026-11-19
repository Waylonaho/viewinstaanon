export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-4">Terms of Service</h1>
      <p className="text-slate-400 text-xs mb-8">Last Updated: {new Date().getFullYear()}</p>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ViewInstaAnon (viewinstaanon.com), you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Permitted B2B & Research Use</h2>
          <p>
            ViewInstaAnon is designed for lawful market research, brand safety vetting, competitive analysis, and content strategy. You agree not to use automated bots to scrape our endpoints or use data obtained from the platform for harassment, spam, or unauthorized resale.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Subscriptions & Cancellations</h2>
          <p>
            Paid Solo and Agency passes are billed monthly via Stripe. You may cancel or modify your subscription at any time with one click through the Stripe Customer Portal linked in the site footer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">4. Platform Independence</h2>
          <p>
            ViewInstaAnon is an independent software utility and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc. or Instagram.
          </p>
        </section>
      </div>
    </div>
  );
}
