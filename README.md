# afisz

Wyszukiwarka wydarzeń w Polsce — concerts, festivals, theatre, and sports events, searchable by name, location, date, and category.

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router) — full-stack React framework
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Supabase](https://supabase.com)** — Postgres database, auth, and realtime
- **[oRPC](https://orpc.unnoq.com)** — end-to-end type-safe API layer
- **[Zod](https://zod.dev)** — schema validation
- **RxJS + [Nanostores](https://github.com/nanostores/nanostores)** — state management
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/)** — accessible UI primitives
- **pnpm** — package management

The app follows a modular monolith architecture (`app/`, `modules/`, `core/`, `contracts/`, `shared/`, `lib/`) — see [documentation/ADR.md](documentation/ADR.md) for details, and [documentation/DOMAINS.md](documentation/DOMAINS.md) for the core application domains.

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
