"use client"

import { whatsappUrl } from "@/lib/dental-data"

export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="whatsapp-pulse fixed bottom-6 right-6 z-[9999] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/35 transition-transform duration-300 hover:scale-110"
    >
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.01 3.2c-7.06 0-12.8 5.67-12.8 12.65 0 2.23.6 4.4 1.73 6.3L3.1 28.8l6.84-1.78a12.92 12.92 0 0 0 6.07 1.53c7.05 0 12.79-5.67 12.79-12.65S23.06 3.2 16.01 3.2Zm0 23.2c-1.9 0-3.76-.5-5.39-1.45l-.39-.23-4.06 1.06 1.09-3.9-.26-.4a10.35 10.35 0 0 1-1.6-5.53c0-5.79 4.76-10.5 10.61-10.5 5.84 0 10.6 4.71 10.6 10.5s-4.76 10.45-10.6 10.45Zm5.82-7.83c-.32-.16-1.9-.93-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.88-1.78-2.2-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.71-.98-2.34-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.15 3.09 1.31 3.3.16.21 2.27 3.43 5.49 4.81.77.33 1.37.53 1.83.68.77.24 1.47.21 2.03.13.62-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  )
}
