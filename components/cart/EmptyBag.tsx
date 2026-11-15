import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'

export function EmptyBag({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <Image src="/clay/blocks.webp" alt="" width={720} height={395} unoptimized className="w-[220px]" />
      <h2 className="t-h3 mt-6">Your bag is empty</h2>
      <p className="mt-2 max-w-[30ch] text-[15px] text-ink-soft">Nothing here yet — the toy box is waiting to be explored.</p>
      <ButtonLink href="/shop" onClick={onNavigate} className="mt-7">
        Shop toys
      </ButtonLink>
    </div>
  )
}
