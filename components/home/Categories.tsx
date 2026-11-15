import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { categoryArt } from '@/config/visuals'
import { Reveal } from '@/components/ui/Motion'

const count = (id: string) => products.filter((p) => p.category === id).length

/** Six kinds of play, each with its own clay icon. No cards — just toys on the table. */
export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="container-play pt-20 pb-16 sm:pt-24 lg:pt-28">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <h2 id="categories-title" className="t-h2 max-w-[16ch]">
          What will they play with today?
        </h2>
        <Link href="/shop" className="text-[16px] font-bold text-ink">
          <span className="link-line pb-0.5">Browse all toys</span>
        </Link>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-y-10 lg:mt-14 lg:grid-cols-6 lg:gap-x-6">
        {categories.map((c, i) => (
          <li key={c.id}>
            <Reveal delay={i * 0.05}>
              <Link href={`/shop?category=${c.id}`} className="group flex flex-col items-center text-center">
                <span className="relative block w-full max-w-[170px]">
                  <Image
                    src={categoryArt[c.id].src}
                    alt=""
                    width={434}
                    height={442}
                    unoptimized
                    className="relative z-[1] w-full transition-transform duration-500 ease-[var(--ease-out-back)] group-hover:-translate-y-2 group-hover:rotate-[-4deg] group-focus-visible:-translate-y-2"
                  />
                  <span
                    aria-hidden
                    className="toy-shadow absolute inset-x-[18%] -bottom-1 h-5 scale-x-90 opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-3 font-display text-[20px] leading-tight font-semibold sm:text-[21px]">{c.name}</span>
                <span className="mt-0.5 text-[14px] text-ink-mute">{count(c.id)} toys</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
