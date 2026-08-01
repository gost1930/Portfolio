import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

export interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** Right-aligned slot for filters, toggles or a secondary action. */
  aside?: ReactNode
  className?: string
}

/**
 * Every section opens the same way: numbered eyebrow, a statement, and an
 * optional control cluster. The repetition is the point — it sets the rhythm.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('border-line border-t pt-6', className)}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-accent">{index}</span>
          <span className="bg-line h-px w-6" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal delay={0.05} className="max-w-2xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">{title}</h2>
          {description ? (
            <p className="text-fg-muted mt-5 max-w-xl text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </Reveal>

        {aside ? (
          <Reveal delay={0.1} className="shrink-0">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </div>
  )
}
