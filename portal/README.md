# BrightSmile Dental Care – Product Store + Admin Panel

Online dental product store with Razorpay payments and order tracking, plus one admin panel.
The marketing pages (Home, Our Doctor, Services, Contact) have been removed: `/` sends guests to
`/login`, customers to `/shop` and the owner to `/admin`.

## Stack
| Part | Service |
|---|---|
| Language | **JavaScript only** (React 19 + Node serverless functions) – no Java |
| Front end | React + Vite + Tailwind CSS |
| Database | **Neon** (PostgreSQL) |
| Login | **Clerk** |
| Photo storage | **Cloudflare R2** |
| Payments | Razorpay (signature is verified on the server) |
| Hosting | **Vercel** (website + API together) |

```
Browser ──► Vercel ──► React site (static)
   │            └────► /api/* serverless function ──► Neon (Postgres)
   │                         │  verifies Clerk login   └► Razorpay (create order, verify signature)
   └─ photo upload ─────────►  Cloudflare R2 (signed URL from the function)
```

## Folders
- `src/` – React pages (unchanged UI)
- `api/` – Vercel entry points (`[...path].js` = whole REST API, `payments/razorpay/webhook.js`)
- `server/` – the API code: `app.js` (routes), `orders.js`, `products.js`, `auth.js`, `razorpay.js`, `r2.js`, `db.js`, `schema.js`
- `dev-server.js` – runs the API on your computer

Database tables are created **automatically** on the first request. You do not run any SQL.

---

## Setup (do these once, in order)

### 1. Neon – database
1. https://neon.com → sign up → **Create project**.
2. Click **Connect** → turn **Connection pooling ON** → copy the connection string.
   → this is `DATABASE_URL`.

### 2. Clerk – login
1. https://clerk.com → sign up → **Create application** → name it → choose **Email** (and Password) → Create.
2. Open **API keys** → copy the **Publishable key** → `VITE_CLERK_PUBLISHABLE_KEY`, and the **Secret key** → `CLERK_SECRET_KEY`.
3. Sign up the owner in the app (or create the user in the Clerk dashboard), verify the email, then give that
   user **public metadata** `{ "role": "admin" }` in **Clerk dashboard → Users → the user → Public metadata**.
   Alternatively run `npm run admin:role -- --email owner@clinic.com --role admin`.
   Nobody else can grant this from the browser. Full details and all flows: **[ADMIN_SETUP_AND_FLOW.md](./ADMIN_SETUP_AND_FLOW.md)**.

### 3. Cloudflare R2 – photos
1. https://dash.cloudflare.com → **R2 Object Storage** → enable R2 (needs a payment card; the free quota is 10 GB).
2. **Create bucket** (e.g. `dental-photos`) → `R2_BUCKET`.
3. Bucket → **Settings → Public access** → enable the **Public Development URL** (r2.dev) → copy it → `R2_PUBLIC_URL`
   (looks like `https://pub-xxxxxxxx.r2.dev`).
4. Bucket → **Settings → CORS Policy → Add** and paste (add your real Vercel address after step 6):
   ```json
   [
     {
       "AllowedOrigins": ["http://localhost:5173", "https://YOUR-SITE.vercel.app"],
       "AllowedMethods": ["PUT"],
       "AllowedHeaders": ["Content-Type"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```
5. R2 overview page → **Manage API tokens → Create API token** → permission **Object Read & Write**, choose your bucket →
   copy **Access Key ID** → `R2_ACCESS_KEY_ID` and **Secret Access Key** → `R2_SECRET_ACCESS_KEY`.
   Your **Account ID** (right side of the R2 page) → `R2_ACCOUNT_ID`.

### 4. Razorpay – payments
Dashboard in **Test Mode** → Account & Settings → API Keys → Generate Test Key →
`RAZORPAY_KEY_ID` (`rzp_test_…`) and `RAZORPAY_KEY_SECRET`. Use **live** keys only after you have tested everything.
**Never share the secret** and never put it in `src/`.

### 5. Run on your computer
Needs Node.js 20.6 or newer.
```bash
cp .env.example .env      # Windows: copy .env.example .env   -> then fill in every value
npm install
npm run dev               # website http://localhost:5173  (API runs on :3001 automatically)
```
Register in the app with the owner's email, grant that user `publicMetadata.role = "admin"` as described above,
sign out and back in → you will see **Admin** in the menu → add products.

### 6. Deploy on Vercel
1. Put the folder on GitHub (private repo). `.env` is now ignored by git (see `.gitignore`). If it was tracked
   in an earlier commit, run `git rm --cached .env` and commit before pushing, and **rotate any key that was
   ever committed**. `.env.example` contains placeholders only.
2. https://vercel.com → **Add New → Project** → import the repo (Framework: Vite is detected).
3. **Environment Variables**: add every name from `.env.example` with your values → **Deploy**.
4. Copy your site address (e.g. `https://dental.vercel.app`) into the R2 **CORS** list (step 3.4).
5. (Recommended) Razorpay → **Webhooks → Add**: URL `https://YOUR-SITE.vercel.app/api/payments/razorpay/webhook`,
   events `payment.captured`, `order.paid` **and `payment.failed`**, and a secret you choose → put the same text in
   `RAZORPAY_WEBHOOK_SECRET` on Vercel and redeploy. This marks orders paid even if the customer closes the browser,
   and marks them `FAILED` when a UPI/card payment is declined.

Going live with Clerk: create a **Production** instance in Clerk, then replace the two Clerk keys on Vercel.

## Order & payment flow (safe)
1. Checkout → server reads **prices from the database**, creates the order `PENDING_PAYMENT` and a Razorpay order.
2. Customer pays in the Razorpay window.
3. Server verifies Razorpay's **HMAC-SHA256 signature** → only then the order is `PAID` and stock is reduced.
   (The webhook does the same, idempotently.)
4. Admin only ever sees `PAID` orders and moves them: Packing → Shipped (tracking number required) →
   Out for delivery → Delivered, or Cancelled (stock is restored). Customers see the timeline in *My orders*.

## Failed payments & retry
A failed UPI QR/card payment no longer leaves the 10-minute Razorpay modal stuck:
- The browser listens to `payment.failed`, closes the modal immediately and shows the failure reason.
- While the modal is open the app polls `GET /api/orders/:id` every 4 seconds (stopped on success, failure,
  dismiss, 10-minute expiry or unmount). A `PAID` or `FAILED` status from the server wins over the modal.
- The `payment.failed` webhook sets `status='FAILED'` and stores `failure_reason` (only for orders still
  `PENDING_PAYMENT`, so a late failure can never overwrite a paid order).
- **Retry Payment** calls `POST /api/orders/:id/pay`, which issues a fresh Razorpay order id for the *same*
  order — cart, items, total and stock are untouched. Stock is decremented only once, by the call that
  actually flips the order to `PAID` (`rowCount === 1`).

## Clinic details
The phone number, emergency note, address, hours and map link shown in the top/bottom bars come from
`src/data/clinic.js` (used by `Navbar.jsx` and `Footer.jsx`).
