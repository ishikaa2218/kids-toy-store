import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'
import { MaskLines, Reveal } from '@/components/ui/Motion'

/** Editorial catalogue spread: one hero product, six companions. */
export function FeaturedProducts() {
  const [lead, ...rest] = featuredProducts
  return (
    <section aria-labelledby="featured-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-play">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="t-hand text-[28px] text-coral">Fresh from the toy box</p>
            <MaskLines id="featured-title" className="t-h2 mt-1" lines={['Favourites to', 'start with']} />
          </div>
          <Link href="/shop" className="group inline-flex min-h-11 items-center gap-2 text-[16px] font-bold text-olive">
            <span className="link-wiggle">See all toys</span>
            <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
          </Link>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ProductCard product={lead} size="large" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </Reveal>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:col-span-7 lg:grid-cols-2 xl:grid-cols-3">
            {rest.slice(0, 6).map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 3) * 0.07}>
                  <ProductCard product={p} sizes="(min-width:1280px) 18vw, (min-width:1024px) 28vw, 45vw" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
