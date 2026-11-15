'use client'

import Image from 'next/image'
import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { MaskLines, Reveal } from '@/components/ui/Motion'

/**
 * The editorial moment: a little clay world on a sky-blue band. It turns a
 * few degrees towards the pointer and drifts slightly as the page scrolls.
 */
export function Adventure() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [40, -40])
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 })
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section aria-labelledby="adventure-title" className="container-wide py-6">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative grid items-center gap-6 overflow-hidden rounded-[var(--radius-panel)] bg-sky px-6 pt-14 pb-6 sm:px-12 lg:grid-cols-12 lg:gap-0 lg:px-16 lg:py-20"
      >
        <div className="relative z-[1] lg:col-span-5">
          <MaskLines id="adventure-title" className="t-h2 text-ink" lines={['A world made for', 'little adventures']} />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-ink/80 sm:text-[18px]">
              The best toys leave the story to the child. A block becomes a phone, a teacup becomes a party, and an ordinary afternoon turns
              into a whole new world.
            </p>
            <ButtonLink href="/shop" variant="ink" className="mt-8">
              Find their next adventure
              <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.4} aria-hidden />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7 [perspective:1400px]">
          <motion.div style={{ y: drift, rotateX: rotX, rotateY: rotY }} className="motion-reduce:!transform-none will-change-transform">
            <Image
              src="/clay/world.webp"
              alt="A little clay world: a yellow toy house, trees, a rainbow arch, a toy car, stacking rings and building blocks on a green island"
              width={1800}
              height={1008}
              unoptimized
              className="w-full lg:scale-[1.12]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
