import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { brand, whatsappLink } from '@/config/brand'
import { footerNav } from '@/config/navigation'
import { categories } from '@/data/categories'
import { HouseMark, Wordmark } from '@/components/brand/Logo'

const blob = 'pointer-events-none absolute select-none'

/** Butter-yellow footer with clay blobs tucked into its corners. */
export function Footer() {
  const links = [...footerNav.shop.slice(0, 1), ...footerNav.company, ...footerNav.shop.slice(2)]
  return (
    <footer className="container-wide mt-auto pt-6 pb-4 sm:pb-6">
      <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-butter px-6 pt-16 pb-10 text-ink sm:px-12 sm:pt-20">
        <Image src="/clay/blob-tangerine.webp" alt="" width={560} height={357} unoptimized aria-hidden className={`${blob} -bottom-20 -left-24 w-[260px] rotate-[-14deg] sm:w-[340px] lg:-bottom-24 lg:-left-16`} />
        <Image src="/clay/blob-sky.webp" alt="" width={560} height={277} unoptimized aria-hidden className={`${blob} -top-16 -right-24 w-[240px] rotate-[18deg] sm:w-[340px]`} />
        <Image src="/clay/blob-grape.webp" alt="" width={514} height={444} unoptimized aria-hidden className={`${blob} -right-16 -bottom-24 hidden w-[230px] rotate-12 md:block`} />
        <Image src="/clay/ball-tangerine.webp" alt="" width={160} height={159} unoptimized aria-hidden className={`${blob} top-[22%] right-[16%] hidden w-11 md:block`} />
        <Image src="/clay/ball-grape.webp" alt="" width={160} height={162} unoptimized aria-hidden className={`${blob} bottom-[30%] left-[10%] hidden w-8 lg:block`} />

        <div className="relative flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${brand.name} — home`}>
            <HouseMark className="w-12" />
            <Wordmark className="text-[34px] leading-none" />
          </Link>
          <p className="mt-4 max-w-[38ch] text-[15.5px] leading-relaxed text-ink/75">{brand.tagline} — toys chosen for open-ended, hands-on play.</p>

          <nav aria-label="Footer" className="mt-8">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[15.5px] font-bold">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-line">
                    {l.label}
                  </Link>
                </li>
              ))}
              {brand.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[14px] text-ink/70">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/shop?category=${c.id}`} className="link-line hover:text-ink">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-5 text-[15px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5 text-whatsapp" strokeWidth={2.4} aria-hidden />
            WhatsApp {brand.whatsapp.display}
          </a>

          <div className="mt-12 flex w-full max-w-[720px] flex-col gap-1.5 border-t border-ink/15 pt-6 text-[13px] text-ink/65">
            <p>
              © {new Date().getFullYear()} {brand.name}. Orders are placed and confirmed on WhatsApp — no online payments are taken on this site.
            </p>
            <p>Product photography via Unsplash.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
