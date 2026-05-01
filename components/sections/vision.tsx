"use client"

import { useEffect, useRef, useState } from "react"

function CountUp({ value, suffix = "", active }: { value: number; suffix?: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const totalFrames = 80
    const start = performance.now()
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1600, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      frame += 1
      if (progress < 1 && frame < totalFrames + 20) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, value])

  return <>{count.toLocaleString("en-IN")}{suffix}</>
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
    { value: 22, suffix: "+", label: "Years of Experience" },
    { value: 10000, suffix: "+", label: "Happy Patients" },
    { value: 20, suffix: "+", label: "Dental Services" },
    { value: 2, suffix: "", label: "Clinic Locations" },
  ]

  return (
    <section ref={sectionRef} id="stats" className="relative overflow-hidden py-32 md:py-48 lg:py-64">
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

              <div className="grid gap-12 md:grid-cols-2 md:gap-20">
                <p className="text-lg leading-relaxed text-foreground/80 md:text-xl" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}>
                  Metro Dental Clinic brings together trusted experience, modern diagnostics, and calm communication so every visit feels clear and reassuring.
                </p>
                <p className="text-lg leading-relaxed text-foreground/80 md:text-xl" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s" }}>
                  From preventive checkups to laser-assisted treatments and implants, our team focuses on precision, comfort, and long-term oral health.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4 md:gap-12" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s" }}>
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2 leading-5">
                    <span className="font-sans text-4xl font-light text-foreground md:text-5xl lg:text-8xl">
                      <CountUp value={stat.value} suffix={stat.suffix} active={isVisible} />
                    </span>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</p>
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
