# Metro Dental Clinic — Application & Integration Document

_Updated 26 November 2026_

## 1. What the two applications are

There are two separate projects under `C:\Users\riswa\Desktop\AAA\client\Metro Dental clinic`:

| | **Website** (this project) | **Patient / store application** (`new`) |
|---|---|---|
| Folder | `Metrodental-clinic-website` | `Metrodental-clinic-website/portal` (migrated from `new`) |
| Framework | Next.js 16 (App Router), React 19, TypeScript | Vite + React 19 (SPA), React Router 7 |
| Styling | Tailwind v4 (CSS-first), shadcn/ui | Tailwind + custom brand theme |
| Purpose | Public marketing site: Home, About Us, Services, Pricing, Testimonials, Contact | Patient portal + online store + admin console: login, shop, products, cart, orders, Razorpay payments, admin area |
| Backend | Next.js website plus shared `/api/[...path]` adapter | Portal server code now lives under `portal/server/` and is served by the website deployment |
| Auth originally | **None** — no Clerk, no login/logout, no user state | Clerk (`@clerk/react` v6), role-based access via Clerk `publicMetadata.role` (`admin`) |

The two projects already share one real-world brand and one Clerk user base. The website had no way to sign in; the patient app had all the account/shop/admin behaviour.

## 2. What we are trying to integrate

Goal: **bring the website and the patient application together without changing any existing patient/admin flow.**

Specifically:

1. The website uses the **same Clerk application** (same publishable and secret keys) as the patient app, so one account works in both places.
2. Website visitors see **Login / Sign Up** in the header and in the mobile sidebar "corner".
3. After signing in, those controls change to an **account menu** (initials avatar → My Account, Shop & Appointments, Sign Out). Logout works and returns to the homepage.
4. Login and signup pages, and the account page, are styled with the **website's own theme** — not the default Clerk styling and not the patient app's theme.
5. The portal source is kept under `portal/` and served at `/portal` by the same Vercel project. Its roles, shop, cart, Razorpay retry flow, and admin landing remain unchanged.

## 3. Website components (existing structure)

- `app/layout.tsx` — root layout; loads DM Sans / Cormorant Garamond / JetBrains Mono fonts, Vercel Analytics, `FloatingWhatsapp`. There is **no shared header/footer layout**: each of the six marketing pages renders `<Header />` and `<Footer />` itself.
- `components/header.tsx` — fixed transparent-to-blurred header. Desktop: brand, six nav links, right-side CTA. Mobile: hamburger + hand-built slide-in sidebar (`aside`) with the same nav links and a Book Appointment button.
- `components/footer.tsx` — brand, quick links, doctor info, clinic branches, giant serif statement.
- `components/floating-whatsapp.tsx` — WhatsApp floating button.
- `components/sections/*`, `components/services/*`, `components/testimonials/*` — marketing content sections.
- `components/ui/*` — shadcn/ui primitives (button, input, dropdown-menu, separator, avatar, dialog, etc.).
- `app/globals.css` — the design system: light-only teal palette (`--primary: #0a7ea4`, `--secondary: #f0f7fa`, `--foreground: #1a2634`, `--muted-foreground: #5a6a7a`, `--border: #d9e8ee`), `--radius: 0` (sharp corners), uppercase wide-tracking labels, serif display headings.
- `lib/dental-data.ts` — clinic services and branch data.

## 4. Integration pieces added

| File | Role |
|---|---|
| `proxy.ts` | Next.js 16 replacement for `middleware.ts`. Runs `clerkMiddleware()` so Clerk can read the session cookie on every request. |
| `lib/clerk-appearance.ts` | Shared Clerk `appearance` object mapping Clerk's tokens to the site's teal/white/slate theme, zero border radius, DM Sans, uppercase tracking labels. Used by the provider and by the SignIn/SignUp components. |
| `lib/site.ts` | Exposes the same-domain portal URL from `NEXT_PUBLIC_STORE_URL` (normally `/portal`). |
| `app/layout.tsx` (edited) | Wraps the app in `<ClerkProvider appearance={...}>` inside `<body>`. |
| `components/auth-nav.tsx` | `DesktopAuthNav` and `MobileAuthNav`. Signed out: Login + Sign Up. Signed in: initials avatar with dropdown (desktop) or account card (mobile sidebar), Shop & Appointments link and Sign Out. Uses `useUser()` / `useClerk()`. |
| `components/header.tsx` (edited) | Adds auth controls to the desktop right cluster and inside the mobile sidebar above Book Appointment. Tightens nav spacing at `lg` so brand + nav + auth fit together; Book Appointment remains at `xl` and in the mobile menu. Sidebar becomes scrollable on short screens. |
| `app/login/page.tsx` | Themed Clerk `<SignIn>` with `routing="path"`, `path="/login"`, `signUpUrl="/signup"`, fallback redirect to `/account`, plus a brand explainer panel. |
| `app/signup/page.tsx` | Themed Clerk `<SignUp>` with `signInUrl="/login"`, fallback redirect to `/account`. |
| `app/account/page.tsx` | Server page with metadata that renders header, hero, account content and footer. |
| `components/account-panel.tsx` | Client panel: signed-out prompt, signed-in details (name, email, member since), Shop & Appointments, Contact, Sign Out. |
| `components/footer.tsx` (edited) | Quick Links now include "My Account" and, when configured, "Shop & Appointments". |
| `.env.local` (git-ignored) | Website Clerk settings plus the portal's server-only database, R2, and Razorpay variables. **No secrets are stored in this document.** |

