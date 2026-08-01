import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { personal } from '../../data/personal'
import { cv } from '../../data/cv'
import { AvailabilityPill } from '../ui/AvailabilityPill'
import { ButtonLink } from '../ui/Button'

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const ease = [0.22, 0.61, 0.36, 1] as const

export function Hero() {
  const { headline, intro, stats, marquee } = personal

  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      <Backdrop />

      <div className="shell relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-16 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <motion.div variants={rise} transition={{ duration: 0.6, ease }}>
              <AvailabilityPill />
            </motion.div>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="display mt-8 text-[clamp(2.75rem,7.2vw,5.25rem)]"
            >
              {headline.lead}{' '}
              <span className="font-serif font-normal tracking-normal text-accent italic">
                {headline.accent}
              </span>{' '}
              {headline.trail}
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6, ease }}
              className="text-fg-muted mt-8 max-w-xl text-base leading-relaxed md:text-lg"
            >
              {intro}
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="#work" size="lg">
                View selected work
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>

              <ButtonLink
                href={cv.fileUrl}
                download={cv.fileName}
                variant="secondary"
                size="lg"
              >
                <Download className="size-4" strokeWidth={1.75} />
                Download CV
              </ButtonLink>

              <ButtonLink href="#contact" variant="ghost" size="lg">
                Get in touch
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div
            variants={rise}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5"
          >
            <CodeCard />
          </motion.div>
        </motion.div>

        <motion.dl
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-2 gap-px md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={rise}
              transition={{ duration: 0.5, ease }}
              className="border-line border-t pt-5"
            >
              <dt className="eyebrow">{stat.label}</dt>
              <dd className="mt-3 font-mono text-3xl tracking-tight">
                {stat.value}
              </dd>
              {stat.note ? (
                <p className="text-fg-subtle mt-1.5 text-xs">{stat.note}</p>
              ) : null}
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <Ticker items={marquee} />
    </section>
  )
}

/* ---------------------------------------------------------------------- */

function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* A single, low-opacity warm wash — no neon, no particles. */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(245,177,76,0.07),transparent_70%)]" />

      {/* Structural hairlines that echo an editorial grid. */}
      <div className="shell absolute inset-0">
        <div className="relative h-full">
          {[0, 25, 50, 75, 100].map((left) => (
            <div
              key={left}
              className="via-line/70 absolute inset-y-0 w-px bg-gradient-to-b from-transparent to-transparent"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CodeCard() {
  return (
    <div className="border-line bg-surface/60 grain overflow-hidden rounded-xl border backdrop-blur-sm">
      <div className="border-line flex items-center justify-between border-b px-4 py-3">
        <span className="text-fg-subtle font-mono text-xs">engineer.ts</span>
        <span className="text-fg-subtle border-line rounded border px-1.5 py-0.5 font-mono text-[0.625rem] tracking-widest uppercase">
          TS
        </span>
      </div>

      <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.78125rem] leading-[1.85]">
        <code>
          <Line n={1}>
            <K>import</K> <T>type</T> {'{ Engineer }'} <K>from</K>{' '}
            <S>'./types'</S>
          </Line>
          <Line n={2} />
          <Line n={3}>
            <K>export const</K> <F>profile</F> = {'{'}
          </Line>
          <Line n={4}>
            {'  '}
            <P>role</P>: <S>'Full Stack Engineer'</S>,
          </Line>
          <Line n={5}>
            {'  '}
            <P>stack</P>: [<S>'React'</S>, <S>'Node'</S>, <S>'Express'</S>],
          </Line>
          <Line n={6}>
            {'  '}
            <P>focus</P>: [<S>'clean architecture'</S>, <S>'e2e tests'</S>],
          </Line>
          <Line n={7}>
            {'  '}
            <P>shipping</P>: <N>true</N>,
          </Line>
          <Line n={8}>
            {'}'} <K>satisfies</K> <T>Engineer</T>
            <span className="bg-accent animate-caret ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.18em]" />
          </Line>
        </code>
      </pre>
    </div>
  )
}

function Line({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="text-fg-subtle/50 w-4 shrink-0 text-right tabular-nums select-none">
        {n}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  )
}

/* Minimal token colours — three hues total, all pulled from the palette. */
const K = ({ children }: { children: ReactNode }) => (
  <span className="text-accent/90">{children}</span>
)
const T = ({ children }: { children: ReactNode }) => (
  <span className="text-fg">{children}</span>
)
const F = ({ children }: { children: ReactNode }) => (
  <span className="text-fg font-medium">{children}</span>
)
const P = ({ children }: { children: ReactNode }) => (
  <span className="text-fg-muted">{children}</span>
)
const S = ({ children }: { children: ReactNode }) => (
  <span className="text-live/80">{children}</span>
)
const N = ({ children }: { children: ReactNode }) => (
  <span className="text-fg-subtle">{children}</span>
)

function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items]

  return (
    <div className="border-line edge-fade relative mt-24 border-y py-4">
      <div className="animate-marquee flex w-max items-center gap-3 hover:[animation-play-state:paused]">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="border-line bg-surface/50 text-fg-muted rounded-full border px-3.5 py-1.5 font-mono text-xs whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
