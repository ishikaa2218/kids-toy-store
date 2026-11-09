import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'olive' | 'coral' | 'mustard' | 'ink' | 'outline' | 'ivory'

const variants: Record<Variant, string> = {
  olive: 'bg-olive text-ivory shadow-[0_4px_0_var(--color-olive-deep)] hover:bg-[#667640]',
  coral: 'bg-coral text-ivory shadow-[0_4px_0_#b24a31] hover:bg-[#e8775b]',
  mustard: 'bg-mustard text-ink shadow-[0_4px_0_#b7861f] hover:bg-[#f0bd4b]',
  ink: 'bg-ink text-ivory shadow-[0_4px_0_#000] hover:bg-[#3a332c]',
  outline: 'border-2 border-ink/80 bg-transparent text-ink hover:bg-ink hover:text-ivory',
  ivory: 'bg-ivory text-ink shadow-[0_4px_0_rgb(42_37_32/0.25)] hover:bg-white',
}

const base =
  'group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-bold tracking-[0.01em] ' +
  'transition-[background-color,color,transform,box-shadow] duration-200 ease-out ' +
  'active:translate-y-[3px] active:shadow-none disabled:pointer-events-none disabled:opacity-50'

type Common = { variant?: Variant; className?: string; children: ReactNode }

export function ButtonLink({ variant = 'olive', className = '', children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant = 'olive', className = '', children, ...rest }: Common & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
