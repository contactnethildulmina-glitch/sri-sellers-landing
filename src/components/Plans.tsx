import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, formatLkr, type Plan } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [orderingId, setOrderingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const { customer } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { plans: data } = await api.getPlans()
        if (!cancelled) setPlans(data)
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error
              ? e.message
              : 'Could not load plans from Supabase.',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  async function orderPlan(planId: string) {
    setMessage(null)
    if (!customer) {
      navigate('/login', { state: { from: '/', planId } })
      return
    }
    setOrderingId(planId)
    try {
      const { message: msg } = await api.createOrder(planId)
      setMessage(msg)
      navigate('/account')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Order failed')
    } finally {
      setOrderingId(null)
    }
  }

  return (
    <section
      id="plans"
      className="scroll-mt-20 border-b border-cream-dark bg-white/40"
      aria-labelledby="plans-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-deep">
            Pricing
          </p>
          <h2
            id="plans-heading"
            className="mt-2 font-display text-3xl font-semibold tracking-tight text-teal sm:text-4xl"
          >
            Choose a VPN plan
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Plans load from the live Supabase database. Payment status is mock —
            create an order, then confirm payment from your account.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-sm text-ink-muted">Loading plans…</p>
        )}
        {error && (
          <div className="mx-auto mt-10 max-w-lg rounded-xl border border-terracotta/30 bg-terracotta/5 px-4 py-3 text-sm text-terracotta">
            {error}
            <p className="mt-2 text-ink-muted">
              Check <code className="font-mono text-xs">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-mono text-xs">VITE_SUPABASE_ANON_KEY</code>.
            </p>
          </div>
        )}
        {message && !error && (
          <p className="mt-6 text-center text-sm font-medium text-teal">{message}</p>
        )}

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, idx) => {
            const featured = idx === 1
            return (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${
                  featured
                    ? 'border-teal shadow-md ring-1 ring-teal/20'
                    : 'border-teal/10'
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber px-3 py-0.5 text-xs font-bold text-ink">
                    Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-teal">{plan.name}</h3>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">
                  {formatLkr(plan.priceLkr)}
                </p>
                <p className="mt-1 text-sm text-ink-muted">{plan.durationDays} days</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-ink-muted">
                      <span className="mt-0.5 text-teal" aria-hidden="true">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={orderingId === plan.id}
                  onClick={() => void orderPlan(plan.id)}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    featured
                      ? 'bg-teal text-cream hover:bg-teal-mid'
                      : 'border border-teal/20 text-teal hover:bg-cream'
                  } disabled:opacity-60`}
                >
                  {orderingId === plan.id
                    ? 'Placing order…'
                    : customer
                      ? 'Subscribe'
                      : 'Sign in to subscribe'}
                </button>
              </li>
            )
          })}
        </ul>

        {!customer && !loading && !error && (
          <p className="mt-8 text-center text-sm text-ink-muted">
            New here?{' '}
            <Link to="/register" className="font-semibold text-teal hover:underline">
              Create an account
            </Link>{' '}
            first, then pick a plan.
          </p>
        )}
      </div>
    </section>
  )
}
