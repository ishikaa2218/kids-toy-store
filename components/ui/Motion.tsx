'use client'

import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import { ease, inView } from '@/lib/motion'

/**
 * Fade-and-rise for a block entering the viewport. Reduced motion is handled
 * by <MotionConfig reducedMotion="user"> (transforms are skipped), which keeps
 * server and client markup identical.
 */
export function Reveal({ delay = 0, y = 24, children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, delay, ease: ease.out }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Heading lines that rise from behind their own masks. */
export function MaskLines({
  lines,
  as = 'h2',
  className,
  lineClasses,
  delay = 0,
  trigger = 'view',
  id,
}: {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** extra classes per line, by index (serialisable so Server Components can pass it) */
  lineClasses?: string[]
  delay?: number
  trigger?: 'mount' | 'view'
  id?: string
}) {
  const Tag = motion[as] as typeof motion.h2
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }
  const line: Variants = {
    hidden: { y: '110%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: ease.out } },
  }
  const trig = trigger === 'mount' ? { animate: 'show' as const } : { whileInView: 'show' as const, viewport: inView }
  return (
    <Tag id={id} className={className} variants={container} initial="hidden" {...trig}>
      {lines.map((l, i) => (
        <span key={i} className="block [overflow-x:visible] [overflow-y:clip] pb-[0.1em] -mb-[0.1em]">
          <motion.span variants={line} className={`block origin-bottom-left ${lineClasses?.[i] ?? ''}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
