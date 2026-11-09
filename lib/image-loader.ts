'use client'

type LoaderArgs = { src: string; width: number; quality?: number }

/**
 * Unsplash's CDN (imgix) handles resizing and AVIF/WebP negotiation.
 * Local assets (e.g. /brand/*.svg) are returned untouched.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith('https://images.unsplash.com/')) return src
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 72))
  if (!url.searchParams.has('auto')) url.searchParams.set('auto', 'format')
  if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'max')
  return url.toString()
}
