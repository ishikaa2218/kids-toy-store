'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'

type Props = {
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  label: string
  size?: 'sm' | 'md'
}

export function QtyStepper({ value, onChange, min = 1, max = 10, label, size = 'md' }: Props) {
  const btn = `grid place-items-center rounded-full transition-[background-color,transform] duration-200 hover:bg-ink/8 active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent ${
    size === 'sm' ? 'size-9' : 'size-11'
  }`
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border-2 border-ink/15 bg-ivory p-0.5">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="size-4" strokeWidth={2.4} />
      </button>
      <output
        aria-live="polite"
        className={`relative grid overflow-hidden text-center font-bold tabular-nums ${size === 'sm' ? 'h-9 w-7 text-[15px]' : 'h-11 w-9 text-[17px]'}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={value}
            className="col-start-1 row-start-1 self-center"
            initial={{ y: '-70%', scale: 0.6, opacity: 0 }}
            animate={{ y: '0%', scale: 1, opacity: 1 }}
            exit={{ y: '70%', scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 26 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus className="size-4" strokeWidth={2.4} />
      </button>
    </div>
  )
}
