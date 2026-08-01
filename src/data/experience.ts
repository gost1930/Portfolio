import type { Experience } from '../types'

/**
 * Grouped by company, with each title held there listed as a position — the
 * progression is the story, so flattening it would lose the point.
 */
export const experience: Experience[] = [
  {
    id: 'iso-voyage',
    company: 'iso voyage',
    location: 'Algiers, Algeria',
    from: 'Apr 2025',
    to: 'Present',
    summary:
      'Joined to build the frontend and grew into full ownership of the platform — agency portal, admin and support dashboards, the API behind them, and the servers they run on.',
    current: true,
    positions: [
      {
        title: 'Full Stack Engineer',
        type: 'Contract',
        mode: 'Hybrid',
        from: 'Jun 2026',
        to: 'Present',
        current: true,
        highlights: [
          'Architected and developed a full-stack agency web portal and core admin dashboard with React.js and Node.js/Express.js to streamline business operations.',
          'Built a dedicated support dashboard and backend infrastructure handling customer support workflows, ticketing and administrative actions.',
          'Manage deployment workflows and server environments on Linux-based VPS infrastructure.',
        ],
      },
      {
        title: 'Full Stack Engineer',
        type: 'Freelance',
        mode: 'Remote',
        from: 'Jan 2026',
        to: 'Jun 2026',
        current: false,
        highlights: [
          'Expanded scope to full-stack ownership, engineering scalable backend API endpoints and integrating them with the React frontends.',
          'Authored automated end-to-end test suites with Cypress to validate critical user flows and improve release stability.',
        ],
      },
      {
        title: 'Frontend Developer',
        type: 'Part-time',
        mode: 'Remote',
        from: 'Apr 2025',
        to: 'Jan 2026',
        current: false,
        highlights: [
          'Engineered responsive, high-performance user interfaces with React.js and Tailwind CSS.',
          'Worked with the core team to translate design requirements into modular, reusable UI components.',
        ],
      },
    ],
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'Cypress',
      'Linux / VPS',
    ],
  },
  {
    id: 'mars-pos',
    company: 'MARS POS',
    location: 'Saudi Arabia — Remote',
    from: 'Sep 2024',
    to: 'Dec 2025',
    summary:
      'Freelance engagements on a point-of-sale product, starting with the order-entry interface and returning later to build and tune the transaction backend.',
    current: false,
    positions: [
      {
        title: 'Full-Stack Developer',
        type: 'Freelance',
        mode: 'Remote',
        from: 'Oct 2025',
        to: 'Dec 2025',
        current: false,
        highlights: [
          'Designed and implemented Express.js/Node.js backend features for core point-of-sale workflows and transaction handling.',
          'Optimised API response times and database queries, reducing latency under real-time POS transaction loads.',
        ],
      },
      {
        title: 'Frontend Web Developer',
        type: 'Freelance',
        mode: 'Remote',
        from: 'Sep 2024',
        to: 'Jan 2025',
        current: false,
        highlights: [
          'Built custom, interactive menu filter grids and dynamic POS interface elements to speed up order entry.',
        ],
      },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MySQL'],
  },
]
