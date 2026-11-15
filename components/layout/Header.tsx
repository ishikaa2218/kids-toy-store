'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Search, ShoppingBag } from 'lucide-react'
import { mainNav } from '@/config/navigation'
import { ageGroups, categories } from '@/data/categories'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { HouseMark, Wordmark } from '@/components/brand/Logo'
import { ageArt, categoryArt } from '@/config/visuals'
import { brand } from '@/config/brand'
import { SearchOverlay } from './SearchOverlay'

type MenuId = 'age' | 'categories'

export function Header() {
  return (
    <Suspense fallback={<HeaderInner activeMenuParam={null} />}>
      <HeaderWithParams />
    </Suspense>
  )
}

function HeaderWithParams() {
  const params = useSearchParams()
  return <HeaderInner activeMenuParam={params.toString()} />
}

function HeaderInner({ activeMenuParam }: { activeMenuParam: string | null }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const { count, hydrated, addTick, open: openBag } = useCart()
  const [menu, setMenu] = useState<MenuId | null>(null)
  const [mobile, setMobile] = useState(false)
  const [search, setSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuTop, setMenuTop] = useState(72)
  const closeTimer = useRef<number | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // close everything on navigation
  useEffect(() => {
    setMenu(null)
    setMobile(false)
  }, [pathname, activeMenuParam])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menu && !mobile) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null)
        setMobile(false)
      }
    }
    const onDown = (e: MouseEvent) => {
      if (menu && headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [menu, mobile])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const hoverOpen = (id: MenuId) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setMenu(id)
  }
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 160)
  }
  const closeSearch = useCallback(() => setSearch(false), [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : href.startsWith('/shop?') ? false : pathname.startsWith(href))
  const shown = hydrated ? count : 0

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || menu || mobile ? 'bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-cream'
        }`}
        onMouseLeave={hoverClose}
      >
        <div className="container-wide flex h-[var(--header-h)] items-center gap-3">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${brand.name} — home`}>
            <HouseMark className="w-9 transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:-translate-y-0.5 group-hover:-rotate-6 sm:w-10" />
            <Wordmark className="text-[25px] leading-none sm:text-[27px]" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                if (item.menu) {
                  const id = item.menu
                  const expanded = menu === id
                  return (
                    <li key={item.label} onMouseEnter={() => hoverOpen(id)}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`menu-${id}`}
                        onClick={() => setMenu(expanded ? null : id)}
                        className={`flex min-h-11 items-center gap-1 rounded-full px-3.5 text-[15.5px] font-semibold transition-colors hover:text-ink ${
                          expanded ? 'text-ink' : 'text-ink-soft'
                        }`}
                      >
                        <span className={`link-line pb-0.5 ${expanded ? '[background-size:100%_2px]' : ''}`}>{item.label}</span>
                        <ChevronDown className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} strokeWidth={2.4} />
                      </button>
                    </li>
                  )
                }
                const active = isActive(item.href)
                return (
                  <li key={item.label} onMouseEnter={() => setMenu(null)}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-11 items-center rounded-full px-3.5 text-[15.5px] font-semibold transition-colors hover:text-ink ${
                        active ? 'text-ink' : 'text-ink-soft'
                      }`}
                    >
                      <span className={`link-line pb-0.5 ${active ? '[background-size:100%_2px]' : ''}`}>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-oat"
              aria-label="Search toys"
            >
              <Search className="size-[21px]" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              id="bag-button"
              onClick={openBag}
              className="relative grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-oat"
              aria-label={`Shopping bag, ${shown} items`}
            >
              <ShoppingBag className="size-[21px]" strokeWidth={2.2} />
              <motion.span
                key={addTick}
                initial={reduce || addTick === 0 ? false : { scale: 0.3, y: -8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 560, damping: 15 }}
                className={`absolute -top-0.5 -right-0.5 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-cream bg-tangerine px-1 text-[11.5px] leading-none font-extrabold text-ink tabular-nums transition-opacity ${
                  shown > 0 ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden
              >
                {shown}
              </motion.span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 72)
                setMobile((v) => !v)
              }}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label={mobile ? 'Close menu' : 'Open menu'}
              className="ml-0.5 grid size-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-[18px]">
                <span className={`absolute left-0 h-[2.5px] w-[18px] rounded-full bg-current transition-all duration-300 ${mobile ? 'top-[5px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-[2.5px] w-[18px] rounded-full bg-current transition-all duration-300 ${mobile ? 'top-[5px] -rotate-45' : 'top-[9px]'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop menus */}
        <AnimatePresence>
          {menu && (
            <motion.div
              key={menu}
              id={`menu-${menu}`}
              onMouseEnter={() => hoverOpen(menu)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-line bg-paper shadow-[0_30px_50px_-34px_rgb(60_40_20/0.45)] lg:block"
            >
              <div className="container-wide py-8">{menu === 'age' ? <AgeMenu /> : <CategoryMenu />}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ top: menuTop }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <MobileMenu pathname={pathname} />
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={search} onClose={closeSearch} />
    </>
  )
}

const countFor = {
  age: (id: string) => products.filter((p) => p.ageGroups.includes(id as never)).length,
  cat: (id: string) => products.filter((p) => p.category === id).length,
}

function AgeMenu() {
  return (
    <ul className="grid grid-cols-4 gap-6">
      {ageGroups.map((a) => (
        <li key={a.id}>
          <Link href={`/shop?age=${a.id}`} className="group flex items-center gap-4 rounded-[22px] p-3 transition-colors hover:bg-cream">
            <Image
              src={ageArt[a.id]}
              alt=""
              width={520}
              height={400}
              unoptimized
              className="w-20 shrink-0 transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:-translate-y-1 group-hover:-rotate-3"
            />
            <span>
              <span className="block font-display text-[19px] font-semibold">Ages {a.label}</span>
              <span className="text-[14px] text-ink-mute">
                {a.title} · {countFor.age(a.id)} toys
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function CategoryMenu() {
  return (
    <div className="flex items-start gap-8">
      <ul className="grid flex-1 grid-cols-6 gap-3">
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/shop?category=${c.id}`} className="group flex flex-col items-center rounded-[22px] px-2 pt-3 pb-4 text-center transition-colors hover:bg-cream">
              <Image
                src={categoryArt[c.id].src}
                alt=""
                width={434}
                height={442}
                unoptimized
                className="w-[84px] transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:-translate-y-1 group-hover:rotate-3"
              />
              <span className="mt-2 font-display text-[17px] leading-tight font-semibold">{c.name}</span>
              <span className="text-[13.5px] text-ink-mute">{countFor.cat(c.id)} toys</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/shop" className="mt-6 shrink-0 text-[15px] font-bold text-ink">
        <span className="link-line">See all toys →</span>
      </Link>
    </div>
  )
}

