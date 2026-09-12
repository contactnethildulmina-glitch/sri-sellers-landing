const features = [
  {
    title: 'Open a shop in minutes',
    body: 'Create your storefront with a clear name, story, and contact details — no technical setup required.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10l2-5h12l2 5M4 10v9a1 1 0 001 1h14a1 1 0 001-1v-9M4 10h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 14h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'List products with ease',
    body: 'Add photos, prices in LKR, stock notes, and categories so buyers find what they need quickly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M3 9h18M8 4v5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Sri Lanka–friendly by design',
    body: 'Copy, currency, and workflows tuned for local sellers — from home kitchens to wholesale traders.',
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
    title: 'Mobile-first selling',
    body: 'Manage listings on the go. Most sellers work from a phone — so the experience starts there.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="7"
          y="3"
          width="10"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M11 17h2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Clear, trustworthy storefronts',
    body: 'Present your brand with a clean layout buyers can trust — no cluttered templates or confusing fees on the page.',
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
    title: 'Grow at your pace',
    body: 'Start with a handful of products. Expand categories as demand grows — without rebuilding everything.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 19V5M4 19h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M8 15l3-4 3 2 4-6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
            Everything you need to sell online
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Practical tools for Sri Lankan sellers — focused on shop setup, listings,
            and a storefront buyers understand.
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
