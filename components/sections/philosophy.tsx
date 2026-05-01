"use client"

import { useEffect, useRef, useState } from "react"
import { ImageReveal } from "@/components/ui/image-reveal"

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.15 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const principles = [
    { number: "01", title: "Trust Before Treatment", description: "We explain findings clearly, listen to concerns, and help each patient feel informed before care begins." },
    { number: "02", title: "Precision In Every Step", description: "Digital scans, advanced imaging, and careful clinical planning support accurate diagnosis and predictable outcomes." },
    { number: "03", title: "Comfort-Led Dentistry", description: "Gentle technique, calm pacing, and thoughtful after-care make dental visits easier for children, adults, and seniors." },
    { number: "04", title: "Long-Term Smile Health", description: "Our goal is not just immediate relief. We protect function, aesthetics, and confidence for years to come." },
  ]

  return (
    <section ref={sectionRef} id="philosophy" className="relative overflow-hidden bg-primary py-32 text-primary-foreground md:py-48">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {[200, 600, 900].map((y, index) => (
            <line key={y} x1="0" y1={y} x2="1920" y2={index === 1 ? 300 : y + 200} stroke="currentColor" strokeWidth="1" className="opacity-10" style={{ strokeDasharray: 2000, strokeDashoffset: isVisible ? 0 : 2000, transition: `stroke-dashoffset ${2 + index * 0.25}s ease-out ${index * 0.3}s` }} />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">(02)</span>
              <div className="h-px w-8 bg-primary-foreground/30" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">Mission</span>
            </div>
          </div>

          <div className="lg:col-span-10">
            <div className="mb-20 md:mb-32">
              <h2 className="max-w-4xl text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] sm:text-4xl md:text-5xl lg:text-6xl" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
                We believe great dental care is about more than just treating teeth. It is about building trust, alleviating fear, and restoring confidence, one smile at a time.
              </h2>
            </div>

            <div className="grid gap-x-16 gap-y-20 md:grid-cols-2">
              {principles.map((principle, index) => (
                <div key={principle.number} className="group" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s` }}>
                  <div className="flex items-start gap-6">
                    <span className="pt-1 font-mono text-xs tracking-wider text-primary-foreground/50">{principle.number}</span>
                    <div className="space-y-4">
                      <h3 className="font-serif text-2xl font-light text-primary-foreground transition-colors duration-500 group-hover:text-white md:text-3xl">{principle.title}</h3>
                      <p className="text-base leading-relaxed text-primary-foreground/75">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-32 md:mt-48" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(60px)", transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s" }}>
          <div className="relative aspect-[21/15.35] overflow-hidden">
            <ImageReveal src="/images/Digital intra oral scans.png" alt="Digital intra oral scan technology at Metro Dental Clinic" className="object-cover" sizes="(max-width: 1800px) 100vw, 1800px" delay={600} />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
          <div className="absolute -bottom-8 right-0 bg-primary px-6 py-4">
            <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Modern diagnostics, gentle hands</span>
          </div>
        </div>
      </div>
    </section>
  )
}
