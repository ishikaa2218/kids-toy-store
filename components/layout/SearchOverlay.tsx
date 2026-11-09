'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Search, X } from 'lucide-react'
import { products } from '@/data/products'
import { getCategory } from '@/data/categories'
import { matchesQuery } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'

const suggestions = ['stacker', 'wooden', 'puzzle', 'teddy', 'kitchen', 'xylophone']

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const reduce = useReducedMotion()
  const results = useMemo(() => (q.trim() ? products.filter((p) => matchesQuery(p, q)).slice(0, 6) : []), [q])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => input.current?.focus())
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const submit = (value: string) => {
    onClose()
    router.push(value.trim() ? `/shop?q=${encodeURIComponent(value.trim())}` : '/shop')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" tabIndex={-1} aria-label="Close search" onClick={onClose} className="absolute inset-0 bg-ink/40" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search toys"
            initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="relative max-h-[88svh] overflow-y-auto bg-ivory pb-8"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit(q)
              }}
              className="container-play flex items-center gap-3 border-b border-ink/10 py-5"
              role="search"
            >
              <Search className="size-6 shrink-0 text-ink-mute" strokeWidth={2.2} aria-hidden />
              <label htmlFor="site-search" className="sr-only">
                Search toys
              </label>
              <input
                ref={input}
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for stackers, puzzles, teddies…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent font-display text-[clamp(22px,3vw,34px)] font-semibold outline-none placeholder:text-ink/30"
              />
              <button type="button" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-ink/8" aria-label="Close search">
                <X className="size-5" strokeWidth={2.2} />
              </button>
            </form>

            <div className="container-play pt-6">
              {!q.trim() ? (
                <div>
                  <p className="t-eyebrow text-ink-mute">Popular searches</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQ(s)}
                        className="min-h-10 rounded-full border-2 border-ink/12 px-4 text-[14px] font-semibold transition-colors hover:border-olive hover:bg-olive hover:text-ivory"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length ? (
                <div>
                  <p className="t-eyebrow text-ink-mute" aria-live="polite">
                    {results.length} {results.length === 1 ? 'match' : 'matches'}
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link href={`/shop/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 rounded-[18px] p-2 transition-colors hover:bg-sand/70">
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-[14px] bg-sand">
                            <Image src={p.images[0].src} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: p.images[0].focus }} />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-display text-[18px] font-bold">{p.name}</span>
                            <span className="text-[13px] text-ink-mute">
                              {getCategory(p.category)?.name} · {formatPrice(p.price)}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => submit(q)} className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-olive">
                    See all results <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ) : (
                <p className="text-[16px] text-ink-soft" aria-live="polite">
                  No toys match “{q}”. Try a simpler word like <button type="button" className="font-bold text-olive underline" onClick={() => setQ('wooden')}>wooden</button>.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
