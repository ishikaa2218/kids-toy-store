export type CategoryId =
  | 'wooden-toys'
  | 'pretend-play'
  | 'puzzles-games'
  | 'building-stacking'
  | 'plush'
  | 'creative-learning'

export type AgeGroupId = '0-2' | '3-5' | '6-8' | '9-plus'

export type Tone = 'cream' | 'sand' | 'olive' | 'leaf' | 'mustard' | 'sky' | 'coral' | 'orange' | 'wood'

export type ProductImage = {
  /** full Unsplash CDN URL, optionally with crop parameters */
  src: string
  alt: string
  /** CSS object-position for the card crop */
  focus?: string
}

export type Product = {
  id: string
  slug: string
  name: string
  category: CategoryId
  /** price in whole rupees (demo data) */
  price: number
  /** only set when a genuine sale is configured */
  salePrice?: number
  /** one-line hook used on cards */
  tagline: string
  description: string
  images: ProductImage[]
  /** suggested age — demo data until manufacturer guidance is supplied */
  ageLabel?: string
  ageGroups: AgeGroupId[]
  material?: string
  dimensions?: string
  includes?: string[]
  /** manufacturer safety information, when provided */
  safety?: string
  featured?: boolean
  tone: Tone
}

export type Category = {
  id: CategoryId
  name: string
  short: string
  blurb: string
  tone: Tone
  image: ProductImage
}

export type AgeGroup = {
  id: AgeGroupId
  label: string
  title: string
  blurb: string
  tone: Tone
}
