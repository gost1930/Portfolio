import type { SVGProps } from 'react'
import { Mail } from 'lucide-react'
import type { SocialPlatform } from '../../types'

type IconProps = SVGProps<SVGSVGElement>

/* Brand marks are not part of the icon library — kept here as inline paths. */

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.635 22.412c.575.106.786-.25.786-.556 0-.274-.01-1-.016-1.963-3.198.695-3.873-1.542-3.873-1.542-.523-1.329-1.278-1.683-1.278-1.683-1.044-.714.079-.7.079-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.758 2.692 1.25 3.348.956.104-.744.402-1.25.73-1.538-2.553-.29-5.238-1.277-5.238-5.686 0-1.256.449-2.283 1.185-3.088-.119-.291-.514-1.462.113-3.047 0 0 .966-.31 3.166 1.18a11.02 11.02 0 0 1 5.766 0c2.199-1.49 3.163-1.18 3.163-1.18.629 1.585.234 2.756.115 3.047.738.805 1.184 1.832 1.184 3.088 0 4.42-2.69 5.393-5.25 5.677.413.355.78 1.056.78 2.129 0 1.537-.014 2.777-.014 3.155 0 .308.208.668.792.555A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  switch (platform) {
    case 'github':
      return <GitHubIcon className={className} />
    case 'linkedin':
      return <LinkedInIcon className={className} />
    case 'x':
      return <XIcon className={className} />
    case 'email':
      return <Mail className={className} strokeWidth={1.6} />
  }
}
