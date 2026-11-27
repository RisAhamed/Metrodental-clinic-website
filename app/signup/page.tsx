import type { Metadata } from "next"
import { SignUp } from "@clerk/nextjs"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { clerkAppearance } from "@/lib/clerk-appearance"
import { storeUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Metro Dental Clinic account for easier appointments and care.",
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-32 md:px-12 md:pt-40 lg:px-20">
        <div className="mx-auto grid max-w-[1800px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Join the Clinic</p>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-6xl">
              Your smile, our care.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Create an account to book visits, save your details and keep everything connected to your care.
            </p>
            <ul className="mt-10 space-y-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <li className="border-t border-border pt-4">Gentle, precise dental care</li>
              <li className="border-t border-border pt-4">Simple appointment booking</li>
              <li className="border-t border-border pt-4">One account for every clinic</li>
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[440px]">
              <SignUp
                routing="path"
                path="/signup"
                signInUrl="/login"
                fallbackRedirectUrl={storeUrl || "/account"}
                appearance={clerkAppearance}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
