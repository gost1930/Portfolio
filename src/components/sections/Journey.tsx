import { motion } from 'framer-motion'
import { experience } from '../../data/experience'
import { personal } from '../../data/personal'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { cn } from '../../lib/utils'

export function Journey() {
  return (
    <section id="journey" className="shell scroll-mt-24 py-28 md:py-36">
      <SectionHeader
        index="02"
        eyebrow="Journey"
        title="Frontend first, then the whole stack."
        description="Two clients, five titles. Each step widened the scope — from building the interface, to owning the API behind it, to running the servers it ships on."
      />

      <Reveal delay={0.05}>
        <div className="border-line mt-14 grid gap-8 border-t pt-10 md:grid-cols-2 md:gap-14">
          {personal.about.slice(0, 2).map((paragraph) => (
            <p
              key={paragraph}
              className="text-fg-muted text-[0.9375rem] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <ol className="mt-20">
        {experience.map((company, index) => (
          <li key={company.id}>
            <Reveal delay={index * 0.05}>
              <article className="group relative grid gap-6 pb-14 md:grid-cols-[9rem_1fr] md:gap-10">
                {/* Rail */}
                <span
                  className={cn(
                    'bg-line absolute top-2 bottom-0 left-[calc(0.5rem-0.5px)] w-px md:left-[calc(9rem+0.5rem)]',
                    index === experience.length - 1 && 'bottom-14',
                  )}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-4 md:block">
                  <span
                    className={cn(
                      'relative z-10 mt-[3px] block size-4 shrink-0 rounded-full border-2 md:absolute md:left-[calc(9rem+0.5rem-8px)]',
                      company.current
                        ? 'border-accent bg-canvas'
                        : 'border-line-strong bg-canvas',
                    )}
                    aria-hidden="true"
                  >
                    {company.current ? (
                      <motion.span
                        className="bg-accent absolute inset-[3px] rounded-full"
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ) : null}
                  </span>

                  <div className="md:pr-8 md:text-right">
                    <p className="font-mono text-sm tracking-tight">
                      {company.from}
                      <span className="text-fg-subtle"> — </span>
                      {company.to}
                    </p>
                    <p className="eyebrow mt-2">
                      {company.positions.length} role
                      {company.positions.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="border-line bg-surface/30 hover:border-line-strong ml-8 rounded-xl border p-6 transition-colors duration-300 md:ml-8 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {company.company}
                    </h3>
                    <span className="text-fg-subtle font-mono text-xs">
                      {company.location}
                    </span>
                  </div>

                  <p className="text-fg-muted mt-4 text-sm leading-relaxed">
                    {company.summary}
                  </p>

                  {/* Role progression inside the company */}
                  <ol className="mt-8 space-y-8">
                    {company.positions.map((position) => (
                      <li
                        key={`${position.title}-${position.from}`}
                        className="border-line relative border-l pl-6"
                      >
                        <span
                          className={cn(
                            'absolute top-1.5 -left-[4.5px] size-2 rounded-full',
                            position.current ? 'bg-accent' : 'bg-line-strong',
                          )}
                          aria-hidden="true"
                        />

                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              position.current ? 'text-accent' : 'text-fg',
                            )}
                          >
                            {position.title}
                          </p>
                          <p className="text-fg-subtle font-mono text-xs">
                            {position.from} — {position.to}
                          </p>
                        </div>

                        <p className="eyebrow mt-2">
                          {position.type} · {position.mode}
                        </p>

                        <ul className="mt-4 space-y-2.5">
                          {position.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="text-fg-muted flex gap-3 text-sm leading-relaxed"
                            >
                              <span className="bg-fg-subtle mt-2 size-1 shrink-0 rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>

                  <div className="border-line mt-8 flex flex-wrap gap-1.5 border-t pt-5">
                    {company.stack.map((tech) => (
                      <Badge key={tech} tone="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
