/**
 * Brand configuration — the single place for the store name, copy and
 * business details. Components read everything from here.
 *
 * Contact details left as null are hidden automatically.
 */
export const brand = {
  name: 'Kinderhouse',
  /** split wordmark colouring — one colour token per letter */
  wordmarkColors: ['coral', 'mustard', 'leaf', 'sky', 'coral', 'mustard', 'leaf', 'sky', 'coral', 'mustard', 'leaf'] as const,
  tagline: 'A little world of toys',
  headline: 'Little Toys. Big Adventures.',
  description:
    'Kinderhouse is a toy boutique of wooden toys, pretend play, puzzles, stacking toys, plush friends and creative kits — chosen for open-ended, hands-on play.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kids-toy-store-ten.vercel.app',
  locale: 'en-IN',
  currency: 'INR',

  announcement: 'Fill your bag, then order on WhatsApp — no online payment needed.',

  /** Orders are placed by WhatsApp chat — there is no online payment. */
  whatsapp: {
    /** international format without "+" or spaces, as wa.me expects */
    number: '918427883569',
    display: '+91 84278 83569',
  },

  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },

  /** e.g. [{ label: 'Instagram', href: 'https://instagram.com/…' }] */
  social: [] as { label: string; href: string }[],
}

export const whatsappLink = `https://wa.me/${brand.whatsapp.number}`

export type Brand = typeof brand
