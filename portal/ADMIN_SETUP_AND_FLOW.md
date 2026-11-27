# Clerk Admin Setup — End-to-End Components & Flow

This document explains **how to make the clinic owner an admin using Clerk user metadata** and how that
single fact travels through every layer of this application — from the Clerk dashboard to the React UI,
the API, the database, Razorpay orders and back.

> **Stack note:** this project is **React 19 + Vite (SPA)** with a **Node serverless API on Vercel**.
> It is **not Next.js**, so there is no `middleware.ts`, `currentUser()` or `auth()`.
> The equivalents here are `server/auth.js`, `server/app.js` and `server/http.js`.

---

## 0. Quick start (the 3 things you actually need)

1. **Owner signs up / is created in Clerk** and the **email is verified**.
2. In **Clerk Dashboard → Users → that user → Public metadata**, set:
   ```json
   { "role": "admin" }
   ```
   Or run: `npm run admin:role -- --email owner@clinic.com --role admin`
3. **Sign out and sign back in**, then wait up to **60 seconds** (API cache) and visit `/admin`.

That is the whole authorization contract. Everything below is how it is enforced and how it flows.

**Landing behaviour (marketing pages removed):** `/` has no Home/Doctor/Services/Contact page any more.
`LandingRedirect` sends a guest to `/login`, a customer to `/shop`, and the owner to `/admin`. After sign-in,
`Login.jsx` / `Register.jsx` apply the same rule (a customer heading to `/checkout` is still returned there).

---

## 1. The role contract

| Question | Answer |
|---|---|
| Where is the role stored? | Clerk **user public metadata**: `{ "role": "admin" }` |
| Which metadata field? | **`publicMetadata`** — readable by the browser, writable **only** from the Backend API / dashboard |
| Why not `unsafeMetadata`? | The browser can write it → a customer could make themselves admin |
| Why not `privateMetadata`? | The browser cannot read it without a Backend API call; unnecessary here |
| Why not a DB `role` column? | Would need a second source of truth and a way to grant it; Clerk is already the identity provider |
| Why not `ADMIN_EMAIL`? | That was the old design. It is **dead config** — no code reads it anymore. Use metadata instead |
| What role do other users get? | Anything else → `customer` (API returns `"USER"` to the browser) |
| Is a verified email required? | **Yes.** `server/auth.js` requires `verification.status === 'verified'` before trusting admin metadata |
| Can the role be changed in the UI? | **No, deliberately.** Role assignment stays in Clerk/dashboard/CLI so no API call can escalate privileges |

The contract is centralised in **`server/roles.js`**:

```js
export const ROLE = Object.freeze({ ADMIN: 'admin', CUSTOMER: 'customer' })
export const APP_ROLE = Object.freeze({ ADMIN: 'ADMIN', USER: 'USER' })

export function isAdminMetadata(metadata) {
  return normalizeRole(metadata?.role) === ROLE.ADMIN
}
export function publicMetadataForRole(role) { /* validates + returns { role } */ }
export function appRole(isAdmin) { return isAdmin ? 'ADMIN' : 'USER' }
```

---

## 2. Setup in the Clerk dashboard (manual, recommended for the first owner)

1. Go to **https://dashboard.clerk.com** and open the correct app.
   > Use the **Development** instance while testing. Before going live, create a **Production** instance,
   > swap the two Clerk keys on Vercel, and **set the owner's admin metadata again there** — the two
   > instances have completely separate users and metadata.
2. Make sure the owner has signed up in the app once (or create the user under **Users → Create user**).
3. Open **Users** → search for the owner → click the user.
4. Find the **Metadata** section → **Public metadata** → edit the JSON:
   ```json
   {
     "role": "admin"
   }
   ```
   (Keep any existing keys; the server merges metadata, so just adding `role` is safe.)
5. **Save**. Confirm the primary email shows as **verified** on the same page. If not, send the verification
   email / mark it verified — the app ignores admin metadata on unverified accounts.
6. In the browser: **sign out → sign in again**. Wait up to 60s if you had an active session, because the API
   caches each Clerk user for one minute.
7. The Navbar now shows **Admin** instead of Shop/Cart, and `/admin` loads.

**Optional, not required by this app:** Clerk → *Sessions* → customize session token → add claim
`role` with value `{{user.public_metadata.role}}`. This project does **not** read that claim; the server
calls the Clerk Backend API directly, so there is no need to configure it.

