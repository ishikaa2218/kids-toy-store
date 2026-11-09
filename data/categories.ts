import type { AgeGroup, Category } from '@/types'
import { unsplash } from '@/lib/unsplash'

export const categories: Category[] = [
  {
    id: 'wooden-toys',
    name: 'Wooden Toys',
    short: 'Wooden',
    blurb: 'Cars, trains and parades with a warm, solid feel.',
    tone: 'mustard',
    image: { src: unsplash('1788140538871-9c682ba73f0a'), alt: 'Wooden toy truck, aeroplane, houses and trees on a pale blue background', focus: '50% 60%' },
  },
  {
    id: 'pretend-play',
    name: 'Pretend Play',
    short: 'Pretend',
    blurb: 'Kitchens, tea parties and little worlds to run.',
    tone: 'coral',
    image: { src: unsplash('1740679954277-3069af709764'), alt: 'Children arranging furniture in a wooden dollhouse', focus: '60% 50%' },
  },
  {
    id: 'puzzles-games',
    name: 'Puzzles & Games',
    short: 'Puzzles',
    blurb: 'Shapes, numbers and pieces to puzzle over.',
    tone: 'leaf',
    image: { src: unsplash('1685358272306-6e96880aa97d'), alt: 'A child’s hands fitting pieces into a colourful wooden number puzzle' },
  },
  {
    id: 'building-stacking',
    name: 'Building & Stacking',
    short: 'Stacking',
    blurb: 'Blocks, rings and arches to build up and knock down.',
    tone: 'sky',
    image: { src: unsplash('1683234804564-0c0850c05455'), alt: 'Pile of colourful wooden alphabet and number blocks' },
  },
  {
    id: 'plush',
    name: 'Plush Toys',
    short: 'Plush',
    blurb: 'Soft friends for naps, journeys and big feelings.',
    tone: 'sand',
    image: { src: unsplash('1600978398568-48175fd97cce'), alt: 'Grey plush bunny beside a wooden picture block and small toys', focus: '40% 50%' },
  },
  {
    id: 'creative-learning',
    name: 'Creative & Learning',
    short: 'Creative',
    blurb: 'Music, colour and counting for busy minds.',
    tone: 'olive',
    image: { src: unsplash('1780039298271-f3e1318eb3ae'), alt: 'Colourful hand bells in front of two rainbow xylophones', focus: '50% 60%' },
  },
]

export const ageGroups: AgeGroup[] = [
  { id: '0-2', label: '0–2', title: 'Babies & toddlers', blurb: 'Stacking, sorting and first sounds.', tone: 'sky' },
  { id: '3-5', label: '3–5', title: 'Little explorers', blurb: 'Pretend play, puzzles and making.', tone: 'mustard' },
  { id: '6-8', label: '6–8', title: 'Curious makers', blurb: 'Skills, games and bigger builds.', tone: 'coral' },
  { id: '9-plus', label: '9+', title: 'Big kids', blurb: 'Longer challenges and creative projects.', tone: 'leaf' },
]

export const getCategory = (id: string) => categories.find((c) => c.id === id)
export const getAgeGroup = (id: string) => ageGroups.find((a) => a.id === id)
