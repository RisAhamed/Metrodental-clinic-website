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
  metadataBase: new URL("https://v0-metrodentalclinic.vercel.app"),
  title: {
    default: "Metro Dental Clinic | Your Smile, Our Care.",
    template: "%s | Metro Dental Clinic",
  },
  description: "Your Smile, Our Care. Trusted dental care in Chennai since 2002, offering gentle checkups, cosmetic dentistry, laser care, braces, implants, and emergency dental support.",
  alternates: {
    canonical: "/",
  },
  generator: "v0.app",
  openGraph: {
    title: "Metro Dental Clinic | Your Smile, Our Care.",
    description: "Trusted dental care in Chennai since 2002. Gentle, precise treatments for healthier, brighter smiles.",
    url: "https://v0-metrodentalclinic.vercel.app",
    siteName: "Metro Dental Clinic",
    images: [
      {
        url: "/images/Smiling%20Image.jpg",
        width: 2560,
        height: 1920,
        alt: "A bright healthy smile representing Metro Dental Clinic care",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metro Dental Clinic | Your Smile, Our Care.",
    description: "Trusted dental care in Chennai since 2002. Gentle, precise treatments for healthier, brighter smiles.",
    images: ["/images/Smiling%20Image.jpg"],
  },
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
