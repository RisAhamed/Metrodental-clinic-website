"use client"

import Link from "next/link"
import { branches } from "@/lib/dental-data"

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="inline-block"><span className="font-serif text-2xl font-light tracking-[0.2em] text-foreground md:text-3xl">METRO DENTAL</span></Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Your Smile. Our Commitment. Trusted dental care in Chennai since 2002.</p>
          </div>
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick Links</h4>
            <nav className="space-y-4">
              {[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Testimonials", href: "/testimonials" }, { label: "Contact", href: "/contact" }].map((item) => <Link key={item.label} href={item.href} className="block text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground">{item.label}</Link>)}
            </nav>
          </div>
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Doctor</h4>
            <div className="space-y-4 text-sm text-foreground/70"><p>Dr. S. M. Ameerdeen<br />BDS, General Dental Surgeon</p><a href="tel:+919940552292" className="block transition-colors duration-300 hover:text-accent">99405 52292</a></div>
          </div>
          <div className="lg:col-span-4">
            <h4 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Clinics</h4>
            <div className="space-y-4">
              {branches.map((branch) => <p key={branch.name} className="text-sm text-foreground/70"><span className="text-foreground">{branch.name}</span><br />{branch.address}</p>)}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">© 2024 Metro Dental Clinic. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground"><span>Back to top</span><svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg></button>
        </div>
        <div className="mt-16 px-4 overflow-hidden md:mt-24">
  <p className="whitespace-normal font-serif text-[8vw] font-light leading-tight tracking-[-0.02em] text-black md:text-[6vw] lg:text-[5vw]">
    Every smile deserves calm, precise, compassionate care.
  </p>
</div>

        {/* <div className="mt-16 overflow-hidden md:mt-24"><p className="whitespace-nowrap font-serif text-[8vw] font-light leading-none tracking-[-0.02em] text-foreground/[0.03] md:text-[6vw] lg:text-[5vw]">Every smile deserves calm, precise, compassionate care.</p></div> */}
      </div>
    </footer>
  )
}
