import type { Personal } from '../types'

export const personal: Personal = {
  name: 'Hadbi Mohamed',
  initials: 'HM',
  role: 'Full Stack Engineer',
  location: 'El Attaf, Aïn Defla — Algeria',
  timeZone: 'Africa/Algiers',
  email: 'hadbimohamed66@gmail.com',
  phone: '0777 84 69 96',
  phoneHref: 'tel:+213777846996',

  availability: {
    open: true,
    label: 'Available for new opportunities',
    detail:
      'Open to full-stack roles, contract work and freelance engagements — remote or hybrid.',
  },

  headline: {
    lead: 'Full-stack web products,',
    accent: 'shipped',
    trail: 'end to end.',
  },

  intro:
    'I build production applications across React and Node.js — agency portals, admin dashboards and point-of-sale interfaces — then keep them stable with end-to-end tests and my own deployments.',

  about: [
    'My work runs the whole length of a feature: the React interface, the Express API behind it, the queries underneath, and the Linux VPS it ends up on. Owning that full path is what lets me ship something that actually works in a client’s hands rather than only on my machine.',
    'I care about the parts that decide whether software survives contact with real use — clean architecture that stays readable, database queries that hold up under load, and Cypress suites covering the flows a business cannot afford to break.',
    'Most of my experience comes from freelance and contract engagements, where scope is loose and the person who wrote the code is the person who has to support it.',
  ],

  stats: [
    { label: 'Shipping since', value: '2024', note: 'freelance → contract' },
    { label: 'Platforms delivered', value: '6', note: 'portals, POS, storefronts' },
    { label: 'Markets served', value: 'DZ · SA', note: 'remote & hybrid' },
    { label: 'Critical flows', value: 'E2E', note: 'covered with Cypress' },
  ],

  socials: [
    {
      platform: 'github',
      label: 'GitHub',
      handle: '@gost1930',
      href: 'https://github.com/gost1930',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      handle: 'Hadbi Mohamed',
      href: 'https://www.linkedin.com/in/hadbi-mohamed',
    },
    {
      platform: 'email',
      label: 'Email',
      handle: 'hadbimohamed66@gmail.com',
      href: 'mailto:hadbimohamed66@gmail.com',
    },
  ],

  marquee: [
    'React.js',
    'TanStack Start',
    'TypeScript',
    'JavaScript ES6+',
    'Tailwind CSS',
    'HTML5 / CSS3',
    'Node.js',
    'Express.js',
    'REST APIs',
    'JWT Auth',
    'Clean Architecture',
    'MySQL',
    'MongoDB',
    'Cypress',
    'Git & GitHub',
    'Postman',
    'Linux / VPS',
  ],
}
