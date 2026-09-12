import { Link } from 'react-router-dom'

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
            Privacy for Sri Lanka &amp; beyond
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-[1.15] tracking-tight text-teal sm:text-5xl lg:text-[3.25rem]"
          >
            Browse privately.
            <span className="block text-amber-deep">Connect securely with SRI VPN.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Encrypted tunnels, clear LKR pricing, and a simple subscription storefront —
            built for people who want a trustworthy VPN without the noise. No fake audit
            badges. Just a clean path to subscribe.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#plans"
              className="inline-flex items-center justify-center rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-cream shadow-md transition hover:bg-teal-mid"
            >
              View plans
            </a>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-teal/20 bg-white px-6 py-3.5 text-sm font-semibold text-teal transition hover:border-teal/40 hover:bg-cream-dark/50"
            >
              Create account
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Demo storefront + SQLite orders. Config download is a placeholder for now.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-teal/10 bg-white p-5 shadow-xl shadow-teal/5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                  Connection status
                </p>
                <p className="font-display text-lg font-semibold text-teal">Protected tunnel</p>
              </div>
              <span className="rounded-full bg-sage px-2.5 py-1 text-xs font-semibold text-teal">
                Encrypted
              </span>
            </div>
            <ul className="space-y-3" aria-label="VPN highlights">
              {[
                { label: 'Protocol', value: 'WireGuard-ready*' },
                { label: 'Encryption', value: 'AES-256 / modern ciphers' },
                { label: 'Servers', value: 'Regional + global nodes*' },
                { label: 'Billing', value: 'Simple LKR plans' },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-cream px-3 py-3"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal"
                    aria-hidden="true"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ink-muted">{item.label}</p>
                    <p className="truncate text-sm font-semibold text-ink">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-ink-muted">
              *Illustrative product UI — sales demo, not live VPN provisioning
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
