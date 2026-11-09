import Link from 'next/link'
import { brand } from '@/config/brand'
import { footerNav } from '@/config/navigation'
import { categories } from '@/data/categories'
import { PatchMark, Wordmark } from '@/components/brand/Logo'
import { Clay } from '@/components/ui/Clay'

/** Olive footer with a hand-cut wavy edge and a scatter of clay forms. */
export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-olive text-ivory">
      {/* wavy top edge */}
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-10 w-full text-cream sm:h-14">
        <path fill="currentColor" d="M0 0h1440v22c-120 24-240 34-360 22S840 8 720 16 480 52 360 50 120 26 0 30Z" />
      </svg>

      <Clay tone="mustard" shape="blob" className="absolute -top-2 -right-24 h-28 w-44 rotate-12 sm:-right-20 sm:h-44 sm:w-64" />
      <Clay tone="coral" shape="ball" className="absolute right-[6%] bottom-24 hidden size-12 xl:block" />
      <Clay tone="sky" shape="pebble" className="absolute -bottom-24 -left-20 hidden h-40 w-56 -rotate-12 opacity-90 lg:block" />

      <div className="container-play relative grid gap-12 pt-10 pb-12 lg:grid-cols-12 lg:pt-14">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${brand.name} — home`}>
            <PatchMark className="size-11" />
            <span className="rounded-[14px] bg-ivory px-3 py-1">
              <Wordmark className="text-[32px] leading-none" />
            </span>
          </Link>
          <p className="mt-6 max-w-[36ch] text-[15.5px] leading-relaxed text-ivory/80">{brand.description}</p>
          <p className="t-hand mt-5 text-[24px] text-mustard">Made for play.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          <div>
            <p className="t-eyebrow text-ivory/55">Shop</p>
            <ul className="mt-4 space-y-2.5 text-[15.5px]">
              {footerNav.shop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-wiggle text-ivory/90 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-ivory/55">Categories</p>
            <ul className="mt-4 space-y-2.5 text-[15.5px]">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?category=${c.id}`} className="link-wiggle text-ivory/90 hover:text-ivory">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-eyebrow text-ivory/55">{brand.name}</p>
            <ul className="mt-4 space-y-2.5 text-[15.5px]">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-wiggle text-ivory/90 hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
              {brand.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-wiggle text-ivory/90 hover:text-ivory">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="container-play relative flex flex-col gap-2 border-t border-ivory/15 py-6 text-[13px] text-ivory/60 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.name}. Preview store — products and prices are for demonstration.
        </p>
        <p>Photography via Unsplash.</p>
      </div>
    </footer>
  )
}
