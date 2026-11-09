import { brand } from '@/config/brand'

const letterColor = {
  coral: 'text-coral',
  mustard: 'text-mustard',
  leaf: 'text-leaf',
  sky: 'text-[#6f9fd6]',
} as const

/** A stitched clay patch — the brand mark. */
export function PatchMark({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-grid place-items-center ${className}`}>
      <span className="clay absolute inset-0 rounded-[30%] [--clay:var(--color-mustard)]" />
      <span className="absolute inset-[16%] rounded-[24%] border-2 border-dashed border-ink/55" />
      <span className="clay relative block size-[34%] rounded-full [--clay:var(--color-coral)]" />
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
