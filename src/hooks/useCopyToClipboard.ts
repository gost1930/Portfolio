import { useCallback, useEffect, useRef, useState } from 'react'

/** Copies text and reports a short-lived `copied` flag for UI feedback. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (value: string) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value)
        } else {
          // Fallback for insecure origins, where the async API is unavailable.
          const field = document.createElement('textarea')
          field.value = value
          field.setAttribute('readonly', '')
          field.style.position = 'fixed'
          field.style.opacity = '0'
          document.body.appendChild(field)
          field.select()
          document.execCommand('copy')
          document.body.removeChild(field)
        }

        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), resetAfter)
        return true
      } catch {
        return false
      }
    },
    [resetAfter],
  )

  return { copied, copy }
}
