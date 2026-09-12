import { Link } from 'react-router-dom'

export function FinalCta() {
  return (
    <section id="cta" className="scroll-mt-20 border-b border-cream-dark" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-teal px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-light/40 blur-2xl"
            aria-hidden="true"
          />
          <h2
            id="cta-heading"
            className="relative font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl"
          >
            Ready for a private connection?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-cream/80">
            Create an account, pick a plan priced in LKR, and place a demo order backed by
            SQLite.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-amber-deep hover:text-cream"
            >
              Create free account
            </Link>
            <a
              href="#plans"
              className="inline-flex rounded-full border border-cream/30 px-6 py-3.5 text-sm font-semibold text-cream hover:bg-teal-mid"
            >
              Compare plans
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
