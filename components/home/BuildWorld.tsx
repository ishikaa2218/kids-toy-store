'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Plus, RotateCcw } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Block3D } from '@/components/ui/Block3D'
import { MaskLines, Reveal } from '@/components/ui/Motion'
import type { Tone } from '@/types'

const WORD = 'KINDER'
const tones: Tone[] = ['coral', 'mustard', 'leaf', 'sky', 'orange', 'olive']
const S = 66

type Piece = { id: number; letter: string; tone: Tone; twist: number }
type Scatter = { x: number; z: number; rot: number }

/**
 * "Build your own little world" — a small, optional stacking toy.
 * Tap the stage or the button to drop a block onto the tower; when it is
 * tall enough, knock it down. It never blocks shopping: the section's
 * real job is the link to building & stacking toys beside it.
 */
export function BuildWorld() {
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const [pieces, setPieces] = useState<Piece[]>(() =>
    WORD.slice(0, 3)
      .split('')
      .map((l, i) => ({ id: i, letter: l, tone: tones[i], twist: [4, -6, 5][i] })),
  )
  const [tumbled, setTumbled] = useState<Scatter[] | null>(null)
  const nextId = useRef(3)

  // the backdrop warms from cream to a soft sky as the section scrolls through
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })
  const bg = useTransform(scrollYProgress, [0.1, 0.45, 0.9], ['#fbf4e6', '#e2ecf6', '#f1e3c8'])

  const full = pieces.length >= WORD.length
  const add = () => {
    if (tumbled) return rebuild()
    if (full) return
    const i = pieces.length
    setPieces((p) => [
      ...p,
      { id: nextId.current++, letter: WORD[i], tone: tones[i % tones.length], twist: Math.round((Math.random() - 0.5) * 16) },
    ])
  }
  const tumble = () => {
    setTumbled(
      pieces.map((_, i) => ({
        x: (i % 2 ? 1 : -1) * (40 + Math.random() * 130),
        z: (Math.random() - 0.5) * 120,
        rot: (Math.random() - 0.5) * 140,
      })),
    )
  }
  const rebuild = () => {
    setTumbled(null)
    setPieces([])
  }

  const status = tumbled
    ? 'Crash! Tap to build again.'
    : full
      ? `${WORD}! Now knock it down.`
      : `${pieces.length} of ${WORD.length} blocks stacked`

  return (
    <motion.section
      ref={section}
      aria-labelledby="build-title"
      style={{ backgroundColor: reduce ? '#e2ecf6' : bg }}
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div className="container-play grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="t-hand text-[28px] text-coral">Stack it, knock it, start again</p>
          <MaskLines
            id="build-title"
            className="t-h2 mt-1"
            lines={['Build your own', 'little world']}
            lineClasses={['', 'text-[#4a78ad]']}
          />
          <Reveal>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-ink-soft">
              Blocks, rings and arches are the first tools of every architect. Try it here — then find the real thing in our building and
              stacking corner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop?category=building-stacking">
                Shop building &amp; stacking
                <ArrowRight className="size-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            role="group"
            aria-label="Block stacking toy"
            className="relative mx-auto h-[540px] max-w-[520px] rounded-[40px] bg-ivory/55 shadow-[inset_0_0_0_2px_rgb(255_255_255/0.6)]"
          >
            {/* stage — tapping it drops a block too */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={add}
              data-cursor="play"
              data-cursor-label={tumbled ? 'Rebuild' : full ? 'Full!' : 'Stack'}
              className="absolute inset-0 rounded-[40px] [perspective:1100px]"
            >
              <span className="absolute bottom-[132px] left-1/2 block size-0 [transform-style:preserve-3d] [transform:rotateX(-16deg)_rotateY(-32deg)]">
                {/* floor */}
                <span
                  aria-hidden
                  className="absolute -top-[150px] -left-[150px] block size-[300px] rounded-full bg-[#d9c6a2]/70 [transform:translateY(0)_rotateX(90deg)]"
                />
                <AnimatePresence>
                  {pieces.map((p, i) => {
                    const t = tumbled?.[i]
                    return (
                      <motion.span
                        key={p.id}
                        className="absolute block"
                        style={{ left: -S / 2, top: -S, width: S, height: S, transformStyle: 'preserve-3d' }}
                        initial={reduce ? false : { y: -520, rotateY: p.twist - 40 }}
                        animate={
                          t
                            ? { x: t.x, y: 0, z: t.z, rotateY: p.twist + t.rot, rotateZ: t.rot / 3 }
                            : { x: 0, y: -i * S, z: 0, rotateY: p.twist, rotateZ: 0 }
                        }
                        exit={{ y: 40, scale: 0.4, transition: { duration: 0.25 } }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : t
                              ? { type: 'spring', stiffness: 90, damping: 12, delay: (pieces.length - i) * 0.04 }
                              : { type: 'spring', stiffness: 260, damping: 16 }
                        }
                      >
                        <Block3D
                          size={`${S}px`}
                          tone={p.tone}
                          faces={{ front: p.letter, right: p.letter, left: p.letter, back: p.letter }}
                        />
                      </motion.span>
                    )
                  })}
                </AnimatePresence>
              </span>
            </button>

            {/* controls */}
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="t-hand pl-2 text-[22px] text-ink-soft">
                {status}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={add}
                  disabled={full && !tumbled}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-bold text-ivory shadow-[0_3px_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none disabled:opacity-40"
                >
                  <Plus className="size-4" strokeWidth={2.6} aria-hidden /> {tumbled ? 'Build again' : 'Add a block'}
                </button>
                {!tumbled && pieces.length > 1 && (
                  <button
                    type="button"
                    onClick={tumble}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-coral px-4 text-[14px] font-bold text-ivory shadow-[0_3px_0_#b24a31] transition-transform hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none"
                  >
                    <RotateCcw className="size-4" strokeWidth={2.6} aria-hidden /> Knock it down
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
