import { cn } from './utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap transition-colors duration-200 select-none disabled:pointer-events-none ' +
  'disabled:opacity-45'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-fg text-canvas hover:bg-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]',
  secondary:
    'border border-line bg-surface/70 text-fg hover:border-line-strong hover:bg-elevated',
  ghost: 'text-fg-muted hover:text-fg hover:bg-elevated',
  accent:
    'border border-accent/25 bg-accent-wash text-accent hover:border-accent/45 hover:bg-accent/15',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-[0.8125rem]',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
}

/** Shared so buttons and anchor-buttons stay visually identical. */
export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className)
}
