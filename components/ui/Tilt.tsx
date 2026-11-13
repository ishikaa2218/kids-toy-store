'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/**
 * Tilts its content a few degrees toward a mouse pointer and lifts it, like
 * picking a toy up to look at it. Touch and reduced-motion users get a
 * still, fully usable element.
 */
export function Tilt({
  children,
  className = '',
  max = 7,
  lift = 8,
  perspective = 1100,
}: {
  children: ReactNode
  className?: string
  max?: number
  lift?: number
  perspective?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 20 })
  const z = useSpring(0, { stiffness: 240, damping: 22 })

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onEnter = (e: PointerEvent) => {
    if (!reduce && e.pointerType === 'mouse') z.set(-lift)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    z.set(0)
  }

  return (
    <div style={{ perspective }} className={className} onPointerMove={onMove} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, y: z, transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </motion.div>
    </div>
  )
}
