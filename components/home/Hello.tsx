import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { brand, whatsappLink } from '@/config/brand'
import { Reveal } from '@/components/ui/Motion'

const steps = [
  { n: '1', title: 'Fill your bag', body: 'Pick toys and quantities. No account, no online payment.', dot: 'bg-butter' },
  { n: '2', title: 'Order on WhatsApp', body: 'We write the message for you — every toy, quantity and the subtotal.', dot: 'bg-tangerine' },
  { n: '3', title: 'We confirm in the chat', body: `${brand.name} replies to confirm availability, delivery and payment.`, dot: 'bg-sky' },
]

/** Who we are, and how ordering works — short and warm. */
export function Hello() {
  return (
    <section aria-labelledby="hello-title" className="bg-cream py-24 lg:py-32">
      <div className="container-play grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="t-eyebrow text-tangerine-deep">Hello there</p>
          <h2 id="hello-title" className="t-h2 mt-3">
            We’re {brand.name}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
            A little online toy shop built around one simple idea: the best toys give children room to invent, build, care and create — and
            give the grown-ups around them something to join in with.
          </p>
          <Link href="/about" className="mt-6 inline-block text-[16px] font-bold text-ink">
            <span className="link-line pb-0.5">Read our story</span>
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[32px] bg-paper p-7 sm:p-10">
            <h3 className="t-h3">How ordering works</h3>
            <ol className="mt-6 space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full font-display text-[18px] font-semibold text-ink ${s.dot}`}>
                    {s.n}
                  </span>
                  <span>
                    <span className="block text-[17px] font-bold">{s.title}</span>
                    <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-soft">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-whatsapp"
            >
              <MessageCircle className="size-5" strokeWidth={2.4} aria-hidden />
              <span className="link-line">Questions first? WhatsApp {brand.whatsapp.display}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
