"use client"

import Link from "next/link"
import { useState } from "react"
import { branches, featuredReviews } from "@/lib/dental-data"

function Stars({ rating }: { rating: number }) {
  return <span className="text-sm text-[#f4b400]">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
}

export function TestimonialsCarousel() {
  const cards = [...featuredReviews, ...featuredReviews]
  const [isTouching, setIsTouching] = useState(false)

  return (
    <section id="testimonials" className="overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2"><div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(05)</span><div className="h-px w-8 bg-border" /><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reviews</span></div></div>
          <div className="lg:col-span-10"><h2 className="max-w-4xl text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">Words from patients who trust their smiles with us</h2></div>
        </div>
      </div>
      <div className="relative flex w-full overflow-x-auto overflow-y-hidden md:overflow-hidden" onTouchStart={() => setIsTouching(true)} onTouchEnd={() => setIsTouching(false)} onTouchCancel={() => setIsTouching(false)}>
        <div className="testimonial-track flex snap-x snap-mandatory gap-6 px-6 md:snap-none md:px-12 lg:px-20" style={{ animationPlayState: isTouching ? "paused" : "running" }}>
          {cards.map((review, index) => (
            <article key={`${review.name}-${index}`} className="w-[min(320px,calc(100vw-3rem))] shrink-0 snap-start border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[420px]">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">{review.name.charAt(0)}</div>
                <div><h3 className="text-sm font-semibold text-foreground">{review.name}</h3><span className="text-xs text-emerald-600">Verified</span></div>
              </div>
              <div className="mb-4 flex items-center justify-between gap-4"><Stars rating={review.rating} /><span className="bg-secondary px-3 py-1 text-xs text-muted-foreground">{review.treatment}</span></div>
              <p className="text-sm leading-relaxed text-muted-foreground">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center"><Link href="/testimonials" className="text-sm uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:text-foreground">Read all testimonials</Link></div>
    </section>
  )
}

export function ContactPreview() {
  return (
    <section id="contact" className="relative overflow-hidden bg-secondary py-32 md:py-48">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="mb-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2"><div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(06)</span><div className="h-px w-8 bg-border" /><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</span></div></div>
          <div className="lg:col-span-10"><h2 className="max-w-4xl text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">Visit Metro Dental Clinic in Kodambakkam or Mylapore</h2></div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {branches.map((branch) => (
            <article key={branch.name} className="bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">
              <h3 className="mb-4 font-serif text-3xl font-light text-foreground">{branch.name}</h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">{branch.address}</p>
              <div className="mb-8 space-y-2 text-sm text-foreground">
                {branch.phones.map((phone) => <a key={phone.label} href={phone.href} className="mr-4 inline-flex min-h-11 items-center transition-colors duration-300 hover:text-accent">{phone.label}</a>)}
              </div>
              <a href={branch.map} target="_blank" rel="noopener noreferrer" className="inline-flex bg-primary px-6 py-3 text-sm uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]">Get Directions</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
