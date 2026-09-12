import { useCallback, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { api, formatLkr, type Order } from '../lib/api'

export function AccountPage() {
  const { customer, loading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<number | null>(null)

  const loadOrders = useCallback(async () => {
    try {
      const { orders: data } = await api.myOrders()
      setOrders(data)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load orders')
    }
  }, [])

  useEffect(() => {
    if (customer) void loadOrders()
  }, [customer, loadOrders])

  async function markPaid(id: number) {
    setBusyId(id)
    try {
      await api.payOrder(id)
      await loadOrders()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment update failed')
    } finally {
      setBusyId(null)
    }
  }

  if (loading) {
    return (
      <>
        <Nav />
        <main className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-ink-muted">Loading…</p>
        </main>
      </>
    )
  }

  if (!customer) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-teal">My account</h1>
        <p className="mt-2 text-ink-muted">
          Signed in as <span className="font-medium text-ink">{customer.email}</span>
        </p>

        <div className="mt-8 rounded-2xl border border-teal/10 bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-teal">Profile</h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-muted">Name</dt>
              <dd className="font-medium text-ink">{customer.name}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Email</dt>
              <dd className="font-medium text-ink">{customer.email}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-semibold text-teal">Orders</h2>
            <Link to="/#plans" className="text-sm font-semibold text-teal hover:underline">
              Browse plans
            </Link>
          </div>
          {error && (
            <p className="mt-3 rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
              {error}
            </p>
          )}
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">
              No orders yet.{' '}
              <Link to="/#plans" className="font-semibold text-teal hover:underline">
                Choose a plan
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-col gap-3 rounded-xl border border-teal/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-ink">
                      #{o.id} · {o.planName}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {formatLkr(o.amountLkr)} · {o.status} ·{' '}
                      {new Date(o.createdAt + 'Z').toLocaleString()}
                    </p>
                  </div>
                  {o.status === 'pending' && (
                    <button
                      type="button"
                      disabled={busyId === o.id}
                      onClick={() => void markPaid(o.id)}
                      className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-cream hover:bg-teal-mid disabled:opacity-60"
                    >
                      {busyId === o.id ? 'Updating…' : 'Mark as paid (mock)'}
                    </button>
                  )}
                  {o.status === 'paid' && (
                    <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold text-teal">
                      Config placeholder ready
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
