"use client"

import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"
import { ChevronDown, LogOut, ShoppingBag, UserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { storeUrl } from "@/lib/site"

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  const source = (name ?? "").trim()
  if (source) {
    const parts = source.split(/\s+/).filter(Boolean)
    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
  }
  return (email ?? "U").slice(0, 1).toUpperCase()
}

function useAccount() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  const name = user?.fullName ?? user?.firstName ?? user?.username ?? null
  const email = user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses[0]?.emailAddress ?? null

  return {
    isLoaded,
    isSignedIn,
    name,
    email,
    initials: getInitials(name, email),
    signOut: () => signOut({ redirectUrl: "/" }),
  }
}

export function DesktopAuthNav() {
  const account = useAccount()
  const { isLoaded, isSignedIn, name, email, initials } = account

  if (!isLoaded) {
    return <div className="h-10 w-28 animate-pulse bg-muted" aria-hidden="true" />
  }

  if (!isSignedIn) {
    return (
      <>
        <Link
          href="/login"
          className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground xl:text-[13px] xl:tracking-[0.15em]"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="border border-primary px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground xl:px-5 xl:py-2.5 xl:text-[13px] xl:tracking-[0.12em]"
        >
          Sign Up
        </Link>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex items-center gap-2.5 border border-border bg-background/60 px-3 py-2 text-left transition-colors duration-300 hover:border-accent"
          aria-label="Account menu"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-[11px] font-medium tracking-[0.05em] text-primary-foreground">
            {initials}
          </span>
          <span className="hidden max-w-[110px] truncate text-xs uppercase tracking-[0.1em] text-foreground xl:block">
            {name ?? "Account"}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="z-[130] w-64 rounded-none border-border bg-popover p-2 shadow-xl"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Signed in as
          </span>
          <span className="mt-1 block truncate text-sm font-normal text-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border" />
        <DropdownMenuItem asChild className="rounded-none px-3 py-2.5 text-[11px] uppercase tracking-[0.15em]">
          <Link href="/account">
            <UserRound className="h-4 w-4" />
            My Account
          </Link>
        </DropdownMenuItem>
        {storeUrl ? (
          <DropdownMenuItem asChild className="rounded-none px-3 py-2.5 text-[11px] uppercase tracking-[0.15em]">
            <a href={storeUrl}>
              <ShoppingBag className="h-4 w-4" />
              Shop &amp; Appointments
            </a>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator className="my-1 bg-border" />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => void account.signOut()}
          className="rounded-none px-3 py-2.5 text-[11px] uppercase tracking-[0.15em]"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MobileAuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const account = useAccount()
  const { isLoaded, isSignedIn, email, initials, name } = account

  if (!isLoaded) {
    return <div className="mt-8 h-12 animate-pulse bg-muted" aria-hidden="true" />
  }

  if (!isSignedIn) {
    return (
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link
          href="/login"
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-3 text-xs uppercase tracking-[0.12em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          Login
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center justify-center bg-primary px-4 py-3 text-xs uppercase tracking-[0.12em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-8 border border-border bg-secondary/60 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-xs font-medium text-primary-foreground">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
          <p className="truncate text-sm text-foreground">{name ?? email}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/account"
          onClick={onNavigate}
          className="inline-flex min-h-10 items-center justify-center border border-border bg-background px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          My Account
        </Link>
        {storeUrl ? (
          <a
            href={storeUrl}
            onClick={onNavigate}
            className="inline-flex min-h-10 items-center justify-center border border-border bg-background px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Shop &amp; Appointments
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            void account.signOut()
          }}
          className="inline-flex min-h-10 items-center justify-center border border-destructive/30 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-destructive transition-colors duration-300 hover:bg-destructive/5"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
