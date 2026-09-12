import { supabase } from './supabase'

export type Plan = {
  id: string
  name: string
  priceLkr: number
  durationDays: number
  features: string[]
  active: boolean
}

export type Customer = {
  id: string
  name: string
  email: string
  createdAt?: string
}

export type Order = {
  id: string
  planId: string
  planName: string
  amountLkr: number
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: string
}

type PlanRow = {
  id: string
  name: string
  price_lkr: number
  duration_days: number
  features: string[] | null
  active: boolean
}

type ProfileRow = {
  id: string
  name: string
  email: string
  created_at?: string
}

type OrderRow = {
  id: string
  plan_id: string
  amount_lkr: number
  status: 'pending' | 'paid' | 'cancelled'
  created_at: string
  plans: { name: string } | { name: string }[] | null
}

function mapPlan(row: PlanRow): Plan {
  return {
    id: row.id,
    name: row.name,
    priceLkr: row.price_lkr,
    durationDays: row.duration_days,
    features: Array.isArray(row.features) ? row.features : [],
    active: row.active,
  }
}

function mapProfile(row: ProfileRow): Customer {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
  }
}

function planNameFromJoin(plans: OrderRow['plans']): string {
  if (!plans) return 'Unknown plan'
  if (Array.isArray(plans)) return plans[0]?.name ?? 'Unknown plan'
  return plans.name
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    planId: row.plan_id,
    planName: planNameFromJoin(row.plans),
    amountLkr: row.amount_lkr,
    status: row.status,
    createdAt: row.created_at,
  }
}

async function requireUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  if (!data.user) throw new Error('Not authenticated')
  return data.user.id
}

export async function fetchProfile(userId: string): Promise<Customer> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, created_at')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (data) return mapProfile(data as ProfileRow)

  // Trigger may lag briefly after signup — fall back to auth user metadata
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError) throw new Error(authError.message)
  const user = authData.user
  if (!user) throw new Error('Profile not found')
  return {
    id: user.id,
    name: (user.user_metadata?.name as string) || user.email || 'User',
    email: user.email || '',
  }
}

export const api = {
  async getPlans(): Promise<{ plans: Plan[] }> {
    const { data, error } = await supabase
      .from('plans')
      .select('id, name, price_lkr, duration_days, features, active')
      .eq('active', true)
      .order('price_lkr', { ascending: true })

    if (error) throw new Error(error.message)
    return { plans: (data as PlanRow[]).map(mapPlan) }
  },

  async createOrder(planId: string): Promise<{ order: Order; message: string }> {
    const userId = await requireUserId()

    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('id, name, price_lkr, active')
      .eq('id', planId)
      .eq('active', true)
      .maybeSingle()

    if (planError) throw new Error(planError.message)
    if (!plan) throw new Error('Plan not found or inactive')

    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_id: userId,
        plan_id: plan.id,
        amount_lkr: plan.price_lkr,
        status: 'pending',
      })
      .select('id, plan_id, amount_lkr, status, created_at, plans(name)')
      .single()

    if (error) throw new Error(error.message)
    const order = mapOrder(data as OrderRow)
    return {
      order,
      message: `Order created for ${order.planName}. Confirm mock payment from your account.`,
    }
  },

  async myOrders(): Promise<{ orders: Order[] }> {
    await requireUserId()
    const { data, error } = await supabase
      .from('orders')
      .select('id, plan_id, amount_lkr, status, created_at, plans(name)')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return { orders: (data as OrderRow[]).map(mapOrder) }
  },

  async payOrder(id: string): Promise<{ ok: boolean; orderId: string; status: string }> {
    const userId = await requireUserId()
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', id)
      .eq('customer_id', userId)
      .eq('status', 'pending')
      .select('id, status')
      .maybeSingle()

    if (error) throw new Error(error.message)
    if (!data) throw new Error('Order not found or already paid')
    return { ok: true, orderId: data.id, status: data.status }
  },
}

export function formatLkr(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`
}
