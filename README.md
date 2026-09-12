# SRI VPN — Subscription Storefront

Marketing site + cloud Auth/DB for **SRI VPN**: sell VPN subscription plans with **Supabase** (Auth, Postgres, RLS). Works on static **GitHub Pages** — no Node API required in production.

The local Express + SQLite server under `server/` remains as an optional offline fallback for development.

## Live site

https://contactnethildulmina-glitch.github.io/sri-sellers-landing/

Public Pages build uses Supabase cloud for:

- Loading active plans
- Email/password register & login
- Creating orders (`pending`) and mock “pay” → `paid`
- Listing the signed-in user’s orders

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React + TypeScript + Tailwind CSS v4 + React Router |
| Cloud | Supabase Auth + Postgres (`plans`, `profiles`, `orders`) + RLS |
| Optional local API | Express + better-sqlite3 (`server/`) |

## Prerequisites

- Node.js 20+
- npm 9+
- A Supabase project (this repo is wired to project `kjfyekizmfbjqqqmgamb`)

## Frontend env

Copy `.env.example` → `.env` for local dev:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_jwt_key
```

- Use the **legacy anon JWT** with `@supabase/supabase-js` (not the service_role key).
- The anon / publishable key is **public by design** and safe in the browser; RLS protects data.
- `.env.production` is committed so `npm run build` bakes the public URL + anon key for GitHub Pages.
- Never commit a **service_role** key.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:5173/sri-sellers-landing/
```

Plans, auth, and orders talk directly to Supabase from the browser.

### Optional local SQLite API

```bash
npm run install:all
npm run start:server   # http://localhost:3001
```

The frontend no longer calls this by default; keep it if you need an offline demo of the old REST shape.

## Production build / GitHub Pages

```bash
npm run build
# dist/ is published to the gh-pages branch with base /sri-sellers-landing/
```

## How to use the app

1. Open the site → **Plans** load from Supabase `plans`.
2. **Register** (name, email, password ≥ 8 chars) or **Log in**.
3. While signed in, click **Subscribe** on a plan → creates an `orders` row with status `pending`.
4. Open **My account** → **Mark as paid (mock)** updates the order to `paid`.

If registration says to check email, disable “Confirm email” under Supabase → Authentication → Providers → Email (or confirm via the link).

## Supabase schema (already migrated + seeded)

- `public.plans` — id (uuid), name, price_lkr, duration_days, features (jsonb), active  
  Seed: Monthly **990** / Quarterly **2490** / Yearly **7990** LKR  
- `public.profiles` — id (FK `auth.users`), name, email (trigger on signup)  
- `public.orders` — id, customer_id, plan_id, amount_lkr, status (`pending`\|`paid`\|`cancelled`)  
- RLS: active plans readable; profiles/orders own-row only

## Project layout

```
├── src/
│   ├── components/      # Landing sections
│   ├── pages/           # Landing, login, register, account
│   ├── context/         # Auth (Supabase session)
│   └── lib/
│       ├── supabase.ts  # createClient
│       └── api.ts       # plans / orders helpers
├── server/              # Optional Express + SQLite fallback
├── .env.example
├── .env.production      # Public URL + anon key for Pages build
└── README.md
```

## Licence

Private / all rights reserved unless otherwise noted.
