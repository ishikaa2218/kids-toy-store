'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ageGroups } from '@/data/categories'
import { products } from '@/data/products'
import { MaskLines } from '@/components/ui/Motion'
import { inView } from '@/lib/motion'

const clayColor = ['var(--color-sky)', 'var(--color-mustard)', 'var(--color-coral)', 'var(--color-leaf)']
const tilt = [-4, 3, -2, 5]

/**
 * Age discovery: each age is a sculpted clay token. Hovering (or focusing)
 * squishes the token and fans out a few of the toys suggested for that age.
 */
export function AgeExplorer() {
  const reduce = useReducedMotion()
  return (
    <section id="shop-by-age" aria-labelledby="age-title" className="scroll-mt-24 overflow-x-clip bg-sand/70 py-20 lg:py-28">
      <div className="container-play">
        <div className="max-w-[760px]">
          <p className="t-hand text-[28px] text-olive">Growing up, one stage at a time</p>
          <MaskLines id="age-title" className="t-h2 mt-1" lines={['Shop by age']} />
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">
            Suggested ages are a starting point. Every child plays differently — always check the age guidance on each toy.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
          {ageGroups.map((a, i) => {
            const picks = products.filter((p) => p.ageGroups.includes(a.id)).slice(0, 3)
            const total = products.filter((p) => p.ageGroups.includes(a.id)).length
            return (
              <motion.li
                key={a.id}
                initial={reduce ? false : { opacity: 0, y: 40, rotate: tilt[i] * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={inView}
                transition={{ type: 'spring', stiffness: 140, damping: 16, delay: i * 0.08 }}
              >
                <Link href={`/shop?age=${a.id}`} className="group block text-center">
                  <div className="relative mx-auto aspect-square w-full max-w-[260px]">
                    {/* toys fan out from behind the token */}
                    {picks.map((p, k) => (
                      <span
                        key={p.id}
                        className="absolute top-[18%] left-[27%] size-[46%] overflow-hidden rounded-[22%] border-4 border-ivory bg-ivory shadow-md transition-transform duration-500 ease-[var(--ease-out-back)] group-hover:[transform:var(--fan)] group-focus-visible:[transform:var(--fan)] max-lg:[transform:var(--fan-static)]"
                        style={{
                          ['--fan' as string]: `translate(${(k - 1) * 70}%, -48%) rotate(${(k - 1) * 14}deg)`,
                          ['--fan-static' as string]: `translate(${(k - 1) * 46}%, -30%) rotate(${(k - 1) * 10}deg)`,
                          zIndex: k === 1 ? 2 : 1,
                        }}
                      >
                        <Image src={p.images[0].src} alt="" fill sizes="120px" className="object-cover" style={{ objectPosition: p.images[0].focus }} />
                      </span>
                    ))}
                    <span
                      className="clay absolute inset-x-[6%] bottom-0 z-10 grid h-[72%] place-items-center rounded-[40%_40%_44%_44%/46%_46%_40%_40%] transition-transform duration-500 ease-[var(--ease-out-back)] group-hover:scale-x-[1.05] group-hover:scale-y-[0.95]"
                      style={{ ['--clay' as string]: clayColor[i] }}
                    >
                      <span className="relative z-[1] font-display text-[clamp(44px,5vw,76px)] leading-none font-[850] text-ivory drop-shadow-[0_2px_0_rgb(0_0_0/0.18)]">
                        {a.label}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[22px] font-bold">{a.title}</h3>
                  <p className="mx-auto mt-1 max-w-[24ch] text-[14.5px] text-ink-soft">{a.blurb}</p>
                  <span className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[14.5px] font-bold text-olive">
                    {total} toys
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} aria-hidden />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
