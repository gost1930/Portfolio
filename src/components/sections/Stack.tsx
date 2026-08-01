import { Braces, Database, Layers, Server, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillDomains } from '../../data/skills'
import type { SkillDomainIcon } from '../../types'
import { cn } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const icons: Record<SkillDomainIcon, LucideIcon> = {
  core: Braces,
  interface: Layers,
  backend: Server,
  data: Database,
  practice: ShieldCheck,
}

export function Stack() {
  return (
    <section id="stack" className="shell scroll-mt-24 py-28 md:py-36">
      <SectionHeader
        index="03"
        eyebrow="Capabilities"
        title="What I actually work with."
        description="No percentage bars — proficiency is not a number. Grouped by the kind of problem each tool solves, with the ones I use daily marked."
        aside={
          <div className="text-fg-subtle flex items-center gap-2 font-mono text-xs">
            <span className="bg-accent size-1.5 rounded-full" />
            Primary proficiency
          </div>
        }
      />

      <div className="mt-14 grid gap-px md:grid-cols-2">
        {skillDomains.map((domain, index) => {
          const Icon = icons[domain.icon]

          return (
            <Reveal
              key={domain.id}
              delay={index * 0.06}
              className={cn(
                // An odd number of domains: let the last one run full width.
                index === skillDomains.length - 1 &&
                  skillDomains.length % 2 === 1 &&
                  'md:col-span-2',
              )}
            >
              <div className="border-line hover:border-line-strong h-full rounded-xl border p-7 transition-colors duration-300 md:p-9">
                <div className="flex items-start gap-4">
                  <span className="border-line bg-surface text-fg-muted grid size-10 shrink-0 place-items-center rounded-lg border">
                    <Icon className="size-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {domain.title}
                    </h3>
                    <p className="text-fg-subtle mt-1 text-sm">
                      {domain.description}
                    </p>
                  </div>
                </div>

                <ul className="divide-line mt-8 divide-y">
                  {domain.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group flex items-baseline justify-between gap-6 py-3.5"
                    >
                      <span className="flex items-baseline gap-2.5">
                        {skill.primary ? (
                          <span className="bg-accent size-1.5 shrink-0 translate-y-[-2px] rounded-full" />
                        ) : (
                          <span className="bg-line-strong size-1.5 shrink-0 translate-y-[-2px] rounded-full" />
                        )}
                        <span
                          className={cn(
                            'text-sm transition-colors',
                            skill.primary
                              ? 'text-fg font-medium'
                              : 'text-fg-muted',
                          )}
                        >
                          {skill.name}
                        </span>
                      </span>

                      <span className="text-fg-subtle hidden text-right font-mono text-[0.6875rem] leading-snug sm:block">
                        {skill.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
