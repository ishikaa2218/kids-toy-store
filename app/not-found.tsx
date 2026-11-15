import Image from 'next/image'
import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { categories } from '@/data/categories'

export default function NotFound() {
  return (
    <section className="container-play grid min-h-[70svh] items-center gap-12 py-16 lg:grid-cols-2">
      <div>
        <p className="t-eyebrow text-tangerine-deep">Oops — this toy rolled under the sofa</p>
        <h1 className="t-display mt-4">Page not found</h1>
        <p className="t-lead mt-5 max-w-[42ch]">The page you were looking for doesn’t exist or has moved. Here are a few good places to start instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/shop" variant="outline">
            Shop toys
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/shop?category=${c.id}`} className="inline-flex min-h-10 items-center rounded-full bg-paper px-4 text-[14px] font-semibold transition-colors hover:bg-butter">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto w-full max-w-[460px]" aria-hidden>
        <Image src="/clay/blocks.webp" alt="" width={720} height={395} unoptimized className="w-full" />
      </div>
    </section>
  )
}
