/* --------------------------------------------------------------------------
   Shared domain types.
   Content lives in `src/data/*` and is typed against these contracts, so a
   component never has to guess the shape of what it renders.
   -------------------------------------------------------------------------- */

/* ------------------------------- Personal -------------------------------- */

export type SocialPlatform = 'github' | 'linkedin' | 'x' | 'email'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  handle: string
  href: string
}

export interface Availability {
  /** Drives the live badge in the hero and the contact section. */
  open: boolean
  label: string
  detail: string
}

export interface Stat {
  label: string
  value: string
  /** Optional footnote rendered under the value. */
  note?: string
}

export interface Personal {
  name: string
  initials: string
  role: string
  location: string
  /** IANA zone, used to render local time in the footer. */
  timeZone: string
  email: string
  /** Display form and `tel:` form of the same number. */
  phone: string
  phoneHref: string
  availability: Availability
  /** Headline split so a single word can be typeset in serif italic. */
  headline: { lead: string; accent: string; trail: string }
  intro: string
  about: string[]
  stats: Stat[]
  socials: SocialLink[]
  /** Rotating tech pills for the hero ticker. */
  marquee: string[]
}

/* -------------------------------- Projects -------------------------------- */

export type ProjectCategory = 'web-app' | 'full-stack' | 'dashboard'

export type ProjectStatus = 'live' | 'in-progress' | 'archived'

/** Deterministic, code-drawn cover art — no stock imagery. */
export type CoverPattern = 'grid' | 'arcs' | 'stack' | 'orbit' | 'bars'

export interface TechChoice {
  tech: string
  rationale: string
}

export interface ProjectLinks {
  live?: string
  source?: string
}

export interface Project {
  id: string
  title: string
  /** One-line positioning statement shown on the card. */
  tagline: string
  year: string
  role: string
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  cover: CoverPattern
  /** Short card copy. */
  summary: string
  /** Deep-dive content for the case-study drawer. */
  problem: string
  features: string[]
  techChoices: TechChoice[]
  architecture: string[]
  stack: string[]
  metrics: Stat[]
  links: ProjectLinks
}

export interface CategoryFilter {
  id: ProjectCategory | 'all'
  label: string
}

export type ViewMode = 'grid' | 'list'

/* ------------------------------- Experience ------------------------------- */

export type EngagementType =
  | 'Full-time'
  | 'Contract'
  | 'Freelance'
  | 'Part-time'

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site'

/** A single title held at a company — companies can hold several over time. */
export interface Position {
  title: string
  type: EngagementType
  mode: WorkMode
  /** e.g. "Jun 2026" → "Present" */
  from: string
  to: string
  highlights: string[]
  current: boolean
}

export interface Experience {
  id: string
  company: string
  location: string
  /** Span across every position held there. */
  from: string
  to: string
  summary: string
  positions: Position[]
  stack: string[]
  current: boolean
}

/* --------------------------------- Skills --------------------------------- */

export type SkillDomainIcon =
  | 'core'
  | 'interface'
  | 'backend'
  | 'data'
  | 'practice'

export interface Skill {
  name: string
  /** Short qualifier, e.g. "hooks, suspense, concurrent patterns". */
  note: string
  /** Primary proficiencies are typeset with the accent treatment. */
  primary?: boolean
}

export interface SkillDomain {
  id: string
  title: string
  description: string
  icon: SkillDomainIcon
  skills: Skill[]
}

/* ----------------------------------- CV ----------------------------------- */

export interface Education {
  id: string
  institution: string
  credential: string
  period: string
  detail: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
}

export interface CV {
  /** Served from `public/` — one-click download. */
  fileUrl: string
  fileName: string
  updated: string
  pages: number
  profile: string
  focus: string[]
  education: Education[]
  certifications: Certification[]
  languages: { name: string; level: string }[]
}

/* --------------------------------- Layout --------------------------------- */

export interface NavItem {
  id: string
  label: string
  href: string
}
