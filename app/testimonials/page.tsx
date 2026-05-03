import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Testimonials</span><div className="h-px w-12 bg-border" /></div>
          <h1 className="mt-8 max-w-5xl text-pretty font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">Patient stories from two decades of trusted care.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Verified patient feedback across checkups, fillings, whitening, braces, root canals, crowns, implants, and emergency care.</p>
        </div>
      </section>
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1800px]"><TestimonialsGrid /></div>
      </section>
      <Footer />
    </main>
  )
}
