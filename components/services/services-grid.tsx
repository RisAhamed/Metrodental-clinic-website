"use client"

import Image from "next/image"
import { services } from "@/lib/dental-data"

export function ServicesGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <article key={service.name} className="group relative overflow-hidden bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10" style={{ animationDelay: `${index * 40}ms` }}>
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
            <Image src={service.image} alt={service.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary/95 p-6 text-primary-foreground backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0 group-focus-within:translate-y-0">
              <p className="text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
          <div className="space-y-4 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-light text-foreground md:text-3xl">{service.name}</h2>
            <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
