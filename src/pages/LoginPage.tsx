import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login, customer, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && customer) {
    return <Navigate to="/account" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await login(email.trim(), password)
      const from = (location.state as { from?: string } | null)?.from || '/account'
      navigate(from)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-teal">Log in</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Access your SRI VPN account and orders.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-2xl border border-teal/10 bg-white p-6 shadow-sm"
        >
          {error && (
            <p
              className="rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta"
              role="alert"
            >
              {error}
            </p>
          )}
          <label className="block text-sm font-medium text-ink">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-teal/15 bg-cream px-3 py-2.5 text-ink outline-none focus:border-teal-light"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-teal/15 bg-cream px-3 py-2.5 text-ink outline-none focus:border-teal-light"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-teal py-3 text-sm font-semibold text-cream hover:bg-teal-mid disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Log in'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-ink-muted">
          No account?{' '}
          <Link to="/register" className="font-semibold text-teal hover:underline">
            Register
          </Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
