'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type HTMLMotionProps, type Variants } from 'motion/react'
import { ease, inView } from '@/lib/motion'

/** Fade-and-rise for a block entering the viewport. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
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
  const reduce = useReducedMotion()
  const Tag = motion[as] as typeof motion.h2
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }
  const line: Variants = {
    hidden: { y: '110%', rotate: 2 },
    show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: ease.out } },
  }
  const trig = trigger === 'mount' ? { animate: 'show' as const } : { whileInView: 'show' as const, viewport: inView }
  return (
    <Tag id={id} className={className} variants={container} initial={reduce ? false : 'hidden'} {...trig}>
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

/** Photograph uncovered by a clip-path wipe, settling from a slight scale. */
export function ClipReveal({
  children,
  className = '',
  from = 'up',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  from?: 'up' | 'left' | 'right' | 'center'
  delay?: number
}) {
  const reduce = useReducedMotion()
  const start = {
    up: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 0% 0% 100%)',
    right: 'inset(0% 100% 0% 0%)',
    center: 'inset(18% 18% 18% 18% round 40px)',
  }[from]
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: start }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      viewport={inView}
      transition={{ duration: 1.05, delay, ease: ease.inOut }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 1.5, delay, ease: ease.out }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Moves content slightly against the scroll. */
export function Parallax({ children, distance = 50, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
