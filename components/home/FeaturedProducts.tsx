import Link from 'next/link'
import { featuredProducts } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { Reveal } from '@/components/ui/Motion'

/** A clean shelf of favourites from the catalogue's featured toys. */
export function FeaturedProducts() {
  return (
    <section aria-labelledby="featured-title" className="bg-cream py-24 lg:py-32">
      <div className="container-play">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="t-eyebrow text-tangerine-deep">Shop favourites</p>
            <h2 id="featured-title" className="t-h2 mt-3">
              Loved in the toy box
            </h2>
          </div>
          <Link href="/shop" className="text-[16px] font-bold text-ink">
            <span className="link-line pb-0.5">See all toys</span>
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-14">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <li key={p.id}>
              <Reveal delay={(i % 4) * 0.06}>
                <ProductCard product={p} sizes="(min-width:1024px) 300px, (min-width:768px) 30vw, 46vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
