'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { products } from '@/data/products'
import { ageGroups, categories, getAgeGroup, getCategory } from '@/data/categories'
import { applyFilters, filtersToParams, parseFilters, priceBands, sortOptions, type Filters } from '@/lib/catalog'
import { Button } from '@/components/ui/Button'
import { ageArt, categoryArt } from '@/config/visuals'
import { ProductCard } from './ProductCard'

export function ShopView() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params])
  const results = useMemo(() => applyFilters([...products], filters), [filters])
  const [sheet, setSheet] = useState(false)
  const [q, setQ] = useState(filters.q)
  const debounce = useRef<number | null>(null)

  // keep the input in step with the URL (e.g. header search, back button)
  useEffect(() => setQ(filters.q), [filters.q])

  const update = (patch: Partial<Filters>) => {
    const next = filtersToParams({ ...filters, ...patch }).toString()
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  const onSearch = (value: string) => {
    setQ(value)
    if (debounce.current) window.clearTimeout(debounce.current)
    debounce.current = window.setTimeout(() => update({ q: value }), 250)
  }

  const clearAll = () => {
    setQ('')
    router.replace(pathname, { scroll: false })
  }

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : ''
    if (!sheet) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  const cat = filters.category ? getCategory(filters.category) : null
  const age = filters.age ? getAgeGroup(filters.age) : null
  const title = cat ? cat.name : age ? `Toys for ages ${age.label}` : filters.q ? `Results for “${filters.q}”` : 'All toys'
  const intro = cat ? cat.blurb : age ? age.blurb : 'Every toy in the shop, ready to filter by age, kind of play and budget.'

  const chips: { label: string; clear: () => void }[] = []
  if (filters.q) chips.push({ label: `“${filters.q}”`, clear: () => update({ q: '' }) })
  if (cat) chips.push({ label: cat.name, clear: () => update({ category: null }) })
  if (age) chips.push({ label: `Ages ${age.label}`, clear: () => update({ age: null }) })
  if (filters.price) chips.push({ label: priceBands.find((b) => b.id === filters.price)!.label, clear: () => update({ price: null }) })

  const filterPanel = <FilterControls filters={filters} update={update} />

  return (
    <>
      {/* Page header */}
      <section className="bg-cream">
        <div className="container-play flex items-end justify-between gap-6 pt-10 pb-8 lg:pt-14 lg:pb-10">
          <div>
            <p className="t-eyebrow text-tangerine-deep">The toy box</p>
            <motion.h1 key={title} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="t-h2 mt-3 max-w-[18ch]">
              {title}
            </motion.h1>
            <p className="mt-3 max-w-[50ch] text-[16px] text-ink-soft sm:text-[17px]">{intro}</p>
          </div>
          {(cat || age) && (
            <motion.div
              key={cat?.id ?? age?.id}
              aria-hidden
              initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="hidden w-[120px] shrink-0 sm:block lg:w-[150px]"
            >
              <Image src={cat ? categoryArt[cat.id].src : ageArt[age!.id]} alt="" width={434} height={442} unoptimized className="w-full" />
            </motion.div>
          )}
        </div>
      </section>

      <div className="container-play grid gap-10 pb-20 lg:grid-cols-[240px_1fr] lg:gap-14 lg:pb-28">
        {/* Desktop filters */}
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+24px)] pt-2">{filterPanel}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-mute" aria-hidden />
              <label htmlFor="shop-search" className="sr-only">
                Search the shop
              </label>
              <input
                id="shop-search"
                type="search"
                value={q}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search toys"
                className="h-12 w-full rounded-full border-2 border-transparent bg-paper pr-4 pl-12 text-[16px] transition-colors outline-none placeholder:text-ink-mute focus:border-ink/30"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSheet(true)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-paper px-5 font-bold lg:hidden"
              >
                <SlidersHorizontal className="size-4.5" strokeWidth={2.4} /> Filters
                {chips.length > 0 && <span className="grid size-6 place-items-center rounded-full bg-tangerine text-[12px] text-ink">{chips.length}</span>}
              </button>
              <label className="relative flex-1 sm:flex-none">
                <span className="sr-only">Sort by</span>
                <select
                  value={filters.sort}
                  onChange={(e) => update({ sort: e.target.value as Filters['sort'] })}
                  className="h-12 w-full appearance-none rounded-full border-2 border-transparent bg-paper pr-10 pl-5 font-semibold outline-none focus:border-ink/30 sm:w-[220px]"
                >
                  {sortOptions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" strokeWidth={2.4} />
              </label>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <p className="mr-2 text-[15px] font-semibold text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? 'toy' : 'toys'}
            </p>
            <AnimatePresence initial={false}>
              {chips.map((c) => (
                <motion.button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-ink py-1 pr-2.5 pl-3.5 text-[13.5px] font-semibold text-paper"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label} <X className="size-3.5" strokeWidth={2.6} />
                </motion.button>
              ))}
            </AnimatePresence>
            {chips.length > 1 && (
              <button type="button" onClick={clearAll} className="link-line ml-1 text-[13.5px] font-bold text-tangerine-deep">
                Clear all
              </button>
            )}
          </div>

          {/* Results */}
          {results.length ? (
            <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout={!reduce}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.03 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <ProductCard product={p} sizes="(min-width:1280px) 320px, (min-width:1024px) 34vw, 46vw" priority={i < 3} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-[32px] bg-paper px-6 py-16 text-center">
              <Image src="/clay/blocks.webp" alt="" width={720} height={395} unoptimized className="w-[220px]" />
              <h2 className="t-h3 mt-6">No toys match those filters</h2>
              <p className="mt-2 max-w-[38ch] text-[15px] text-ink-soft">Try a different word, widen the price range or clear a filter to see more of the shop.</p>
              <Button type="button" onClick={clearAll} className="mt-7">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div className="fixed inset-0 z-[85] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" tabIndex={-1} aria-label="Close filters" onClick={() => setSheet(false)} className="absolute inset-0 bg-ink/40" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={reduce ? { opacity: 0 } : { y: '100%' }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-[32px] bg-paper"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <h2 className="font-display text-[26px] font-semibold">Filters</h2>
                <button type="button" onClick={() => setSheet(false)} className="grid size-11 place-items-center rounded-full hover:bg-oat" aria-label="Close filters">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-6">{filterPanel}</div>
              <div className="grid grid-cols-2 gap-3 border-t border-line px-6 py-4">
                <Button type="button" variant="outline" onClick={clearAll}>
                  Clear
                </Button>
                <Button type="button" onClick={() => setSheet(false)}>
                  Show {results.length}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function FilterControls({ filters, update }: { filters: Filters; update: (p: Partial<Filters>) => void }) {
  const countCat = (id: string) => products.filter((p) => p.category === id).length
  const radio = (on: boolean) =>
    `flex min-h-11 w-full items-center justify-between gap-3 rounded-[14px] px-3.5 text-left text-[15px] font-semibold transition-colors ${
      on ? 'bg-ink text-paper' : 'hover:bg-oat'
    }`
  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="t-eyebrow mb-3 text-ink-mute">Category</legend>
        <div className="space-y-1">
          <button type="button" aria-pressed={!filters.category} onClick={() => update({ category: null })} className={radio(!filters.category)}>
            All toys <span className="text-[13px] opacity-60">{products.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} type="button" aria-pressed={filters.category === c.id} onClick={() => update({ category: filters.category === c.id ? null : c.id })} className={radio(filters.category === c.id)}>
              {c.name} <span className="text-[13px] opacity-60">{countCat(c.id)}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="t-eyebrow mb-3 text-ink-mute">Age</legend>
        <div className="grid grid-cols-4 gap-2">
          {ageGroups.map((a) => {
            const on = filters.age === a.id
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                aria-label={`Ages ${a.label}`}
                onClick={() => update({ age: on ? null : a.id })}
                className={`flex flex-col items-center rounded-[16px] px-1 pt-2 pb-1.5 transition-[background-color,transform] duration-300 ease-[var(--ease-out-back)] hover:-translate-y-0.5 ${
                  on ? 'bg-ink text-paper' : 'hover:bg-oat'
                }`}
              >
                <Image src={ageArt[a.id]} alt="" width={520} height={400} unoptimized className="w-full max-w-[52px]" />
                <span className="mt-1 text-[13px] font-bold">{a.label}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="t-eyebrow mb-3 text-ink-mute">Price</legend>
        <div className="space-y-1">
          {priceBands.map((b) => (
            <button key={b.id} type="button" aria-pressed={filters.price === b.id} onClick={() => update({ price: filters.price === b.id ? null : b.id })} className={radio(filters.price === b.id)}>
              {b.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
