import type { Metadata } from "next"
import { AccountPanel } from "@/components/account-panel"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "My Account",
  description: "View and manage your Metro Dental Clinic account.",
}

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Patient Portal</p>
          <h1 className="mt-6 font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-6xl">
            My Account.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            Your details, appointments and care — all in one place.
          </p>
        </div>
      </section>
      <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <AccountPanel />
      </section>
      <Footer />
    </main>
  )
}
