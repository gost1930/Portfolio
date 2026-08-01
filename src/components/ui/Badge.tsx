import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import type { ProjectStatus } from '../../types'

type Tone = 'neutral' | 'accent' | 'live' | 'muted'

const tones: Record<Tone, string> = {
  neutral: 'border-line bg-elevated text-fg-muted',
  accent: 'border-accent/25 bg-accent-wash text-accent',
  live: 'border-live/25 bg-live/10 text-live',
  muted: 'border-line/70 bg-transparent text-fg-subtle',
}

export interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

/** Small metadata chip. Mono type keeps it reading as data, not decoration. */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'font-mono text-[0.6875rem] leading-none tracking-tight',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

const statusCopy: Record<ProjectStatus, { label: string; tone: Tone }> = {
  live: { label: 'Live', tone: 'live' },
  'in-progress': { label: 'In progress', tone: 'accent' },
  archived: { label: 'Archived', tone: 'muted' },
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { label, tone } = statusCopy[status]
  return (
    <Badge tone={tone}>
      <span
        className={cn(
          'size-1.5 rounded-full',
          status === 'live' && 'bg-live',
          status === 'in-progress' && 'bg-accent',
          status === 'archived' && 'bg-fg-subtle',
        )}
      />
      {label}
    </Badge>
  )
}
