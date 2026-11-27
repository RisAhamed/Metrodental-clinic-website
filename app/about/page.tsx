"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useEffect, useRef, useState } from "react"

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.3 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(8, 95, 122, ${p.alpha})`
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(8, 95, 122, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  )
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-secondary">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary" />
        <div className="relative z-10 mx-auto max-w-[1800px] px-6 py-32 md:px-12 md:py-40 lg:px-20">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About Us</span>
              <div className="h-px w-12 bg-accent" />
            </div>
            <h1 className="text-pretty font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-6xl lg:text-7xl">
              Your Smile. Our Commitment.
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A trusted dental care center in Chennai, delivering high-quality, patient-centered treatments in a safe and comfortable environment.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(01)</span>
                <div className="h-px w-8 bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About</span>
              </div>
            </div>
            <div className="lg:col-span-10">
              <h2 className="text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground md:text-4xl lg:text-5xl">
                Comprehensive Dental Care in Chennai
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Metro Dental Clinic is a trusted and well-established dental care center committed to delivering high-quality, patient-centered treatments. Conveniently situated for easy accessibility, our clinic features modern infrastructure, advanced equipment, and strict sterilization protocols.
                </p>
                <p>
                  We believe a healthy smile is essential to overall well-being. Our approach focuses on treating dental problems and educating patients about preventive care and long-term oral health. From routine check-ups to advanced laser-assisted procedures, we provide comprehensive services including scaling, root canal treatments, cosmetic dentistry, crowns, bridges, implants, and pediatric dentistry.
                </p>
                <p>
                  Equipped with state-of-the-art diagnostic tools like RVG, OPG, and CBCT imaging systems, we ensure accurate diagnosis and effective treatment planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">(02)</span>
                <div className="h-px w-8 bg-primary-foreground/30" />
                <span className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">Founder</span>
              </div>
            </div>
            <div className="lg:col-span-10">
              <div className="max-w-4xl">
                  <h2 className="text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-primary-foreground md:text-4xl lg:text-5xl">
                    Dr. S. M. Ameerdeen
                  </h2>
                  <p className="mt-4 text-lg text-accent">BDS, General Dental Surgeon</p>
                  <div className="mt-8 space-y-6 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
                    <p>
                      Dr. S. M. Ameerdeen is the founder and chief dental surgeon of Metro Dental Clinic with over 22 years of extensive clinical experience in Chennai. His dedication, precision, and compassionate approach have earned the trust of countless patients.
                    </p>
                    <p>
                      His expertise spans preventive care, restorative treatments, cosmetic dentistry, and advanced laser procedures. He established Metro Dental Clinic to create a space where patients receive ethical, transparent, and high-quality care tailored to their needs.
                    </p>
                    <p>
                      Under his leadership, the clinic has become a reliable dental center for families, known for consistent quality, patient satisfaction, and professional excellence.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">(03)</span>
                <div className="h-px w-8 bg-border" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Team</span>
              </div>
            </div>
            <div className="lg:col-span-10">
              <h2 className="text-pretty font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground md:text-4xl lg:text-5xl">
                Our Expert Team
              </h2>
              <div className="mt-8 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  Metro Dental Clinic is supported by a team of experienced and skilled dental professionals who specialize in various branches of dentistry. Our collaborative approach ensures every patient receives comprehensive care, even for complex dental conditions.
                </p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    1
                  </div>
                  <h3 className="font-serif text-xl text-foreground">General Dentistry</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Routine check-ups, cleanings, and preventive care</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    2
                  </div>
                  <h3 className="font-serif text-xl text-foreground">Cosmetic Dentistry</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Veneers, laminates, and smile makeovers</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    3
                  </div>
                  <h3 className="font-serif text-xl text-foreground">Oral Surgery</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Extractions, implants, and surgical procedures</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    4
                  </div>
                  <h3 className="font-serif text-xl text-foreground">Orthodontics</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Aligners, braces, and bite correction</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    5
                  </div>
                  <h3 className="font-serif text-xl text-foreground">Pediatric Dentistry</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Child-friendly dental care</p>
                </div>
                <div className="group relative overflow-hidden rounded-lg bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-accent-foreground">
                    6
                  </div>
                  <h3 className="font-serif text-xl text-foreground">Laser Dentistry</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Advanced minimally invasive procedures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
