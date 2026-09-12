# SRI Sellers — Marketing Landing Page

Production-ready single-page marketing site for **SRI Sellers**, a Sri Lanka–focused platform where sellers open a shop and list products.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)

No backend or authentication — static front-end only.

## Prerequisites

- Node.js 20+ (recommended)
- npm 9+

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm install
npm run build
npm run preview
```

`npm run build` type-checks with TypeScript and outputs static assets to `dist/`.

## Project structure

```
src/
  components/   # Nav, Hero, TrustStrip, Features, HowItWorks, WhoItsFor, FinalCta, Footer
  App.tsx       # Page composition
  index.css     # Tailwind theme + base styles
  main.tsx      # React entry
```

## Licence

Private / all rights reserved unless otherwise noted.
