import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleAlert } from 'lucide-react'
import { ToastContext } from '../../lib/toast-context'
import type { Toast } from '../../lib/toast-context'

const DURATION = 2600

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const notify = useCallback(
    (message: string, tone: Toast['tone'] = 'success') => {
      const id = nextId.current++
      setToasts((current) => [...current, { id, message, tone }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id))
      }, DURATION)
    },
    [],
  )

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-6"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="border-line-strong bg-elevated/95 pointer-events-auto flex items-center gap-2.5 rounded-full border py-2.5 pr-5 pl-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              {toast.tone === 'success' ? (
                <span className="bg-live/15 text-live grid size-5 place-items-center rounded-full">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
              ) : (
                <span className="grid size-5 place-items-center rounded-full bg-red-500/15 text-red-400">
                  <CircleAlert className="size-3" strokeWidth={2.5} />
                </span>
              )}
              <span className="text-fg text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
