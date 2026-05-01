"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { services } from "@/lib/dental-data"

export function DishesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDish, setActiveDish] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const featured = services.slice(0, 6)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-secondary py-32 md:py-48">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="mb-20 grid gap-16 lg:grid-cols-12 lg:gap-20 md:mb-32">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(04)</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Services</span>
            </div>
          </div>
          <div className="lg:col-span-10">
            <h2 className="max-w-4xl text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
              Comprehensive care for healthier, brighter smiles
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-background">
              {featured.map((service, index) => (
                <div key={service.name} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: activeDish === index ? 1 : 0 }}>
                  <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" priority={index === 0} />
                </div>
              ))}
              <div className="absolute right-6 top-6 bg-background/90 px-4 py-2 backdrop-blur-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured Care</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            {featured.map((service, index) => (
              <button key={service.name} type="button" onClick={() => setActiveDish(index)} className={`w-full p-6 text-left transition-all duration-500 md:p-8 ${activeDish === index ? "bg-background shadow-xl shadow-accent/10" : "bg-background/50 hover:bg-background/70"}`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.08}s` }}>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-foreground md:text-3xl">{service.name}</h3>
                    <p className="text-sm italic text-muted-foreground">Metro Dental Clinic</p>
                  </div>
                  <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: activeDish === index ? "220px" : "0", opacity: activeDish === index ? 1 : 0 }}>
                    <p className="pt-2 text-sm leading-relaxed text-foreground/70">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2"><div className="h-px flex-1 bg-border" /><div className={`h-2 w-2 transition-all duration-500 ${activeDish === index ? "scale-125 bg-accent" : "bg-border"}`} /></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center md:mt-24" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s" }}>
          <Link href="/services" className="inline-flex bg-primary px-8 py-4 text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]">View All Services</Link>
        </div>
      </div>
    </section>
  )
}
