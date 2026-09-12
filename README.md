# SRI VPN — Subscription Storefront

Marketing site + Node API for **SRI VPN**: sell VPN subscription plans with a real **SQLite** database (customers, plans, orders).

> **GitHub Pages is static-only.** The live Pages site shows the marketing UI, but register / login / orders need the local (or hosted) API. Full-stack demo = run `server` + Vite locally.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React + TypeScript + Tailwind CSS v4 + React Router |
| Backend | Express + better-sqlite3 + bcryptjs + JWT + Zod |
| DB file | `server/data/sri-vpn.db` |

## Prerequisites

- Node.js 20+
- npm 9+

## Quick start (full stack)

```bash
# From repo root
npm run install:all

# Terminal 1 — API (seeds 3 plans on first boot)
npm run start:server
# → http://localhost:3001

# Terminal 2 — frontend
npm run dev
# → http://localhost:5173/sri-sellers-landing/
```

Optional env for the server (`server/.env`):

```bash
PORT=3001
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES=7d
CORS_ORIGIN=http://localhost:5173
```

Optional frontend env (`.env` at repo root):

```bash
# Defaults to http://localhost:3001 — only set if your API is elsewhere
VITE_API_URL=http://localhost:3001
```

Vite also proxies `/api` → `http://localhost:3001` in dev if you point the client at the same origin.

## Production frontend build

```bash
npm run build
npm run preview
```

`base` is `/sri-sellers-landing/` for GitHub Pages path compatibility.

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| GET | `/api/plans` | — | List active plans (seeded Monthly / Quarterly / Yearly) |
| POST | `/api/auth/register` | — | `{ name, email, password }` → JWT + customer |
| POST | `/api/auth/login` | — | `{ email, password }` → JWT + customer |
| GET | `/api/auth/me` | Bearer | Current customer |
| POST | `/api/orders` | Bearer | `{ planId }` → pending order |
| GET | `/api/orders/me` | Bearer | Current user’s orders |
| POST | `/api/orders/:id/pay` | Bearer | Mock payment → `paid` |

Passwords are **bcrypt-hashed**. There is **no** real payment gateway or VPN server provisioning — config download is a placeholder after “paid”.

## Schema (SQLite)

- `plans` — id, name, price_lkr, duration_days, features_json, active
- `customers` — id, name, email (unique), password_hash, created_at
- `orders` — id, customer_id, plan_id, amount_lkr, status (`pending`\|`paid`\|`cancelled`), created_at

Seed prices (placeholders): Monthly **LKR 990**, Quarterly **LKR 2,490**, Yearly **LKR 7,990**.

## GitHub Pages

Static marketing build may be published to:

https://contactnethildulmina-glitch.github.io/sri-sellers-landing/

**The API will not run on Pages.** Use local Node for the real demo.

## Project layout

```
├── src/                 # React frontend
│   ├── components/      # Landing sections
│   ├── pages/           # Landing, login, register, account
│   ├── context/         # Auth (JWT in localStorage)
│   └── lib/api.ts       # REST client
├── server/              # Express API + SQLite
│   ├── src/
│   └── data/sri-vpn.db  # created at runtime (gitignored)
└── README.md
```

## Licence

Private / all rights reserved unless otherwise noted.
