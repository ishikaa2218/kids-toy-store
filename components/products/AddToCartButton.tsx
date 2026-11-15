'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { flyToBag } from '@/components/cart/BagFeedback'
import type { Product } from '@/types'

type Props = {
  product: Product
  qty?: number
  variant?: 'compact' | 'full'
  openDrawer?: boolean
  className?: string
}

/** Adds to the bag with a short "Added" confirmation state. */
export function AddToCartButton({ product, qty = 1, variant = 'compact', openDrawer = false, className = '' }: Props) {
  const { add, open } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!openDrawer) flyToBag(e.currentTarget, product.images[0].src)
    add(product.id, qty)
    setAdded(true)
    if (openDrawer) open()
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), 1600)
  }

  const label = added ? 'Added to bag' : `Add ${product.name} to bag`

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title="Add to bag"
        className={`grid size-11 place-items-center rounded-full text-ink transition-[background-color,transform] duration-200 ease-[var(--ease-out-back)] hover:scale-110 hover:-rotate-6 active:scale-90 ${
          added ? 'bg-leaf' : 'bg-tangerine hover:bg-[#ff7a40]'
        } ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={added ? 'ok' : 'add'}
            initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            {added ? <Check className="size-5" strokeWidth={2.8} /> : <Plus className="size-5" strokeWidth={2.8} />}
          </motion.span>
        </AnimatePresence>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group/btn inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-8 text-[17px] font-bold text-ink shadow-[inset_0_-3px_0_rgb(0_0_0/0.14)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
        added ? 'bg-leaf' : 'bg-tangerine hover:bg-[#ff7a40]'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={added ? 'ok' : 'add'}
          className="inline-flex items-center gap-3"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {added ? <Check className="size-5" strokeWidth={2.6} /> : <ShoppingBag className="size-5" strokeWidth={2.2} />}
          {added ? 'Added to bag' : 'Add to bag'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
