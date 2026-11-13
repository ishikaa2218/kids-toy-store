import { brand } from '@/config/brand'

const letterColor = {
  coral: 'text-coral',
  mustard: 'text-mustard',
  leaf: 'text-leaf',
  sky: 'text-[#6f9fd6]',
} as const

/**
 * The Kinderhouse mark — a little toy house built from wooden blocks:
 * a mustard block for the walls, a coral roof and a round sky window.
 * Wrap it in an element with the `group` class to make the roof hop on hover.
 */
export function HouseMark({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-block ${className}`}>
      {/* roof */}
      <span
        className="clay absolute inset-x-[2%] top-[2%] h-[46%] [--clay:var(--color-coral)] transition-transform duration-300 ease-[var(--ease-out-back)] group-hover:-translate-y-[14%] group-hover:-rotate-6"
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', borderRadius: 4 }}
      />
      {/* walls */}
      <span className="clay absolute inset-x-[12%] top-[44%] bottom-[2%] rounded-[22%] [--clay:var(--color-mustard)]" />
      {/* window */}
      <span className="clay absolute top-[56%] left-1/2 size-[30%] -translate-x-1/2 rounded-full [--clay:var(--color-sky)]" />
    </span>
  )
}

/** Multicoloured wordmark built from the configured brand name. */
export function Wordmark({ className = '', mono = false }: { className?: string; mono?: boolean }) {
  const letters = brand.name.split('')
  return (
    <span className={`font-display font-[850] tracking-[-0.01em] ${className}`}>
      {letters.map((ch, i) => (
        <span key={i} className={mono ? '' : letterColor[brand.wordmarkColors[i % brand.wordmarkColors.length]]}>
          {ch}
        </span>
      ))}
    </span>
  )
}
