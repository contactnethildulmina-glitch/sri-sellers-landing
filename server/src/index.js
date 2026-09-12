import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { z } from 'zod'
import db, { initSchema, seedPlans } from './db.js'
import { hashPassword, verifyPassword, signToken, authRequired } from './auth.js'

initSchema()
seedPlans()

const app = express()
const PORT = Number(process.env.PORT) || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: CORS_ORIGIN.split(',').map((s) => s.trim()),
    credentials: true,
  }),
)
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'sri-vpn-api' })
})

app.get('/api/plans', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT id, name, price_lkr AS priceLkr, duration_days AS durationDays,
              features_json AS featuresJson, active
       FROM plans WHERE active = 1 ORDER BY duration_days ASC`,
    )
    .all()
  const plans = rows.map((r) => ({
    id: r.id,
    name: r.name,
    priceLkr: r.priceLkr,
    durationDays: r.durationDays,
    features: JSON.parse(r.featuresJson),
    active: Boolean(r.active),
  }))
  res.json({ plans })
})

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
})

app.post('/api/auth/register', (req, res) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  }
  const { name, email, password } = parsed.data
  const existing = db.prepare('SELECT id FROM customers WHERE email = ? COLLATE NOCASE').get(email)
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' })
  }
  const passwordHash = hashPassword(password)
  const result = db
    .prepare('INSERT INTO customers (name, email, password_hash) VALUES (?, ?, ?)')
    .run(name, email.toLowerCase(), passwordHash)
  const customer = { id: Number(result.lastInsertRowid), name, email: email.toLowerCase() }
  const token = signToken({ sub: customer.id, email: customer.email })
  res.status(201).json({ token, customer })
})

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(128),
})

app.post('/api/auth/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' })
  }
  const { email, password } = parsed.data
  const row = db
    .prepare('SELECT id, name, email, password_hash FROM customers WHERE email = ? COLLATE NOCASE')
    .get(email)
  if (!row || !verifyPassword(password, row.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }
  const customer = { id: row.id, name: row.name, email: row.email }
  const token = signToken({ sub: customer.id, email: customer.email })
  res.json({ token, customer })
})

app.get('/api/auth/me', authRequired, (req, res) => {
  const row = db
    .prepare('SELECT id, name, email, created_at AS createdAt FROM customers WHERE id = ?')
    .get(req.user.id)
  if (!row) return res.status(404).json({ error: 'Customer not found' })
  res.json({ customer: row })
})

const orderSchema = z.object({
  planId: z.number().int().positive(),
})

app.post('/api/orders', authRequired, (req, res) => {
  const parsed = orderSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  }
  const plan = db
    .prepare('SELECT id, name, price_lkr FROM plans WHERE id = ? AND active = 1')
    .get(parsed.data.planId)
  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' })
  }
  const result = db
    .prepare(
      `INSERT INTO orders (customer_id, plan_id, amount_lkr, status)
       VALUES (?, ?, ?, 'pending')`,
    )
    .run(req.user.id, plan.id, plan.price_lkr)

  const order = {
    id: Number(result.lastInsertRowid),
    customerId: req.user.id,
    planId: plan.id,
    planName: plan.name,
    amountLkr: plan.price_lkr,
    status: 'pending',
  }
  res.status(201).json({
    order,
    message:
      'Order created with status pending. Payment is manual/mock — mark as paid offline for demo.',
  })
})

app.get('/api/orders/me', authRequired, (req, res) => {
  const rows = db
    .prepare(
      `SELECT o.id, o.plan_id AS planId, p.name AS planName, o.amount_lkr AS amountLkr,
              o.status, o.created_at AS createdAt
       FROM orders o
       JOIN plans p ON p.id = o.plan_id
       WHERE o.customer_id = ?
       ORDER BY o.created_at DESC`,
    )
    .all(req.user.id)
  res.json({ orders: rows })
})

/** Demo helper: mark own order as paid (mock payment) */
app.post('/api/orders/:id/pay', authRequired, (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid order id' })
  }
  const order = db
    .prepare('SELECT id, customer_id, status FROM orders WHERE id = ?')
    .get(id)
  if (!order || order.customer_id !== req.user.id) {
    return res.status(404).json({ error: 'Order not found' })
  }
  if (order.status !== 'pending') {
    return res.status(400).json({ error: `Order is already ${order.status}` })
  }
  db.prepare(`UPDATE orders SET status = 'paid' WHERE id = ?`).run(id)
  res.json({ ok: true, orderId: id, status: 'paid' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`SRI VPN API listening on http://localhost:${PORT}`)
})
