import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { DishesSection } from "@/components/sections/dishes"
import { ExperienceSection } from "@/components/sections/experience"
import { HeroSection } from "@/components/sections/hero"
import { PhilosophySection } from "@/components/sections/philosophy"
import { ContactPreview, TestimonialsCarousel } from "@/components/sections/testimonials-contact"
import { DoctorSection } from "@/components/sections/doctor"
import { VisionSection } from "@/components/sections/vision"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <VisionSection />
      <PhilosophySection />
      <ExperienceSection />
      <DishesSection />
      <TestimonialsCarousel />
      <DoctorSection />
      <ContactPreview />
      <Footer />
    </main>
  )
}
