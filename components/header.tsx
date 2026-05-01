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

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-out",
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
            className="relative flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn("h-px w-6 bg-foreground transition-all duration-300", isMobileMenuOpen && "translate-y-[4px] rotate-45")} />
              <span className={cn("h-px w-6 bg-foreground transition-all duration-300", isMobileMenuOpen && "-translate-y-[3px] -rotate-45")} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 top-20 bg-background transition-all duration-500 ease-out lg:hidden",
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 pb-20">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.1em] text-foreground transition-colors duration-300 hover:text-accent"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: "all 0.5s ease-out",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 bg-primary px-8 py-4 text-sm uppercase tracking-[0.1em] text-primary-foreground"
          >
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  )
}
