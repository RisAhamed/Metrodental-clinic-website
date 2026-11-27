"use client"

import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { ArrowUpRight, LogOut, ShoppingBag } from "lucide-react"
import { storeUrl } from "@/lib/site"

const linkClass =
  "inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 text-xs uppercase tracking-[0.15em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]"

const outlineClass =
  "inline-flex min-h-12 items-center justify-center gap-2 border border-border px-6 text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"

export function AccountPanel() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="h-64 animate-pulse border border-border bg-muted/60" />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="max-w-xl border border-border bg-card p-8 shadow-sm md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Patient Portal</p>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-[-0.02em] text-foreground">
            You are signed out.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sign in to view your account details, or create an account to book and manage your care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className={linkClass}>
              Login
            </Link>
            <Link href="/signup" className={outlineClass}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const name = user.fullName ?? user.firstName ?? user.username ?? "Patient"
  const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? "—"
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "—"

  return (
    <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-20">
        <div className="border border-border bg-card p-8 shadow-sm md:p-10 lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Your Details</p>
          <dl className="mt-8 divide-y divide-border">
            <div className="grid gap-1 py-4 sm:grid-cols-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</dt>
              <dd className="text-sm text-foreground sm:col-span-2">{name}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</dt>
              <dd className="break-all text-sm text-foreground sm:col-span-2">{email}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-3">
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Member since</dt>
              <dd className="text-sm text-foreground sm:col-span-2">{memberSince}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            {storeUrl ? (
              <a href={storeUrl} className={linkClass}>
                <ShoppingBag className="h-4 w-4" />
                Shop &amp; Appointments
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
            <Link href="/contact" className={outlineClass}>
              Contact the Clinic
            </Link>
            <button
              type="button"
              onClick={() => void signOut({ redirectUrl: "/" })}
              className={outlineClass}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
        <aside className="border border-border bg-secondary/60 p-8 md:p-10 lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Good to know</p>
          <p className="mt-6 font-serif text-3xl font-light leading-snug tracking-[-0.02em] text-foreground">
            One account, every visit.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Your account follows you across our website and the patient store. Use the same email to
            sign in anywhere, and keep your appointments and orders together.
          </p>
          <div className="mt-8 space-y-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            <p className="border-t border-border pt-4">Book appointments with ease</p>
            <p className="border-t border-border pt-4">Review your orders and prescriptions</p>
            <p className="border-t border-border pt-4">Sign out securely on any device</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
