import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ServicesGrid } from "@/components/services/services-grid"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Services</span><div className="h-px w-12 bg-border" /></div>
          <h1 className="mt-8 max-w-5xl text-pretty font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">Complete dental care, delivered with precision and warmth.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Explore preventive, restorative, cosmetic, orthodontic, laser, and implant dentistry services at Metro Dental Clinic.</p>
        </div>
      </section>
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1800px]"><ServicesGrid /></div>
      </section>
      <Footer />
    </main>
  )
}
