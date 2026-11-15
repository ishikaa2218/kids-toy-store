import Image from 'next/image'
import Link from 'next/link'
import { getCategory } from '@/data/categories'
import type { Product } from '@/types'
import { AddToCartButton } from './AddToCartButton'
import { Price } from './Price'

type Props = {
  product: Product
  sizes?: string
  priority?: boolean
}

/**
 * A calm product card: one photo (a second one is revealed on hover when
 * available), the name, what kind of toy it is and for which age, the price,
 * and an always-visible add-to-bag button that works the same on touch.
 */
export function ProductCard({ product, sizes = '(min-width:1024px) 25vw, (min-width:640px) 45vw, 90vw', priority }: Props) {
  const cat = getCategory(product.category)
  const alt = product.images[1]
  const href = `/shop/${product.slug}`
  const meta = [cat?.name, product.ageLabel].filter(Boolean).join(' · ')

  return (
    <article className="group relative flex flex-col">
      <div className="relative transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-1.5">
        <Link
          href={href}
          aria-label={`View ${product.name}`}
          className="relative block aspect-square overflow-hidden rounded-[var(--radius-tile)] bg-oat transition-shadow duration-500 group-hover:shadow-[0_22px_34px_-24px_rgb(70_45_20/0.55)]"
        >
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes={sizes}
            priority={priority}
            style={{ objectPosition: product.images[0].focus ?? '50% 50%' }}
            className={`object-cover transition-[transform,opacity] duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.05] ${
              alt ? 'group-hover:opacity-0' : ''
            }`}
          />
          {alt && (
            <Image
              src={alt.src}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              style={{ objectPosition: alt.focus ?? '50% 50%' }}
              className="scale-[1.08] object-cover opacity-0 transition-[transform,opacity] duration-700 ease-[var(--ease-out-quint)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>
        <AddToCartButton product={product} className="absolute right-2.5 bottom-2.5 ring-4 ring-paper/70 sm:right-3 sm:bottom-3" />
      </div>

      <div className="mt-3.5 px-0.5">
        <h3 className="font-display text-[17px] leading-snug font-semibold sm:text-[19px]">
          <Link href={href} className="link-line">
            {product.name}
          </Link>
        </h3>
        {meta && <p className="mt-0.5 text-[13px] text-ink-mute sm:text-[13.5px]">{meta}</p>}
        <Price product={product} className="mt-1.5 block text-[16px]" />
      </div>
    </article>
  )
}
