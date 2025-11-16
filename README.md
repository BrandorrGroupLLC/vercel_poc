# Vercel Standalone POC

This directory now contains a Vercel-only proof of concept that mirrors the UI
of the AWS Amplify Gen 2 sample while moving the entire backend into Next.js
Server Actions backed by Vercel Postgres.

## Prerequisites

- Node.js 18+ and npm 9+
- A Vercel account on the Hobby plan
- A Vercel Postgres database (schema lives in `vercel-backend/schema.sql`)
- `POSTGRES_URL` (and optional `POSTGRES_URL_NON_POOLING`) env vars available
  during `next dev`, `next build`, and at runtime

## Local development

```bash
npm install
vercel env pull .env.local   # or export POSTGRES_URL manually
npm run dev
```

The app reads and mutates data exclusively through Server Actions defined in
`src/app/_actions/actions.ts`, which call helpers in `src/lib/db.ts`.

## Deploying to Vercel

1. Create or connect a Vercel Postgres database.
2. Run `vercel-backend/schema.sql` against the database.
3. Add `POSTGRES_URL` to the project’s Environment Variables (Preview + Prod).
4. Set the app root to this folder, use `npm install` + `npm run build`.
5. Trigger a deploy; no additional API routes are required.

## Known limitations vs Amplify

- No managed authentication: add NextAuth/Auth.js, Clerk, etc., for real auth.
- Manual schema migrations: schema updates must be coordinated outside of the
  repo (vs. Amplify generating infra from data models).
- Rate limits/timeouts: Hobby Postgres + Serverless Functions have 10 s limits,
  so long-running analytics queries need pagination or batching.
