import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { brand } from '@/config/brand'
import { CartProvider } from '@/context/CartContext'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { MotionProvider } from '@/components/ui/MotionProvider'

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — Wooden toys, puzzles & imaginative play`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    type: 'website',
    siteName: brand.name,
    title: `${brand.name} — Little toys. Big imaginations.`,
    description: brand.description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#fbf4e6',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
