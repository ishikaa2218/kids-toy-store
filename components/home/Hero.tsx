'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { MaskLines } from '@/components/ui/Motion'
import { mascot } from '@/config/visuals'
import { ease } from '@/lib/motion'

/** width of the mascot strip; the strip overflows the screen on phones so the cub stays big */
const STRIP = 'max(min(1120px, 94vw), 780px)'
const VISIBLE = mascot.ledge * (mascot.height / mascot.width) // visible height ÷ width, above the ledge

/**
 * The hero: a calm headline, one clear action and Kinderhouse's clay cub
 * peeking over the edge of the "table" that the rest of the shop sits on.
 */
export function Hero() {
  return (
    <section className="relative bg-cream" style={{ paddingBottom: `calc(${STRIP} * ${VISIBLE})` }}>
      <div className="container-play flex flex-col items-center pt-10 pb-8 text-center sm:pt-16 lg:pt-20">
        <MaskLines as="h1" trigger="mount" className="t-display" lines={['Little toys.', 'Big imaginations.']} />
        <motion.p
          className="t-lead mt-6 max-w-[44ch]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: ease.out }}
        >
          Wooden toys, pretend play, puzzles and soft friends — chosen for little hands, open-ended play and the stories that follow.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: ease.out }}
        >
          <ButtonLink href="/shop" className="min-h-14 px-8 text-[17px]">
            Shop toys
            <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.4} aria-hidden />
          </ButtonLink>
          <Link href="#categories" className="inline-flex min-h-12 items-center text-[16px] font-bold text-ink">
            <span className="link-line pb-0.5">Explore categories</span>
          </Link>
        </motion.div>
        <motion.p
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-ink-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <MessageCircle className="size-4 text-whatsapp" strokeWidth={2.4} aria-hidden />
          Fill your bag, then order on WhatsApp — no online payment needed.
        </motion.p>
      </div>
    </section>
  )
}

/**
 * The cub and its toys, sitting on the top edge of the panel that follows
 * the hero. Its pupils follow the pointer (or the last tap).
 */
export function PeekingCub() {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const dx = useMotionValue(0)
  const dy = useMotionValue(0.35)
  const sx = useSpring(dx, { stiffness: 180, damping: 18 })
  const sy = useSpring(dy, { stiffness: 180, damping: 18 })
  // offsets as a share of the pupil's own size (pupil = 46% of the eye)
  const px = useTransform(sx, (n) => `${(n * 0.34 * 100) / 0.46}%`)
  const py = useTransform(sy, (n) => `${(n * 0.3 * 100) / 0.46}%`)

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect()
      if (!r) return
      const cx = r.left + r.width * ((mascot.eyes[0][0] + mascot.eyes[1][0]) / 2)
      const cy = r.top + r.height * mascot.eyes[0][1]
      const vx = e.clientX - cx
      const vy = e.clientY - cy
      const d = Math.hypot(vx, vy) || 1
      const k = Math.min(1, d / 260)
      dx.set((vx / d) * k)
      dy.set((vy / d) * k)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
    }
  }, [reduce, dx, dy])

  return (
    <motion.div
      ref={box}
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-10 select-none"
      style={{ width: STRIP, aspectRatio: `${mascot.width} / ${mascot.height}`, x: `-${mascot.center * 100}%`, y: `${(1 - mascot.ledge) * 100}%` }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: ease.out }}
    >
      <Image src={mascot.src} alt="" fill priority unoptimized sizes="1120px" className="object-contain" draggable={false} />
      {mascot.eyes.map(([x, y], i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${mascot.eyeRadius * 200}%`, aspectRatio: '1', translate: '-50% -50%' }}
        >
          <motion.span
            className="absolute top-1/2 left-1/2 block w-[46%] rounded-full bg-ink"
            style={{
              aspectRatio: '1',
              translate: '-50% -50%',
              x: px,
              y: py,
            }}
          >
            <span className="absolute top-[16%] left-[20%] block w-[34%] rounded-full bg-white/90" style={{ aspectRatio: '1' }} />
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
