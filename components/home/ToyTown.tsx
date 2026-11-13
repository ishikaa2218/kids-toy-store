'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Block3D } from '@/components/ui/Block3D'
import { Clay, ClayArch } from '@/components/ui/Clay'
import type { Product } from '@/types'

/**
 * "Toy Town" — the hero's miniature world, built from real CSS 3D:
 * a block-built Kinderhouse cottage, an ABC stack, a floating K block,
 * a clay ring stacker and two framed toys from the shop, all standing
 * on a round play mat. The whole scene turns gently toward a mouse,
 * can be spun by dragging on touch screens, and turns a little more
 * as the page scrolls. With reduced motion it is a still illustration.
 *
 * Coordinates are in a 640 × 560 design space; y grows downwards and the
 * mat sits at y = FLOOR. The stage is scaled to fit its container.
 */

const STAGE_W = 640
const STAGE_H = 560
const FLOOR = 130

/** Something standing on (or above) the floor, anchored at its bottom-centre. */
function At({
  x,
  y = FLOOR,
  z,
  w,
  h,
  turn = 0,
  drop = 0,
  className = '',
  style,
  children,
}: {
  x: number
  y?: number
  z: number
  w: number
  h: number
  turn?: number
  /** entrance delay — the object drops onto the mat */
  drop?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <div
      className="absolute"
      style={{
        left: -w / 2,
        top: -h,
        width: w,
        height: h,
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 100%',
        transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${turn}deg)`,
      }}
    >
      <motion.div
        className={`h-full w-full ${className}`}
        style={{ transformStyle: 'preserve-3d', ...style }}
        initial={reduce ? false : { y: -420 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 15, mass: 0.9, delay: 0.35 + drop }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Something lying flat on the mat (shadows, the mat itself). */
function Flat({
  x,
  z,
  w,
  d,
  className = '',
  style,
  children,
}: {
  x: number
  z: number
  w: number
  d: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div
      aria-hidden
      className={`absolute ${className}`}
      style={{
        left: -w / 2,
        top: -d / 2,
        width: w,
        height: d,
        transform: `translate3d(${x}px, ${FLOOR}px, ${z}px) rotateX(90deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** The Kinderhouse cottage: a block of walls, a tiled roof and a chimney. */
function Cottage() {
  const W = 170
  const H = 92
  const slope = Math.hypot(W / 2, H) + 16
  const angle = (Math.atan2(H, W / 2) * 180) / Math.PI
  const depth = W + 26
  const roof: CSSProperties = {
    width: slope,
    height: depth,
    background:
      'repeating-linear-gradient(90deg, rgb(0 0 0 / 0) 0 18px, rgb(120 40 20 / 0.22) 18px 20px), radial-gradient(130% 120% at 30% 20%, #f08d72, #e1684b 55%, #b24a31)',
    borderRadius: 8,
    boxShadow: 'inset 0 0 0 3px rgb(255 255 255 / 0.18)',
  }
  return (
    <>
      <Block3D
        size={`${W}px`}
        tone="mustard"
        faces={{
          front: (
            <span className="absolute inset-0">
              {/* door */}
              <span className="absolute bottom-[6%] left-1/2 h-[46%] w-[30%] -translate-x-1/2 rounded-t-full bg-olive shadow-[inset_-4px_-6px_0_rgb(0_0_0/0.18)]">
                <span className="absolute top-1/2 right-[18%] size-2 rounded-full bg-mustard" />
              </span>
              {/* round window */}
              <span className="absolute top-[12%] left-1/2 size-[26%] -translate-x-1/2 rounded-full border-[5px] border-ivory bg-sky shadow-[inset_-4px_-5px_0_rgb(0_0_0/0.12)]" />
            </span>
          ),
          right: (
            <span className="absolute inset-0">
              <span className="absolute top-[24%] left-1/2 grid size-[36%] -translate-x-1/2 grid-cols-2 gap-1 rounded-[10px] border-[5px] border-ivory bg-ivory">
                <span className="rounded-[3px] bg-sky" />
                <span className="rounded-[3px] bg-sky" />
                <span className="rounded-[3px] bg-sky" />
                <span className="rounded-[3px] bg-sky" />
              </span>
            </span>
          ),
        }}
      />
      {/* gables */}
      {[1, -1].map((side) => (
        <span
          key={side}
          className="absolute left-0"
          style={{
            top: -H + 1,
            width: W,
            height: H,
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
            background: 'radial-gradient(120% 120% at 30% 30%, #f3c869, #d9a12f 70%)',
            transform: `translateZ(${(side * W) / 2}px) ${side < 0 ? 'rotateY(180deg)' : ''}`,
          }}
        />
      ))}
      {/* roof planes */}
      {[-1, 1].map((side) => (
        <span
          key={side}
          className="absolute"
          style={{
            ...roof,
            left: W / 2 + (side * W) / 4 - slope / 2,
            top: -H / 2 - depth / 2,
            transform: `rotateZ(${side * angle}deg) rotateX(90deg)`,
          }}
        />
      ))}
      {/* chimney */}
      <span
        className="absolute"
        style={{ left: W * 0.72 - 15, top: -H * 0.5 - 30, transform: 'translateZ(-24px)', transformStyle: 'preserve-3d' }}
      >
        <Block3D size="30px" tone="coral" />
      </span>
    </>
  )
}

function Frame({ product, label }: { product: Product; label: string }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      aria-label={label}
      data-cursor="view"
      className="group/frame block h-full w-full rounded-[18px] bg-ivory p-[7px] shadow-[0_18px_26px_-16px_rgb(70_45_20/0.6)] transition-transform duration-500 ease-[var(--ease-out-back)] hover:-translate-y-2"
    >
      <span className="relative block h-full w-full overflow-hidden rounded-[12px] bg-sand">
        <Image
          src={product.images[0].src}
          alt=""
          fill
          sizes="180px"
          className="object-cover transition-transform duration-700 group-hover/frame:scale-110"
          style={{ objectPosition: product.images[0].focus }}
        />
      </span>
    </Link>
  )
}

export function ToyTown({ frames }: { frames: [Product, Product] }) {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  // decided after mount so server and client render the same text
  const [hint, setHint] = useState<'mouse' | 'touch' | 'still' | null>(null)

  // pointer → gentle look-around; touch drag → spin
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 })
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 })
  const spin = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const drag = useRef<{ x: number; start: number } | null>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end start'] })
  const scrollTurn = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 26])

  const ry = useTransform(() => -26 + px.get() * 16 + spin.get() + scrollTurn.get())
  const rx = useTransform(() => -14 - py.get() * 7)
  const transform = useMotionTemplate`rotateX(${rx}deg) rotateY(${ry}deg)`

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.12, e.contentRect.width / STAGE_W)))
    ro.observe(el)
    setHint(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'still' : window.matchMedia('(hover: none)').matches ? 'touch' : 'mouse')
    return () => ro.disconnect()
  }, [])

  const onMove = (e: PointerEvent) => {
    if (reduce || !wrap.current) return
    if (e.pointerType === 'mouse') {
      const r = wrap.current.getBoundingClientRect()
      px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
      py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
    } else if (drag.current) {
      spin.set(drag.current.start + (e.clientX - drag.current.x) * 0.35)
    }
  }
  const onDown = (e: PointerEvent) => {
    if (reduce || e.pointerType === 'mouse') return
    drag.current = { x: e.clientX, start: spin.get() }
  }
  const onUp = () => {
    drag.current = null
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    drag.current = null
  }

  return (
    <div
      ref={wrap}
      data-cursor="play"
      data-cursor-label="Look around"
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onLeave}
      className="relative w-full touch-pan-y select-none"
      style={{ height: STAGE_H * scale }}
    >
      <div
        className="absolute top-0 left-1/2"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          marginLeft: -STAGE_W / 2,
          transform: `scale(${scale})`,
          transformOrigin: '50% 0',
          perspective: 1500,
        }}
      >
        <motion.div className="absolute top-[50%] left-1/2 size-0" style={{ transform, transformStyle: 'preserve-3d' }}>
          {/* play mat */}
          <Flat x={0} z={0} w={540} d={540} className="rounded-full bg-[#ecd9b6] shadow-[inset_0_0_0_14px_#e3c99c]">
            <span className="absolute inset-[34px] rounded-full border-[3px] border-dashed border-ink/15" />
            <span className="absolute inset-[120px] rounded-full bg-[#f3e4c7]" />
          </Flat>

          {/* contact shadows */}
          <Flat x={50} z={-30} w={250} d={250} className="toy-shadow" />
          <Flat x={-135} z={70} w={190} d={130} className="toy-shadow" />
          <Flat x={195} z={120} w={170} d={70} className="toy-shadow" />
          <Flat x={-60} z={-150} w={90} d={90} className="toy-shadow opacity-60" />

          {/* the Kinderhouse cottage */}
          <At x={50} z={-30} w={170} h={170} drop={0}>
            <Cottage />
          </At>

          {/* ABC stack */}
          <At x={-172} z={58} w={74} h={74} turn={14} drop={0.12}>
            <Block3D size="74px" tone="sky" faces={{ front: 'A', right: 'B', top: '★' }} />
          </At>
          <At x={-96} z={84} w={74} h={74} turn={-8} drop={0.2}>
            <Block3D size="74px" tone="leaf" faces={{ front: 'B', right: 'C' }} />
          </At>
          <At x={-136} y={FLOOR - 74} z={70} w={74} h={74} turn={4} drop={0.42}>
            <Block3D size="74px" tone="coral" faces={{ front: 'C', right: 'A' }} />
          </At>

          {/* floating K block */}
          <At x={-64} y={-150} z={-150} w={62} h={62} drop={0.6}>
            <div className="float-a h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
              <div className="h-full w-full [animation:kh-spin_16s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
                <Block3D size="62px" tone="mustard" faces={{ front: 'K', back: 'H', right: '♥', left: '★' }} />
              </div>
            </div>
          </At>

          {/* clay ring stacker */}
          <At x={196} z={128} w={150} h={84} drop={0.32}>
            <ClayArch bands={['coral', 'mustard', 'leaf']} className="w-full" />
          </At>

          {/* clay ball and pebble */}
          <At x={232} z={-20} w={52} h={52} drop={0.5}>
            <Clay tone="sky" shape="ball" className="h-full w-full" />
          </At>
          <At x={30} z={190} w={58} h={30} drop={0.56}>
            <Clay tone="olive" shape="pebble" className="h-full w-full" />
          </At>

          {/* framed toys from the shop */}
          <At x={-182} z={-140} w={150} h={132} turn={24} drop={0.26}>
            <Frame product={frames[0]} label={`View ${frames[0].name}`} />
          </At>
          <At x={226} z={-176} w={128} h={128} turn={-20} drop={0.38}>
            <Frame product={frames[1]} label={`View ${frames[1].name}`} />
          </At>

          {/* a drifting clay cloud */}
          <At x={176} y={-176} z={-90} w={120} h={58} drop={0.7}>
            <div className="float-b h-full w-full">
              <Clay tone="cream" shape="blob" className="h-full w-full" style={{ ['--clay' as string]: '#fffaf1' }} />
            </div>
          </At>
        </motion.div>
      </div>

      <p
        aria-hidden
        className="t-hand pointer-events-none absolute right-2 bottom-0 rotate-[-3deg] text-[20px] text-ink-mute sm:text-[22px]"
      >
        {hint === 'still' ? 'Welcome to toy town' : hint === 'touch' ? 'Swipe sideways to spin toy town ↻' : hint === 'mouse' ? 'Move around — toy town follows you' : '\u00a0'}
      </p>
    </div>
  )
}
