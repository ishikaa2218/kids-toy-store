import { formatPrice } from '@/lib/format'
import type { Product } from '@/types'

export function Price({ product, className = '' }: { product: Product; className?: string }) {
  if (product.salePrice && product.salePrice < product.price) {
    return (
      <span className={`inline-flex items-baseline gap-2 ${className}`}>
        <span className="font-bold text-coral">{formatPrice(product.salePrice)}</span>
        <s className="text-[0.85em] text-ink-mute">{formatPrice(product.price)}</s>
      </span>
    )
  }
  return <span className={`font-bold ${className}`}>{formatPrice(product.price)}</span>
}
