'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ageGroups } from '@/data/categories'
import { products } from '@/data/products'
import { Block3D } from '@/components/ui/Block3D'
import { MaskLines } from '@/components/ui/Motion'
import { inView } from '@/lib/motion'
import type { Tone } from '@/types'

const tones: Tone[] = ['sky', 'mustard', 'coral', 'leaf']
const SIZE = 'clamp(96px, 11.5vw, 148px)'

/**
 * Age discovery as a row of big wooden number blocks. Hovering or focusing a
 * block turns it to show how many toys are suggested for that age, and fans a
 * few of those toys up from behind it. On touch screens the blocks sit at a
 * three-quarter angle with the toys already fanned, and a tap opens the list.
 */
export function AgeExplorer() {
  const reduce = useReducedMotion()
  return (
    <section id="shop-by-age" aria-labelledby="age-title" className="scroll-mt-24 overflow-x-clip bg-sand/70 py-20 lg:py-28">
      <div className="container-play">
        <div className="max-w-[760px]">
          <p className="t-hand text-[28px] text-olive">Growing up, one block at a time</p>
          <MaskLines id="age-title" className="t-h2 mt-1" lines={['Shop by age']} />
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">
            Suggested ages are a starting point. Every child plays differently — always check the age guidance on each toy.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-6">
          {ageGroups.map((a, i) => {
            const list = products.filter((p) => p.ageGroups.includes(a.id))
            const picks = list.slice(0, 3)
            return (
              <motion.li
                key={a.id}
                initial={reduce ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ type: 'spring', stiffness: 140, damping: 15, delay: i * 0.08 }}
              >
                <Link
                  href={`/shop?age=${a.id}`}
                  data-cursor="explore"
                  data-cursor-label={`Ages ${a.label}`}
                  className="group block text-center"
                >
                  <div className="relative mx-auto grid h-[clamp(170px,19vw,240px)] place-items-end justify-center [perspective:900px]">
                    {/* toys fan up from behind the block */}
                    {picks.map((p, k) => (
                      <span
                        key={p.id}
                        className="absolute bottom-[30%] left-1/2 size-[clamp(56px,6vw,82px)] overflow-hidden rounded-[22%] border-4 border-ivory bg-ivory shadow-md transition-transform duration-500 ease-[var(--ease-out-back)] [transform:var(--rest)] group-hover:[transform:var(--fan)] group-focus-visible:[transform:var(--fan)] max-lg:[transform:var(--fan-static)]"
                        style={{
                          ['--rest' as string]: `translate(-50%, 10%) rotate(${(k - 1) * 6}deg) scale(0.7)`,
                          ['--fan' as string]: `translate(calc(-50% + ${(k - 1) * 82}%), -62%) rotate(${(k - 1) * 14}deg)`,
                          ['--fan-static' as string]: `translate(calc(-50% + ${(k - 1) * 60}%), -86%) rotate(${(k - 1) * 12}deg) scale(0.8)`,
                          zIndex: k === 1 ? 2 : 1,
                        }}
                      >
                        <Image
                          src={p.images[0].src}
                          alt=""
                          fill
                          sizes="90px"
                          className="object-cover"
                          style={{ objectPosition: p.images[0].focus }}
                        />
                      </span>
                    ))}

                    {/* floor shadow */}
                    <span
                      aria-hidden
                      className="toy-shadow absolute bottom-[2%] left-1/2 h-[16%] w-[78%] -translate-x-1/2 transition-transform duration-500 group-hover:scale-75"
                    />

                    {/* the number block */}
                    <span className="relative z-10 mb-[8%] block transition-transform duration-700 ease-[var(--ease-out-back)] [transform-style:preserve-3d] [transform:rotateX(-16deg)_rotateY(-30deg)] group-hover:[transform:translateY(-14px)_rotateX(-20deg)_rotateY(-66deg)] group-focus-visible:[transform:translateY(-14px)_rotateX(-20deg)_rotateY(-66deg)]">
                      <Block3D
                        size={SIZE}
                        tone={tones[i]}
                        fontSize={`calc(${SIZE} * 0.34)`}
                        faces={{
                          front: <span className="drop-shadow-[0_2px_0_rgb(0_0_0/0.18)]">{a.label}</span>,
                          right: (
                            <span className="flex flex-col items-center leading-none drop-shadow-[0_2px_0_rgb(0_0_0/0.18)]">
                              {list.length}
                              <span className="mt-1 text-[0.42em]">toys</span>
                            </span>
                          ),
                          left: a.label,
                          top: <span className="text-[0.8em] opacity-70">★</span>,
                        }}
                      />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[22px] font-bold">{a.title}</h3>
                  <p className="mx-auto mt-1 max-w-[24ch] text-[14.5px] text-ink-soft">{a.blurb}</p>
                  <span className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[14.5px] font-bold text-olive">
                    Ages {a.label} · {list.length} toys
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.4}
                      aria-hidden
                    />
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
