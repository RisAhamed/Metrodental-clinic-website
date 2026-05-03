"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-700 ease-out",
        isScrolled ? "border-b border-border bg-background/85 shadow-sm backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="flex h-20 items-center justify-between md:h-24">
          <Link href="/" className="group relative" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="font-serif text-xl font-light tracking-[0.16em] text-foreground md:text-3xl">
              METRO DENTAL
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
          </Link>

          <nav className="hidden items-center gap-12 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm uppercase tracking-[0.1em] text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              <span>Book Appointment</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex h-11 w-11 items-center justify-center bg-background/70 backdrop-blur-sm lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn("h-px w-6 bg-foreground transition-all duration-300", isMobileMenuOpen && "translate-y-[4px] rotate-45")} />
              <span className={cn("h-px w-6 bg-foreground transition-all duration-300", isMobileMenuOpen && "-translate-y-[3px] -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setIsMobileMenuOpen(false)}
        className={cn(
          "fixed inset-0 z-[110] bg-black/50 transition-opacity duration-500 ease-out lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-[120] h-[100dvh] w-[min(80vw,320px)] min-w-[280px] bg-background p-6 shadow-2xl transition-transform duration-500 ease-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl font-light tracking-[0.16em] text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
            METRO DENTAL
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-3xl leading-none text-foreground"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-border py-3 font-serif text-xl tracking-[0.1em] text-foreground transition-colors duration-300 hover:text-accent"
              style={{
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s ease-out ${isMobileMenuOpen ? index * 50 : 0}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-primary px-8 py-4 text-sm uppercase tracking-[0.1em] text-primary-foreground"
          >
            Book Appointment
          </Link>
        </nav>
      </aside>
    </header>
  )
}
