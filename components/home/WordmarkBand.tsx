'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { brand } from '@/config/brand'

const colors = ['text-coral', 'text-mustard', 'text-leaf', 'text-[#6f9fd6]']

/**
 * A printed-ribbon band of the brand name (after WOODIC's pattern strip).
 * It only moves with the scroll — no autoplaying loop.
 */
export function WordmarkBand() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '-22%'])
  const x2 = useTransform(scrollYProgress, [0, 1], reduce ? ['-16%', '-16%'] : ['-24%', '-8%'])
  const words = Array.from({ length: 10 }, (_, i) => i)

  const Row = ({ offset }: { offset: number }) => (
    <div className="flex shrink-0 gap-8 whitespace-nowrap">
      {words.map((i) => (
        <span key={i} className={`font-display text-[clamp(40px,6vw,84px)] leading-none font-[850] ${colors[(i + offset) % colors.length]}`}>
          {brand.name}
        </span>
      ))}
    </div>
  )

  return (
    <div ref={ref} aria-hidden className="overflow-hidden border-y-2 border-ink/8 bg-ivory py-5">
      <motion.div style={{ x: x1 }}>
        <Row offset={0} />
      </motion.div>
      <motion.div style={{ x: x2 }} className="mt-2">
        <Row offset={2} />
      </motion.div>
    </div>
  )
}
