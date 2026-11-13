# Kinderhouse — a little world of toys

An interactive storefront for children's toys, built with Next.js.
The catalogue, prices and age labels are still demo data. Orders are placed on **WhatsApp** — there is no payment gateway.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Motion for React (`motion/react`) for animation, Lucide icons
- React Context cart persisted to `localStorage`
- Local product data (`data/products.ts`, `data/categories.ts`)
- Fonts: Grandstander (display), Figtree (body), Caveat (handwritten accents) via `@fontsource`
- Product photography from Unsplash, served from the Unsplash CDN through a custom image loader (`lib/image-loader.ts`)

## Interactive layer

- **Toy-block cursor** (`components/ui/ToyCursor.tsx`) — a clay-bead pointer tip pulling a little wooden block. Only on hover-capable fine pointers; touch devices keep native behaviour and text fields keep the I-beam. Elements opt into states with `data-cursor="view | add | explore | play"` (and optional `data-cursor-label`).
- **Toy Town hero** (`components/home/ToyTown.tsx`) — a block-built cottage, ABC stack, ring stacker and framed products made from real CSS 3D (`components/ui/Block3D.tsx`, `.cube` in `globals.css`). It follows the mouse, spins with a sideways swipe on touch and turns as you scroll. No WebGL — CSS 3D keeps it light.
- **Number blocks** for shop-by-age, **tilting category tiles** (`components/ui/Tilt.tsx`), product cards on toy "slabs" with glare and floor shadow, **scroll-opening campaign photos** (`ScrollMask`), and a small **stacking toy** (`components/home/BuildWorld.tsx`).
- **Add to bag**: a photo token hops into the bag, the count bounces, and a toast names exactly what was added (`components/cart/BagFeedback.tsx`).
- Everything respects `prefers-reduced-motion`.

## Ordering on WhatsApp

`/checkout` is the "Order on WhatsApp" page: review and edit the bag, optionally add a name and delivery location, preview the message, then **Continue on WhatsApp**. The message is generated from the bag's actual contents (`lib/whatsapp.ts`) and opened as `https://wa.me/918427883569?text=…` (encoded with `encodeURIComponent`) in a new tab. The bag is never cleared, and the page says plainly that the order is only confirmed once Kinderhouse replies. Change the number in `config/brand.ts` (`whatsapp`).

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
| `/checkout` | Order on WhatsApp — bag review, optional name/location, pre-filled WhatsApp message |
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

Edit `config/brand.ts`: `name`, `tagline`, `headline`, `description`, the announcement text, WhatsApp number and `url`.
Set `NEXT_PUBLIC_SITE_URL` in your hosting environment once you have a custom domain.
The wordmark colours live in the same file.

## Before going live — needs real business information

- **Contact:** WhatsApp is set; email, phone, address, hours and social links are `null` / empty in `config/brand.ts`. The contact page (and footer, for social links) shows them automatically once filled in.
- **Products:** replace the demo catalogue in `data/products.ts`. This covers names, descriptions, real product photos, prices in INR, materials, dimensions, contents and age guidance.
- **Safety:** add manufacturer safety information and any certifications (e.g. BIS) only where they are verified. None are claimed today.
- **Policies:** shipping, returns, privacy and terms pages. None exist yet, so none are linked.
- **Payments:** none online, by design — payment is arranged in the WhatsApp conversation.
- **Email:** there is no newsletter sign-up, because no email service is connected.
- **Images:** product photos are hotlinked from Unsplash. Replace them with your own product photography, ideally hosted in `public/` or on your own CDN.
