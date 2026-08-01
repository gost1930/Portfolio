import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Loader2, Phone, Send } from 'lucide-react'
import { personal } from '../../data/personal'
import { cn } from '../../lib/utils'
import { useContactForm } from '../../hooks/useContactForm'
import type { FieldName } from '../../hooks/useContactForm'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { useToast } from '../../hooks/useToast'
import { AvailabilityPill } from '../ui/AvailabilityPill'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { SocialIcon } from '../ui/BrandIcon'

export function Contact() {
  const { notify } = useToast()

  return (
    <section id="contact" className="shell scroll-mt-24 py-28 md:py-36">
      <SectionHeader
        index="05"
        eyebrow="Contact"
        title="Let's talk about the thing you're building."
        description={personal.availability.detail}
        aside={<AvailabilityPill />}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="space-y-10">
            <CopyEmail onCopied={() => notify('Email copied to clipboard')} />

            <div>
              <p className="eyebrow">Phone</p>
              <a
                href={personal.phoneHref}
                className="group border-line bg-surface/40 hover:border-line-strong hover:bg-elevated mt-5 flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors"
              >
                <span>
                  <span className="block font-mono text-sm md:text-base">
                    {personal.phone}
                  </span>
                  <span className="text-fg-subtle mt-1 block text-xs">
                    Call or message
                  </span>
                </span>
                <span className="border-line text-fg-subtle group-hover:text-fg grid size-9 shrink-0 place-items-center rounded-full border transition-colors">
                  <Phone className="size-4" strokeWidth={1.6} />
                </span>
              </a>
            </div>

            <div>
              <p className="eyebrow">Elsewhere</p>
              <ul className="mt-5 space-y-px">
                {personal.socials
                  .filter((social) => social.platform !== 'email')
                  .map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group border-line hover:border-line-strong flex items-center justify-between gap-4 border-b py-4 transition-colors"
                      >
                        <span className="flex items-center gap-3.5">
                          <SocialIcon
                            platform={social.platform}
                            className="text-fg-subtle group-hover:text-accent size-4 transition-colors"
                          />
                          <span className="text-sm">{social.label}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-fg-subtle font-mono text-xs">
                            {social.handle}
                          </span>
                          <ArrowUpRight className="text-fg-subtle group-hover:text-fg size-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <p className="text-fg-subtle text-sm leading-relaxed">
              Based in {personal.location}, working remote and hybrid. I reply
              to most messages within a working day.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function CopyEmail({ onCopied }: { onCopied: () => void }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div>
      <p className="eyebrow">Direct</p>
      <button
        type="button"
        onClick={async () => {
          const ok = await copy(personal.email)
          if (ok) onCopied()
        }}
        className="group border-line bg-surface/40 hover:border-line-strong hover:bg-elevated mt-5 flex w-full items-center justify-between gap-4 rounded-xl border p-5 text-left transition-colors"
      >
        <span className="min-w-0">
          <span className="block truncate font-mono text-sm md:text-base">
            {personal.email}
          </span>
          <span className="text-fg-subtle mt-1 block text-xs">
            Click to copy
          </span>
        </span>

        <span
          className={cn(
            'grid size-9 shrink-0 place-items-center rounded-full border transition-colors',
            copied
              ? 'border-live/30 bg-live/10 text-live'
              : 'border-line text-fg-subtle group-hover:text-fg',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'done' : 'copy'}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? (
                <Check className="size-4" strokeWidth={2.2} />
              ) : (
                <Copy className="size-4" strokeWidth={1.6} />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    </div>
  )
}

function ContactForm() {
  const { notify } = useToast()
  const { values, errors, status, setValue, blurField, submit, reset } =
    useContactForm(() => notify('Message sent — I’ll be in touch shortly'))

  const disabled = status === 'submitting'

  return (
    <form
      noValidate
      onSubmit={async (event) => {
        event.preventDefault()
        const ok = await submit()
        if (!ok && status !== 'submitting') {
          notify('Check the highlighted fields', 'error')
        }
      }}
      className="border-line bg-surface/30 rounded-xl border p-7 md:p-9"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          placeholder="Ada Lovelace"
          value={values.name}
          error={errors.name}
          disabled={disabled}
          onChange={setValue}
          onBlur={blurField}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="ada@company.com"
          value={values.email}
          error={errors.email}
          disabled={disabled}
          onChange={setValue}
          onBlur={blurField}
        />
      </div>

      <div className="mt-6">
        <Field
          name="message"
          label="Message"
          placeholder="What are you building, and where does it hurt?"
          value={values.message}
          error={errors.message}
          disabled={disabled}
          onChange={setValue}
          onBlur={blurField}
          multiline
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-fg-subtle max-w-xs text-xs leading-relaxed">
          Or email me directly — whichever is faster for you.
        </p>

        <Button type="submit" size="lg" disabled={disabled}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              Sending
            </>
          ) : (
            <>
              <Send className="size-4" strokeWidth={1.75} />
              Send message
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {status === 'success' || status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'mt-6 flex items-start justify-between gap-4 rounded-lg border p-4 text-sm',
                status === 'success'
                  ? 'border-live/25 bg-live/5 text-live'
                  : 'border-red-500/25 bg-red-500/5 text-red-400',
              )}
            >
              <span>
                {status === 'success'
                  ? 'Thanks — your message is on its way. I’ll reply within a working day.'
                  : 'Something went wrong sending that. Email me directly and it will land.'}
              </span>
              <button
                type="button"
                onClick={reset}
                className="text-fg-subtle hover:text-fg shrink-0 text-xs underline underline-offset-4"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  )
}

interface FieldProps {
  name: FieldName
  label: string
  value: string
  error?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  multiline?: boolean
  onChange: (field: FieldName, value: string) => void
  onBlur: (field: FieldName) => void
}

function Field({
  name,
  label,
  value,
  error,
  type = 'text',
  placeholder,
  disabled,
  multiline,
  onChange,
  onBlur,
}: FieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  const classes = cn(
    'w-full rounded-lg border bg-canvas/60 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle/70',
    'transition-colors duration-200 outline-none',
    error
      ? 'border-red-500/50 focus:border-red-500'
      : 'border-line focus:border-accent/60',
    disabled && 'opacity-60',
  )

  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow">
          {label}
        </label>
        <AnimatePresence>
          {error ? (
            <motion.span
              id={errorId}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-right text-[0.6875rem] text-red-400"
            >
              {error}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
          className={cn(classes, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
          className={classes}
        />
      )}
    </div>
  )
}
