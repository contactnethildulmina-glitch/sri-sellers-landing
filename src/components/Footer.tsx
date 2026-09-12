export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cream" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-xs font-bold text-cream"
              aria-hidden="true"
            >
              S
            </span>
            <span className="font-display text-base font-semibold text-teal">
              SRI Sellers
            </span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            A Sri Lanka–focused platform for sellers to open a shop and list products
            with confidence.
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
              <a href="#how-it-works" className="text-ink-muted hover:text-teal">
                How it works
              </a>
            </li>
            <li>
              <a href="#who-its-for" className="text-ink-muted hover:text-teal">
                Who it’s for
              </a>
            </li>
            <li>
              <a href="#cta" className="text-ink-muted hover:text-teal">
                Early access
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream-dark">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} SRI Sellers. All rights reserved.</p>
          <p>Made for sellers across Sri Lanka.</p>
        </div>
      </div>
    </footer>
  )
}
