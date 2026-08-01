import { useCallback, useState } from 'react'

/**
 * Point this at a form endpoint (Formspree, Resend, your own API route) and
 * submissions post there. Left empty, the form validates and resolves locally
 * so the UI is testable without a backend.
 */
const FORM_ENDPOINT = ''

export type FieldName = 'name' | 'email' | 'message'
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type FormValues = Record<FieldName, string>
export type FormErrors = Partial<Record<FieldName, string>>

const initialValues: FormValues = { name: '', email: '', message: '' }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return 'Your name helps me reply properly.'
      if (trimmed.length < 2) return 'That looks a little short.'
      return undefined
    case 'email':
      if (!trimmed) return 'I need an address to reply to.'
      if (!emailPattern.test(trimmed)) return 'That address looks incomplete.'
      return undefined
    case 'message':
      if (!trimmed) return 'Tell me what you have in mind.'
      if (trimmed.length < 20) return 'A little more detail goes a long way.'
      return undefined
  }
}

export function useContactForm(onSuccess?: () => void) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const setValue = useCallback(
    (field: FieldName, value: string) => {
      setValues((current) => ({ ...current, [field]: value }))
      // Only re-validate live once a field has been blurred at least once.
      if (touched[field]) {
        setErrors((current) => ({
          ...current,
          [field]: validateField(field, value),
        }))
      }
    },
    [touched],
  )

  const blurField = useCallback((field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setValues((current) => {
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, current[field]),
      }))
      return current
    })
  }, [])

  const submit = useCallback(async () => {
    const nextErrors: FormErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }

    setTouched({ name: true, email: true, message: true })
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) return false

    setStatus('submitting')
    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700))
      }

      setStatus('success')
      setValues(initialValues)
      setTouched({})
      onSuccess?.()
      return true
    } catch {
      setStatus('error')
      return false
    }
  }, [values, onSuccess])

  const reset = useCallback(() => setStatus('idle'), [])

  return { values, errors, status, setValue, blurField, submit, reset }
}
