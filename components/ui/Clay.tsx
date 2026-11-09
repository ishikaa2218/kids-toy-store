import type { CSSProperties } from 'react'
import type { Tone } from '@/types'

const toneVar: Record<Tone, string> = {
  cream: 'var(--color-sand)',
  sand: 'var(--color-wood)',
  olive: 'var(--color-olive)',
  leaf: 'var(--color-leaf)',
  mustard: 'var(--color-mustard)',
  sky: 'var(--color-sky)',
  coral: 'var(--color-coral)',
  orange: 'var(--color-orange)',
  wood: 'var(--color-wood)',
}

const shapes = {
  ball: 'rounded-full',
  pill: 'rounded-full',
  blob: 'rounded-[58%_42%_52%_48%/48%_56%_44%_52%]',
  pebble: 'rounded-[46%_54%_50%_50%/58%_52%_48%_42%]',
  tile: 'rounded-[28%]',
} as const

type Props = {
  tone: Tone
  shape?: keyof typeof shapes
  className?: string
  style?: CSSProperties
}

/** A sculpted clay form (decorative). */
export function Clay({ tone, shape = 'ball', className = '', style }: Props) {
  return (
    <span
      aria-hidden
      className={`clay block ${shapes[shape]} ${className}`}
      style={{ ['--clay' as string]: toneVar[tone], ...style }}
    />
  )
}

/** A three-band clay rainbow arch — echoes the stacking toys in the shop. */
export function ClayArch({ className = '', bands = ['coral', 'mustard', 'leaf'] as Tone[] }: { className?: string; bands?: Tone[] }) {
  return (
    <span aria-hidden className={`relative block aspect-[2/1] ${className}`}>
      {bands.map((t, i) => {
        const inset = `${i * 15}%`
        return (
          <span
            key={t + i}
            className="clay absolute rounded-t-full"
            style={{
              ['--clay' as string]: toneVar[t],
              left: inset,
              right: inset,
              top: `${i * 30}%`,
              bottom: 0,
              WebkitMask: 'radial-gradient(circle at 50% 100%, transparent 0 34%, #000 34.5%)',
              mask: 'radial-gradient(circle at 50% 100%, transparent 0 34%, #000 34.5%)',
            }}
          />
        )
      })}
    </span>
  )
}

export { toneVar }
