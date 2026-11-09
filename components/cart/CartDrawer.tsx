'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/format'
import { ButtonLink } from '@/components/ui/Button'
import { CartLines } from './CartLines'
import { EmptyBag } from './EmptyBag'

export function CartDrawer() {
  const { isOpen, close, lines, count, subtotal } = useCart()
  const reduce = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => close(), [pathname, close])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('button, a')?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && panel.current) {
        const f = [...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
        if (!f.length) return
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault()
          f[0].focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[80]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" tabIndex={-1} aria-label="Close bag" onClick={close} className="absolute inset-0 bg-ink/35" />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-ivory"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-[26px] font-bold">
                Your bag <span className="text-ink-mute">({count})</span>
              </h2>
              <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full hover:bg-ink/8" aria-label="Close bag">
                <X className="size-5" strokeWidth={2.2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">{lines.length ? <CartLines compact onNavigate={close} /> : <EmptyBag onNavigate={close} />}</div>

            {lines.length > 0 && (
              <div className="border-t border-ink/10 px-6 pt-5 pb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] text-ink-soft">Subtotal</span>
                  <span className="font-display text-[26px] font-bold tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-[13px] text-ink-mute">Delivery and taxes are not calculated in this preview.</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <ButtonLink href="/cart" variant="outline" onClick={close}>
                    View bag
                  </ButtonLink>
                  <ButtonLink href="/checkout" onClick={close}>
                    Checkout
                  </ButtonLink>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
