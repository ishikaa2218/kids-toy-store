import type { AgeGroupId, CategoryId } from '@/types'

/**
 * Presentation-only artwork for the catalogue: one clay icon per category
 * and one clay number block per age group (files in /public/clay).
 * Product data, ids and filters are untouched — this only maps ids to images.
 */
export const categoryArt: Record<CategoryId, { src: string; tint: string }> = {
  'wooden-toys': { src: '/clay/cat-wooden-toys.webp', tint: 'bg-butter-soft' },
  'pretend-play': { src: '/clay/cat-pretend-play.webp', tint: 'bg-[#ffd9c7]' },
  'puzzles-games': { src: '/clay/cat-puzzles-games.webp', tint: 'bg-[#d6efd3]' },
  'building-stacking': { src: '/clay/cat-building-stacking.webp', tint: 'bg-sky-soft' },
  plush: { src: '/clay/cat-plush.webp', tint: 'bg-[#e4dcfc]' },
  'creative-learning': { src: '/clay/cat-creative-learning.webp', tint: 'bg-oat' },
}

export const ageArt: Record<AgeGroupId, string> = {
  '0-2': '/clay/age-0-2.webp',
  '3-5': '/clay/age-3-5.webp',
  '6-8': '/clay/age-6-8.webp',
  '9-plus': '/clay/age-9-plus.webp',
}

/**
 * Hero mascot geometry, measured from the render (fractions of the image).
 * The pupils are drawn in HTML on top of the eye whites so they can follow
 * the pointer.
 */
export const mascot = {
  src: '/clay/mascot.webp',
  width: 1600,
  height: 451,
  /** the line the cub's paws rest on */
  ledge: 0.8724,
  /** horizontal centre of the cub (the toys either side make the strip asymmetric) */
  center: 0.4737,
  eyes: [
    [0.4218, 0.4477],
    [0.5255, 0.4477],
  ] as const,
  eyeRadius: 0.0334,
}
