export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-invert prose-sm">
      <h1 className="text-3xl font-extrabold text-white mb-4">Privacy Policy</h1>
      <p className="text-slate-400 text-xs mb-8">Last Updated: {new Date().getFullYear()}</p>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Overview & Zero-Login Architecture</h2>
          <p>
            ViewInstaAnon (“we,” “our,” or “us”) operates a B2B competitive intelligence and creator analytics platform at viewinstaanon.com. We never ask for, collect, or store your personal Instagram login credentials.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Publicly Available Information</h2>
          <p>
            Our analytical reports aggregate publicly accessible metadata from public business and creator profiles. We do not access private accounts or non-public personal data. Profile owners may request immediate removal of their cached dossier at any time via our <a href="/opt-out" className="text-rose-400 underline">Opt-Out Portal</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Billing & Payment Data</h2>
          <p>
            All Pro and Agency subscriptions are processed securely by Stripe. We do not store credit card numbers or sensitive banking details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">4. Browser-Based Utilities</h2>
          <p>
            Media uploaded to our Reels Safe-Zone Checker and links pasted into our Tracking Link Cleaner are processed locally inside your browser and are never transmitted to or stored on our servers.
          </p>
        </section>
      </div>
    </div>
  );
}
