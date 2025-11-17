# Vercel Standalone POC

This directory now contains a Vercel-only proof of concept that mirrors the UI
of the AWS Amplify Gen 2 sample while moving the entire backend into Next.js
Server Actions backed by Prisma Postgres (the Hobby database option Vercel
provides).

## Prerequisites

- Node.js 18+ and npm 9+
- A Vercel account on the Hobby plan
- A Prisma Postgres database attached to the project (created from Vercel ➜
  Storage ➜ Prisma Postgres)
- `PRISMA_DATABASE_URL` (and optional `PRISMA_ACCELERATE_URL`) env vars exposed
  to `next dev`, `next build`, and at runtime

## Local development

```bash
npm install
vercel env pull .env.local            # populates PRISMA_DATABASE_URL locally
npx prisma generate                    # creates Prisma Client
npm run db:push                        # sync schema defined in prisma/schema.prisma
npm run dev
```

The app reads and mutates data exclusively through Server Actions defined in
`src/app/_actions/actions.ts`, which call helpers in `src/lib/db.ts`.

## Deploying to Vercel

1. Create or connect the project to a Prisma Postgres database.
2. In Vercel → Settings → Environment Variables, add `PRISMA_DATABASE_URL`
   (Preview + Production). Include `PRISMA_ACCELERATE_URL` if you plan to use
   Prisma Accelerate for pooled connections.
3. Run `vercel env pull .env.local` locally, then `npx prisma generate` and
   `npm run db:push` to ensure the remote DB has the schema from
   `prisma/schema.prisma`.
4. Set the app root to this folder, use `npm install` + `npm run build`.
5. Trigger a deploy; no additional API routes are required.

## Known limitations vs Amplify

- No managed authentication: add NextAuth/Auth.js, Clerk, etc., for real auth.
- Schema management now relies on Prisma. Remember to run `npm run db:push`
  (or `prisma migrate`) whenever you change `prisma/schema.prisma`.
- Hobby-level database limits (connections, storage) still apply, so paginate
  large queries and keep payload sizes small.
