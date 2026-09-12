const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export type Plan = {
  id: number
  name: string
  priceLkr: number
  durationDays: number
  features: string[]
  active: boolean
}

export type Customer = {
  id: number
  name: string
  email: string
  createdAt?: string
}

export type Order = {
  id: number
  planId: number
  planName: string
  amountLkr: number
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
}

type ApiError = { error: string; details?: unknown }

function getToken(): string | null {
  return localStorage.getItem('sri_vpn_token')
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('sri_vpn_token', token)
  else localStorage.removeItem('sri_vpn_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = (await res.json().catch(() => ({}))) as T & ApiError
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  getPlans: () => request<{ plans: Plan[] }>('/api/plans'),
  register: (body: { name: string; email: string; password: string }) =>
    request<{ token: string; customer: Customer }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; customer: Customer }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  me: () => request<{ customer: Customer }>('/api/auth/me'),
  createOrder: (planId: number) =>
    request<{ order: Order & { customerId: number }; message: string }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    }),
  myOrders: () => request<{ orders: Order[] }>('/api/orders/me'),
  payOrder: (id: number) =>
    request<{ ok: boolean; orderId: number; status: string }>(`/api/orders/${id}/pay`, {
      method: 'POST',
    }),
}

export function formatLkr(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`
}
