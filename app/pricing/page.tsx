import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Image from "next/image"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Pricing</span><div className="h-px w-12 bg-border" /></div>
          <h1 className="mt-8 max-w-5xl text-pretty font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">Transparent pricing for quality dental care.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Know the cost of your treatment upfront. No hidden fees.</p>
        </div>
      </section>
      <section className="w-full overflow-x-auto px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <div className="relative mx-auto min-h-[600px] w-full min-w-[280px] max-w-[1600px)]">
          <Image
            src="/images/pricing iamge.png"
            alt="Dental treatment pricing list"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </div>
      </section>
      <Footer />
    </main>
  )
}