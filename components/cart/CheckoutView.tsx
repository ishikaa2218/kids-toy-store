'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, MessageCircle, MessagesSquare, PackageCheck, ShoppingBag, UserRound } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { brand } from '@/config/brand'
import { formatPrice } from '@/lib/format'
import { buildOrderMessage, validLines, whatsappOrderUrl } from '@/lib/whatsapp'
import { ButtonLink } from '@/components/ui/Button'
import { CartLines } from './CartLines'
import { EmptyBag } from './EmptyBag'

const steps = [
  { icon: ShoppingBag, title: 'Review your bag', body: 'Change quantities or remove toys.' },
  { icon: UserRound, title: 'Add your details', body: 'Name and delivery area are optional.' },
  { icon: MessageCircle, title: 'Continue on WhatsApp', body: 'Your order message is written for you.' },
  { icon: PackageCheck, title: 'We confirm in chat', body: 'Availability, delivery and payment.' },
]

/**
 * Ordering happens over WhatsApp — there is no online payment. This page
 * reviews the bag, optionally collects a name and delivery area, and opens
 * WhatsApp with a pre-filled message. Opening WhatsApp does NOT place or
 * confirm an order, and the page says so. The bag is never cleared here.
 */
export function CheckoutView() {
  const { lines, subtotal, count, hydrated } = useCart()
  const reduce = useReducedMotion()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [handedOff, setHandedOff] = useState(false)

  const order = useMemo(() => validLines(lines.map((l) => ({ product: l.product, qty: l.qty }))), [lines])
  const customer = { name, location }
  const url = whatsappOrderUrl(order, customer)
  const message = buildOrderMessage(order, customer)

  if (!hydrated) return <div className="container-play min-h-[60svh] py-16" />

  if (!order.length)
    return (
      <section className="container-play py-12 lg:py-16">
        <p className="t-eyebrow text-tangerine-deep">Nothing to order yet</p>
        <h1 className="t-h2 mt-3">Order on WhatsApp</h1>
        <EmptyBag />
      </section>
    )

  const cta = (className = '') =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setHandedOff(true)}
        className={`group/wa inline-flex items-center justify-center gap-2.5 rounded-full bg-whatsapp font-bold whitespace-nowrap text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-whatsapp-deep active:translate-y-0 active:scale-[0.98] ${className}`}
      >
        <MessageCircle className="size-5.5 transition-transform duration-300 group-hover/wa:-rotate-12" strokeWidth={2.4} aria-hidden />
        Continue on WhatsApp
      </a>
    ) : null

  return (
    <section className="container-play py-12 lg:py-16">
      <p className="t-eyebrow text-tangerine-deep">Almost ready to play</p>
      <h1 className="t-h2 mt-3">Order on WhatsApp</h1>
      <p className="mt-3 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-soft">
        No online payment, no account. Check your bag, then continue on WhatsApp — {brand.name} will reply to confirm availability, delivery
        and how you’d like to pay.
      </p>

      {/* how it works */}
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex items-start gap-3 rounded-[20px] bg-paper p-4">
            <span className={`grid size-10 shrink-0 place-items-center rounded-full text-ink ${['bg-butter', 'bg-sky-soft', 'bg-[#d6efd3]', 'bg-[#ffd9c7]'][i]}`}>
              <s.icon className="size-[18px]" strokeWidth={2.4} aria-hidden />
            </span>
            <span>
              <span className="block text-[15px] font-bold">
                {i + 1}. {s.title}
              </span>
              <span className="block text-[13.5px] text-ink-mute">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="t-h3">Your bag ({count})</h2>
          <div className="mt-2">
            <CartLines />
          </div>

          <h2 className="t-h3 mt-12">
            Your details <span className="text-[17px] font-semibold text-ink-mute">(optional)</span>
          </h2>
          <p className="mt-2 text-[14.5px] text-ink-soft">
            Added to your WhatsApp message so we can help faster. You can also share them in the chat.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="wa-name" className="mb-1.5 block text-[14px] font-bold">
                Your name
              </label>
              <input
                id="wa-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={60}
                className="h-12 w-full rounded-[14px] border-2 border-line bg-paper px-4 text-[16px] outline-none transition-colors focus:border-ink/30"
              />
            </div>
            <div>
              <label htmlFor="wa-location" className="mb-1.5 block text-[14px] font-bold">
                Delivery location
              </label>
              <input
                id="wa-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Area, city or PIN code"
                autoComplete="address-level2"
                maxLength={120}
                className="h-12 w-full rounded-[14px] border-2 border-line bg-paper px-4 text-[16px] outline-none transition-colors placeholder:text-ink-mute/80 focus:border-ink/30"
              />
            </div>
          </div>

          <details className="group mt-8 rounded-[20px] border-2 border-dashed border-line p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                <MessagesSquare className="size-4.5 text-ink" aria-hidden /> Preview the message we’ll prepare
              </span>
              <ChevronDown className="size-4.5 transition-transform duration-300 group-open:rotate-180" aria-hidden />
            </summary>
            <pre className="mt-4 overflow-x-auto rounded-[14px] bg-paper p-4 font-sans text-[14px] leading-relaxed whitespace-pre-wrap text-ink-soft">
              {message}
            </pre>
          </details>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="summary-title">
          <div className="sticky top-[calc(var(--header-h)+24px)] rounded-[28px] bg-paper p-6 sm:p-8">
            <h2 id="summary-title" className="font-display text-[24px] font-semibold">
              Order summary <span className="text-ink-mute">({count})</span>
            </h2>
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-[12px] bg-oat">
                    <Image
                      src={l.product.images[0].src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                      style={{ objectPosition: l.product.images[0].focus }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold">{l.product.name}</span>
                    <span className="block text-[13px] text-ink-mute">
                      {l.qty} × {formatPrice(l.product.salePrice ?? l.product.price)}
                    </span>
                  </span>
                  <span className="text-[15px] font-semibold tabular-nums">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t-2 border-line pt-4">
              <span className="font-bold">Subtotal</span>
              <span className="font-display text-[28px] font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
              Delivery charges, if any, and payment are arranged with you on WhatsApp.
            </p>

            <p className="mt-5 rounded-[16px] bg-[#e3f3e1] p-4 text-[14.5px] leading-relaxed font-semibold text-ink">
              Your order details are ready. Continue on WhatsApp to confirm your order with {brand.name}.
            </p>
            {cta('mt-5 min-h-14 w-full px-4 text-[15.5px] xl:text-[16.5px]')}
            <p className="mt-3 text-center text-[13px] text-ink-mute">Opens WhatsApp chat with {brand.whatsapp.display}</p>

            <AnimatePresence>
              {handedOff && (
                <motion.div
                  role="status"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-[18px] bg-butter-soft p-4 text-[14.5px] leading-relaxed"
                >
                  <p className="font-bold">WhatsApp should now be open with your order message.</p>
                  <p className="mt-1 text-ink-soft">
                    Send it to start your order — it isn’t confirmed until {brand.name} replies. Your bag stays saved here in case you need
                    it again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <ButtonLink href="/shop" variant="outline" className="mt-4 w-full">
              Keep shopping
            </ButtonLink>
          </div>
        </aside>
      </div>

      {/* phones: keep the order button within thumb's reach */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[640px] items-center gap-3">
          <span className="shrink-0">
            <span className="block text-[12px] font-bold tracking-[0.08em] text-ink-mute uppercase">Subtotal</span>
            <span className="font-display text-[22px] leading-none font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </span>
          {cta('min-h-12 flex-1 px-4 text-[15px]')}
        </div>
      </div>
      <div className="h-24 lg:hidden" aria-hidden />
    </section>
  )
}
