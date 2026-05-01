"use client"

import { useEffect, useRef, useState } from "react"
import { ImageReveal } from "@/components/ui/image-reveal"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => {
      if (sectionRef.current && sectionRef.current.getBoundingClientRect().bottom > 0) {
        setScrollY(window.scrollY)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <ImageReveal
          src="/images/Dental Checkup.png.jpg"
          alt="Metro Dental Clinic advanced dental treatment room"
          priority
          className="object-cover object-center"
          sizes="100vw"
          delay={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute left-[10%] top-0 h-full w-px bg-foreground/5" style={{ transform: `translateY(${-scrollY * 0.1}px)` }} />
        <div className="absolute left-[30%] top-0 h-full w-px bg-foreground/5" style={{ transform: `translateY(${-scrollY * 0.15}px)` }} />
        <div className="absolute right-[20%] top-0 h-full w-px bg-foreground/5" style={{ transform: `translateY(${-scrollY * 0.08}px)` }} />
        <div className="absolute left-0 top-[40%] h-px w-full bg-foreground/5" style={{ transform: `translateX(${scrollY * 0.05}px)` }} />
      </div>

      {/* <div className="relative z-20 mx-auto w-full max-w-[1800px] px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <h1
                className="font-serif text-5xl font-light leading-[0.9] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                style={{
                  transform: isLoaded ? "translateY(0)" : "translateY(100%)",
                  opacity: isLoaded ? 1 : 0,
                  transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                }}
              >
                <span className="block text-pretty">Advanced dental care</span>
                <span className="block text-pretty">crafted with</span>
                <span className="block text-accent italic">precision & warmth.</span>
              </h1>
            </div>
          </div> */}
{/* Change z-20 to z-30 and add pt-32 to protect the top area */}
<div className="relative z-30 mx-auto w-full max-w-[1800px] px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
  <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
    <div className="lg:col-span-8">
      <div className="overflow-hidden">
        <h1
          className="font-serif text-5xl font-light leading-[1.1] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(100%)",
            opacity: isLoaded ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          {/* Use whitespace-normal to ensure it wraps correctly on small screens */}
          <span className="block whitespace-normal text-pretty">Advanced dental care</span>
          <span className="block whitespace-normal text-pretty">crafted with</span>
          <span className="block whitespace-normal text-accent italic">precision & warmth.</span>
        </h1>
      </div>
    </div>
    {/* ... rest of the code ... */}

          <div className="lg:col-span-4 lg:pb-4">
            <div
              className="space-y-6"
              style={{
                transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                opacity: isLoaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Trusted Dental Care Since 2002</span>
              </div>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Comprehensive dental treatments by an experienced team, from routine checkups to advanced laser dentistry and implants.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center bg-primary px-5 py-3 text-sm uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]">
                  Book an Appointment
                </a>
                <a href="#services" className="inline-flex items-center justify-center border border-border bg-background/70 px-5 py-3 text-sm uppercase tracking-[0.1em] text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent">
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
          <div className="relative h-12 w-px overflow-hidden bg-gradient-to-b from-foreground/40 to-transparent">
            <div className="absolute inset-0 w-full animate-pulse bg-accent" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      <div
        className="absolute right-6 top-32 z-20 hidden md:right-12 md:block lg:right-20"
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateX(0)" : "translateX(20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s" }}
      >
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Chennai</span>
          <div className="h-px w-8 bg-border" />
          <span>2 Locations</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
