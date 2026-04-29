# AGENTS.md

This file provides guidance to Codex when working with this repository.

## Commands

```bash
npm run dev          # Vite frontend only (port 5173)
npm run dev:api      # Local API server only (port 3001)
npm run dev:full     # Frontend + API together (use this for full local dev)
npm run build        # Production build
npm run typecheck    # TypeScript type checking (runs tsc --build)
npm run lint         # ESLint
npm test             # Vitest (run once, no watch)
```

Restart `dev:full` after adding new API routes or changing server env vars because the API server does not hot-reload.

To run a single test file:

```bash
node node_modules/vitest/vitest.mjs run src/lib/jotformSubmission.test.ts
```

## Architecture

This is a Vite + React + TypeScript SPA deployed on Vercel, with Vercel-style API routes. The frontend and API share the same repo but run as separate processes locally.

## Key Constraints

- All staff API routes must verify the JWT from the `Authorization: Bearer <token>` header using `api/_lib/staff-session.ts` before acting.
- The Supabase `intake_codes` table is RLS-locked. Only the service role key, never the anon key, can read/write it.
- Access codes are never stored in plaintext. The DB stores `code_hash` for verification and `code_ciphertext` for staff audit visibility. Plaintext is returned once at creation only.
- The Jotform iframe renders only while the user is unlocked (`isUnlocked || hasStaffAccess`). Unlock state is kept in `sessionStorage`, which clears on tab close.
- `VITE_*` env vars are the only ones accessible in frontend code. All secrets must stay in API routes only.

## Client And Design System

- Current client: Prolific Homecare LLC.
- Public intake domain: `https://intake.prolifichcs.com`.
- Support email: `intake@prolifichcs.com`.
- Callback default sender: `callback@prolifichcs.com`.
- Main phones: `(215) 245-2285` and `(267) 528-6140`.
- Design tokens are defined in `src/index.css` from the Prolific Homecare design system.
