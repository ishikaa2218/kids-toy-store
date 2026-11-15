'use client'

import { useEffect } from 'react'
import { getProduct } from '@/data/products'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import { ProductCard } from './ProductCard'

/** Products this visitor actually opened (stored only in their browser). */
export function RecentlyViewed({ exclude, title = 'Recently viewed', track }: { exclude?: string; title?: string; track?: string }) {
  const { slugs, track: record } = useRecentlyViewed()

  useEffect(() => {
    if (track) record(track)
  }, [track, record])

  const items = slugs
    .filter((s) => s !== exclude)
    .map((s) => getProduct(s))
    .filter(Boolean)
    .slice(0, 4)

  if (!items.length) return null

  return (
    <section aria-labelledby="recent-title" className="py-16 lg:py-20">
      <div className="container-play">
        <h2 id="recent-title" className="t-h3">
          {title}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p!.id}>
              <ProductCard product={p!} sizes="(min-width:1024px) 300px, 46vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
