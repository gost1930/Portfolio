import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { personal } from '../../data/personal'
import { SocialIcon } from '../ui/BrandIcon'

const formatTime = (timeZone: string) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(new Date())

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => formatTime(timeZone))

  useEffect(() => {
    const interval = window.setInterval(
      () => setTime(formatTime(timeZone)),
      30_000,
    )
    return () => window.clearInterval(interval)
  }, [timeZone])

  return time
}

export function Footer() {
  const time = useLocalTime(personal.timeZone)

  return (
    <footer className="border-line border-t">
      <div className="shell py-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="text-fg-subtle flex items-center gap-6 font-mono text-xs">
            <span className="flex items-center gap-2">
              <span className="bg-live size-1.5 rounded-full" />
              {time} local
            </span>
            <span className="hidden sm:inline">{personal.location}</span>
          </div>

          <div className="flex items-center gap-2">
            {personal.socials.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target={social.platform === 'email' ? undefined : '_blank'}
                rel="noreferrer noopener"
                aria-label={social.label}
                className="border-line text-fg-subtle hover:border-line-strong hover:text-fg grid size-9 place-items-center rounded-full border transition-colors"
              >
                <SocialIcon platform={social.platform} className="size-3.5" />
              </a>
            ))}

            <a
              href="#top"
              aria-label="Back to top"
              className="border-line text-fg-subtle hover:border-accent/40 hover:text-accent ml-2 grid size-9 place-items-center rounded-full border transition-colors"
            >
              <ArrowUp className="size-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Oversized wordmark — the sign-off, not a logo. */}
        <p
          className="display text-line-strong mt-16 text-[clamp(3rem,13vw,10rem)] leading-none select-none"
          aria-hidden="true"
        >
          {personal.name}
        </p>

        <div className="border-line text-fg-subtle mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8 font-mono text-xs">
          <span>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span>Built with React, TypeScript, Tailwind &amp; Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
