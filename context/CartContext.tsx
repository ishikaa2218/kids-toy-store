'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { getProductById } from '@/data/products'
import { effectivePrice } from '@/lib/catalog'
import type { Product } from '@/types'

const STORAGE_KEY = 'playpatch-cart-v1'
const MAX_QTY = 10

type Line = { id: string; qty: number }
type State = { lines: Line[] }
type Action =
  | { type: 'hydrate'; lines: Line[] }
  | { type: 'add'; id: string; qty: number }
  | { type: 'set'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.round(n)))

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case 'hydrate':
      return { lines: a.lines }
    case 'add': {
      const found = state.lines.find((l) => l.id === a.id)
      if (found) return { lines: state.lines.map((l) => (l.id === a.id ? { ...l, qty: clamp(l.qty + a.qty) } : l)) }
      return { lines: [...state.lines, { id: a.id, qty: clamp(a.qty) }] }
    }
    case 'set':
      return { lines: state.lines.map((l) => (l.id === a.id ? { ...l, qty: clamp(a.qty) } : l)) }
    case 'remove':
      return { lines: state.lines.filter((l) => l.id !== a.id) }
    case 'clear':
      return { lines: [] }
  }
}

export type CartLine = Line & { product: Product; lineTotal: number }

type CartValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  hydrated: boolean
  /** increments on every add — lets the bag icon animate */
  addTick: number
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  maxQty: number
}

const CartContext = createContext<CartValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] })
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [addTick, setAddTick] = useState(0)

  // restore from localStorage once, after mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? (JSON.parse(raw) as Line[]) : []
      const valid = Array.isArray(parsed)
        ? parsed.filter((l) => typeof l?.id === 'string' && getProductById(l.id)).map((l) => ({ id: l.id, qty: clamp(Number(l.qty) || 1) }))
        : []
      dispatch({ type: 'hydrate', lines: valid })
    } catch {
      /* storage unavailable — start with an empty bag */
    }
    setHydrated(true)
  }, [])

  // persist after hydration
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [state.lines, hydrated])

  // keep tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try {
        dispatch({ type: 'hydrate', lines: e.newValue ? JSON.parse(e.newValue) : [] })
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const add = useCallback((id: string, qty = 1) => {
    dispatch({ type: 'add', id, qty })
    setAddTick((t) => t + 1)
  }, [])
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'set', id, qty }), [])
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo<CartValue>(() => {
    const lines = state.lines
      .map((l) => {
        const product = getProductById(l.id)
        return product ? { ...l, product, lineTotal: effectivePrice(product) * l.qty } : null
      })
      .filter(Boolean) as CartLine[]
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      hydrated,
      addTick,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open,
      close,
      maxQty: MAX_QTY,
    }
  }, [state.lines, hydrated, addTick, add, setQty, remove, clear, isOpen, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
