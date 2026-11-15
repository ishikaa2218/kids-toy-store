import Image from 'next/image'
import { brand } from '@/config/brand'

/** The Kinderhouse mark: a little clay house. */
export function HouseMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/clay/house.webp"
      alt=""
      aria-hidden
      width={160}
      height={142}
      unoptimized
      priority
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  )
}

/** Chunky, rounded wordmark in ink — the clay supplies the colour. */
export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`font-display font-[650] tracking-[-0.02em] ${className}`}>{brand.name}</span>
}
