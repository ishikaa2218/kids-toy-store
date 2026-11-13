'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/format'

type Flight = { id: number; src: string; from: { x: number; y: number }; to: { x: number; y: number } }

/** Fire from an add-to-bag control: a small photo hops from `el` into the bag icon. */
export function flyToBag(el: HTMLElement, src: string) {
  const r = el.getBoundingClientRect()
  window.dispatchEvent(new CustomEvent('kh:fly', { detail: { src, x: r.left + r.width / 2, y: r.top + r.height / 2 } }))
}

/**
 * Add-to-bag feedback, mounted once in the layout:
 *  - a little photo token that arcs into the bag icon (skipped for reduced motion)
 *  - a polite confirmation naming exactly what was added, with a shortcut to the bag
 */
export function BagFeedback() {
  const { lastAdded, isOpen, open } = useCart()
  const reduce = useReducedMotion()
  const [flights, setFlights] = useState<Flight[]>([])
  const [toast, setToast] = useState<typeof lastAdded>(null)
  const timer = useRef<number | null>(null)
  const seen = useRef(0)

  useEffect(() => {
    if (reduce) return
    const onFly = (e: Event) => {
      const d = (e as CustomEvent<{ src: string; x: number; y: number }>).detail
      const bag = document.getElementById('bag-button')?.getBoundingClientRect()
      if (!bag) return
      const flight = {
        id: Date.now() + Math.random(),
        src: d.src,
        from: { x: d.x, y: d.y },
        to: { x: bag.left + bag.width / 2, y: bag.top + bag.height / 2 },
      }
      setFlights((f) => [...f, flight])
    }
    window.addEventListener('kh:fly', onFly)
    return () => window.removeEventListener('kh:fly', onFly)
  }, [reduce])

  useEffect(() => {
    if (!lastAdded || lastAdded.tick === seen.current) return
    seen.current = lastAdded.tick
    setToast(lastAdded)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(null), 3600)
  }, [lastAdded])

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    [],
  )

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
        {flights.map((f) => (
          <motion.div
            key={f.id}
            className="absolute top-0 left-0 size-14 overflow-hidden rounded-[30%] border-[3px] border-ivory bg-sand shadow-[0_12px_24px_-10px_rgb(70_45_20/0.6)]"
            initial={{ x: f.from.x - 28, y: f.from.y - 28, scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{
              x: [f.from.x - 28, (f.from.x + f.to.x) / 2 - 28, f.to.x - 28],
              y: [f.from.y - 28, Math.min(f.from.y, f.to.y) - 90, f.to.y - 28],
              scale: [0.6, 1.05, 0.25],
              rotate: [-10, 12, 30],
              opacity: [0, 1, 0.9],
            }}
            transition={{ duration: 0.75, ease: [0.45, 0, 0.25, 1], times: [0, 0.45, 1] }}
            onAnimationComplete={() => setFlights((all) => all.filter((x) => x.id !== f.id))}
          >
            <Image src={f.src} alt="" fill sizes="56px" className="object-cover" />
          </motion.div>
        ))}
      </div>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-[85] flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6"
      >
        <AnimatePresence>
          {toast && !isOpen && (
            <motion.div
              key={toast.tick}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -2, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto flex w-full max-w-[400px] items-center gap-3 rounded-[22px] bg-ink p-3 pr-2 text-ivory shadow-[0_20px_40px_-18px_rgb(42_37_32/0.7)]"
            >
              <span className="relative size-12 shrink-0 overflow-hidden rounded-[14px] bg-sand">
                <Image
                  src={toast.product.images[0].src}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                  style={{ objectPosition: toast.product.images[0].focus }}
                />
                <span className="absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full bg-leaf text-ink">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold tracking-[0.08em] text-mustard uppercase">Added to bag</span>
                <span className="block truncate text-[14.5px] font-semibold">
                  {toast.product.name} × {toast.qty}
                </span>
                <span className="block text-[12.5px] text-ivory/70">
                  {formatPrice((toast.product.salePrice ?? toast.product.price) * toast.qty)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setToast(null)
                  open()
                }}
                className="min-h-10 shrink-0 rounded-full bg-mustard px-4 text-[13.5px] font-bold text-ink transition-transform active:scale-95"
              >
                View bag
              </button>
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Dismiss"
                className="grid size-9 shrink-0 place-items-center rounded-full text-ivory/70 hover:bg-ivory/10"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
