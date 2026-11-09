import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url
  const pages = ['', '/shop', '/about', '/contact'].map((p) => ({ url: `${base}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 }))
  const items = products.map((p) => ({ url: `${base}/shop/${p.slug}`, changeFrequency: 'weekly' as const, priority: 0.6 }))
  return [...pages, ...items]
}
