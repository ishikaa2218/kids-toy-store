/** Shared motion language — springy but quick, never bouncy enough to distract. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  back: [0.34, 1.4, 0.64, 1] as const,
}

export const spring = {
  soft: { type: 'spring' as const, stiffness: 220, damping: 22, mass: 0.9 },
  pop: { type: 'spring' as const, stiffness: 520, damping: 18 },
}

export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
