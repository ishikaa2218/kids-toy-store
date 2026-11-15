import Image from 'next/image'
import Link from 'next/link'
import { ageGroups } from '@/data/categories'
import { products } from '@/data/products'
import { ageArt } from '@/config/visuals'
import { Reveal } from '@/components/ui/Motion'

const count = (id: string) => products.filter((p) => p.ageGroups.includes(id as never)).length

/** Four clay number blocks — each one opens the shop filtered to that age group. */
export function Ages() {
  return (
    <section aria-labelledby="ages-title" className="container-play pt-10 pb-24 lg:pb-32">
      <div className="grid gap-4 border-t border-line pt-16 lg:grid-cols-12 lg:pt-20">
        <h2 id="ages-title" className="t-h2 lg:col-span-6">
          Toys for every age
        </h2>
        <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:self-end">
          Suggested ages are a starting point — every child plays differently, so check the age guidance on each toy.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-14 lg:grid-cols-4 lg:gap-x-8">
        {ageGroups.map((a, i) => (
          <li key={a.id}>
            <Reveal delay={i * 0.06}>
              <Link href={`/shop?age=${a.id}`} className="group flex flex-col items-center text-center" aria-label={`Toys for ages ${a.label} — ${a.title}`}>
                <Image
                  src={ageArt[a.id]}
                  alt=""
                  width={520}
                  height={400}
                  unoptimized
                  className="w-full max-w-[230px] transition-transform duration-500 ease-[var(--ease-out-back)] group-hover:-translate-y-2.5 group-hover:-rotate-2"
                />
                <span className="mt-4 font-display text-[22px] leading-tight font-semibold">{a.title}</span>
                <span className="mt-1 text-[14.5px] text-ink-soft">{a.blurb}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-ink">
                  <span className="link-line">Shop {count(a.id)} toys</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
