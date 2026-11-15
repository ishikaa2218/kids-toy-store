import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { brand } from '@/config/brand'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { MotionProvider } from '@/components/ui/MotionProvider'
import { BagFeedback } from '@/components/cart/BagFeedback'

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.headline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    type: 'website',
    siteName: brand.name,
    title: `${brand.name} — ${brand.headline}`,
    description: brand.description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: `${brand.name} — ${brand.headline}`, description: brand.description },
  applicationName: brand.name,
  keywords: ['Kinderhouse', 'toy shop', 'wooden toys', 'pretend play', 'puzzles', 'plush toys', 'kids toys India'],
}

export const viewport: Viewport = {
  themeColor: '#fbf5ea',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CartProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <BagFeedback />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