function MobileMenu({ pathname }: { pathname: string }) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop all toys' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]
  return (
    <nav aria-label="Mobile" className="container-wide pt-3 pb-14">
      <ul>
        {links.map((l, i) => (
          <motion.li key={l.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
            <Link
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              className={`flex min-h-14 items-center font-display text-[30px] font-semibold ${pathname === l.href ? 'text-tangerine-deep' : ''}`}
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>

      <p className="t-eyebrow mt-8 text-ink-mute">Categories</p>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/shop?category=${c.id}`} className="flex flex-col items-center rounded-[18px] bg-cream px-1 pt-3 pb-3 text-center">
              <Image src={categoryArt[c.id].src} alt="" width={434} height={442} unoptimized className="w-14" />
              <span className="mt-1.5 text-[13.5px] leading-tight font-semibold">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="t-eyebrow mt-8 text-ink-mute">Shop by age</p>
      <ul className="mt-3 grid grid-cols-4 gap-2">
        {ageGroups.map((a) => (
          <li key={a.id}>
            <Link href={`/shop?age=${a.id}`} className="flex flex-col items-center rounded-[18px] bg-cream px-1 py-3" aria-label={`Toys for ages ${a.label}`}>
              <Image src={ageArt[a.id]} alt="" width={520} height={400} unoptimized className="w-14" />
              <span className="mt-1 text-[13.5px] font-semibold">{a.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
