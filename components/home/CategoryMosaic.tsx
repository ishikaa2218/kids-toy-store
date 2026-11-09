import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { Clay } from '@/components/ui/Clay'
import { MaskLines, Reveal } from '@/components/ui/Motion'
import type { Category } from '@/types'

/** Background + mask per tile, so no two category tiles feel stamped from one mould. */
const look: Record<string, { bg: string; text: string; mask: string; layout: string; clay: 'coral' | 'mustard' | 'leaf' | 'sky' | 'ivory' }> = {
  'wooden-toys': { bg: 'bg-mustard', text: 'text-ink', mask: 'mask-arch', layout: 'sm:col-span-2 lg:col-span-5 lg:row-span-2', clay: 'coral' },
  'pretend-play': { bg: 'bg-coral', text: 'text-ivory', mask: 'mask-blob', layout: 'lg:col-span-4', clay: 'mustard' },
  'puzzles-games': { bg: 'bg-leaf', text: 'text-ink', mask: 'rounded-full', layout: 'lg:col-span-3', clay: 'sky' },
  'building-stacking': { bg: 'bg-sky', text: 'text-ink', mask: 'mask-pebble', layout: 'lg:col-span-3', clay: 'mustard' },
  plush: { bg: 'bg-sand', text: 'text-ink', mask: 'mask-blob-2', layout: 'lg:col-span-4', clay: 'coral' },
  'creative-learning': { bg: 'bg-olive', text: 'text-ivory', mask: 'rounded-[28px]', layout: 'sm:col-span-2 lg:col-span-12', clay: 'mustard' },
}

const count = (id: string) => products.filter((p) => p.category === id).length

function Tile({ c, index }: { c: Category; index: number }) {
  const l = look[c.id]
  const big = c.id === 'wooden-toys'
  const wide = c.id === 'creative-learning'
  return (
    <Reveal delay={(index % 3) * 0.08} className={`${l.layout}`}>
      <Link
        href={`/shop?category=${c.id}`}
        className={`group relative flex h-full overflow-hidden rounded-[28px] ${l.bg} ${l.text} p-6 transition-transform duration-500 ease-[var(--ease-out-back)] hover:-translate-y-1.5 sm:p-8 ${
          big ? 'min-h-[420px] flex-col lg:min-h-[640px]' : wide ? 'min-h-[260px] flex-col sm:flex-row sm:items-center' : 'min-h-[300px] flex-col'
        }`}
      >
        <div className={`relative z-10 ${wide ? 'sm:max-w-[46%]' : ''}`}>
          <p className="text-[13px] font-bold tracking-[0.12em] uppercase opacity-70">
            {String(index + 1).padStart(2, '0')} · {count(c.id)} toys
          </p>
          <h3 className={`mt-2 font-display leading-[0.98] font-extrabold ${big ? 'text-[clamp(34px,3.6vw,56px)]' : 'text-[clamp(26px,2.3vw,36px)]'}`}>
            {c.name}
          </h3>
          <p className="mt-2 max-w-[30ch] text-[15px] leading-snug opacity-85">{c.blurb}</p>
        </div>

        <div
          className={`relative ${
            big
              ? 'mt-8 aspect-[4/4.2] w-full flex-1 self-center sm:max-w-[56%] lg:max-w-[86%]'
              : wide
                ? 'mt-6 aspect-[16/8] w-full sm:mt-0 sm:ml-auto sm:w-[48%]'
                : 'mt-6 ml-auto aspect-square w-[64%] max-w-[260px]'
          }`}
        >
          <Clay
            tone={l.clay === 'ivory' ? 'cream' : l.clay}
            shape="ball"
            className="absolute -top-3 -left-3 z-10 size-9 transition-transform duration-500 ease-[var(--ease-out-back)] group-hover:-translate-y-2 group-hover:rotate-12 sm:size-11"
          />
          <div className={`relative h-full w-full overflow-hidden ${l.mask} bg-ivory/30 transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:rotate-[-2deg] group-hover:scale-[1.03]`}>
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              sizes={big ? '(min-width:1024px) 38vw, 90vw' : wide ? '(min-width:640px) 45vw, 90vw' : '(min-width:1024px) 22vw, 60vw'}
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-110"
              style={{ objectPosition: c.image.focus ?? '50% 50%' }}
            />
          </div>
        </div>

        <span className="absolute top-6 right-6 z-10 grid size-11 place-items-center rounded-full bg-ivory text-ink transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:rotate-45 sm:top-8 sm:right-8">
          <ArrowUpRight className="size-5" strokeWidth={2.4} aria-hidden />
        </span>
      </Link>
    </Reveal>
  )
}

export function CategoryMosaic() {
  return (
    <section aria-labelledby="categories-title" className="bg-cream py-20 lg:py-28">
      <div className="container-play">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="t-hand text-[28px] text-coral">What will they love?</p>
            <MaskLines id="categories-title" className="t-h2 mt-1" lines={['Something for every', 'kind of play']} />
          </div>
          <p className="max-w-[44ch] text-[16px] leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9">
            Six corners of the toy box — each one a different way to build, imagine, cuddle or create.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-auto gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {categories.map((c, i) => (
            <Tile key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