---

## 3. Setup via the Backend API / CLI (repeatable, good for support and production)

A CLI script is included so granting/revoking admin never depends on remembering dashboard clicks.

```bash
# Grant admin (CLERK_SECRET_KEY is loaded from .env)
npm run admin:role -- --email owner@clinic.com --role admin

# Revoke admin (sets role back to customer)
npm run admin:role -- --email owner@clinic.com --revoke

# By Clerk user id instead of email
npm run admin:role -- --user-id user_2abc123 --role admin

# Audit: print every Clerk user with id, email, role and verified state
npm run admin:role -- --list
```

Direct Node equivalent (Node ≥ 20.6):

```bash
node --env-file=.env scripts/set-clerk-role.mjs --email owner@clinic.com --role admin
```

Raw cURL equivalent (replace placeholders):

```bash
# 1) find the user id
curl -H 'Authorization: Bearer CLERK_SECRET_KEY' \
  'https://api.clerk.com/v1/users?email_addresses=owner%40clinic.com'

# 2) merge public metadata
curl -XPATCH -H 'Authorization: Bearer CLERK_SECRET_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"public_metadata":{"role":"admin"}}' \
  'https://api.clerk.com/v1/users/user_xxx/metadata'
```

**What the script does** (`scripts/set-clerk-role.mjs`):
1. Reads `CLERK_SECRET_KEY` from `.env` (never printed, never sent to the browser).
2. Finds exactly one Clerk user by email (`getUserList({ emailAddress: [email] })`), or by user id.
3. Refuses to grant admin if the primary email is **not verified**.
4. Calls `clerk.users.updateUserMetadata(userId, { publicMetadata: { role } })` — a **deep merge**, so other
   metadata keys survive; setting `{ role: "customer" }` removes admin.
5. Prints the before/after state and a reminder to sign out/in and wait for the 60s cache.

---

## 4. Component map — who does what with the role

| Layer | File | Responsibility for admin |
|---|---|---|
| Clerk provider | `src/main.jsx` | `ClerkProvider` with publishable key + `routerPush`/`routerReplace` from React Router; wraps `AuthProvider` |
| Sign in | `src/pages/Login.jsx` | Clerk `<SignIn routing="path" path="/login">`; remembers `dc_from`; redirects admins to `/admin` |
| Sign up | `src/pages/Register.jsx` | Clerk `<SignUp routing="path" path="/register">` |
| Token bridge | `src/context/AuthContext.jsx` | Gets Clerk session token via `getToken()`, calls `GET /api/auth/me`, exposes `{ user, loading, isSignedIn, isAdmin, logout }` |
| HTTP client | `src/lib/api.js` | Axios interceptor attaches `Authorization: Bearer <Clerk session token>` to **every** API call |
| Route guards | `src/components/RouteGuards.jsx` | `RequireAuth`, `BlockAdmin`, `RequireAdmin` — **UI convenience only**, not security |
| Front door | `src/components/LandingRedirect.jsx` | `/` sends guests to `/login`, customers to `/shop`, the owner to `/admin` (marketing pages removed) |
| Role-aware UI | `src/components/Navbar.jsx`, `Footer.jsx` | Admins see **Admin** and lose Shop/Cart/orders links |
| Admin pages | `src/pages/admin/Dashboard.jsx`, `AdminOrders.jsx`, `AdminProducts.jsx` (+ modal components) | Stats, order status management, product CRUD with R2 uploads |
| **Identity authority** | `server/auth.js` | Verifies Bearer token with `verifyToken()`, fetches Clerk user, computes `isAdmin` from `publicMetadata.role` + verified email; **60s cache** |
| **API authority** | `server/app.js` (`dispatch`) | Route table with `access: public / user / admin`; returns `401` / `403` before any handler runs |
| HTTP adapter | `server/http.js`, `dev-server.js`, `api/[...path].js` | Same `dispatch()` on Vercel and locally; `Cache-Control: no-store` |
| User table | `server/schema.js`, `server/db.js` | `users(id, name, email, phone)` — **no role column**; upserted on `/api/auth/me` and order creation |
| Role helper | `server/roles.js` | Single source of truth for `admin`/`customer` strings (shared by server + CLI) |
| Admin CLI | `scripts/set-clerk-role.mjs` | Grants/revokes/lists roles via Clerk Backend API |

