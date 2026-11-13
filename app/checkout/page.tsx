import type { Metadata } from 'next'
import { CheckoutView } from '@/components/cart/CheckoutView'

export const metadata: Metadata = { title: 'Order on WhatsApp', robots: { index: false } }

export default function CheckoutPage() {
  return <CheckoutView />
}
