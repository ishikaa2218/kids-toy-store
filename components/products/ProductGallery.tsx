'use client'

import Image from 'next/image'
import { useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { Clay } from '@/components/ui/Clay'
import { Tilt } from '@/components/ui/Tilt'
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

/**
 * Product photos on a lifted, tiltable tile.
 *  - mouse: hover to magnify where the pointer is
 *  - touch: tap to zoom, swipe to change photo
 *  - keyboard: thumbnails, arrow buttons and the zoom toggle are all buttons
 */
export function ProductGallery({ product }: { product: Product }) {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const reduce = useReducedMotion()
  const img = product.images[i]
  const many = product.images.length > 1

  const go = (next: number) => {
    const n = (next + product.images.length) % product.images.length
    setDir(next > i ? 1 : -1)
    setI(n)
    setZoom(false)
  }

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const onSwipe = (_: unknown, info: PanInfo) => {
    if (zoom || !many) return
    if (info.offset.x < -50) go(i + 1)
    else if (info.offset.x > 50) go(i - 1)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
      <div className="relative order-1 sm:order-2">
        <Clay
          tone={product.tone === 'coral' ? 'mustard' : 'coral'}
          shape="pebble"
          className="pointer-events-none absolute -top-4 -right-3 z-10 h-12 w-16 rotate-12 sm:h-14 sm:w-20"
        />
        <Tilt max={zoom ? 0 : 4} lift={6}>
          <div
            className={`group/zoom relative aspect-[4/4.2] overflow-hidden rounded-[32px] ${bg[product.tone]} shadow-[0_9px_0_rgb(70_45_20/0.12)]`}
            data-cursor="view"
            data-cursor-label={zoom ? 'Zoom out' : 'Zoom'}
            onPointerMove={(e) => (e.pointerType === 'mouse' || zoom) && onMove(e)}
            onPointerEnter={(e) => e.pointerType === 'mouse' && !reduce && setZoom(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setZoom(false)}
            onClick={(e) => {
              onMove(e as unknown as PointerEvent<HTMLDivElement>)
              setZoom((z) => !z)
            }}
          >
            <AnimatePresence initial={false} mode="popLayout" custom={dir}>
              <motion.div
                key={img.src}
                className="absolute inset-0 touch-pan-y"
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: `${dir * 12}%`, rotate: dir * 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: `${-dir * 12}%`, rotate: -dir * 2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={many && !zoom ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onSwipe}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  draggable={false}
                  sizes="(min-width:1024px) 52vw, 100vw"
                  className="object-cover transition-transform duration-300 ease-out"
                  style={{ objectPosition: img.focus ?? '50% 50%', transformOrigin: origin, transform: zoom ? 'scale(1.9)' : 'scale(1)' }}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setZoom((z) => !z)
              }}
              aria-label={zoom ? 'Zoom out' : 'Zoom in'}
              aria-pressed={zoom}
              className="absolute top-4 left-4 z-[2] grid size-11 place-items-center rounded-full bg-ivory/90 text-ink shadow-sm transition-transform hover:scale-105"
            >
              {zoom ? <ZoomOut className="size-5" strokeWidth={2.2} /> : <ZoomIn className="size-5" strokeWidth={2.2} />}
            </button>

            {many && (
              <div className="absolute right-4 bottom-4 z-[2] flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(i - 1)
                  }}
                  aria-label="Previous photo"
                  className="grid size-11 place-items-center rounded-full bg-ivory/90 text-ink shadow-sm transition-transform hover:-translate-x-0.5"
                >
                  <ChevronLeft className="size-5" strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(i + 1)
                  }}
                  aria-label="Next photo"
                  className="grid size-11 place-items-center rounded-full bg-ivory/90 text-ink shadow-sm transition-transform hover:translate-x-0.5"
                >
                  <ChevronRight className="size-5" strokeWidth={2.4} />
                </button>
              </div>
            )}
          </div>
        </Tilt>
        {many && (
          <p className="mt-3 text-center text-[13px] text-ink-mute sm:hidden">
            Photo {i + 1} of {product.images.length} · swipe or tap to zoom
          </p>
        )}
      </div>

      {many && (
        <ul className="order-2 flex gap-3 sm:order-1 sm:flex-col" aria-label="Product images">
          {product.images.map((im, k) => (
            <li key={im.src}>
              <button
                type="button"
                onClick={() => go(k)}
                aria-label={`Show image ${k + 1}: ${im.alt}`}
                aria-pressed={k === i}
                className={`relative block size-20 overflow-hidden rounded-[18px] transition-[transform,box-shadow] duration-300 sm:size-[88px] ${
                  k === i
                    ? 'ring-4 ring-olive ring-offset-2 ring-offset-cream'
                    : 'opacity-75 hover:-translate-y-1 hover:rotate-[-3deg] hover:opacity-100'
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
