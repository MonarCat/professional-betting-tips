# Professional Betting Tips

Modern Next.js + Tailwind CSS site for a football betting predictions brand with premium odds tiers, Supabase-backed data flows, and Paystack checkout verification.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Supabase for `predictions`, `packages`, and `purchases`
- Paystack transaction initialization + server-side verification

## Pages

- `/`
- `/daily-odds`
- `/weekend-odds`
- `/monthly-odds`
- `/match-highlights`
- `/premium-odds`
- `/responsible-betting`
- `/admin`

## Environment variables

Create a `.env.local` file with the following values to enable live integrations:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYSTACK_SECRET_KEY=
```

Without these values, the site uses seeded demo content and a local demo checkout callback so the premium unlock flow can still be reviewed.

## Development

```bash
npm install
npm run dev
```

## Data model notes

Expected Supabase tables:

- `predictions`: `id`, `category`, `package_tier`, `home_team`, `away_team`, `competition`, `kickoff`, `market`, `odds`, `pick`, `confidence`, `status`, `insight`, `is_free`, `is_premium`
- `packages`: `slug`, `category`, `tier`, `name`, `price_kes`, `description`, `features`
- `purchases`: `email`, `package_slug`, `amount_kes`, `paystack_reference`, `status`, `provider_response`, `channel`, `paid_at`

## Responsible betting

- 18+ only
- Predictions are not guarantees
- Bet responsibly
