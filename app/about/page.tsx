export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-white mb-4">About ViewInstaAnon & Editorial Standards</h1>
      <p className="text-slate-400 text-xs mb-8">B2B Creator & Competitor Intelligence Platform</p>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">Our Mission</h2>
          <p>
            ViewInstaAnon provides brand buyers, social media agencies, and D2C growth teams with transparent, zero-login competitive intelligence on public Instagram accounts. Our platform analyzes public engagement baselines, sponsorship saturation, viral outlier hooks, and link-in-bio infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">How We Sustain Our Free Tools</h2>
          <p>
            ViewInstaAnon offers free public profile audits alongside paid Solo and Agency Pro tiers. To keep our core diagnostic tools and browser utilities free for marketers, we participate in select B2B software partner programs (including PartnerStack and Impact).
          </p>
        </section>

        <section id="disclosure" className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
          <h2 className="text-base font-bold text-white mb-2">FTC Affiliate Disclosure</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Some links within our diagnostic recommendations, industry benchmark reports, and comparison guides are affiliate links. If you click through and purchase a subscription to a recommended software platform, ViewInstaAnon may earn a referral commission at zero additional cost to you. We only recommend vetted B2B marketing infrastructure that directly solves bottlenecks identified in our audits.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Partner & Media Inquiries</h2>
          <p>
            For SaaS partnership inquiries, data citations, or press requests, contact our team at{' '}
            <a href="mailto:partners@viewinstaanon.com" className="text-rose-400 underline">
              partners@viewinstaanon.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
