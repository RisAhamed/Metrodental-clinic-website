"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const details = [
    { course: "Consultation", timing: "First Visit", title: "Listening First", description: "We begin with your concern, oral health history, and a careful clinical examination before recommending the next step.", details: ["Dental checkup", "Gum assessment", "Treatment guidance", "Comfort planning"] },
    { course: "Diagnosis", timing: "Digital Clarity", title: "Precise Planning", description: "Digital scans and X-rays help us understand the root cause clearly and plan treatment with confidence.", details: ["Intra-oral scans", "RVG imaging", "OPG and CBCT", "Clear explanation"] },
    { course: "Treatment", timing: "Focused Care", title: "Gentle Execution", description: "From fillings and root canals to laser procedures and implants, treatment is performed with attention to precision and patient comfort.", details: ["Preventive care", "Cosmetic dentistry", "Laser dentistry", "Implantology"] },
    { course: "Follow-Up", timing: "Long-Term", title: "Healthy Smiles Ahead", description: "We guide you after treatment with practical care instructions and maintenance visits to protect your results.", details: ["After-care guidance", "Review visits", "Oral hygiene advice", "Family dental care"] },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 lg:sticky lg:top-32" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateX(0)" : "translateX(-20px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(03)</span>
              <div className="h-px w-8 bg-border" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Doctor</span>
            </div>
          </div>

          <div className="lg:col-span-10">
            <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:gap-20 md:mb-32">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
                <Image src="/images/Doctor image.png" alt="Dr. S. M. Ameerdeen, BDS General Dental Surgeon" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
              </div>

              <div className="space-y-8">
                <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">22 Years of Experience</p>
                  <h2 className="text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">Dr. S. M. Ameerdeen</h2>
<p className="mt-4 text-lg text-accent">BDS, General Dental Surgeon</p>
                </div>

                <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s" }}>
                  <p>Dr. S. M. Ameerdeen is a highly experienced BDS General Dental Surgeon with over 22 years of dedicated practice in Chennai. Known for his meticulous approach and compassionate patient care, he brings together clinical precision and a genuine commitment to every patient's oral health journey.</p>
                  <p>At Metro Dental Clinic, Dr. Ameerdeen and his team offer a comprehensive range of dental treatments, from preventive care and cosmetic dentistry to advanced laser procedures and implantology. His philosophy: every patient deserves to leave the clinic with not just a healthier smile, but a reassured heart.</p>
                  <p>Patients across Chennai have trusted Metro Dental Clinic as their family dental home for over two decades, a testament to the consistency, care, and expertise delivered at every visit.</p>
                </div>
              </div>
            </div>

            <div className="space-y-0">
              {details.map((step, index) => (
                <div key={step.course} className="group border-t border-border" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s` }}>
                  <button type="button" onClick={() => setActiveStep(activeStep === index ? -1 : index)} className="w-full py-8 text-left md:py-12" aria-expanded={activeStep === index}>
                    <div className="grid items-start gap-4 md:grid-cols-12 md:gap-8">
                      <div className="flex items-center gap-4 md:col-span-3"><span className="font-mono text-xs tracking-wider text-muted-foreground">0{index + 1}</span><span className="font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-2xl">{step.course}</span></div>
                      <div className="md:col-span-6"><h3 className="text-lg text-foreground/80 transition-colors duration-300 group-hover:text-foreground md:text-xl">{step.title}</h3></div>
                      <div className="flex items-center justify-between md:col-span-3"><span className="text-sm text-muted-foreground">{step.timing}</span><span className="text-lg text-muted-foreground transition-transform duration-300" style={{ transform: activeStep === index ? "rotate(45deg)" : "rotate(0)" }}>+</span></div>
                    </div>
                  </button>
                  <div className="overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: activeStep === index ? "400px" : "0", opacity: activeStep === index ? 1 : 0 }}>
                    <div className="grid gap-8 pb-12 md:grid-cols-12 md:pb-16">
                      <div className="md:col-span-3" />
                      <div className="space-y-6 md:col-span-6">
                        <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                        <ul className="grid grid-cols-2 gap-3">
                          {step.details.map((detail) => <li key={detail} className="flex items-center gap-2 text-sm text-foreground/70"><span className="h-1 w-1 bg-accent" />{detail}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
