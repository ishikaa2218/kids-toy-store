const BASE = 'https://images.unsplash.com/photo-'

/** Unsplash CDN URL for a photo id (resized by the image loader). */
export const unsplash = (id: string) => `${BASE}${id}`

/**
 * A close-up crop of the same photograph (imgix focal-point zoom).
 * Used as an honest "detail" view — it is the same product photo, not a new angle.
 */
export const detailCrop = (id: string, x = 0.5, y = 0.5, zoom = 1.8) =>
  `${BASE}${id}?fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&ar=1:1`
