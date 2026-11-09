'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { QtyStepper } from '@/components/cart/QtyStepper'
import type { Product } from '@/types'
import { AddToCartButton } from './AddToCartButton'

export function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const { maxQty } = useCart()
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(maxQty, n)))} max={maxQty} label="Quantity" />
      <AddToCartButton product={product} qty={qty} variant="full" openDrawer className="flex-1 sm:flex-none sm:min-w-[260px]" />
    </div>
  )
}