The dropdown uses the existing shadcn `dropdown-menu` component with `z-[130]`, above the fixed header (`z-[100]`) and mobile overlay (`z-[110]`/`z-[120]`).

## 5. Authentication flows after integration

**Signed out**

- Header: `LOGIN` (text link) and `SIGN UP` (outlined teal button).
- Mobile sidebar: two full-width buttons above Book Appointment.
- `/login` → Clerk SignIn → redirected to `NEXT_PUBLIC_STORE_URL` when configured, otherwise `/account`.
- `/signup` → Clerk SignUp → redirected to `NEXT_PUBLIC_STORE_URL` when configured, otherwise `/account`.
- `/account` when signed out → "You are signed out" card with Login / Sign Up links.

**Signed in**

- Header: initials tile + name. Dropdown: "Signed in as <email>", My Account, Shop & Appointments (same-domain `/portal` link), Sign Out.
- Mobile sidebar: account card with name/email and the same three actions.
- Sign out uses Clerk's `signOut({ redirectUrl: "/" })` and returns to the homepage; controls immediately switch back to Login / Sign Up.

**Session sharing**

Both apps use the same Clerk publishable key/secret, so an account created in one app is recognised by the other. In local development the apps live on different ports of `localhost` (`3000` for the website, `5173` for the patient app); browser cookies are shared across ports of the same host. For separate production domains, both domains must be configured in the Clerk instance for session cookies to carry across.

## 6. Theming rules applied

- Clerk appearance `variables`: teal `#0a7ea4` primary, white background, slate text, `#d9e8ee` inputs/borders, `borderRadius: "0px"`, `fontFamily` from the site's DM Sans variable.
- Clerk `elements`: square cards/buttons/inputs, serif page/form titles, small uppercase tracking labels, teal primary buttons darkening to `#085f7a` on hover.
- Custom auth UI uses the site's existing patterns: `bg-secondary` section tint, `max-w-[1800px]` container, hairline borders, `font-serif` light headings, `uppercase tracking-[0.1em]`–`[0.3em]` labels, `duration-300` transitions.
- No rounded corners were introduced (the site's `--radius` is `0`).

## 7. Configuration

`.env.local` (git-ignored) contains:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — same as the patient app's `VITE_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY` — same as the patient app's `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/account`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/account`
- `NEXT_PUBLIC_STORE_URL=/portal`

## 8. What was deliberately NOT changed

- The original `new` folder remains as a rollback reference. Its portal source was copied into `portal/`; the working portal routes, auth bridge, role guards, cart, orders, Razorpay retry flow, and admin setup were preserved.
- No marketing page content, section, or footer data in the website was changed beyond adding account/shop links to the footer.
- The existing "Book Appointment" action is preserved; it is only hidden between `lg` and `xl` to make room for the auth controls (it remains visible at `xl` and in the mobile sidebar).

## 9. Verification performed

- `pnpm build` — succeeds; routes `/login`, `/signup`, `/account` are generated and `Proxy (Middleware)` is registered.
- `pnpm exec tsc --noEmit` — passes.
- `pnpm lint` — 0 errors; 2 pre-existing warnings unrelated to this work (`app/about/page.tsx`, `hooks/use-toast.ts`).
- Browser smoke test on `http://localhost:3000` — homepage loads, Clerk initialises, Login / Sign Up appear in the header and account/footer links resolve.
- Full credentialed sign-in/sign-out testing requires a real Clerk test account and was not performed without user credentials.