---

## 5. End-to-end flows

### Flow A — The owner logs in and gets admin access

```
[Browser]              [Clerk]                 [Our API]               [Neon DB]
   | 1. /login            |                       |                      |
   |--- <SignIn> -------->| email + password/OTP  |                      |
   |<-- session token ----|                       |                      |
   | 2. AuthContext.getToken()                    |                      |
   |--- GET /api/auth/me (Bearer) --------------->|                      |
   |                      | 3. verifyToken()      |                      |
   |                      | 4. users.getUser(id) ->|                     |
   |                      |<-- publicMetadata.role|                      |
   |                      |    + verified email   |                      |
   |                      | 5. isAdmin = true     |                      |
   |                      |                       | 6. UPSERT users ---->|
   |<-- { role: "ADMIN" } ------------------------------------------------|
   | 7. isAdmin = true -> Navbar shows Admin, /admin allowed              |
```

Key code (`server/auth.js`):

```js
const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY })
const cu = await clerk.users.getUser(payload.sub)
const verified = primary?.verification?.status === 'verified'
const isAdmin = verified && isAdminMetadata(cu.publicMetadata)   // { role: 'admin' }
const user = { id, name, email, phone, role: appRole(isAdmin), isAdmin, clerkRole }
```

Key code (`server/app.js`):

```js
if (access !== 'public') {
  user = await getUser(req)
  if (!user) throw new ApiError(401, 'Authentication required')
  if (access === 'admin' && !user.isAdmin) throw new ApiError(403, 'Access denied')
}
```

`GET /api/auth/me` then upserts the user row and returns `{ id, name, email, phone, role: 'ADMIN' }`.
`AuthContext` stores that object; `isAdmin = user?.role === 'ADMIN'`.

### Flow B — A customer signs up

1. `/register` → Clerk `<SignUp>` → new Clerk user, `publicMetadata` empty (or `role` absent).
2. `getUserFromRequest()` → `normalizeRole(undefined)` → `customer` → `isAdmin: false` → API role `USER`.
3. `BlockAdmin` lets them use `/shop`, `/cart`, `/checkout`, `/orders`; `RequireAdmin` redirects `/admin` → `/`.
4. Their `users` row is created on the first `/api/auth/me` (or when placing an order).

### Flow C — A non-admin tries to open `/admin` or call an admin API

- **UI:** `RequireAdmin` → `<Navigate to="/" replace />`. This is only to avoid a confusing screen.
- **API:** even if a customer manually calls `GET /api/admin/stats`, `dispatch()` sees `access === 'admin'` and
  `!user.isAdmin` → **HTTP 403 `{ "error": "Access denied" }`**, before the handler or DB is touched.
- No token → **401**. Invalid/expired token → `verifyToken()` throws → treated as no user → **401**.

### Flow D — Admin opens the dashboard

`RequireAdmin` → `admin/Dashboard.jsx` calls `GET /api/admin/stats` → `orders.adminStats()` reads paid orders,
revenue, active products and low stock → renders cards. All data comes from Postgres; the role itself is
never read from the database.

### Flow E — Admin manages products and images

1. `AdminProducts.jsx` → `POST /api/admin/uploads/image` with `{ contentType, size }` → server creates a
   **5-minute presigned R2 PutObject URL** (`server/r2.js`).
2. Browser `PUT`s the file directly to Cloudflare R2 (JPG/PNG/WebP, ≤ 5 MB). Only the public URL is stored.
3. `POST/PUT/DELETE /api/admin/products` → `server/products.js` (soft delete via `active = false`).
4. The customer side `GET /api/products` is **public** and always lists active products.

### Flow F — Order and payment (unchanged by roles, but admin-only after payment)

1. Customer `POST /api/orders` → server reads prices from DB, creates `PENDING_PAYMENT` order + Razorpay order.
2. Razorpay Checkout → customer pays → browser `POST /api/orders/:id/verify-payment`.
3. Server verifies **HMAC-SHA256 signature** with `RAZORPAY_KEY_SECRET` (constant-time compare) → order `PAID`,
   stock reduced. The Razorpay webhook (`api/payments/razorpay/webhook.js`) does the same idempotently.
