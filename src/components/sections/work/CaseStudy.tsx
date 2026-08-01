import type { ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Project } from '../../../types'
import { Badge, StatusBadge } from '../../ui/Badge'
import { ButtonLink } from '../../ui/Button'
import { GitHubIcon } from '../../ui/BrandIcon'
import { PatternCover } from '../../ui/PatternCover'

/** Deep-dive content rendered inside the project drawer. */
export function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="space-y-12">
      <PatternCover
        pattern={project.cover}
        className="border-line h-44 rounded-lg border"
      />

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <Badge tone="muted">{project.year}</Badge>
        <Badge tone="muted">{project.role}</Badge>
      </div>

      <p className="text-fg text-lg leading-relaxed">{project.tagline}</p>

      <dl className="border-line grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="bg-surface/60 p-5">
            <dt className="eyebrow">{metric.label}</dt>
            <dd className="text-accent mt-2.5 font-mono text-xl tracking-tight">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <Block title="The problem">
        <p className="text-fg-muted leading-relaxed">{project.problem}</p>
      </Block>

      <Block title="Key features">
        <ul className="space-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="border-accent/25 bg-accent-wash text-accent mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border">
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span className="text-fg-muted text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Tech stack choices">
        <ul className="divide-line border-line divide-y rounded-lg border">
          {project.techChoices.map((choice) => (
            <li key={choice.tech} className="p-5">
              <p className="font-mono text-sm">{choice.tech}</p>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                {choice.rationale}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Architecture highlights">
        <ol className="space-y-4">
          {project.architecture.map((item, index) => (
            <li key={item} className="flex gap-4">
              <span className="text-fg-subtle w-5 shrink-0 pt-0.5 font-mono text-xs tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-fg-muted border-line border-l pl-4 text-sm leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Full stack">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </Block>

      {project.links.live || project.links.source ? (
        <div className="border-line flex flex-wrap gap-3 border-t pt-8">
          {project.links.live ? (
            <ButtonLink
              href={project.links.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit live site
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </ButtonLink>
          ) : null}
          {project.links.source ? (
            <ButtonLink
              href={project.links.source}
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
            >
              <GitHubIcon className="size-4" />
              View source
            </ButtonLink>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="eyebrow text-fg-muted mb-5">{title}</h4>
      {children}
    </section>
  )
}
