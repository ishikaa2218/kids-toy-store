# Kinderhouse — a little world of toys

An interactive storefront for children's toys, built with Next.js.
The catalogue, prices and age labels are still demo data. Orders are placed on **WhatsApp** — there is no payment gateway.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Motion for React (`motion/react`) for animation, Lucide icons
- React Context cart persisted to `localStorage`
- Local product data (`data/products.ts`, `data/categories.ts`)
- Fonts: Fredoka (display) and Figtree (body) via `@fontsource`
- Product photography from Unsplash, served from the Unsplash CDN through a custom image loader (`lib/image-loader.ts`)

## Design: the clay toy box

- **Look:** a warm cream page and a white "table" panel that clay toys sit on, with chunky rounded Fredoka headings in ink. Colour comes from the toys themselves: tangerine for actions, butter yellow for warmth (footer), and grape, sky and leaf as accents only. All colours are tokens in `app/globals.css` (`@theme`).
- **Clay artwork** (`public/clay/*.webp`): original 3D renders — the peeking bear cub in the hero, one icon per category, a number block per age group, the little-world diorama, footer blobs and the house logo mark. `config/visuals.ts` maps category and age ids to their artwork; product data is untouched.
- **Motion** (Motion for React), kept small: headline line reveals, the cub's pupils follow the pointer, category icons and age blocks lift on hover, product cards lift with a second photo on hover, the diorama tilts towards the pointer and drifts on scroll, add-to-bag hops into the bag and the count pops. Reduced motion is respected everywhere.
- **Clay cursor:** a small CSS image cursor (grape, tangerine over links and buttons) for mouse users only. Text fields keep the I-beam; touch devices never see it.

## Ordering on WhatsApp

`/checkout` is the "Order on WhatsApp" page: review and edit the bag, optionally add a name and delivery location, preview the message, then **Continue on WhatsApp**. The message is generated from the bag's actual contents (`lib/whatsapp.ts`) and opened as `https://wa.me/918427883569?text=…` (encoded with `encodeURIComponent`) in a new tab. The bag is never cleared, and the page says plainly that the order is only confirmed once Kinderhouse replies. Change the number in `config/brand.ts` (`whatsapp`).

## Pages

| Route | What it does |
| --- | --- |
| `/` | Home: hero with the clay cub, categories, shop by age, featured toys, the little-world editorial, hello + how ordering works, recently viewed |
| `/shop` | Search, category / age / price filters, sorting, mobile filter sheet (URL-synced) |
| `/shop/[slug]` | Product detail: gallery, quantity, add to bag, related toys |
| `/cart` | Bag with quantities, removal, subtotal, empty state |
| `/checkout` | Order on WhatsApp — bag review, optional name/location, pre-filled WhatsApp message |
| `/about`, `/contact` | About Us (brand philosophy); contact page shows WhatsApp and any other details set in `config/brand.ts` |

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

## Before going live — needs real business information

- **Contact:** WhatsApp is set; email, phone, address, hours and social links are `null` / empty in `config/brand.ts`. The contact page (and footer, for social links) shows them automatically once filled in.
- **Products:** replace the demo catalogue in `data/products.ts`. This covers names, descriptions, real product photos, prices in INR, materials, dimensions, contents and age guidance.
- **Safety:** add manufacturer safety information and any certifications (e.g. BIS) only where they are verified. None are claimed today.
- **Policies:** shipping, returns, privacy and terms pages. None exist yet, so none are linked.
- **Payments:** none online, by design — payment is arranged in the WhatsApp conversation.
- **Email:** there is no newsletter sign-up, because no email service is connected.
- **Images:** product photos are hotlinked from Unsplash. Replace them with your own product photography, ideally hosted in `public/` or on your own CDN.
