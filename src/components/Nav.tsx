import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const landingLinks = [
  { href: '#features', label: 'Features' },
  { href: '#plans', label: 'Plans' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { customer, logout } = useAuth()
  const location = useLocation()
  const onLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled || open
          ? 'bg-cream/95 shadow-sm backdrop-blur-md'
          : 'bg-cream/80 backdrop-blur-sm'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-offset-4"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-bold text-cream"
            aria-hidden="true"
          >
            V
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-teal">
            SRI VPN
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {onLanding &&
            landingLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {customer ? (
            <>
              <Link
                to="/account"
                className="text-sm font-medium text-ink-muted hover:text-teal"
              >
                {customer.name}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-teal/20 px-4 py-2 text-sm font-semibold text-teal hover:bg-cream-dark/50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink-muted hover:text-teal"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition hover:bg-teal-mid"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-teal md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-cream-dark bg-cream px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {onLanding &&
              landingLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-cream-dark"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            {customer ? (
              <>
                <li>
                  <Link
                    to="/account"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-cream-dark"
                  >
                    My account
                  </Link>
                </li>
                <li className="pt-2">
                  <button
                    type="button"
                    className="block w-full rounded-full border border-teal/20 px-4 py-3 text-center text-sm font-semibold text-teal"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-cream-dark"
                  >
                    Log in
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    to="/register"
                    className="block rounded-full bg-teal px-4 py-3 text-center text-sm font-semibold text-cream"
                  >
                    Get started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}
