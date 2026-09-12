const features = [
  {
    title: 'Fast encrypted tunnels',
    body: 'Modern protocols designed for everyday browsing, streaming, and work — without bloated apps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Strong privacy defaults',
    body: 'Traffic is wrapped in encryption so public Wi‑Fi and shared networks are less of a gamble.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Servers where you need them',
    body: 'Pick locations that fit travel, work, or local access patterns. Expand nodes as demand grows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M4.5 12h15M12 4.5c2.5 2.8 2.5 12.2 0 15M12 4.5c-2.5 2.8-2.5 12.2 0 15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Clear LKR pricing',
    body: 'Monthly, quarterly, and yearly plans with transparent Sri Lankan Rupee prices — no surprise fees on the page.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: 'Multi-device ready',
    body: 'Higher tiers unlock more simultaneous devices so phones, laptops, and tablets stay covered.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M11 17h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Honest product claims',
    body: 'We do not invent third-party audits or miracle speeds. Marketing stays grounded; the storefront is the demo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 8v4.5M12 16h.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-b border-cream-dark"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-deep">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-teal sm:text-4xl"
          >
            Built for everyday privacy
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Speed, security, and simple subscriptions — marketed clearly for customers in
            Sri Lanka and anyone who prefers LKR billing.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-teal/8 bg-white p-6 shadow-sm transition hover:border-teal/15 hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage text-teal">
                {feature.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-teal">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
