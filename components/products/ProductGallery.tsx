'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Clay } from '@/components/ui/Clay'
import type { Product, Tone } from '@/types'

const bg: Record<Tone, string> = {
  cream: 'bg-[#f4ead6]',
  sand: 'bg-sand',
  olive: 'bg-[#c9d2a8]',
  leaf: 'bg-[#cfe2b6]',
  mustard: 'bg-[#f6d98d]',
  sky: 'bg-[#cfe0f3]',
  coral: 'bg-[#f5c2b0]',
  orange: 'bg-[#f8c9a0]',
  wood: 'bg-[#e6cfb3]',
}

export function ProductGallery({ product }: { product: Product }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const img = product.images[i]
  return (
    <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
      <div className="relative order-1 sm:order-2">
        <Clay tone={product.tone === 'coral' ? 'mustard' : 'coral'} shape="pebble" className="pointer-events-none absolute -top-4 -right-3 z-10 h-12 w-16 rotate-12 sm:h-14 sm:w-20" />
        <div className={`relative aspect-[4/4.2] overflow-hidden rounded-[32px] ${bg[product.tone]}`}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={img.src}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 52vw, 100vw"
                className="object-cover"
                style={{ objectPosition: img.focus ?? '50% 50%' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {product.images.length > 1 && (
        <ul className="order-2 flex gap-3 sm:order-1 sm:flex-col" aria-label="Product images">
          {product.images.map((im, k) => (
            <li key={im.src}>
              <button
                type="button"
                onClick={() => setI(k)}
                aria-label={`Show image ${k + 1}: ${im.alt}`}
                aria-pressed={k === i}
                className={`relative block size-20 overflow-hidden rounded-[18px] transition-[transform,box-shadow] duration-300 sm:size-[88px] ${
                  k === i ? 'ring-4 ring-olive ring-offset-2 ring-offset-cream' : 'opacity-75 hover:-translate-y-0.5 hover:opacity-100'
                }`}
              >
                <Image src={im.src} alt="" fill sizes="88px" className="object-cover" style={{ objectPosition: im.focus }} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
