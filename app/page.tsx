import { Hero } from '@/components/home/Hero'
import { WordmarkBand } from '@/components/home/WordmarkBand'
import { CategoryMosaic } from '@/components/home/CategoryMosaic'
import { AgeExplorer } from '@/components/home/AgeExplorer'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Campaign } from '@/components/home/Campaign'
import { Story } from '@/components/home/Story'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WordmarkBand />
      <CategoryMosaic />
      <AgeExplorer />
      <FeaturedProducts />
      <Campaign />
      <Story />
      <RecentlyViewed title="Pick up where you left off" />
    </>
  )
}
