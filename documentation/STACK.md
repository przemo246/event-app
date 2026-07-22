---
version: 1.0
updated: 21.07.2026
---

# Technology Stack

---

## Frontend

### Next.js

- **Why:** Full-stack framework, built-in SSR, easy to learn, fast

### Tailwind CSS

- **Why:** Utility-first, small bundles, rapid development

---

## State Management

### RxJS + Nanostores

- **Why RxJS:** Easy to learn, reactive programming, composable operators
- **Why Nanostores:** Lightweight (<1KB) for simple UI state, framework-agnostic

---

## Data Layer

### oRPC

- **Why:** End-to-end type safety, minimal boilerplate, works perfectly with Cloudflare Functions

---

## Backend

### Cloudflare Pages

- **Why:** Best DDoS protection, 200+ edge locations, $0 cost forever, unlimited bandwidth
- **Alternative rejected:** Vercel ($20/mo at scale, less DDoS protection)

### Supabase (PostgreSQL)

- **Why:** Direct client-to-DB (90% of ops), RLS security, real-time built-in, full SQL support
- **Alternative rejected:** Firebase (NoSQL limitations, no joins, must denormalize)

### Supabase Auth

- **Why:** Built-in, $0 cost, Google OAuth + Email/Password, works with RLS

### Supabase Realtime

- **Why:** Built-in WebSockets, perfect for game sessions, zero config

---

## Package Management

### pnpm

- **Why:** Faster than npm/yarn, efficient disk usage, strict dependency resolution
- **Most common commands:**
  - `pnpm install` - Install dependencies
  - `pnpm add <package>` - Add a dependency
  - `pnpm add -D <package>` - Add a dev dependency
  - `pnpm remove <package>` - Remove a dependency
  - `pnpm update` - Update dependencies
  - `pnpm exec <command>` - Execute a command (equivalent to npx)
  - `pnpm run <script>` - Run a package.json script
  - `pnpm dlx <package>` - Download and execute a package (like npx)

---
