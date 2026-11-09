import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ShopView } from '@/components/products/ShopView'

export const metadata: Metadata = {
  title: 'Shop toys',
  description: 'Browse wooden toys, pretend play, puzzles, stacking toys, plush friends and creative kits. Filter by age, category and price.',
  alternates: { canonical: '/shop' },
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[70svh]" />}>
      <ShopView />
    </Suspense>
  )
}
