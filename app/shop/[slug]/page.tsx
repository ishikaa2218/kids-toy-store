import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { getProduct, products, relatedProducts } from '@/data/products'
import { getCategory } from '@/data/categories'
import { ProductGallery } from '@/components/products/ProductGallery'
import { ProductPurchase } from '@/components/products/ProductPurchase'
import { ProductCard } from '@/components/products/ProductCard'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'
import { Price } from '@/components/products/Price'
import { MaskLines } from '@/components/ui/Motion'
import { categoryArt } from '@/config/visuals'

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
              <Link href="/shop" className="link-line hover:text-ink">
                Shop
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li>
              <Link href={`/shop?category=${cat.id}`} className="link-line hover:text-ink">
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

        <div className="lg:col-span-5 lg:pt-4">
          <Link href={`/shop?category=${cat.id}`} className="group inline-flex items-center gap-2.5">
            <Image src={categoryArt[cat.id].src} alt="" width={434} height={442} unoptimized className="w-9 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="t-eyebrow text-ink-soft group-hover:text-ink">{cat.name}</span>
          </Link>
          <MaskLines as="h1" trigger="mount" className="mt-4 font-display text-[clamp(36px,4.2vw,58px)] leading-[1] font-[620] tracking-[-0.015em]" lines={[product.name]} />
          <p className="mt-3 font-display text-[21px] leading-snug text-ink-soft">{product.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Price product={product} className="font-display text-[32px] !font-semibold" />
            {product.ageLabel && <span className="rounded-full bg-sky-soft px-3.5 py-1.5 text-[14px] font-bold">{product.ageLabel}</span>}
          </div>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-ink-soft">{product.description}</p>

          <ProductPurchase product={product} />
          <p className="mt-4 inline-flex items-start gap-2 text-[14px] leading-relaxed text-ink-mute">
            <MessageCircle className="mt-0.5 size-4 shrink-0 text-whatsapp" strokeWidth={2.4} aria-hidden />
            Add it to your bag, then order on WhatsApp — we confirm availability and delivery in the chat.
          </p>

          {details.length > 0 && (
            <dl className="mt-10 border-t border-line">
              {details.map((d) => (
                <div key={d.k} className="grid grid-cols-[9.5rem_1fr] gap-4 border-b border-line py-4 text-[15px]">
                  <dt className="font-bold">{d.k}</dt>
                  <dd className="text-ink-soft">{d.v}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-5 rounded-[20px] bg-oat p-4 text-[14px] leading-relaxed text-ink-soft">
            Dimensions, contents and manufacturer safety information are still being added for this toy — ask us on WhatsApp before ordering
            for a young child and we’ll confirm the details.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="panel py-20 lg:py-24">
          <div className="container-play">
            <h2 id="related-title" className="t-h2">
              You might also like
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} sizes="(min-width:1024px) 300px, 46vw" />
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
