'use client'

import { MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/format'
import { products } from '@/data/products'
import { ButtonLink } from '@/components/ui/Button'
import { ProductCard } from '@/components/products/ProductCard'
import { CartLines } from './CartLines'
import { EmptyBag } from './EmptyBag'

export function CartView() {
  const { lines, count, subtotal, hydrated } = useCart()

  // simple, transparent suggestions: other toys from the categories in the bag
  const inBag = new Set(lines.map((l) => l.id))
  const cats = new Set(lines.map((l) => l.product.category))
  const suggestions = products.filter((p) => !inBag.has(p.id) && (cats.size ? cats.has(p.category) : p.featured)).slice(0, 4)

  return (
    <>
      <section className="container-play py-12 lg:py-16">
        <p className="t-hand text-[26px] text-coral">Almost ready to play</p>
        <h1 className="t-h2 mt-1">Your bag</h1>

        {!hydrated ? (
          <div className="mt-10 h-40 animate-pulse rounded-[28px] bg-sand/60" aria-label="Loading your bag" />
        ) : lines.length === 0 ? (
          <EmptyBag />
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <CartLines />
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-[calc(var(--header-h)+24px)] rounded-[28px] bg-ivory p-6 shadow-[0_1px_0_rgb(42_37_32/0.06)] sm:p-8">
                <h2 className="font-display text-[24px] font-bold">Summary</h2>
                <dl className="mt-5 space-y-3 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Items</dt>
                    <dd className="font-semibold tabular-nums">{count}</dd>
                  </div>
                  <div className="flex justify-between border-t-2 border-ink/10 pt-3">
                    <dt className="font-bold">Subtotal</dt>
                    <dd className="font-display text-[26px] font-bold tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-mute">No online payment. Orders are placed on WhatsApp, where we confirm availability, delivery and payment with you.</p>
                <ButtonLink href="/checkout" variant="whatsapp" className="mt-6 w-full">
                  <MessageCircle className="size-5" strokeWidth={2.4} aria-hidden />
                  Order on WhatsApp
                </ButtonLink>
                <ButtonLink href="/shop" variant="outline" className="mt-3 w-full">
                  Keep shopping
                </ButtonLink>
              </div>
            </aside>
          </div>
        )}
      </section>

      {hydrated && suggestions.length > 0 && (
        <section aria-labelledby="bag-suggest" className="bg-ivory py-16">
          <div className="container-play">
            <h2 id="bag-suggest" className="t-h3">
              {lines.length ? 'More from the same corners of the toy box' : 'A few favourites to start with'}
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 min-[460px]:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} sizes="(min-width:1024px) 22vw, 45vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
