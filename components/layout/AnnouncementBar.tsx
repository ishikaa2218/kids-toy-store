import { brand } from '@/config/brand'

export function AnnouncementBar() {
  return (
    <div className="bg-olive text-ivory">
      <p className="container-play py-2.5 text-center text-[13px] leading-snug font-semibold">
        <span className="t-hand mr-2 text-[17px] text-mustard">Hello!</span>
        {brand.announcement}
      </p>
    </div>
  )
}
