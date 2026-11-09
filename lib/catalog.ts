import type { AgeGroupId, CategoryId, Product } from '@/types'
import { categories } from '@/data/categories'

export type SortId = 'featured' | 'price-asc' | 'price-desc' | 'name'
export type PriceId = 'under-500' | '500-1000' | '1000-2000' | 'over-2000'

export const priceBands: { id: PriceId; label: string; min: number; max: number }[] = [
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 499 },
  { id: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { id: '1000-2000', label: '₹1,000 – ₹2,000', min: 1001, max: 2000 },
  { id: 'over-2000', label: 'Over ₹2,000', min: 2001, max: Infinity },
]

export const sortOptions: { id: SortId; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A to Z' },
]

export type Filters = {
  q: string
  category: CategoryId | null
  age: AgeGroupId | null
  price: PriceId | null
  sort: SortId
}

export const effectivePrice = (p: Product) => p.salePrice ?? p.price

export function matchesQuery(p: Product, q: string) {
  if (!q.trim()) return true
  const cat = categories.find((c) => c.id === p.category)?.name ?? ''
  const hay = `${p.name} ${p.tagline} ${p.description} ${cat} ${p.material ?? ''}`.toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word))
}

export function applyFilters(list: Product[], f: Filters) {
  const band = priceBands.find((b) => b.id === f.price)
  const out = list.filter(
    (p) =>
      matchesQuery(p, f.q) &&
      (!f.category || p.category === f.category) &&
      (!f.age || p.ageGroups.includes(f.age)) &&
      (!band || (effectivePrice(p) >= band.min && effectivePrice(p) <= band.max)),
  )
  switch (f.sort) {
    case 'price-asc':
      return out.sort((a, b) => effectivePrice(a) - effectivePrice(b))
    case 'price-desc':
      return out.sort((a, b) => effectivePrice(b) - effectivePrice(a))
    case 'name':
      return out.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
  }
}

const isCategory = (v: string | null): v is CategoryId => !!v && categories.some((c) => c.id === v)
const ages: AgeGroupId[] = ['0-2', '3-5', '6-8', '9-plus']

/** Parse URL search params into a safe Filters object. */
export function parseFilters(params: URLSearchParams): Filters {
  const category = params.get('category')
  const age = params.get('age') as AgeGroupId | null
  const price = params.get('price') as PriceId | null
  const sort = params.get('sort') as SortId | null
  return {
    q: params.get('q') ?? '',
    category: isCategory(category) ? category : null,
    age: age && ages.includes(age) ? age : null,
    price: price && priceBands.some((b) => b.id === price) ? price : null,
    sort: sort && sortOptions.some((s) => s.id === sort) ? sort : 'featured',
  }
}

export function filtersToParams(f: Filters) {
  const p = new URLSearchParams()
  if (f.q) p.set('q', f.q)
  if (f.category) p.set('category', f.category)
  if (f.age) p.set('age', f.age)
  if (f.price) p.set('price', f.price)
  if (f.sort !== 'featured') p.set('sort', f.sort)
  return p
}
