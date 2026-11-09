'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/format'
import { QtyStepper } from './QtyStepper'

/** Line items shared by the drawer and the bag page. */
export function CartLines({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  const { lines, setQty, remove, maxQty } = useCart()
  return (
    <ul className="divide-y divide-ink/10">
      <AnimatePresence initial={false}>
        {lines.map((l) => (
          <motion.li
            key={l.id}
            layout
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24, height: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 py-5"
          >
            <Link
              href={`/shop/${l.product.slug}`}
              onClick={onNavigate}
              className={`relative shrink-0 overflow-hidden rounded-[16px] bg-sand ${compact ? 'size-20' : 'size-24 sm:size-28'}`}
            >
              <Image src={l.product.images[0].src} alt={l.product.images[0].alt} fill sizes="112px" className="object-cover" style={{ objectPosition: l.product.images[0].focus }} />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/shop/${l.product.slug}`} onClick={onNavigate} className="link-wiggle font-display text-[18px] leading-tight font-bold">
                    {l.product.name}
                  </Link>
                  <p className="mt-1 text-[13.5px] text-ink-mute">{formatPrice(l.product.salePrice ?? l.product.price)} each</p>
                </div>
                <p className="shrink-0 font-bold tabular-nums">{formatPrice(l.lineTotal)}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <QtyStepper size="sm" value={l.qty} max={maxQty} onChange={(n) => setQty(l.id, n)} label={`Quantity of ${l.product.name}`} />
                <button
                  type="button"
                  onClick={() => remove(l.id)}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-[13.5px] font-semibold text-ink-soft transition-colors hover:bg-coral/10 hover:text-coral"
                >
                  <Trash2 className="size-4" strokeWidth={2} aria-hidden /> Remove
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
