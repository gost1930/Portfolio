import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  /** Rendered in the sticky header and used as the dialog's accessible name. */
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Right-anchored sheet used for project case studies.
 * Handles escape, backdrop dismissal, scroll lock and focus restoration —
 * enough of a dialog to be correct without pulling in a modal library.
 */
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    lastFocused.current = document.activeElement as HTMLElement | null

    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 60)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      lastFocused.current?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="border-line bg-canvas absolute inset-y-0 right-0 flex w-full max-w-[42rem] flex-col border-l shadow-[-40px_0_80px_-32px_rgba(0,0,0,0.9)] outline-none"
          >
            <header className="border-line bg-canvas/85 sticky top-0 z-10 flex items-start justify-between gap-6 border-b px-6 py-5 backdrop-blur-xl md:px-10">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="text-fg-subtle mt-1 truncate text-sm">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="border-line text-fg-muted hover:border-line-strong hover:text-fg grid size-9 shrink-0 place-items-center rounded-full border transition-colors"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-10 md:px-10">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
