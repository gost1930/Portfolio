import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../../types'
import { cn, pad } from '../../../lib/utils'
import { Badge, StatusBadge } from '../../ui/Badge'
import { PatternCover } from '../../ui/PatternCover'
import { GitHubIcon } from '../../ui/BrandIcon'

export interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
  /** The lead project gets a wider, taller treatment in the grid. */
  wide?: boolean
}

export function ProjectCard({
  project,
  index,
  onOpen,
  wide = false,
}: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        'group border-line bg-surface/40 relative flex flex-col overflow-hidden rounded-xl border',
        'transition-colors duration-300 hover:border-line-strong',
        wide && 'md:col-span-2',
      )}
    >
      {/* Full-card affordance sits beneath the real links. */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="absolute inset-0 z-0 cursor-pointer"
        aria-label={`Open case study: ${project.title}`}
      />

      <PatternCover
        pattern={project.cover}
        className={cn('border-line border-b', wide ? 'h-56' : 'h-44')}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            {pad(index + 1)} — {project.year}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3
          className={cn(
            'mt-5 font-semibold tracking-tight',
            wide ? 'text-3xl' : 'text-2xl',
          )}
        >
          {project.title}
        </h3>
        <p className="text-fg mt-1.5 text-sm">{project.tagline}</p>
        <p className="text-fg-muted mt-4 max-w-prose text-sm leading-relaxed">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, wide ? 6 : 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.stack.length > (wide ? 6 : 4) ? (
            <Badge tone="muted">
              +{project.stack.length - (wide ? 6 : 4)}
            </Badge>
          ) : null}
        </div>

        <div className="border-line mt-7 flex items-center justify-between gap-4 border-t pt-5">
          <span className="text-fg-muted group-hover:text-accent flex items-center gap-1.5 text-sm transition-colors">
            Case study
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>

          <div className="relative z-10 flex items-center gap-1">
            {project.links.source ? (
              <a
                href={project.links.source}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} source on GitHub`}
                className="border-line text-fg-subtle hover:border-line-strong hover:text-fg grid size-8 place-items-center rounded-full border transition-colors"
              >
                <GitHubIcon className="size-3.5" />
              </a>
            ) : null}
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live site`}
                className="border-line text-fg-subtle hover:border-line-strong hover:text-fg grid size-8 place-items-center rounded-full border transition-colors"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
