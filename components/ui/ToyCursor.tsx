'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Eye, Plus, ShoppingBag, Sparkles } from 'lucide-react'

/**
 * Kinderhouse cursor — a little painted wooden block pulled along behind a
 * clay-dot pointer tip. It only runs on devices with a fine, hovering pointer
 * (mouse / trackpad); touch screens keep their native behaviour.
 *
 * Elements opt into richer states with `data-cursor`:
 *   view    — product photos   (block grows into a "View" tag)
 *   add     — add-to-bag       (coral tag with a bag)
 *   explore — category tiles   ("Explore")
 *   play    — interactive toys (the block wobbles)
 * Links and buttons get a gentle "link" state automatically, and text fields
 * fall back to the native I-beam so text selection is never in the way.
 */

type State = 'default' | 'link' | 'view' | 'add' | 'explore' | 'play' | 'text'

const look: Record<Exclude<State, 'text'>, { w: number; h: number; bg: string; fg: string; rotate: number; label?: string }> = {
  default: { w: 18, h: 18, bg: '#e8b13a', fg: '#2a2520', rotate: -14 },
  link: { w: 22, h: 22, bg: '#e1684b', fg: '#fffaf1', rotate: 8 },
  view: { w: 70, h: 32, bg: '#fffaf1', fg: '#2a2520', rotate: -4, label: 'View' },
  add: { w: 74, h: 32, bg: '#e1684b', fg: '#fffaf1', rotate: 3, label: 'Add' },
  explore: { w: 92, h: 32, bg: '#9dc0e6', fg: '#2a2520', rotate: -3, label: 'Explore' },
  play: { w: 66, h: 32, bg: '#84b159', fg: '#2a2520', rotate: 0, label: 'Play' },
}

const icon = { view: Eye, add: ShoppingBag, explore: Sparkles, play: Plus } as const

function stateFor(target: EventTarget | null): { state: State; label?: string } {
  if (!(target instanceof Element)) return { state: 'default' }
  const tagged = target.closest<HTMLElement>('[data-cursor]')
  if (tagged) {
    const s = tagged.dataset.cursor as State
    if (s in look || s === 'text') return { state: s, label: tagged.dataset.cursorLabel }
  }
  if (target.closest('input:not([type=checkbox]):not([type=radio]):not([type=range]), textarea, [contenteditable="true"]'))
    return { state: 'text' }
  if (target.closest('a, button, [role="button"], label, summary, select')) return { state: 'link' }
  return { state: 'default' }
}

export function ToyCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [down, setDown] = useState(false)
  const [{ state, label }, setState] = useState<{ state: State; label?: string }>({ state: 'default' })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // the block trails the tip very slightly, like a toy on a short string
  const bx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.6 })
  const by = useSpring(y, { stiffness: 900, damping: 50, mass: 0.6 })
  const last = useRef<Element | null>(null)

  // only on hover-capable fine pointers
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        setVisible(false)
        root.classList.remove('toy-cursor')
        return
      }
      root.classList.add('toy-cursor')
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      if (e.target !== last.current) {
        last.current = e.target as Element
        setState(stateFor(e.target))
      }
    }
    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) setVisible(false)
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    // content can change under a still pointer (menus, drawers)
    const onScroll = () => {
      last.current = null
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('blur', onUp)
    return () => {
      root.classList.remove('toy-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('blur', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const hidden = !visible || state === 'text'
  const l = look[state === 'text' ? 'default' : state]
  const tag = !!l.label
  const Icon = tag ? icon[state as keyof typeof icon] : null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {/* trailing wooden block / tag */}
      <motion.div className="absolute top-0 left-0" style={{ x: reduce ? x : bx, y: reduce ? y : by }}>
        <motion.div
          className={`absolute ${state === 'play' && !reduce ? '[animation:kh-wobble_1.1s_ease-in-out_infinite]' : ''}`}
          animate={{
            width: l.w,
            height: l.h,
            x: tag ? 14 : 9,
            y: tag ? 14 : 11,
            rotate: l.rotate,
            backgroundColor: l.bg,
            borderRadius: tag ? 999 : 5,
            opacity: hidden ? 0 : 1,
            scale: hidden ? 0.4 : down ? 0.86 : 1,
            scaleY: down ? 0.82 : 1,
          }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 26 }}
          style={{
            boxShadow:
              'inset -2px -3px 0 rgb(60 35 15 / 0.22), inset 2px 2px 0 rgb(255 255 255 / 0.35), 0 6px 12px -6px rgb(60 35 15 / 0.45)',
            color: l.fg,
          }}
        >
          <AnimatePresence>
            {tag && Icon && (
              <motion.span
                key={state + (label ?? '')}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                className="absolute inset-0 flex items-center justify-center gap-1.5 text-[12.5px] font-extrabold whitespace-nowrap"
              >
                <Icon className="size-3.5" strokeWidth={2.6} />
                {label ?? l.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* precise pointer tip — a tiny clay bead exactly at the hotspot */}
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.span
          className="absolute -top-[5px] -left-[5px] block size-[10px] rounded-full"
          animate={{ scale: hidden ? 0 : down ? 0.6 : 1, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.12 }}
          style={{
            background: 'radial-gradient(circle at 35% 30%, #f3a08b, #e1684b 60%, #a8432c)',
            boxShadow: '0 0 0 2px #fffaf1, 0 2px 4px rgb(42 37 32 / 0.35)',
          }}
        />
      </motion.div>
    </div>
  )
}
