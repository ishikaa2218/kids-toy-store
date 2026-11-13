'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, BadgeCheck, MessageCircle, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { MaskLines } from '@/components/ui/Motion'
import { getProduct } from '@/data/products'
import { brand } from '@/config/brand'
import { ease } from '@/lib/motion'
import { ToyTown } from './ToyTown'

const racers = getProduct('wooden-racing-friends')!
const stacker = getProduct('rainbow-ring-stacker')!

const promises = [
  { icon: Sparkles, text: 'Hand-picked for open-ended play' },
  { icon: BadgeCheck, text: 'Age guidance on every toy' },
  { icon: MessageCircle, text: 'Easy ordering on WhatsApp' },
]

export function Hero() {
  const reduce = useReducedMotion()
  // with reduced motion, still set the final state explicitly so server-rendered
  // starting styles can never leave the copy hidden after hydration
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: ease.out } }

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      {/* soft sky behind toy town */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] rounded-bl-[180px] bg-[linear-gradient(180deg,#e4eef8_0%,#f3efe4_100%)] lg:block"
      />

      <div className="container-play relative grid items-center gap-y-4 pt-8 pb-14 lg:min-h-[min(calc(100svh-112px),820px)] lg:grid-cols-12 lg:gap-x-6 lg:pt-4 lg:pb-10">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-5">
          <motion.p {...rise(0.05)} className="t-hand text-[clamp(26px,2.6vw,36px)] text-coral">
            Welcome to {brand.name},
          </motion.p>
          <MaskLines
            id="hero-title"
            as="h1"
            trigger="mount"
            delay={0.12}
            className="t-display mt-2 text-[clamp(50px,6vw,104px)]"
            lines={[
              'Little Toys.',
              <span key="big" className="relative inline-block">
                Big Adventures.
                <motion.svg
                  aria-hidden
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.08em] left-[2%] h-[0.2em] w-[96%] text-mustard"
                >
                  <motion.path
                    d="M3 14 C 60 4, 110 4, 150 10 S 240 18, 297 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.95, ease: ease.out }}
                  />
                </motion.svg>
              </span>,
            ]}
            lineClasses={['', 'text-olive']}
          />
          <motion.p {...rise(0.5)} className="mt-7 max-w-[40ch] text-[clamp(17px,1.35vw,20px)] leading-relaxed text-ink-soft">
            Step inside a little world of wooden toys, pretend play, puzzles and soft friends — chosen for hands-on, open-ended play and
            full of stories waiting to happen.
          </motion.p>
          <motion.div {...rise(0.62)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" className="min-w-[170px]">
              Shop Toys
              <ArrowRight className="size-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
            </ButtonLink>
            <ButtonLink href="/#categories" variant="outline">
              Explore Categories
            </ButtonLink>
          </motion.div>
          <motion.ul
            {...rise(0.76)}
            className="mt-9 flex flex-col gap-2.5 text-[14.5px] font-semibold text-ink-soft sm:flex-row sm:flex-wrap sm:gap-x-5"
          >
            {promises.map((p) => (
              <li key={p.text} className="inline-flex items-center gap-2">
                <p.icon className="size-4.5 text-olive" strokeWidth={2.4} aria-hidden />
                {p.text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Toy town */}
        <div className="relative lg:col-span-7 lg:-mr-[2%]">
          <ToyTown frames={[racers, stacker]} />
        </div>
      </div>
    </section>
  )
}
