import { ButtonLink } from '@/components/ui/Button'
import { Clay } from '@/components/ui/Clay'

export function EmptyBag({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div className="relative h-28 w-40" aria-hidden>
        <Clay tone="mustard" shape="tile" className="absolute bottom-0 left-6 size-20 rotate-[-8deg]" />
        <Clay tone="coral" shape="ball" className="absolute right-6 bottom-2 size-12" />
        <Clay tone="sky" shape="ball" className="absolute top-0 right-12 size-8" />
      </div>
      <h2 className="t-h3 mt-6">Your bag is empty</h2>
      <p className="mt-2 max-w-[30ch] text-[15px] text-ink-soft">Nothing here yet — the toy box is waiting to be explored.</p>
      <ButtonLink href="/shop" onClick={onNavigate} className="mt-7">
        Shop toys
      </ButtonLink>
    </div>
  )
}
