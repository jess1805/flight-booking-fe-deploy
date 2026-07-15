# Airport Flight Management — Frontend

React + TypeScript frontend for the flight booking platform, matching the
`Route → Controller → Service → Repository → Prisma → PostgreSQL` backend
with dual Admin (Manager/Staff) and Passenger JWT auth.

## Setup

```bash
npm install
cp .env.example .env   # defaults to http://localhost:3000/api/v1
npm run dev
```

## Stack

- Vite + React + TypeScript (`strict: true`, no `any`)
- React Router: public routes (search, flight details), a plain **protected route**
  (`/profile` — any authenticated user), and **role-gated routes** (`/bookings` for
  Passengers only; `/admin/*` for Manager/Staff)
- TanStack Query for all data fetching — loading/error/empty states handled on every page
- React Hook Form + Zod: login, register (passenger + admin variants), gate updates
- Tailwind CSS v4, mobile-first responsive layout

## Global state: Context API

`features/auth/context/AuthContext.tsx` holds the current user + auth actions.
Justification: state is small (current user only) and changes rarely (login/logout),
so Context's re-render cost is negligible; everything else is server state owned by
TanStack Query. See in-code comments for more detail.

## Auth model (dual JWT)

The backend has **two separate auth systems** — this frontend mirrors that:

- Admin: `POST /admin/login`, `POST /admin/register` (`{ email, password, role }`),
  `GET /admin/profile` — role is `MANAGER` or `STAFF`
- Passenger: `POST /passengers/login`, `POST /passengers/register`, `GET /passengers/profile`
  — role is `PASSENGER`

Only one session is active at a time. `lib/apiClient.ts` stores the token plus which
audience it belongs to (`auth_audience`), and `AuthContext` calls the matching
`/profile` endpoint to restore the session and to fetch full user info after login.

**Assumption to verify**: login/register responses are assumed to return `{ token }`.
Check your actual response shape and adjust `AuthResponse` in `AuthContext.tsx` if
the field is named differently.

## Endpoints wired up

| Endpoint | Used in |
|---|---|
| `POST /admin/login`, `/admin/register`, `GET /admin/profile` | `features/auth` |
| `POST /passengers/login`, `/passengers/register`, `GET /passengers/profile` | `features/auth` |
| `GET /flights` (origin, destination, departureDate, page, limit) | `features/flights` |
| `GET /flights/:id` | `features/flights` |
| `PATCH /flights/:id/gate` (Manager only) | `features/admin` — `GateForm` |
| `GET /flights/:id/bookings` (Manager/Staff) | `features/admin` |
| `POST /bookings` (Passenger) | `features/flights` (booking action) |
| `GET /bookings` (Passenger, paginated) | `features/bookings` |
| `PATCH /bookings/:id/cancel` (Passenger) | `features/bookings` |

## Known gaps to close on your side

- **Flight model fields are assumed.** `types/index.ts` guesses at `seatsAvailable`,
  `seatsTotal`, `gate` field names — confirm against your Prisma schema / actual
  `GET /flights` response and adjust.
- **No "create flight" endpoint exists** in the current API list, only gate updates —
  the admin dashboard only lets Managers set a gate on existing (seeded) flights. If
  you want flight creation from the UI, you'll need to add that backend endpoint.
- **The chatbot has no backend endpoint yet** — the README you shared says the old
  RAG/chatbot code was removed. `features/chatbot` calls `POST /admin/chatbot/query`
  as a placeholder; it won't work until that route is rebuilt server-side.
- Pagination on flight search UI (buttons) isn't wired up yet, only on My Bookings —
  add if you expect more than one page of results in search.

## Not yet done (optional requirements)

- Chart.js visualizations
- Theme toggle / formal accessibility (Lighthouse) pass
- Vitest + React Testing Library tests
