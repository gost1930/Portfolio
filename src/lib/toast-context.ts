import { createContext } from 'react'

export interface Toast {
  id: number
  message: string
  tone: 'success' | 'error'
}

export interface ToastContextValue {
  /** Push a transient message. Returns nothing — toasts are fire-and-forget. */
  notify: (message: string, tone?: Toast['tone']) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
