import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { personal } from '../../data/personal'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/utils'

const sectionIds = navigation.map((item) => item.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(16)
  const active = useActiveSection(sectionIds)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        style={{ scaleX: progress }}
        className="bg-accent/70 h-px origin-left"
      />

      <div
        className={cn(
          'transition-colors duration-300',
          scrolled
            ? 'border-line bg-canvas/70 border-b backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <nav className="shell flex h-16 items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${personal.name} — back to top`}
          >
            <span className="border-line group-hover:border-accent/50 group-hover:text-accent flex size-8 items-center justify-center rounded-md border font-mono text-[0.6875rem] tracking-tight transition-colors">
              {personal.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              {personal.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    'relative inline-flex h-8 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors',
                    active === item.id
                      ? 'text-fg'
                      : 'text-fg-subtle hover:text-fg-muted',
                  )}
                >
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="border-line bg-elevated absolute inset-0 rounded-full border"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="border-line bg-surface/60 text-fg hover:border-line-strong hover:bg-elevated hidden h-9 items-center gap-1.5 rounded-full border px-4 text-[0.8125rem] transition-colors sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="border-line text-fg-muted hover:text-fg grid size-9 place-items-center rounded-full border transition-colors md:hidden"
            >
              {open ? (
                <X className="size-4" strokeWidth={1.75} />
              ) : (
                <Menu className="size-4" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-line bg-canvas/95 border-b backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-line/60 text-fg-muted hover:text-fg flex items-center justify-between border-b py-3.5 text-sm last:border-b-0"
                  >
                    {item.label}
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
