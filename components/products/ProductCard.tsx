'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { getCategory } from '@/data/categories'
import type { Product, Tone } from '@/types'
import { AddToCartButton } from './AddToCartButton'
import { Price } from './Price'

const toneBg: Record<Tone, string> = {
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

type Props = {
  product: Product
  size?: 'regular' | 'large'
  sizes?: string
  priority?: boolean
}

/**
 * Product card with a tactile 3D tilt: the photo tile follows the pointer
 * a few degrees and lifts, like picking up a toy to look at it.
 */
export function ProductCard({ product, size = 'regular', sizes = '(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw', priority }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 20 })
  const lift = useSpring(0, { stiffness: 260, damping: 22 })

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onEnter = () => !reduce && lift.set(-8)
  const onLeave = () => {
    px.set(0)
    py.set(0)
    lift.set(0)
  }

  const cat = getCategory(product.category)
  const alt = product.images[1]
  const href = `/shop/${product.slug}`

  return (
    <article className="group relative flex flex-col" onPointerMove={onMove} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <div className="[perspective:900px]">
        <motion.div
          ref={ref}
          style={{ rotateX: rx, rotateY: ry, y: lift, transformStyle: 'preserve-3d' }}
          className={`relative overflow-hidden rounded-[var(--radius-card)] ${toneBg[product.tone]} ${
            size === 'large' ? 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]' : 'aspect-square'
          } shadow-[0_1px_0_rgb(42_37_32/0.06)] transition-shadow duration-300 group-hover:shadow-[0_26px_40px_-22px_rgb(70_45_20/0.55)]`}
        >
          <Link href={href} className="absolute inset-0 z-[1]" aria-label={`View ${product.name}`} />
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectPosition: product.images[0].focus ?? '50% 50%' }}
            className={`object-cover transition-[transform,opacity] duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.06] ${
              alt ? 'group-hover:opacity-0' : ''
            }`}
          />
          {alt && (
            <Image
              src={alt.src}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              className="scale-[1.08] object-cover opacity-0 transition-[transform,opacity] duration-700 ease-[var(--ease-out-quint)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          {product.ageLabel && (
            <span className="absolute top-3 left-3 z-[2] rounded-full bg-ivory/92 px-2.5 py-1 text-[12px] font-bold text-ink">
              {product.ageLabel}
            </span>
          )}
          <div className="absolute right-3 bottom-3 z-[2] translate-y-0 transition-transform duration-300 sm:translate-y-2 sm:opacity-90 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <AddToCartButton product={product} />
          </div>
        </motion.div>
      </div>

      <div className="mt-3 flex flex-col gap-1 px-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-bold tracking-[0.1em] text-ink-mute uppercase">{cat?.name}</p>
          <h3 className={`mt-1 font-display leading-[1.05] font-bold ${size === 'large' ? 'text-[24px] sm:text-[26px]' : 'text-[17px] sm:text-[20px]'}`}>
            <Link href={href} className="link-wiggle">
              {product.name}
            </Link>
          </h3>
          {size === 'large' && <p className="mt-2 max-w-[36ch] text-[15px] text-ink-soft">{product.tagline}</p>}
        </div>
        <Price product={product} className="shrink-0 text-[16px] sm:pt-5 sm:text-[17px]" />
      </div>
    </article>
  )
}
