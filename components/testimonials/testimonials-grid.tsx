"use client"

import { useState } from "react"
import { testimonials } from "@/lib/dental-data"

function Stars({ rating }: { rating: number }) {
  return <span className="text-base text-[#f4b400]" aria-label={`${rating} out of 5 stars`}>{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
}

export function TestimonialsGrid() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  return (
    <div className="columns-1 gap-8 md:columns-2 xl:columns-3">
      {testimonials.map((review, index) => (
        <article key={`${review.name}-${index}`} className="mb-8 break-inside-avoid border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">{review.name.charAt(0)}</div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{review.name}</h2>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Verified</span>
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3"><Stars rating={review.rating} /><span className="bg-secondary px-3 py-1 text-xs text-muted-foreground">{review.treatment}</span></div>
          <p className={`${expanded[index] ? "" : "line-clamp-4"} text-sm leading-relaxed text-muted-foreground`}>{review.text}</p>
          {review.text.length > 170 && (
            <button type="button" onClick={() => setExpanded((current) => ({ ...current, [index]: !current[index] }))} className="mt-4 text-xs uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:text-foreground">
              {expanded[index] ? "Show less" : "Read more"}
            </button>
          )}
        </article>
      ))}
    </div>
  )
}