4. Admin-only: `GET /api/admin/orders` (paid orders only) and
   `PUT /api/admin/orders/:id/status` — forward-only state machine:
   `PAID → PROCESSING → SHIPPED → OUT_FOR_DELIVERY → DELIVERED` (SHIPPED needs a tracking number),
   or `CANCELLED` (stock restored). `order_events` rows power the customer's timeline.

### Flow G — Granting, revoking and propagating a role change

1. Owner runs `npm run admin:role -- --email ... --role admin` (or edits the Clerk dashboard).
2. Clerk `publicMetadata` is updated. **No DB migration, no redeploy, no code change.**
3. Existing sessions keep working, but the current user must **sign out/in** to refresh the browser role.
4. The API's 60-second per-user cache (`TTL_MS = 60_000` in `server/auth.js`) means a role change can take
   up to a minute to be honoured server-side; restarting the dev server clears it immediately.
5. `--revoke` sets `{ role: "customer" }` → next refresh yields 403 on admin routes and `/admin` redirect.

### Flow H — Sign out

`AuthContext.logout()` clears local `user` first, then `clerk.signOut()`; `afterSignOutUrl="/"`.
All API calls stop sending a Bearer token, so protected endpoints return 401. `dc_from` in `sessionStorage`
can send the user back to the page they originally wanted after they log in again.

---

## 6. API authorization matrix

| Method & path | Access | Who can call it |
|---|---|---|
| `GET /api/health` | public | anyone |
| `GET /api/products`, `/api/products/categories`, `/api/products/:id` | public | anyone |
| `GET /api/auth/me` | user | any signed-in Clerk user; also upserts the DB row |
| `POST /api/orders` | user | any signed-in customer |
| `GET /api/orders`, `/api/orders/:id` | user | **owner only** — another user's id returns `404`, not `403` |
| `POST /api/orders/:id/pay`, `/verify-payment` | user | owner only |
| `GET /api/admin/stats` | admin | Clerk `publicMetadata.role = admin` + verified email |
| `GET /api/admin/orders` | admin | same (paid orders only) |
| `PUT /api/admin/orders/:id/status` | admin | same |
| `GET/POST /api/admin/products`, `PUT/DELETE /api/admin/products/:id` | admin | same |
| `POST /api/admin/uploads/image` | admin | same |
| `POST /api/payments/razorpay/webhook` | webhook | Razorpay HMAC signature, not a user session |

Admin enforcement lives in `dispatch()` in `server/app.js`. **No admin route handler checks the role itself** —
the central gate is the only gate, which makes it hard to accidentally leave a new endpoint unprotected.

---

## 7. UI behaviour by role

| Screen / element | Owner (admin) | Customer | Guest |
|---|---|---|---|
| Navbar Shop / Cart | hidden | shown | shown |
| Navbar **Admin** button | shown | hidden | hidden |
| `/shop`, `/cart`, `/checkout`, `/orders` (`BlockAdmin`) | redirected to `/admin` | allowed | → `/login` |
| `/admin*` (`RequireAdmin`) | allowed | → `/` | → `/login` |
| Footer Shop / My orders | hidden | shown | shown |

Remember: these are **usability redirects**, not the security boundary. The security boundary is §6.

---

## 8. Security model & decisions

1. **Server-authoritative.** `server/auth.js` is the only place that decides `isAdmin`, and it derives it from
   Clerk's Backend API on every (cached) request. A forged client-side `role: "ADMIN"` in local storage does
   nothing — the client never sends a role, only a Clerk session token.
2. **Correct metadata field.** `publicMetadata` cannot be written from the browser; `unsafeMetadata` would be
   catastrophic here. `CLERK_SECRET_KEY` is used only server-side and in the CLI.
3. **Verified email required.** Stops someone from claiming the owner's email without owning the inbox.
4. **Central API gate.** Adding a new route? Put `'admin'` in its route tuple; no handler-level checks needed.
5. **Anti-enumeration.** Customers get `404` for another user's order, and admin lists only paid orders.
6. **Payment integrity.** Prices are read from the DB, not the client; Razorpay HMAC is verified; webhook is idempotent.
7. **No self-service role escalation.** There is intentionally no API endpoint that changes metadata.
8. **Cache trade-off.** 60s cache limits Clerk API calls; role changes need sign out/in + up to 60s.
9. **Secrets hygiene.** `.env` is now in `.gitignore` and `.env.example` contains placeholders only.
   ⚠️ If real keys were committed earlier, run `git rm --cached .env`, commit, **rotate every exposed key**
   (Clerk secret, Razorpay — including live keys —, R2, Neon) and redeploy. Also fix the old
   `DATABASE_URL=DATABASE_URL=...` duplication in your local `.env` if present.

