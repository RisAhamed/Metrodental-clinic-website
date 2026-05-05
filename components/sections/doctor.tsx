"use client"

import { useEffect, useRef, useState } from "react"

export function DoctorSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 lg:sticky lg:top-32" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(06)</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Doctor</span>
            </div>
          </div>

          <div className="lg:col-span-10">
            <div className="space-y-8">
              <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>
                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">22 Years of Experience</p>
                <h2 className="text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">Dr. S. M. Ameerdeen</h2>
                <p className="mt-4 text-lg text-accent">BDS, General Dental Surgeon</p>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s" }}>
                <p>Dr. S. M. Ameerdeen is a highly experienced BDS General Dental Surgeon with over 22 years of dedicated practice in Chennai. Known for his meticulous approach and compassionate patient care, he brings together clinical precision and a genuine commitment to every patient&apos;s oral health journey.</p>
                <p>At Metro Dental Clinic, Dr. Ameerdeen and his team offer a comprehensive range of dental treatments, from preventive care and cosmetic dentistry to advanced laser procedures and implantology. His philosophy: every patient deserves to leave the clinic with not just a healthier smile, but a reassured heart.</p>
                <p>Patients across Chennai have trusted Metro Dental Clinic as their family dental home for over two decades, a testament to the consistency, care, and expertise delivered at every visit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}