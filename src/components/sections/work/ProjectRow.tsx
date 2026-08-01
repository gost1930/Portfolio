import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../../types'
import { pad } from '../../../lib/utils'
import { Badge } from '../../ui/Badge'

export interface ProjectRowProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

/** Dense list view — reads like an index of work rather than a gallery. */
export function ProjectRow({ project, index, onOpen }: ProjectRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="group border-line relative border-b"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="w-full cursor-pointer px-2 py-7 text-left transition-colors md:px-4"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <span className="eyebrow group-hover:text-accent w-8 shrink-0 transition-colors">
            {pad(index + 1)}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                {project.title}
              </h3>
              <span className="text-fg-subtle font-mono text-xs">
                {project.year}
              </span>
            </div>
            <p className="text-fg-muted mt-1.5 text-sm">{project.tagline}</p>
          </div>

          <div className="hidden max-w-xs flex-wrap justify-end gap-1.5 lg:flex">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <span className="border-line text-fg-subtle group-hover:border-accent/40 group-hover:text-accent grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </div>
      </button>

      {/* Hover rule that sweeps in from the left. */}
      <span className="bg-accent/60 pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-[width] duration-500 ease-out group-hover:w-full" />
    </motion.div>
  )
}
