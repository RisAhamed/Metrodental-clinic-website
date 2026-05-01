import React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingWhatsapp } from "@/components/floating-whatsapp"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500", "600", "700"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] })

export const metadata: Metadata = {
  title: "Metro Dental Clinic | Your Smile. Our Commitment.",
  description: "Trusted dental care in Chennai since 2002, offering preventive, cosmetic, laser, orthodontic, and implant dentistry.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <FloatingWhatsapp />
        <Analytics />
      </body>
    </html>
  )
}
