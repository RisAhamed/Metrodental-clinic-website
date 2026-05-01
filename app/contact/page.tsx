import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { branches } from "@/lib/dental-data"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="relative overflow-hidden bg-secondary px-6 pb-20 pt-36 md:px-12 md:pt-44 lg:px-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact Us</span><div className="h-px w-12 bg-border" /></div>
          <h1 className="mt-8 max-w-5xl text-pretty font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] text-foreground md:text-7xl lg:text-8xl">Book your visit at the branch closest to you.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">All numbers support both Call & WhatsApp.</p>
        </div>
      </section>
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-2">
          {branches.map((branch) => (
            <article key={branch.name} className="overflow-hidden bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="space-y-8 p-8 md:p-10">
                <h2 className="font-serif text-4xl font-light text-foreground">{branch.name}</h2>
                <div className="space-y-2"><span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Address</span><p className="leading-relaxed text-foreground/80">{branch.address}</p></div>
                <div className="space-y-2"><span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Timings</span>{branch.timings.map((time) => <p key={time} className="text-foreground/80">{time}</p>)}</div>
                <div className="space-y-2"><span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone Numbers</span><div className="flex flex-wrap gap-4">{branch.phones.map((phone) => <a key={phone.label} href={phone.href} className="text-foreground transition-colors duration-300 hover:text-accent">{phone.label}</a>)}</div></div>
                <div className="flex flex-wrap gap-3"><a href={branch.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] px-5 py-3 text-sm uppercase tracking-[0.1em] text-white transition-transform duration-300 hover:-translate-y-0.5">WhatsApp</a><a href={branch.map} target="_blank" rel="noopener noreferrer" className="bg-primary px-5 py-3 text-sm uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-300 hover:bg-[#085f7a]">Google Maps</a></div>
              </div>
              <iframe src={branch.embed} title={`${branch.name} Google Map`} className="h-80 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-[1800px] border border-border bg-secondary p-8 text-center">
          <h2 className="font-serif text-3xl font-light text-foreground">Dr. S. M. Ameerdeen</h2>
          <a href="tel:+919940552292" className="mt-3 inline-block text-lg text-accent">99405 52292</a>
          <p className="mt-6 text-muted-foreground">All numbers support both Call & WhatsApp.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
