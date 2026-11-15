import { Hero, PeekingCub } from '@/components/home/Hero'
import { Categories } from '@/components/home/Categories'
import { Ages } from '@/components/home/Ages'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Adventure } from '@/components/home/Adventure'
import { Hello } from '@/components/home/Hello'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* the white "table": the cub peeks over its top edge */}
      <div className="panel relative overflow-x-clip">
        <PeekingCub />
        <Categories />
        <Ages />
      </div>
      <FeaturedProducts />
      <Adventure />
      <Hello />
      <RecentlyViewed title="Pick up where you left off" />
    </>
  )
}
