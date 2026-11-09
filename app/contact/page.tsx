import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Clay } from '@/components/ui/Clay'
import { MaskLines } from '@/components/ui/Motion'
import { brand } from '@/config/brand'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `How to get in touch with ${brand.name}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const c = brand.contact
  const rows = [
    c.email && { icon: Mail, label: 'Email', value: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: Phone, label: 'Phone', value: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` },
    c.address && { icon: MapPin, label: 'Address', value: c.address },
    c.hours && { icon: Clock, label: 'Hours', value: c.hours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[]

  return (
    <section className="relative overflow-hidden bg-cream">
      <Clay tone="sky" shape="blob" className="absolute top-16 -right-16 h-48 w-64 rotate-12" />
      <Clay tone="coral" shape="ball" className="absolute right-[18%] bottom-20 hidden size-14 md:block" />
      <div className="container-play relative grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="t-hand text-[30px] text-coral">Say hello</p>
          <MaskLines as="h1" trigger="mount" className="t-display mt-2" lines={['We’d love to', 'hear from you']} />
          <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-ink-soft">
            Questions about a toy, a gift idea or an order? Our contact details will appear here as soon as they’re confirmed.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {rows.length ? (
            <ul className="divide-y-2 divide-ink/10 rounded-[28px] bg-ivory px-6">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4 py-5">
                  <r.icon className="mt-1 size-5 text-olive" aria-hidden />
                  <div>
                    <p className="t-eyebrow text-ink-mute">{r.label}</p>
                    {r.href ? (
                      <a href={r.href} className="link-wiggle text-[17px] font-semibold">
                        {r.value}
                      </a>
                    ) : (
                      <p className="text-[17px] font-semibold">{r.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-[28px] bg-ivory p-8">
              <p className="font-display text-[26px] leading-tight font-bold">Contact details coming soon</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                We’re setting up our customer contact channels. Once our email, phone number and address are confirmed, you’ll find them right
                here.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">In the meantime, the whole toy box is open for browsing.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/shop">Browse toys</ButtonLink>
                <ButtonLink href="/about" variant="outline">
                  Our story
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
