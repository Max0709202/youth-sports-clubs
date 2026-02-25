# Youth Sports Merch — Multi-Tenant E-Commerce Platform

One codebase, thousands of team stores. Logo upload → branded store in minutes.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind
- **Backend:** Next.js Route Handlers / Server Actions
- **Database:** PostgreSQL (Supabase or Neon)
- **ORM:** Drizzle
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Payments:** Stripe Connect
- **Fulfillment:** Printify / Printful (adapter layer)
- **Hosting:** Vercel

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `DATABASE_URL` (Supabase Postgres or Neon)
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - For local dev, `NEXT_PUBLIC_APP_DOMAIN` can be `localhost:3000` (no tenant on this host)

3. **Database**
   ```bash
   npm run db:generate   # generate migrations from schema
   npm run db:migrate    # apply migrations (requires DATABASE_URL)
   npm run db:studio    # optional: Drizzle Studio
   ```

4. **Run**
   ```bash
   npm run dev
   ```

## Multi-tenant routing

- **No tenant:** Base host (e.g. `yoursite.com` or `localhost:3000`) → marketing site and onboarding.
- **Subdomain:** `lions.yoursite.com` → tenant with slug `lions` → storefront (theme, catalog, cart).
- **Custom domain:** Add a row in `tenant_domains` and point DNS; middleware resolves tenant by host.

Middleware sets `x-tenant-id` and `x-tenant-slug`; server code uses `getTenantFromHeaders()` from `@/lib/tenant/context`. Tenant lookup in middleware uses Supabase (edge-safe); rest of the app uses Drizzle.

## Project structure

```
src/
  app/
    (storefront)/     # collection, product, cart — require tenant
    api/webhooks/      # Stripe (and later Printify/Printful)
    dashboard/         # team admin
    onboarding/
  components/storefront/
  lib/
    db/                # Drizzle schema + client
    tenant/             # resolver + context
    branding/          # theme tokens, CSS variables
    integrations/fulfillment/  # adapter interface + Printify stub
    webhooks/          # idempotency helpers
    money.ts
    env.ts
```

## Implementation plan (4-week MVP)

- **Week 1:** Core foundation — tenant resolution, onboarding, logo → theme, themed storefront ✅ (scaffolded)
- **Week 2:** Catalog templates, tenant products, cart API, admin branding + product toggle
- **Week 3:** Stripe Connect, checkout, order state machine, webhooks, admin orders
- **Week 4:** Fulfillment adapter (Printify/Printful), order → provider → tracking, hardening

## Security

- All business tables are scoped by `tenant_id`; queries must include tenant.
- Webhooks: verify signature, store event for idempotency, process in background.
- Storage paths: `/tenant/{tenant_id}/...` for logos and assets.

## Deploy (Vercel)

- Set env vars in Vercel.
- Use wildcard subdomain (e.g. `*.yoursite.com`) for tenant stores.
- Optional: custom domain verification and `tenant_domains` for club-owned domains.
