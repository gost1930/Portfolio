import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { LayoutGrid, Rows3 } from 'lucide-react'
import { categoryFilters, projects } from '../../data/projects'
import type { Project, ProjectCategory, ViewMode } from '../../types'
import { cn } from '../../lib/utils'
import { SectionHeader } from '../ui/SectionHeader'
import { Drawer } from '../ui/Drawer'
import { ProjectCard } from './work/ProjectCard'
import { ProjectRow } from './work/ProjectRow'
import { CaseStudy } from './work/CaseStudy'

type Filter = ProjectCategory | 'all'

export function Work() {
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<ViewMode>('grid')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  )

  return (
    <section id="work" className="shell scroll-mt-24 py-28 md:py-36">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title="Six platforms, built and shipped."
        description="Client work across travel, retail and public tendering — portals, dashboards, storefronts and a point-of-sale system. Open a case study for the problem, the trade-offs and what shipped."
        aside={
          <div className="flex flex-wrap items-center gap-2">
            <ViewToggle view={view} onChange={setView} />
          </div>
        }
      />

      <div className="mt-14 flex flex-wrap items-center gap-2">
        <LayoutGroup id="filters">
          {categoryFilters.map((category) => {
            const isActive = filter === category.id
            const count =
              category.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === category.id).length

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={isActive}
                className={cn(
                  'relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.8125rem] transition-colors',
                  isActive
                    ? 'text-canvas'
                    : 'text-fg-muted hover:text-fg border-line hover:border-line-strong border',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="filter-pill"
                    className="bg-fg absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{category.label}</span>
                <span
                  className={cn(
                    'relative font-mono text-[0.6875rem]',
                    isActive ? 'text-canvas/60' : 'text-fg-subtle',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </LayoutGroup>
      </div>

      <div className="mt-10">
        <LayoutGroup id="projects">
          {view === 'grid' ? (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={setSelected}
                    wide={filter === 'all' && index === 0}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div layout className="border-line border-t">
              <AnimatePresence mode="popLayout">
                {visible.map((project, index) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={setSelected}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </LayoutGroup>

        {visible.length === 0 ? (
          <p className="text-fg-subtle border-line rounded-xl border border-dashed py-16 text-center text-sm">
            Nothing in this category yet.
          </p>
        ) : null}
      </div>

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
        subtitle={selected ? `${selected.role} · ${selected.year}` : undefined}
      >
        {selected ? <CaseStudy project={selected} /> : null}
      </Drawer>
    </section>
  )
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode
  onChange: (view: ViewMode) => void
}) {
  const options: { id: ViewMode; label: string; Icon: typeof LayoutGrid }[] = [
    { id: 'grid', label: 'Grid view', Icon: LayoutGrid },
    { id: 'list', label: 'List view', Icon: Rows3 },
  ]

  return (
    <div className="border-line bg-surface/50 inline-flex items-center gap-1 rounded-full border p-1">
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-label={label}
          aria-pressed={view === id}
          className={cn(
            'relative grid size-8 place-items-center rounded-full transition-colors',
            view === id ? 'text-canvas' : 'text-fg-subtle hover:text-fg',
          )}
        >
          {view === id ? (
            <motion.span
              layoutId="view-pill"
              className="bg-fg absolute inset-0 rounded-full"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          ) : null}
          <Icon className="relative size-4" strokeWidth={1.75} />
        </button>
      ))}
    </div>
  )
}
