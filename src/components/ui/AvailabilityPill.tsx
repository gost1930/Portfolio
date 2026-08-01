import { cn } from '../../lib/utils'
import { personal } from '../../data/personal'

/** Live status chip. The dot pulses; the pill itself stays still. */
export function AvailabilityPill({ className }: { className?: string }) {
  const { availability } = personal

  return (
    <span
      className={cn(
        'border-line bg-surface/80 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-3',
        'text-fg-muted text-[0.8125rem] backdrop-blur',
        className,
      )}
    >
      <span className="relative grid size-2 place-items-center">
        <span
          className={cn(
            'absolute size-2 rounded-full',
            availability.open ? 'bg-live animate-halo' : 'bg-fg-subtle',
          )}
        />
        <span
          className={cn(
            'size-2 rounded-full',
            availability.open ? 'bg-live' : 'bg-fg-subtle',
          )}
        />
      </span>
      {availability.label}
    </span>
  )
}
