'use client'

import Image from 'next/image'
import { useMemo, useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, Info, Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/format'
import { Button, ButtonLink } from '@/components/ui/Button'
import { EmptyBag } from './EmptyBag'

type Fields = { name: string; email: string; phone: string; address: string; city: string; state: string; pin: string }
const empty: Fields = { name: '', email: '', phone: '', address: '', city: '', state: '', pin: '' }

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) e.name = 'Please enter the recipient’s name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''))) e.phone = 'Please enter a 10-digit Indian mobile number.'
  if (f.address.trim().length < 6) e.address = 'Please enter the delivery address.'
  if (f.city.trim().length < 2) e.city = 'Please enter the city.'
  if (f.state.trim().length < 2) e.state = 'Please enter the state.'
  if (!/^[1-9]\d{5}$/.test(f.pin.trim())) e.pin = 'Please enter a 6-digit PIN code.'
  return e
}

/**
 * Checkout prepared for a future payment integration. It validates the
 * delivery details but does NOT place orders or take payment — and says so.
 */
export function CheckoutView() {
  const { lines, subtotal, count, hydrated } = useCart()
  const [f, setF] = useState<Fields>(empty)
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [reviewed, setReviewed] = useState(false)
  const errors = useMemo(() => validate(f), [f])
  const show = (k: keyof Fields) => (touched[k] ? errors[k] : undefined)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, address: true, city: true, state: true, pin: true })
    const first = Object.keys(errors)[0]
    if (first) {
      document.getElementById(`co-${first}`)?.focus()
      return
    }
    setReviewed(true)
  }

  if (!hydrated) return <div className="container-play min-h-[60svh] py-16" />

  if (!lines.length)
    return (
      <section className="container-play py-12">
        <h1 className="t-h2">Checkout</h1>
        <EmptyBag />
      </section>
    )

  const field = (k: keyof Fields, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className={k === 'address' ? 'sm:col-span-2' : ''}>
      <label htmlFor={`co-${k}`} className="mb-1.5 block text-[14px] font-bold">
        {label}
      </label>
      <input
        id={`co-${k}`}
        value={f[k]}
        onChange={(e) => setF((s) => ({ ...s, [k]: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        aria-invalid={!!show(k)}
        aria-describedby={show(k) ? `co-${k}-err` : undefined}
        className={`h-12 w-full rounded-[14px] border-2 bg-ivory px-4 text-[16px] outline-none transition-colors focus:border-olive ${
          show(k) ? 'border-coral' : 'border-ink/12'
        }`}
        {...props}
      />
      {show(k) && (
        <p id={`co-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-coral">
          <AlertCircle className="size-3.5" aria-hidden /> {show(k)}
        </p>
      )}
    </div>
  )

  return (
    <section className="container-play py-12 lg:py-16">
      <p className="t-hand text-[26px] text-coral">Nearly there</p>
      <h1 className="t-h2 mt-1">Checkout</h1>

      <div className="mt-6 flex max-w-[760px] items-start gap-3 rounded-[18px] bg-mustard/35 p-4 text-[15px] leading-relaxed">
        <Info className="mt-0.5 size-5 shrink-0 text-olive-deep" aria-hidden />
        <p>
          <strong>Preview checkout.</strong> Online payments are not connected yet, so no order will be placed and no payment will be taken.
          You can still check your bag and delivery details below.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <form noValidate onSubmit={submit} className="lg:col-span-7" aria-labelledby="delivery-title">
          <h2 id="delivery-title" className="t-h3">
            Delivery details
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {field('name', 'Full name', { autoComplete: 'name' })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
            {field('phone', 'Mobile number', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
            {field('pin', 'PIN code', { inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 6 })}
            {field('address', 'Address', { autoComplete: 'street-address' })}
            {field('city', 'City', { autoComplete: 'address-level2' })}
            {field('state', 'State', { autoComplete: 'address-level1' })}
          </div>

          <h2 className="t-h3 mt-12">Payment</h2>
          <div className="mt-4 flex items-start gap-3 rounded-[18px] border-2 border-dashed border-ink/20 p-5 text-[15px] text-ink-soft">
            <Lock className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>A secure payment provider will be connected here. This preview never asks for card or UPI details.</p>
          </div>

          <Button type="submit" className="mt-8 w-full sm:w-auto sm:min-w-[260px]">
            Review order
          </Button>

          <AnimatePresence>
            {reviewed && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 rounded-[22px] bg-leaf/30 p-6"
              >
                <h3 className="font-display text-[22px] font-bold">Your details look good</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  This is where payment would happen. Because the store is in preview, <strong>no order has been placed</strong> and nothing has
                  been charged. Your bag is saved on this device.
                </p>
                <ButtonLink href="/shop" variant="outline" className="mt-5">
                  Back to the shop
                </ButtonLink>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="summary-title">
          <div className="sticky top-[calc(var(--header-h)+24px)] rounded-[28px] bg-ivory p-6 sm:p-8">
            <h2 id="summary-title" className="font-display text-[24px] font-bold">
              Order summary <span className="text-ink-mute">({count})</span>
            </h2>
            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-[12px] bg-sand">
                    <Image src={l.product.images[0].src} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: l.product.images[0].focus }} />
                    <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-ink text-[11px] font-bold text-ivory">{l.qty}</span>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">{l.product.name}</span>
                  <span className="text-[15px] font-semibold tabular-nums">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t-2 border-ink/10 pt-4">
              <span className="font-bold">Subtotal</span>
              <span className="font-display text-[26px] font-bold tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-[13px] text-ink-mute">Delivery and taxes will be calculated once checkout is live.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
