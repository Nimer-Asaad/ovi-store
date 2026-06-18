# OVI Store

Arabic RTL e-commerce starter for a mobile accessories store, built from scratch with Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, and SQLite.

## Run locally

```bash
npm run prisma:generate
npm run dev
```

Open http://localhost:3000.

## Prisma

The local SQLite connection is configured in `.env`:

```bash
DATABASE_URL="file:./dev.db"
```

Useful commands:

```bash
npm run prisma:generate
npm run db:push
```

Mock catalog/order data is currently in `src/data/mock.ts`.
