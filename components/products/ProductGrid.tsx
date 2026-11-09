import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, cols = 4 }: { products: Product[]; cols?: 3 | 4 }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 sm:gap-y-12 ${cols === 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  )
}
