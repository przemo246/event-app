# afisz

Afisz is an event search engine for Poland, letting users find concerts, festivals, theatre, and sports events by name, location, date, and category.

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router) — full-stack React framework
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Supabase](https://supabase.com)** — Postgres database, auth, and realtime
- **[Zod](https://zod.dev)** — schema validation, used by a custom procedure layer (`server/application/`) backing Next.js Route Handlers
- **RxJS + [Nanostores](https://github.com/nanostores/nanostores)** — state management
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/)** — accessible UI primitives
- **pnpm** — package management

The app follows a modular monolith architecture (`app/`, `modules/`, `core/`, `server/`, `shared/`, `libs/`) — see [documentation/ADR.md](documentation/ADR.md) for details, and [documentation/DOMAINS.md](documentation/DOMAINS.md) for the core application domains.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env.local` (Supabase project URL and keys — see [documentation/STACK.md](documentation/STACK.md)).

3. Run the development server:

   ```bash
   pnpm dev
   ```

   The app will be running on [localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — start the development server
- `pnpm build` — build for production
- `pnpm start` — start the production server
- `pnpm lint` / `pnpm lint:fix` — lint the codebase
- `pnpm test` / `pnpm test:watch` — run the test suite with Vitest
- `pnpm db:start` / `pnpm db:stop` — start/stop the local Supabase stack
- `pnpm db:migration:new` / `pnpm db:migration:up` — create/apply database migrations
- `pnpm db:gen-types` — regenerate TypeScript types from the local DB schema
