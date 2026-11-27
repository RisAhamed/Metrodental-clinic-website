import { clerkMiddleware } from "@clerk/nextjs/server"

// Next.js 16 uses `proxy.ts` (formerly `middleware.ts`).
// Clerk reads the session cookie here so the marketing site and the
// store application share the same Clerk application and session.
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
