import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'ink' | 'outline' | 'paper' | 'whatsapp'

const variants: Record<Variant, string> = {
  primary: 'bg-tangerine text-ink shadow-[inset_0_-3px_0_rgb(0_0_0/0.14)] hover:bg-[#ff7a40]',
  ink: 'bg-ink text-paper hover:bg-[#3a3444]',
  outline: 'border-2 border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-paper',
  paper: 'bg-paper text-ink hover:bg-white',
  whatsapp: 'bg-whatsapp text-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.16)] hover:bg-whatsapp-deep',
}

const base =
  'group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[16px] font-bold ' +
  'transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 ' +
  'active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

type Common = { variant?: Variant; className?: string; children: ReactNode }

export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  )
}

export function Button({ variant = 'primary', className = '', children, ...rest }: Common & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
