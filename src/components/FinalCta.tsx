export function FinalCta() {
  return (
    <section
      id="cta"
      className="scroll-mt-20 border-b border-cream-dark"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-teal px-6 py-12 text-center sm:px-10 sm:py-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber/20 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-teal-light/40 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2
              id="cta-heading"
              className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl"
            >
              Ready to open your shop?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-cream/80 sm:text-lg">
              Join sellers preparing to list products and reach buyers across Sri Lanka.
              Be first in line when SRI Sellers launches.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@srisellers.lk?subject=Early%20access%20interest"
                className="inline-flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-amber-deep hover:text-cream sm:w-auto"
              >
                Get early access
              </a>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-white/10 sm:w-auto"
              >
                Explore features
              </a>
            </div>
            <p className="mt-4 text-xs text-cream/50">
              Early-access interest only — no account is created from this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
