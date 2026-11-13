import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { getProduct, products, relatedProducts } from '@/data/products'
import { getCategory } from '@/data/categories'
import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductPurchase } from '@/components/products/ProductPurchase'
import { ProductCard } from '@/components/products/ProductCard'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'
import { Price } from '@/components/products/Price'
import { MaskLines } from '@/components/ui/Motion'
import { Clay } from '@/components/ui/Clay'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return { title: 'Toy not found' }
  return {
    title: p.name,
    description: `${p.tagline} ${p.description}`.slice(0, 158),
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { title: p.name, description: p.tagline, images: [{ url: `${p.images[0].src}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: p.images[0].alt }] },
  }
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  const cat = getCategory(product.category)!
  const related = relatedProducts(product, 4)

  const details = [
    product.ageLabel && { k: 'Suggested age', v: product.ageLabel },
    product.material && { k: 'Material', v: product.material },
    product.dimensions && { k: 'Dimensions', v: product.dimensions },
    product.includes?.length && { k: 'What’s included', v: product.includes.join(', ') },
    product.safety && { k: 'Safety information', v: product.safety },
  ].filter(Boolean) as { k: string; v: string }[]

  return (
    <>
      <div className="container-play pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-ink-mute">
            <li>
              <Link href="/shop" className="link-wiggle hover:text-ink">
                Shop
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link href={`/shop?category=${cat.id}`} className="link-wiggle hover:text-ink">
                {cat.name}
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current="page" className="font-semibold text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="container-play grid gap-10 pt-6 pb-20 lg:grid-cols-12 lg:gap-14 lg:pb-28">
        <div className="lg:col-span-7">
          <ProductGallery product={product} />
        </div>

        <div className="relative lg:col-span-5 lg:pt-6">
          <Clay tone="mustard" shape="ball" className="absolute -top-2 right-2 hidden size-10 lg:block" />
          <p className="t-eyebrow text-coral">{cat.name}</p>
          <MaskLines as="h1" trigger="mount" className="mt-2 font-display text-[clamp(38px,4.4vw,64px)] leading-[0.95] font-[850]" lines={[product.name]} />
          <p className="t-hand mt-3 text-[26px] text-olive">{product.tagline}</p>
          <div className="mt-6 flex items-center gap-4">
            <Price product={product} className="font-display text-[34px]" />
            {product.ageLabel && <span className="rounded-full bg-sky/50 px-3 py-1.5 text-[14px] font-bold">{product.ageLabel}</span>}
          </div>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft">{product.description}</p>

          <ProductPurchase product={product} />

          <dl className="mt-10 border-t-2 border-ink/10">
            {details.map((d) => (
              <div key={d.k} className="grid grid-cols-[10rem_1fr] gap-4 border-b-2 border-ink/10 py-4 text-[15px]">
                <dt className="font-bold">{d.k}</dt>
                <dd className="text-ink-soft">{d.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-[18px] bg-sand/70 p-4 text-[14px] leading-relaxed text-ink-soft">
            Dimensions, contents and manufacturer safety information are still being added for this toy — ask us on WhatsApp before ordering
            for a young child and we’ll confirm the details.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-ivory py-16 lg:py-24">
          <div className="container-play">
            <p className="t-hand text-[26px] text-coral">Plays well with</p>
            <h2 id="related-title" className="t-h2 mt-1">
              You might also like
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} sizes="(min-width:1024px) 22vw, 45vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RecentlyViewed exclude={product.slug} track={product.slug} />
    </>
  )
}
