import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, FileText } from 'lucide-react'
import { cv } from '../../data/cv'
import { experience } from '../../data/experience'
import { personal } from '../../data/personal'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
] as const

type TabId = (typeof tabs)[number]['id']

export function Resume() {
  const [tab, setTab] = useState<TabId>('profile')

  return (
    <section id="resume" className="shell scroll-mt-24 py-28 md:py-36">
      <SectionHeader
        index="04"
        eyebrow="Résumé"
        title="The two-page version."
        description="Preview it here, or take the PDF — same content, formatted for whoever needs it in a hiring pipeline."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Meta + download */}
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="border-line bg-surface/40 rounded-xl border p-7">
              <div className="flex items-center gap-3">
                <span className="border-line bg-elevated text-accent grid size-10 place-items-center rounded-lg border">
                  <FileText className="size-4" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{cv.fileName}</p>
                  <p className="text-fg-subtle font-mono text-xs">
                    PDF · {cv.pages} pages · {cv.updated}
                  </p>
                </div>
              </div>

              <ButtonLink
                href={cv.fileUrl}
                download={cv.fileName}
                size="lg"
                className="mt-7 w-full"
              >
                <Download className="size-4" strokeWidth={1.75} />
                Download CV
              </ButtonLink>

              <ButtonLink
                href={cv.fileUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                size="md"
                className="mt-2.5 w-full"
              >
                Open in new tab
              </ButtonLink>
            </div>

            <div className="mt-8">
              <p className="eyebrow">Focus areas</p>
              <ul className="mt-4 space-y-2.5">
                {cv.focus.map((item) => (
                  <li
                    key={item}
                    className="text-fg-muted border-line flex items-center gap-3 border-b pb-2.5 text-sm last:border-b-0"
                  >
                    <span className="bg-accent/70 size-1 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Interactive document preview */}
        <Reveal delay={0.08} className="lg:col-span-8">
          <div className="border-line bg-surface/40 overflow-hidden rounded-xl border">
            <div className="border-line flex flex-wrap items-center justify-between gap-4 border-b px-5 py-3">
              <div className="flex items-center gap-1">
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    aria-pressed={tab === item.id}
                    className={cn(
                      'relative inline-flex h-8 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors',
                      tab === item.id
                        ? 'text-fg'
                        : 'text-fg-subtle hover:text-fg-muted',
                    )}
                  >
                    {tab === item.id ? (
                      <motion.span
                        layoutId="resume-tab"
                        className="border-line bg-elevated absolute inset-0 rounded-full border"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </button>
                ))}
              </div>

              <span className="text-fg-subtle font-mono text-[0.6875rem] tracking-widest uppercase">
                Preview
              </span>
            </div>

            {/* The "page" */}
            <div className="bg-canvas/60 p-6 md:p-10">
              <header className="border-line flex flex-wrap items-end justify-between gap-4 border-b pb-6">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    {personal.name}
                  </p>
                  <p className="text-accent mt-1 text-sm">{personal.role}</p>
                </div>
                <div className="text-fg-subtle text-right font-mono text-xs leading-relaxed">
                  <p>{personal.email}</p>
                  <p>{personal.location}</p>
                </div>
              </header>

              <div className="min-h-[22rem] pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {tab === 'profile' ? <ProfilePage /> : null}
                    {tab === 'experience' ? <ExperiencePage /> : null}
                    {tab === 'education' ? <EducationPage /> : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- Pages ---------------------------------- */

function PageHeading({ children }: { children: string }) {
  return <p className="eyebrow mb-5">{children}</p>
}

function ProfilePage() {
  return (
    <div className="space-y-10">
      <section>
        <PageHeading>Profile</PageHeading>
        <p className="text-fg-muted text-sm leading-relaxed">{cv.profile}</p>
      </section>

      <section>
        <PageHeading>Selected impact</PageHeading>
        <dl className="grid grid-cols-2 gap-px sm:grid-cols-4">
          {personal.stats.map((stat) => (
            <div key={stat.label} className="border-line border-t pt-4">
              <dt className="text-fg-subtle font-mono text-[0.6875rem]">
                {stat.label}
              </dt>
              <dd className="mt-2 font-mono text-xl tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <PageHeading>Focus</PageHeading>
        <div className="flex flex-wrap gap-1.5">
          {cv.focus.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </section>
    </div>
  )
}

function ExperiencePage() {
  return (
    <div className="space-y-8">
      <PageHeading>Experience</PageHeading>
      {experience.map((company) => (
        <article
          key={company.id}
          className="border-line border-b pb-6 last:border-b-0"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-accent font-medium">{company.company}</p>
            <p className="text-fg-subtle font-mono text-xs">
              {company.from} — {company.to}
            </p>
          </div>
          <p className="text-fg-muted mt-2.5 text-sm leading-relaxed">
            {company.summary}
          </p>

          <ul className="mt-4 space-y-3">
            {company.positions.map((position) => (
              <li key={`${position.title}-${position.from}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="text-sm">{position.title}</span>
                  <span className="text-fg-subtle font-mono text-[0.6875rem]">
                    {position.from} — {position.to} · {position.type}
                  </span>
                </div>
                <p className="text-fg-subtle mt-1.5 flex gap-2.5 text-[0.8125rem] leading-relaxed">
                  <span className="bg-fg-subtle mt-[0.6em] size-1 shrink-0 rounded-full" />
                  {position.highlights[0]}
                </p>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function EducationPage() {
  return (
    <div className="space-y-10">
      <section>
        <PageHeading>Education</PageHeading>
        <div className="space-y-6">
          {cv.education.map((entry) => (
            <article key={entry.id} className="border-line border-b pb-5 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-medium">{entry.credential}</p>
                <p className="text-fg-subtle font-mono text-xs">
                  {entry.period}
                </p>
              </div>
              <p className="text-accent mt-1 text-sm">{entry.institution}</p>
              <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                {entry.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {cv.certifications.length > 0 ? (
        <section>
          <PageHeading>Certifications</PageHeading>
          <ul className="divide-line border-line divide-y border-y">
            {cv.certifications.map((certification) => (
              <li
                key={certification.id}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4"
              >
                <span className="text-sm">{certification.name}</span>
                <span className="text-fg-subtle font-mono text-xs">
                  {certification.issuer} · {certification.year}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <PageHeading>Languages</PageHeading>
        <div className="flex flex-wrap gap-1.5">
          {cv.languages.map((language) => (
            <Badge key={language.name}>
              {language.name} · {language.level}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  )
}
