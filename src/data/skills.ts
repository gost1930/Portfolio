import type { SkillDomain } from '../types'

/**
 * Grouped by what the work actually is, not by arbitrary proficiency scores.
 * `primary` marks the tools used daily across current engagements.
 */
export const skillDomains: SkillDomain[] = [
  {
    id: 'core',
    title: 'Core',
    description: 'The foundation everything else is built on.',
    icon: 'core',
    skills: [
      {
        name: 'React.js',
        note: 'hooks, component architecture, reusable UI',
        primary: true,
      },
      {
        name: 'JavaScript (ES6+)',
        note: 'modern syntax, async patterns, modules',
        primary: true,
      },
      {
        name: 'TypeScript',
        note: 'typed components, API contracts, safer refactors',
        primary: true,
      },
      {
        name: 'HTML5 & CSS3',
        note: 'semantic markup, responsive layout',
        primary: true,
      },
    ],
  },
  {
    id: 'interface',
    title: 'Frontend & UI',
    description: 'Turning requirements into interfaces people use.',
    icon: 'interface',
    skills: [
      {
        name: 'Tailored UI/UX',
        note: 'translating design requirements into working screens',
        primary: true,
      },
      {
        name: 'Tailwind CSS',
        note: 'utility-first styling, responsive breakpoints',
        primary: true,
      },
      {
        name: 'TanStack Start',
        note: 'full-stack React routing and data loading',
        primary: true,
      },
      {
        name: 'Component systems',
        note: 'modular, reusable UI shared across surfaces',
        primary: true,
      },
      { name: 'State management', note: 'client state, data fetching, caching', primary: true },
      { name: 'Responsive design', note: 'mobile-first, tested across sizes', primary: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    description: 'The services and contracts behind the interface.',
    icon: 'backend',
    skills: [
      {
        name: 'Node.js',
        note: 'server-side JavaScript across every engagement',
        primary: true,
      },
      {
        name: 'Express.js',
        note: 'routing, middleware, request lifecycle',
        primary: true,
      },
      {
        name: 'RESTful APIs',
        note: 'resource design, predictable endpoints',
        primary: true,
      },
      {
        name: 'JWT authentication',
        note: 'stateless auth, role-aware authorisation',
        primary: true,
      },
      {
        name: 'Clean architecture',
        note: 'separated layers, maintainable boundaries',
        primary: true,
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & Infrastructure',
    description: 'Where it is stored and where it runs.',
    icon: 'data',
    skills: [
      { name: 'MySQL', note: 'relational modelling, query optimisation' },
      { name: 'MongoDB', note: 'document modelling for flexible schemas' },
      { name: 'Linux / VPS', note: 'deployment workflows, server environments' },
      { name: 'Performance tuning', note: 'response times under real load' },
    ],
  },
  {
    id: 'practice',
    title: 'Quality & Tooling',
    description: 'The habits that keep releases reliable.',
    icon: 'practice',
    skills: [
      {
        name: 'Cypress',
        note: 'end-to-end tests over critical user flows',
        primary: true,
      },
      { name: 'Git & GitHub', note: 'branching, review, history that reads' },
      { name: 'Postman', note: 'API design, verification, documentation' },
      { name: 'Debugging', note: 'reproducing, isolating, fixing at the source' },
    ],
  },
]
