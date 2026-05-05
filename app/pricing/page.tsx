import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Image from "next/image"

const pricingData = [
  { treatment: "Dental Clip Treatment", tenure: "12 Months", emi: "₹ 4,200/month" },
  { treatment: "Dental Clip Treatment", tenure: "9 Months", emi: "₹ 5,500/month" },
  { treatment: "Dental Clip Treatment", tenure: "6 Months", emi: "₹ 11,000/month" },
  { treatment: "Dental Implant Treatment", tenure: "6 Months", emi: "₹ 5,000/month" },
  { treatment: "Dental Invisible Aligners (Invisalign)", tenure: "12 Months", emi: "₹ 10,000/month" },
  { treatment: "Dental Invisible Aligners (Invisalign)", tenure: "9 Months", emi: "₹ 13,000/month" },
  { treatment: "Dental Invisible Aligners (Invisalign)", tenure: "6 Months", emi: "₹ 20,000/month" },
  { treatment: "Dental Veneers and Laminates (Single Tooth)", tenure: "6 Months", emi: "₹ 2,000/month" },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Pricing</span><div className="h-px w-12 bg-border" /></div>
          <h1 className="mt-8 max-w-5xl text-pretty font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">Quality Dental Care Made Affordable!</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">Easy EMI payment options for your dental treatment with flexible tenure.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
          <div className="mb-12 md:mb-16">
            <h2 className="text-pretty font-serif text-2xl font-light leading-[1.1] tracking-[-0.01em] text-foreground md:text-3xl lg:text-4xl">Easy EMI Options</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">No extra charges. Flexible tenure: 6 to 12 months. Quick & simple process.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:py-6">Treatment</th>
                  <th className="pb-4 pr-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:py-6">Tenure</th>
                  <th className="pb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:py-6">EMI Starts From</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 pr-4 text-base text-foreground md:py-6 md:text-lg">{item.treatment}</td>
                    <td className="py-4 pr-4 text-base text-muted-foreground md:py-6 md:text-lg">{item.tenure}</td>
                    <td className="py-4 text-base font-medium text-accent md:py-6 md:text-lg">{item.emi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-base italic text-muted-foreground md:text-lg">*Other major dental treatments will be covered with T&C. EMI tenure available for 6 to 12 months. Eligibility checking will require PAN number and Aadhaar details.</p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <Image
            src="/images/pricing iamge.png"
            alt="Dental treatment pricing list"
            width={1200}
            height={1600}
            className="w-full h-auto rounded-lg shadow-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          />
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[1800px] px-6 md:px-12 lg:px-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-foreground">Eligibility Checking</h3>
              <p className="text-base text-muted-foreground">Will require PAN number & Aadhaar details</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-foreground">No Extra Charges</h3>
              <p className="text-base text-muted-foreground">Only treatment charges will be applicable</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-foreground">Book Your Appointment</h3>
              <p className="text-base text-muted-foreground">91768 24722 / 91766 24722</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}