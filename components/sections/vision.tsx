"use client"

import { useEffect, useRef, useState } from "react"

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [hasStarted, target, duration])

  return { count, start: () => setHasStarted(true), hasStarted }
}

function StatCard({ value, suffix, label, duration = 2000, showLocations = false }: { value: number; suffix: string; label: string; duration?: number; showLocations?: boolean }) {
  const { count, start, hasStarted } = useCountUp(value, duration)
  const [locVisible, setLocVisible] = useState(false)

  useEffect(() => {
    if (hasStarted && showLocations) {
      const timer = setTimeout(() => setLocVisible(true), duration + 300)
      return () => clearTimeout(timer)
    }
  }, [hasStarted, showLocations, duration])

  useEffect(() => {
    start()
  }, [start])

  return (
    <div className="space-y-2 leading-5 min-h-[140px] md:min-h-[160px]">
      <span 
        className="font-sans font-light text-foreground block"
        style={{ fontSize: "clamp(2rem, 4vw, 5rem)" }}
      >
        {count.toLocaleString("en-IN")}{suffix}
      </span>
      <p className="text-xs sm:text-sm tracking-widest uppercase text-muted-foreground mt-2">{label}</p>
      {showLocations && (
        <div className="space-y-0.5 pt-1">
          <p
            className="text-xs tracking-wide text-muted-foreground/70"
            style={{
              opacity: locVisible ? 1 : 0,
              transform: locVisible ? "translateY(0)" : "translateY(4px)",
              transition: "all 0.5s ease-out 0.3s",
            }}
          >
            Kodambakkam
          </p>
          <p
            className="text-xs tracking-wide text-muted-foreground/70"
            style={{
              opacity: locVisible ? 1 : 0,
              transform: locVisible ? "translateY(0)" : "translateY(4px)",
              transition: "all 0.5s ease-out 0.6s",
            }}
          >
            Mylapore
          </p>
        </div>
      )}
    </div>
  )
}

export function VisionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 22, suffix: "+", label: "Years of Experience", duration: 2000 },
    { value: 20000, suffix: "+", label: "Happy Patients", duration: 2000 },
    { value: 20, suffix: "+", label: "Dental Services", duration: 2000 },
    { value: 2, suffix: "", label: "Prime Clinic Locations in Chennai", duration: 300, showLocations: true },
  ]

  return (
    <section ref={sectionRef} id="stats" className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute left-0 top-0 h-full w-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(01)</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Care</span>
            </div>
          </div>

          <div className="lg:col-span-10">
            <div className="space-y-16 md:space-y-24">
              <div className="overflow-hidden">
                <h2 className="max-w-5xl text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(60px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
                  Your Smile. Our Commitment.
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:grid-cols-4 gap-y-8 border-t border-border pt-8" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s" }}>
                {stats.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <StatCard value={stat.value} suffix={stat.suffix} label={stat.label} duration={stat.duration} showLocations={stat.showLocations} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-border md:left-12 md:right-12 lg:left-20 lg:right-20" style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s" }} />
    </section>
  )
}