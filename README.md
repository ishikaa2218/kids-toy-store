# PlayPatch — kids' toy shop (preview)

A warm, handcrafted e-commerce storefront for children's toys, built with Next.js.
**PlayPatch** is a provisional brand name, and the catalogue, prices and age labels are demo data.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Motion for React (`motion/react`) for animation, Lucide icons
- React Context cart persisted to `localStorage`
- Local product data (`data/products.ts`, `data/categories.ts`)
- Fonts: Grandstander (display), Figtree (body), Caveat (handwritten accents) via `@fontsource`
- Product photography from Unsplash, served from the Unsplash CDN through a custom image loader (`lib/image-loader.ts`)

## Design direction

- Warm editorial colour blocks, organic photo masks and a cream, olive, mustard and coral palette, inspired by handcrafted wooden-toy shops.
- Tactile "clay" shapes (`.clay` in `app/globals.css`, `components/ui/Clay.tsx`) give it a playful, 3D-modelled feel.
- Motion is purposeful:
  - Line-mask headline reveals and pointer-parallax hero layers.
  - 3D tilt on product cards and spring add-to-bag feedback.
  - Scroll-linked wordmark band.
  - All motion respects `prefers-reduced-motion`.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Home: hero, categories, shop by age, featured toys, campaign, story, recently viewed |
| `/shop` | Search, category / age / price filters, sorting, mobile filter sheet (URL-synced) |
| `/shop/[slug]` | Product detail: gallery, quantity, add to bag, related toys |
| `/cart` | Bag with quantities, removal, subtotal, empty state |
| `/checkout` | Preview checkout — validates delivery details, **no payment and no order is placed** |
| `/about`, `/contact` | Brand philosophy; contact page shows "coming soon" until real details are added |

The site also includes a sitemap, `robots.txt`, a 404 page and per-page metadata.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Renaming the brand

Edit `config/brand.ts`: `name`, `tagline`, `description`, the announcement text and `url`.
Set `NEXT_PUBLIC_SITE_URL` in your hosting environment once you have a custom domain.
The wordmark colours live in the same file.

## Before going live — needs real business information

- **Contact:** email, phone, address, hours and social links are `null` / empty in `config/brand.ts`. The contact page (and footer, for social links) shows them automatically once filled in.
- **Products:** replace the demo catalogue in `data/products.ts`. This covers names, descriptions, real product photos, prices in INR, materials, dimensions, contents and age guidance.
- **Safety:** add manufacturer safety information and any certifications (e.g. BIS) only where they are verified. None are claimed today.
- **Policies:** shipping, returns, privacy and terms pages. None exist yet, so none are linked.
- **Payments:** integrate an authorised payment provider (e.g. Razorpay, Stripe or Cashfree) in `components/cart/CheckoutView.tsx`. The checkout never collects card or UPI details.
- **Email:** there is no newsletter sign-up, because no email service is connected.
- **Images:** product photos are hotlinked from Unsplash. Replace them with your own product photography, ideally hosted in `public/` or on your own CDN.
