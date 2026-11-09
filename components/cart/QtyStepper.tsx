'use client'

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
  const btn = `grid place-items-center rounded-full transition-colors duration-200 hover:bg-ink/8 disabled:opacity-35 disabled:hover:bg-transparent ${
    size === 'sm' ? 'size-9' : 'size-11'
  }`
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border-2 border-ink/15 bg-ivory p-0.5">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus className="size-4" strokeWidth={2.4} />
      </button>
      <output aria-live="polite" className={`text-center font-bold tabular-nums ${size === 'sm' ? 'w-7 text-[15px]' : 'w-9 text-[17px]'}`}>
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <Plus className="size-4" strokeWidth={2.4} />
      </button>
    </div>
  )
}
