import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cream" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-xs font-bold text-cream"
              aria-hidden="true"
            >
              V
            </span>
            <span className="font-display text-base font-semibold text-teal">SRI VPN</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            A Sri Lanka–friendly VPN subscription storefront with real SQLite-backed plans,
            customers, and orders.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a href="#features" className="text-ink-muted hover:text-teal">
                Features
              </a>
            </li>
            <li>
              <a href="#plans" className="text-ink-muted hover:text-teal">
                Plans
              </a>
            </li>
            <li>
              <a href="#faq" className="text-ink-muted hover:text-teal">
                FAQ
              </a>
            </li>
            <li>
              <Link to="/login" className="text-ink-muted hover:text-teal">
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} SRI VPN. All rights reserved.</p>
          <p>Sales demo — no live VPN provisioning.</p>
        </div>
      </div>
    </footer>
  )
}
