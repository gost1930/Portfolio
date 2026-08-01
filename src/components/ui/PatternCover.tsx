import { cn } from '../../lib/utils'
import type { CoverPattern } from '../../types'

/**
 * Code-drawn cover art. Deliberately no stock photography or mockups —
 * each project gets a quiet technical diagram that reads as a texture.
 */
export function PatternCover({
  pattern,
  className,
}: {
  pattern: CoverPattern
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-surface relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-[radial-gradient(120%_100%_at_50%_0%,rgba(245,177,76,0.06),transparent_60%)]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 200"
        className="text-fg absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {pattern === 'grid' ? <GridArt /> : null}
        {pattern === 'stack' ? <StackArt /> : null}
        {pattern === 'orbit' ? <OrbitArt /> : null}
        {pattern === 'bars' ? <BarsArt /> : null}
        {pattern === 'arcs' ? <ArcsArt /> : null}
      </svg>
    </div>
  )
}

function GridArt() {
  const columns = Array.from({ length: 17 }, (_, i) => i * 20)
  const rows = Array.from({ length: 11 }, (_, i) => i * 20)
  return (
    <g>
      {columns.map((x) => (
        <line
          key={`c${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={200}
          stroke="currentColor"
          strokeOpacity={0.07}
        />
      ))}
      {rows.map((y) => (
        <line
          key={`r${y}`}
          x1={0}
          y1={y}
          x2={320}
          y2={y}
          stroke="currentColor"
          strokeOpacity={0.07}
        />
      ))}
      <rect x={100} y={60} width={60} height={20} fill="var(--color-accent)" fillOpacity={0.5} />
      <rect x={160} y={80} width={20} height={20} fill="currentColor" fillOpacity={0.22} />
      <rect x={80} y={100} width={40} height={20} fill="currentColor" fillOpacity={0.12} />
      <rect x={180} y={40} width={20} height={20} fill="currentColor" fillOpacity={0.16} />
    </g>
  )
}

function StackArt() {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={70 + i * 12}
          y={40 + i * 18}
          width={150}
          height={44}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.18 + i * 0.06}
          fill="currentColor"
          fillOpacity={0.02}
        />
      ))}
      <rect
        x={70}
        y={40}
        width={150}
        height={44}
        rx={6}
        stroke="var(--color-accent)"
        strokeOpacity={0.55}
      />
    </g>
  )
}

function OrbitArt() {
  return (
    <g transform="translate(160 100)">
      {[28, 52, 76, 100].map((r, i) => (
        <circle
          key={r}
          r={r}
          stroke="currentColor"
          strokeOpacity={0.22 - i * 0.04}
          strokeDasharray={i % 2 === 0 ? undefined : '2 6'}
        />
      ))}
      <circle r={7} fill="var(--color-accent)" fillOpacity={0.75} />
      <circle cx={52} cy={0} r={3.5} fill="currentColor" fillOpacity={0.55} />
      <circle cx={-58} cy={48} r={3} fill="currentColor" fillOpacity={0.35} />
      <circle cx={70} cy={-70} r={2.5} fill="currentColor" fillOpacity={0.3} />
    </g>
  )
}

function BarsArt() {
  const heights = [34, 58, 46, 82, 64, 104, 88, 120, 96, 132]
  return (
    <g>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={44 + i * 24}
          y={170 - h}
          width={10}
          height={h}
          rx={2}
          fill={i === heights.length - 1 ? 'var(--color-accent)' : 'currentColor'}
          fillOpacity={i === heights.length - 1 ? 0.7 : 0.1 + i * 0.02}
        />
      ))}
      <line x1={30} y1={170} x2={290} y2={170} stroke="currentColor" strokeOpacity={0.14} />
    </g>
  )
}

function ArcsArt() {
  return (
    <g transform="translate(60 170)">
      {[40, 70, 100, 130, 160].map((r, i) => (
        <path
          key={r}
          d={`M0 ${-r} A ${r} ${r} 0 0 1 ${r} 0`}
          stroke={i === 1 ? 'var(--color-accent)' : 'currentColor'}
          strokeOpacity={i === 1 ? 0.5 : 0.16}
          strokeWidth={1.25}
        />
      ))}
      <circle r={4} fill="currentColor" fillOpacity={0.4} />
    </g>
  )
}
