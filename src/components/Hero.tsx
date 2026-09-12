export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-cream-dark"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage/60 blur-3xl sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-amber/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
            Built for Sri Lankan sellers
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-teal sm:text-5xl lg:text-[3.25rem]"
          >
            Open your shop.
            <span className="block text-amber-deep">Reach buyers across Sri Lanka.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            SRI Sellers helps small and medium businesses set up an online shop, list
            products, and sell with clarity — from Colombo boutiques to regional makers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-cream shadow-md transition hover:bg-teal-mid"
            >
              Start selling
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-teal/20 bg-white px-6 py-3.5 text-sm font-semibold text-teal transition hover:border-teal/40 hover:bg-cream-dark/50"
            >
              Learn more
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            No app store wait. Set up in minutes — when the platform opens.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-teal/10 bg-white p-5 shadow-xl shadow-teal/5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                  Shop preview
                </p>
                <p className="font-display text-lg font-semibold text-teal">
                  Lanka Craft Co.
                </p>
              </div>
              <span className="rounded-full bg-sage px-2.5 py-1 text-xs font-semibold text-teal">
                Live
              </span>
            </div>
            <ul className="space-y-3" aria-label="Example product listings">
              {[
                { name: 'Handloom cotton scarf', price: 'LKR 2,450', tag: 'Apparel' },
                { name: 'Ceylon spice gift set', price: 'LKR 1,890', tag: 'Food' },
                { name: 'Coconut shell bowls (set)', price: 'LKR 3,200', tag: 'Home' },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 rounded-xl bg-cream px-3 py-3"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal"
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="4"
                        y="5"
                        width="16"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      />
                      <path
                        d="M4 15l4-3.5 3 2.5 4-4.5 5 5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                    <p className="text-xs text-ink-muted">{item.tag}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-teal">{item.price}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-ink-muted">
              Illustrative shop — for demonstration only
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
