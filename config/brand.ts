/**
 * Brand configuration — the single place to rename the store or add real
 * business details. "PlayPatch" is a provisional working name.
 *
 * Contact details and social profiles are intentionally empty until real,
 * confirmed information is supplied. Components hide anything left as null.
 */
export const brand = {
  name: 'PlayPatch',
  /** split wordmark colouring — one colour token per letter */
  wordmarkColors: ['coral', 'mustard', 'leaf', 'sky', 'coral', 'mustard', 'leaf', 'sky', 'coral'] as const,
  tagline: 'Toys for curious little hands',
  description:
    'PlayPatch is an online toy shop of wooden toys, pretend play, puzzles, stacking toys, plush friends and creative kits — chosen for open-ended, hands-on play.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kids-toy-store-ten.vercel.app',
  locale: 'en-IN',
  currency: 'INR',

  announcement:
    'Welcome to PlayPatch — this is a preview of our shop. Products and prices shown are for demonstration.',

  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },

  /** e.g. [{ label: 'Instagram', href: 'https://instagram.com/…' }] */
  social: [] as { label: string; href: string }[],
}

export type Brand = typeof brand
