import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { MaskLines } from '@/components/ui/Motion'
import { brand, whatsappLink } from '@/config/brand'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `How to get in touch with ${brand.name}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const c = brand.contact
  const rows = [
    { icon: MessageCircle, label: 'WhatsApp — orders & questions', value: brand.whatsapp.display, href: whatsappLink, external: true },
    c.email && { icon: Mail, label: 'Email', value: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: Phone, label: 'Phone', value: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` },
    c.address && { icon: MapPin, label: 'Address', value: c.address },
    c.hours && { icon: Clock, label: 'Hours', value: c.hours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string; external?: boolean }[]

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-play relative grid gap-12 pt-12 pb-24 lg:grid-cols-12 lg:pt-20 lg:pb-32">
        <div className="lg:col-span-6">
          <p className="t-eyebrow text-tangerine-deep">Contact Us</p>
          <MaskLines as="h1" trigger="mount" className="t-display mt-4 !text-[clamp(44px,6vw,92px)]" lines={['We’d love to', 'hear from you']} />
          <p className="t-lead mt-6 max-w-[46ch]">
            Questions about a toy, a gift idea or an order? The quickest way to reach us is WhatsApp — it’s also where every order is placed and confirmed.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          {rows.length ? (
            <ul className="divide-y divide-line rounded-[32px] bg-paper px-7">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4 py-5">
                  <r.icon className="mt-1 size-5 text-whatsapp" aria-hidden />
                  <div>
                    <p className="t-eyebrow text-ink-mute">{r.label}</p>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="link-line text-[17px] font-semibold"
                      >
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
            <div className="rounded-[32px] bg-paper p-8">
              <p className="font-display text-[26px] leading-tight font-semibold">Contact details coming soon</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                We’re setting up our customer contact channels. Once our email, phone number and address are confirmed, you’ll find them right
                here.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">In the meantime, the whole toy box is open for browsing.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/shop">Browse toys</ButtonLink>
                <ButtonLink href="/about" variant="outline">
                  About us
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
