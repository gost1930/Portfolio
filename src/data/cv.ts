import type { CV } from '../types'

export const cv: CV = {
  fileUrl: '/resume.pdf',
  fileName: 'Hadbi-Mohamed-Full-Stack-Engineer.pdf',
  updated: 'August 2026',
  pages: 2,
  profile:
    'Results-driven full-stack engineer delivering end-to-end features across modern JavaScript ecosystems — React.js on the front, Node.js and Express.js behind it. I optimise database queries, structure clean and maintainable architecture, and turn client requirements into scalable, production-ready applications, backed by automated end-to-end testing with Cypress.',
  focus: [
    'React.js & modern JavaScript',
    'Node.js / Express.js API development',
    'Clean, maintainable architecture',
    'End-to-end testing with Cypress',
    'Linux / VPS deployment',
  ],
  education: [
    {
      id: 'software-engineering',
      institution: 'Self-directed',
      credential: 'Software Engineering & Continuous Learning',
      period: 'Ongoing',
      detail:
        'Practice-led: every framework and tool listed here was learned by shipping production work with it.',
    },
    {
      id: 'economics',
      institution: 'University',
      credential: 'Economics Studies',
      period: '2021 — 2023',
      detail:
        'Studied economics before moving fully into software engineering.',
    },
  ],
  certifications: [],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Professional' },
  ],
}
