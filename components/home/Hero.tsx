'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Clay, ClayArch } from '@/components/ui/Clay'
import { MaskLines } from '@/components/ui/Motion'
import { getProduct } from '@/data/products'
import { unsplash } from '@/lib/unsplash'
import { ease } from '@/lib/motion'

const racers = getProduct('wooden-racing-friends')!

/** A layer that drifts with the pointer by `depth` pixels — closer objects move more. */
function Depth({
  mx,
  my,
  depth,
  className,
  children,
  delay = 0,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth: number
  className?: string
  children: ReactNode
  delay?: number
}) {
  const reduce = useReducedMotion()
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return (
    <motion.div style={{ x, y }} className={className}>
      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -25, y: -30 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 15, delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 })
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !section.current) return
    const r = section.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: ease.out } }

  return (
    <section ref={section} onPointerMove={onMove} aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      <div className="container-play grid items-center gap-y-6 pt-10 pb-16 lg:min-h-[min(calc(100svh-112px),860px)] lg:grid-cols-12 lg:gap-x-8 lg:pt-6 lg:pb-12">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6">
          <motion.p {...rise(0.05)} className="t-hand text-[clamp(26px,2.6vw,36px)] text-coral">
            Dear little explorer,
          </motion.p>
          <MaskLines
            id="hero-title"
            as="h1"
            trigger="mount"
            delay={0.12}
            className="t-display mt-2 text-[clamp(46px,5.5vw,100px)]"
            lines={['Little toys.', 'Big imaginations.']}
            lineClasses={['', 'text-olive']}
          />
          <motion.p {...rise(0.5)} className="mt-6 max-w-[42ch] text-[clamp(17px,1.35vw,20px)] leading-relaxed text-ink-soft">
            Wooden toys, pretend play, puzzles and soft friends — chosen for the kind of play that’s hands-on, open-ended and
            full of stories.
          </motion.p>
          <motion.div {...rise(0.62)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" className="min-w-[170px]">
              Shop Toys
              <ArrowRight className="size-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
            </ButtonLink>
            <ButtonLink href="/#shop-by-age" variant="outline">
              Explore by Age
            </ButtonLink>
          </motion.div>
        </div>

        {/* Sculptural toy composition */}
        <motion.div style={{ y: stageY }} className="relative mx-auto aspect-[1/0.92] w-full max-w-[640px] lg:col-span-6 lg:col-start-7 xl:max-w-[720px]">
          {/* back clay mass */}
          <Depth mx={mx} my={my} depth={-10} delay={0.1} className="absolute top-[6%] right-[2%] h-[78%] w-[82%]">
            <Clay tone="mustard" shape="blob" className="h-full w-full" />
          </Depth>

          {/* main photo in an organic mask */}
          <motion.div
            initial={reduce ? false : { scale: 0.82, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.25 }}
            className="absolute top-[10%] right-[8%] h-[70%] w-[72%]"
          >
            <Depth mx={mx} my={my} depth={6} className="h-full w-full">
              <Link href={`/shop/${racers.slug}`} className="group relative block h-full w-full overflow-hidden mask-blob-2 bg-sand transition-[border-radius] duration-700 hover:rounded-[52%_48%_44%_56%/56%_44%_56%_44%]" aria-label={`View ${racers.name}`}>
                <Image
                  src={racers.images[0].src}
                  alt={racers.images[0].alt}
                  fill
                  priority
                  sizes="(min-width:1024px) 40vw, 80vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: '50% 58%' }}
                />
              </Link>
            </Depth>
          </motion.div>

          {/* secondary round photo */}
          <Depth mx={mx} my={my} depth={14} delay={0.45} className="absolute bottom-[3%] left-[4%] h-[36%] w-[36%]">
            <div className="relative h-full w-full overflow-hidden rounded-full border-[7px] border-ivory bg-sand shadow-[0_20px_30px_-18px_rgb(70_45_20/0.55)]">
              <Image src={unsplash('1617387247352-9a9ed2d7de81')} alt="Stacking rings toy in calm blue and pink tones" fill sizes="240px" className="object-cover" />
            </div>
          </Depth>

          {/* clay pieces at different depths */}
          <Depth mx={mx} my={my} depth={22} delay={0.55} className="absolute top-[0%] left-[8%] w-[30%] -rotate-12">
            <ClayArch bands={['coral', 'mustard', 'leaf']} />
          </Depth>
          <Depth mx={mx} my={my} depth={28} delay={0.65} className="absolute top-[8%] right-[0%] size-[11%]">
            <Clay tone="coral" shape="ball" className="h-full w-full" />
          </Depth>
          <Depth mx={mx} my={my} depth={18} delay={0.72} className="absolute right-[4%] bottom-[10%] h-[9%] w-[22%] rotate-[-18deg]">
            <Clay tone="leaf" shape="pill" className="h-full w-full" />
          </Depth>
          <Depth mx={mx} my={my} depth={32} delay={0.8} className="absolute bottom-[38%] left-[0%] size-[8%]">
            <Clay tone="sky" shape="pebble" className="h-full w-full" />
          </Depth>

          {/* handwritten sticker */}
          <motion.div
            {...rise(1.0)}
            className="absolute right-[10%] bottom-[2%] rotate-[-4deg] rounded-[14px] bg-ivory px-4 py-2 shadow-[0_10px_20px_-12px_rgb(70_45_20/0.5)]"
          >
            <Link href={`/shop/${racers.slug}`} className="t-hand flex items-center gap-2 text-[22px] text-ink">
              Wooden racers, ready to roll
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
