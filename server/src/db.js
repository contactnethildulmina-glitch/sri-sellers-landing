import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', 'data')
const dbPath = process.env.DB_PATH || path.join(dataDir, 'sri-vpn.db')

fs.mkdirSync(dataDir, { recursive: true })

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price_lkr INTEGER NOT NULL,
      duration_days INTEGER NOT NULL,
      features_json TEXT NOT NULL DEFAULT '[]',
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL REFERENCES customers(id),
      plan_id INTEGER NOT NULL REFERENCES plans(id),
      amount_lkr INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)
}

export function seedPlans() {
  const count = db.prepare('SELECT COUNT(*) AS c FROM plans').get().c
  if (count > 0) return

  const insert = db.prepare(`
    INSERT INTO plans (name, price_lkr, duration_days, features_json, active)
    VALUES (@name, @price_lkr, @duration_days, @features_json, 1)
  `)

  const plans = [
    {
      name: 'Monthly',
      price_lkr: 990,
      duration_days: 30,
      features_json: JSON.stringify([
        'Unlimited bandwidth',
        'All server locations',
        '1 device at a time',
        'AES-256 encryption',
        'Email support',
      ]),
    },
    {
      name: 'Quarterly',
      price_lkr: 2490,
      duration_days: 90,
      features_json: JSON.stringify([
        'Unlimited bandwidth',
        'All server locations',
        '3 devices at a time',
        'AES-256 encryption',
        'Priority email support',
        'Save ~16% vs monthly',
      ]),
    },
    {
      name: 'Yearly',
      price_lkr: 7990,
      duration_days: 365,
      features_json: JSON.stringify([
        'Unlimited bandwidth',
        'All server locations',
        '5 devices at a time',
        'AES-256 encryption',
        'Priority support',
        'Save ~33% vs monthly',
        'Config download placeholder',
      ]),
    },
  ]

  const tx = db.transaction((rows) => {
    for (const row of rows) insert.run(row)
  })
  tx(plans)
}

export default db
