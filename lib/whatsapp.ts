import { brand } from '@/config/brand'
import { effectivePrice } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/types'

export type OrderLine = { product: Product; qty: number; variant?: string }
export type OrderCustomer = { name?: string; location?: string }

/** Keep only real, purchasable lines (known product, whole quantity ≥ 1). */
export function validLines(lines: OrderLine[]) {
  return lines.filter((l) => l.product && Number.isInteger(l.qty) && l.qty >= 1 && effectivePrice(l.product) > 0)
}

/**
 * The pre-filled WhatsApp message. Built only from the bag's actual contents
 * and current prices — nothing is hard-coded.
 */
export function buildOrderMessage(lines: OrderLine[], customer: OrderCustomer = {}) {
  const items = validLines(lines)
  const subtotal = items.reduce((n, l) => n + effectivePrice(l.product) * l.qty, 0)
  const out: string[] = [`Hello ${brand.name}! I would like to place an order.`, '', 'My order details:', '']

  items.forEach((l, i) => {
    const unit = effectivePrice(l.product)
    out.push(`${i + 1}. ${l.product.name}`)
    if (l.variant) out.push(`Option: ${l.variant}`)
    out.push(`Quantity: ${l.qty}`, `Unit price: ${formatPrice(unit)}`, `Total: ${formatPrice(unit * l.qty)}`, '')
  })

  out.push(`Subtotal: ${formatPrice(subtotal)}`)
  const name = customer.name?.trim()
  const location = customer.location?.trim()
  if (name) out.push(`Customer name: ${name}`)
  if (location) out.push(`Delivery location: ${location}`)
  out.push('', 'Please let me know the next steps for confirming my order.', 'Thank you!')
  return out.join('\n')
}

/** wa.me link with the message safely encoded. Returns null for an empty bag. */
export function whatsappOrderUrl(lines: OrderLine[], customer: OrderCustomer = {}) {
  if (!validLines(lines).length) return null
  return `https://wa.me/${brand.whatsapp.number}?text=${encodeURIComponent(buildOrderMessage(lines, customer))}`
}
