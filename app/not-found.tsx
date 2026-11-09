import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { Clay } from '@/components/ui/Clay'
import { categories } from '@/data/categories'

export default function NotFound() {
  return (
    <section className="container-play grid min-h-[70svh] items-center gap-12 py-16 lg:grid-cols-2">
      <div>
        <p className="t-hand text-[30px] text-coral">Oops — this toy rolled under the sofa</p>
        <h1 className="t-display mt-2">Page not found</h1>
        <p className="mt-5 max-w-[42ch] text-[17px] text-ink-soft">The page you were looking for doesn’t exist or has moved. Here are a few good places to start instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/shop" variant="outline">
            Shop toys
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/shop?category=${c.id}`} className="inline-flex min-h-10 items-center rounded-full bg-sand px-4 text-[14px] font-semibold hover:bg-mustard">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mx-auto h-[320px] w-full max-w-[420px]" aria-hidden>
        <Clay tone="mustard" shape="tile" className="absolute bottom-0 left-[12%] size-36 -rotate-6" />
        <Clay tone="coral" shape="ball" className="absolute bottom-[40%] left-[38%] size-24" />
        <Clay tone="sky" shape="pebble" className="absolute right-[6%] bottom-[6%] h-24 w-32 rotate-12" />
        <span className="absolute top-4 right-[18%] font-display text-[110px] leading-none font-[850] text-leaf">?</span>
      </div>
    </section>
  )
}
