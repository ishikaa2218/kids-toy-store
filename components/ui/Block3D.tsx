import type { CSSProperties, ReactNode } from 'react'
import type { Tone } from '@/types'
import { toneVar } from './Clay'

type Faces = Partial<Record<'front' | 'back' | 'right' | 'left' | 'top' | 'bottom', ReactNode>>

type Props = {
  /** edge length, any CSS length */
  size: string
  tone: Tone
  faces?: Faces
  className?: string
  style?: CSSProperties
  /** font size for face content, relative to the block by default */
  fontSize?: string
}

/**
 * A painted wooden toy block built as a real CSS 3D cube (six faces).
 * Place it inside an element with `transform-style: preserve-3d` and a
 * perspective somewhere above it. Purely decorative unless faces carry text.
 */
export function Block3D({ size, tone, faces = {}, className = '', style, fontSize }: Props) {
  return (
    <span
      aria-hidden
      className={`cube block ${className}`}
      style={{ ['--s' as string]: size, ['--c' as string]: toneVar[tone], fontSize: fontSize ?? `calc(${size} * 0.56)`, ...style }}
    >
      <i>{faces.front}</i>
      <i>{faces.back}</i>
      <i>{faces.right}</i>
      <i>{faces.left}</i>
      <i>{faces.top}</i>
      <i>{faces.bottom}</i>
    </span>
  )
}
