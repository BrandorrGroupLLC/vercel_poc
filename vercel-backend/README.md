# Vercel Backend Setup

This folder contains the SQL definition for the lightweight backend that runs
entirely on Vercel.

## Steps

1. Provision a [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   database on the Hobby plan.
2. Run `schema.sql` against that database (either from the Vercel dashboard or
   `psql`).
3. Expose the connection string to both `POSTGRES_URL` (build/runtime) and
   `POSTGRES_URL_NON_POOLING` (optional, useful for migrations).
4. Pull the env vars locally via `vercel env pull .env.local` or copy them into
   your shell before running `npm run dev`.

The application code connects to this database via `@vercel/postgres` and uses
Next.js Server Actions for all mutations, so there are no additional API routes
to configure.
