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
import { Clay } from '@/components/ui/Clay'
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
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || menu || mobile ? 'bg-ivory shadow-[0_1px_0_rgb(42_37_32/0.1)]' : 'bg-cream'
        }`}
        onMouseLeave={hoverClose}
      >
        <div className="container-play flex h-[var(--header-h)] items-center gap-2 sm:gap-4">
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5" aria-label={`${brand.name} — home`}>
            <HouseMark className="size-8 sm:size-9 transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:scale-105" />
            <Wordmark className="text-[24px] leading-none sm:text-[27px]" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
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
                        className="group relative flex min-h-11 items-center gap-1 px-3 text-[15px] font-semibold text-ink/80 transition-colors hover:text-olive"
                      >
                        {item.label}
                        <ChevronDown className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} strokeWidth={2.4} />
                        <NavDot active={expanded} />
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
                      className={`group relative flex min-h-11 items-center px-3 text-[15px] font-semibold transition-colors hover:text-olive ${
                        active ? 'text-olive' : 'text-ink/80'
                      }`}
                    >
                      {item.label}
                      <NavDot active={active} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2.5 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-ink/6 hover:text-ink sm:px-3"
              aria-label="Search toys"
            >
              <Search className="size-5" strokeWidth={2.2} />
              <span className="hidden xl:inline">Search</span>
            </button>
            <button
              type="button"
              id="bag-button"
              onClick={openBag}
              className="relative flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2.5 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-ink/6 hover:text-ink sm:px-3"
              aria-label={`Shopping bag, ${hydrated ? count : 0} items`}
            >
              <ShoppingBag className="size-5" strokeWidth={2.2} />
              <span className="hidden xl:inline">Bag</span>
              <motion.span
                key={addTick}
                initial={reduce || addTick === 0 ? false : { scale: 0.4, y: -6 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 14 }}
                className={`clay absolute top-0 right-0 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] xl:static xl:h-6 xl:min-w-6 xl:px-1.5 xl:text-[12px] font-extrabold text-ivory [--clay:var(--color-coral)] ${
                  hydrated && count > 0 ? '' : 'opacity-0'
                }`}
                aria-hidden
              >
                <span className="relative z-[1]">{hydrated ? count : 0}</span>
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
              className="flex min-h-11 items-center gap-2 rounded-full px-2.5 text-[15px] font-bold sm:ml-1 sm:gap-2.5 sm:px-3 lg:hidden"
            >
              {mobile ? 'Close' : 'Menu'}
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[2.5px] w-5 rounded-full bg-ink transition-all duration-300 ${mobile ? 'top-[5px] rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-[2.5px] rounded-full bg-ink transition-all duration-300 ${mobile ? 'top-[5px] w-5 -rotate-45' : 'top-[9px] w-3.5'}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega menus */}
        <AnimatePresence>
          {menu && (
            <motion.div
              key={menu}
              id={`menu-${menu}`}
              onMouseEnter={() => hoverOpen(menu)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-ink/8 bg-ivory shadow-[0_24px_40px_-28px_rgb(70_45_20/0.5)] lg:block"
            >
              <div className="container-play py-8">{menu === 'age' ? <AgeMenu /> : <CategoryMenu />}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            style={{ top: menuTop }}
            className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ivory lg:hidden"
          >
            <MobileMenu pathname={pathname} />
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={search} onClose={closeSearch} />
    </>
  )
}

function NavDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`clay absolute bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full transition-transform duration-300 ease-[var(--ease-out-back)] [--clay:var(--color-coral)] ${
        active ? 'scale-100' : 'scale-0 group-hover:scale-100'
      }`}
    />
  )
}

const countFor = {
  age: (id: string) => products.filter((p) => p.ageGroups.includes(id as never)).length,
  cat: (id: string) => products.filter((p) => p.category === id).length,
}

function AgeMenu() {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-10">
      <div>
        <p className="t-hand text-[26px] text-coral">Who’s it for?</p>
        <p className="mt-2 max-w-[28ch] text-[15px] text-ink-soft">Pick an age to see toys suggested for that stage of play.</p>
      </div>
      <ul className="grid grid-cols-4 gap-4">
        {ageGroups.map((a, i) => (
          <li key={a.id}>
            <Link href={`/shop?age=${a.id}`} className="group flex items-center gap-4 rounded-[20px] p-3 transition-colors hover:bg-sand/70">
              <span
                className="clay grid size-16 shrink-0 place-items-center rounded-[38%] font-display text-[22px] font-extrabold text-ivory transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:-rotate-6 group-hover:scale-105"
                style={{ ['--clay' as string]: ['var(--color-sky)', 'var(--color-mustard)', 'var(--color-coral)', 'var(--color-leaf)'][i] }}
              >
                <span className="relative z-[1] drop-shadow-[0_1px_0_rgb(0_0_0/0.25)]">{a.label}</span>
              </span>
              <span>
                <span className="block font-display text-[18px] font-bold">{a.title}</span>
                <span className="text-[13px] text-ink-mute">{countFor.age(a.id)} toys</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CategoryMenu() {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-10">
      <div>
        <p className="t-hand text-[26px] text-coral">Browse the toy box</p>
        <p className="mt-2 max-w-[28ch] text-[15px] text-ink-soft">Six kinds of play, from first stackers to big-kid puzzles.</p>
        <Link href="/shop" className="link-wiggle mt-5 inline-block font-bold text-olive">
          See all toys
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/shop?category=${c.id}`} className="group flex items-center gap-4 rounded-[20px] p-2.5 transition-colors hover:bg-sand/70">
              <span className="relative size-16 shrink-0 overflow-hidden mask-pebble bg-sand">
                <Image src={c.image.src} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" style={{ objectPosition: c.image.focus }} />
              </span>
              <span>
                <span className="block font-display text-[18px] font-bold">{c.name}</span>
                <span className="text-[13px] text-ink-mute">{countFor.cat(c.id)} toys</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileMenu({ pathname }: { pathname: string }) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop all toys' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ]
  return (
    <nav aria-label="Mobile" className="container-play pt-4 pb-12">
      <ul>
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="border-b border-ink/10"
          >
            <Link
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              className={`flex min-h-16 items-center font-display text-[32px] font-bold ${pathname === l.href ? 'text-olive' : ''}`}
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>

      <p className="t-eyebrow mt-8 text-ink-mute">Shop by age</p>
      <ul className="mt-3 grid grid-cols-4 gap-2">
        {ageGroups.map((a, i) => (
          <li key={a.id}>
            <Link
              href={`/shop?age=${a.id}`}
              className="clay grid aspect-square place-items-center rounded-[34%] font-display text-[20px] font-extrabold text-ivory"
              style={{ ['--clay' as string]: ['var(--color-sky)', 'var(--color-mustard)', 'var(--color-coral)', 'var(--color-leaf)'][i] }}
              aria-label={`Toys for ages ${a.label}`}
            >
              <span className="relative z-[1]">{a.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="t-eyebrow mt-8 text-ink-mute">Categories</p>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/shop?category=${c.id}`} className="flex min-h-14 items-center gap-3 rounded-[16px] bg-sand/60 p-2 text-[15px] font-semibold">
              <span className="relative size-10 shrink-0 overflow-hidden mask-pebble">
                <Image src={c.image.src} alt="" fill sizes="40px" className="object-cover" />
              </span>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <Clay tone="mustard" shape="blob" className="mt-12 h-10 w-16 opacity-80" />
    </nav>
  )
}
