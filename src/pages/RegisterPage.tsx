import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useAuth } from '../context/AuthContext'

export function RegisterPage() {
  const { register, customer, loading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
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
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setBusy(true)
    try {
      await register(name.trim(), email.trim(), password)
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-teal">Create account</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Start with an email account, then subscribe to a plan.
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
            Full name
            <input
              type="text"
              required
              minLength={2}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-teal/15 bg-cream px-3 py-2.5 text-ink outline-none focus:border-teal-light"
            />
          </label>
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
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-teal/15 bg-cream px-3 py-2.5 text-ink outline-none focus:border-teal-light"
            />
            <span className="mt-1 block text-xs text-ink-muted">At least 8 characters</span>
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-teal py-3 text-sm font-semibold text-cream hover:bg-teal-mid disabled:opacity-60"
          >
            {busy ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-ink-muted">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-teal hover:underline">
            Log in
          </Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