---

## 9. Verification checklist (before giving the owner access)

- [ ] Owner exists in the **Development** Clerk instance with a verified email.
- [ ] `npm run admin:role -- --list` shows `role=admin verified=true` for the owner only.
- [ ] Owner signs out/in → Navbar shows **Admin**; `/admin` loads with real stats.
- [ ] A second test user signs up → Navbar shows Shop/Cart; `/admin` redirects to `/`.
- [ ] As the test user, call `GET /api/admin/stats` directly (e.g. in DevTools) → **403**.
- [ ] With no token, call `GET /api/auth/me` → **401**.
- [ ] Admin can add/edit/delete a product; image upload works via R2 CORS.
- [ ] Customer checkout → Razorpay test payment → order becomes `PAID`; webhook also works if configured.
- [ ] Admin moves the order to SHIPPED with a tracking number; customer sees the timeline.
- [ ] `--revoke` on a test admin → after sign out/in + 60s, `/admin` redirects and admin APIs return 403.
- [ ] Repeat the metadata grant in the **Production** Clerk instance after swapping keys on Vercel.

---

## 10. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Owner logs in but sees Shop, not Admin | Metadata not set, wrong instance, or role key/value typo | Must be exactly `role` / `admin` (case-insensitive) in **public** metadata of the same instance as the keys |
| Admin metadata set but still not admin | Email not verified, or 60s API cache, or stale browser session | Verify email in Clerk; sign out/in; wait 60s or restart `npm run dev` |
| `403 Access denied` in the browser console | The user is not admin in **Clerk**, or the token was issued before the role change | Check with `--list`; sign out/in; wait for cache |
| `401 Authentication required` | No/expired/invalid Bearer token | Sign in again; confirm `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are from the same instance |
| CLI says "No Clerk user with email" | User hasn't signed up in that Clerk instance | Sign up first, or create the user in the dashboard; check dev vs production |
| CLI refuses to grant admin | Primary email is not verified | Verify the email in Clerk, then rerun |
| Role change in dashboard doesn't apply | Cached user (60s) + cached browser role | Sign out/in, wait a minute; restart dev server for immediate effect |
| Admin UI visible but API calls fail | Client guard passed on an old session while API already revoked | Hard refresh / sign out; API is authoritative |
| Customers can see admin links after being revoked | Stale `user` object in AuthContext | Sign out/in; the next `/api/auth/me` returns `USER` |

---

## 11. Going to production

1. Clerk: create a **Production** instance, configure Email, create/verify the owner, set
   `publicMetadata.role = "admin"` there too, copy its publishable + secret keys.
2. Vercel: update `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` **together** (mismatched instances =
   everyone appears logged out / 401), then redeploy.
3. Set the Razorpay webhook URL to `https://YOUR-SITE.vercel.app/api/payments/razorpay/webhook` with the
   events `payment.captured` / `order.paid` and matching `RAZORPAY_WEBHOOK_SECRET`.
4. Add the deployed origin to the R2 CORS allow-list.
5. Re-run the §9 checklist against the production URL using a **test customer** — never a live payment.
6. Keep the owner's admin role in Clerk only; do not add an `ADMIN_EMAIL` variable (it is ignored).

---

## 12. Optional future enhancements (not required today)

- **Clerk webhook (`user.created` / `user.updated`)**: sync users into Postgres immediately and optionally
  stamp a default `{ role: "customer" }`. Needs raw-body handling and Svix signature verification. Today the
  app upserts users lazily in `GET /api/auth/me` and `createOrder()`, so this is not necessary.
- **Session-token claim `role`** (Clerk → Sessions → customize token): lets an Edge middleware read the role
  without a Backend API call. Not needed for a Vite SPA with a central server gate.
- **Audit log**: add a server-side log line whenever an admin endpoint is used (actor id + action + time).
- **Organizations / staff roles**: if you later add receptionists or multiple clinics, use Clerk Organizations
  and a richer `role` vocabulary; keep the server gate as the single enforcement point.
- **Shorter cache / explicit invalidation**: if instant revocation is required, lower `TTL_MS` in `server/auth.js`
  or call `clerk.users.getUser()` on every admin request.
