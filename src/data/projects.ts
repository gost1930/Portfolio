import type { CategoryFilter, Project } from '../types'

/**
 * Add `links.live` / `links.source` per project as URLs become available —
 * the card and case-study drawer render those buttons only when they exist.
 */

export const categoryFilters: CategoryFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'web-app', label: 'Web Apps' },
  { id: 'full-stack', label: 'Full-Stack' },
  { id: 'dashboard', label: 'Dashboards' },
]

export const projects: Project[] = [
  {
    id: 'agency-portal',
    title: 'Agency Web Portal',
    tagline: 'Full-stack portal and admin dashboard for a travel agency',
    year: '2025 — 2026',
    role: 'Full Stack Engineer · iso voyage',
    category: 'dashboard',
    status: 'live',
    featured: true,
    cover: 'grid',
    summary:
      'The system the agency runs on: a public-facing portal, an internal admin dashboard, and the Express API tying both to day-to-day operations.',
    problem:
      'Agency operations were spread across manual processes with no single place to manage them. The brief was to replace that with one platform — a portal for clients and an admin surface where staff could handle records and daily operations without going through a developer for every change.',
    features: [
      'Client-facing agency portal built as a responsive React application',
      'Core admin dashboard for managing operational records end to end',
      'Express.js REST API covering every operation the dashboard performs',
      'JWT-based authentication with role-aware access to admin actions',
      'Deployed and maintained on Linux VPS infrastructure',
    ],
    techChoices: [
      {
        tech: 'React.js',
        rationale:
          'A component-driven frontend meant the portal and the dashboard could share the same UI building blocks instead of being maintained as two separate codebases.',
      },
      {
        tech: 'Node.js + Express.js',
        rationale:
          'One language across the stack kept context-switching low and let request/response shapes stay consistent from the API to the components consuming them.',
      },
      {
        tech: 'Tailwind CSS',
        rationale:
          'Utility classes kept styling colocated with markup, which is what made a consistent look across two separate surfaces practical for a single engineer.',
      },
      {
        tech: 'JWT authentication',
        rationale:
          'Stateless tokens kept the API simple to scale and made authorisation checks explicit at every protected endpoint.',
      },
    ],
    architecture: [
      'Clean separation between routing, business logic and data access so features can be added without threading changes through unrelated code.',
      'The API is the single source of truth; both the portal and the dashboard are clients of it, never of the database directly.',
      'Authorisation is enforced server-side per endpoint — the UI hides what you cannot do, the API refuses it.',
      'Deployment and server environments managed directly on a Linux VPS, so releases are reproducible rather than ad hoc.',
    ],
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'REST APIs',
      'JWT',
      'Linux / VPS',
    ],
    metrics: [
      { label: 'Scope', value: 'Full-stack' },
      { label: 'Surfaces', value: 'Portal + admin' },
      { label: 'Status', value: 'In production' },
    ],
    links: {},
  },

  {
    id: 'support-dashboard',
    title: 'Support Dashboard',
    tagline: 'Ticketing and support operations console',
    year: '2026',
    role: 'Full Stack Engineer · iso voyage',
    category: 'dashboard',
    status: 'live',
    featured: false,
    cover: 'stack',
    summary:
      'A dedicated dashboard and backend for customer support — tickets, workflows and administrative actions in one place instead of scattered across inboxes.',
    problem:
      'Support requests were being handled informally, which made it hard to see what was outstanding, who was handling it, or what had already been tried. Support staff needed a purpose-built surface rather than a general admin panel.',
    features: [
      'Ticket queue with status tracking through the support lifecycle',
      'Administrative actions available directly from the ticket context',
      'Backend infrastructure dedicated to support workflows',
      'Role-separated access so support staff see only what they need',
    ],
    techChoices: [
      {
        tech: 'React.js',
        rationale:
          'Support work is stateful and interactive — component state and local updates keep the queue responsive as agents move through it.',
      },
      {
        tech: 'Express.js',
        rationale:
          'Support workflows are a distinct domain, so they got their own routes and handlers rather than being bolted onto the main admin API.',
      },
      {
        tech: 'REST API design',
        rationale:
          'Predictable, resource-shaped endpoints kept the ticket lifecycle easy to reason about and to extend with new statuses.',
      },
    ],
    architecture: [
      'Support is modelled as its own domain with its own endpoints, so changes there cannot destabilise the core admin dashboard.',
      'Ticket state transitions are handled server-side, keeping the rules in one place.',
      'The dashboard is a thin client over that API — all logic worth trusting lives behind it.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    metrics: [
      { label: 'Domain', value: 'Support ops' },
      { label: 'Built', value: 'Front + back' },
      { label: 'Status', value: 'In production' },
    ],
    links: {},
  },

  {
    id: 'mars-pos',
    title: 'MARS POS',
    tagline: 'Point-of-sale platform for a Saudi retail client',
    year: '2024 — 2025',
    role: 'Full-Stack Developer · Freelance',
    category: 'full-stack',
    status: 'live',
    featured: false,
    cover: 'bars',
    summary:
      'Order-entry interface first, transaction backend second — a POS system where both halves had to stay fast under live sales traffic.',
    problem:
      'Point-of-sale work has no tolerance for latency: a cashier waiting on a request is a queue forming at the counter. The interface needed to make item selection near-instant, and the backend had to keep transaction handling quick under real-time load.',
    features: [
      'Custom interactive menu filter grids for fast order entry',
      'Dynamic POS interface elements built around speed of selection',
      'Express.js/Node.js backend for core point-of-sale workflows',
      'Transaction handling built for real-time use at the counter',
      'Query and response-time optimisation under live transaction loads',
    ],
    techChoices: [
      {
        tech: 'React.js',
        rationale:
          'Filtering and grid interactions happen client-side, so selecting an item never waits on a round trip.',
      },
      {
        tech: 'Express.js',
        rationale:
          'A thin, explicit server layer kept the transaction path short — fewer abstractions between a request and the write it performs.',
      },
      {
        tech: 'Query optimisation',
        rationale:
          'Latency under POS load came from the database, not the network, so the work went into the queries themselves rather than caching around them.',
      },
    ],
    architecture: [
      'Order entry is optimised for the common path: fewest possible interactions between opening the screen and completing a sale.',
      'Transaction endpoints kept deliberately narrow, so their performance can be reasoned about and measured.',
      'Database access tuned against realistic transaction volume rather than empty-table assumptions.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MySQL'],
    metrics: [
      { label: 'Focus', value: 'Latency' },
      { label: 'Scope', value: 'UI + backend' },
      { label: 'Market', value: 'Saudi Arabia' },
    ],
    links: {},
  },

  {
    id: 'ecommerce',
    title: 'E-Commerce Client Platform',
    tagline: 'Responsive storefront with dynamic catalog and live cart',
    year: '2025',
    role: 'Full-Stack Developer',
    category: 'full-stack',
    status: 'live',
    featured: false,
    cover: 'orbit',
    summary:
      'A full-featured storefront built end to end — dynamic product catalogs, real-time cart management and an Express API behind both.',
    problem:
      'The client needed a storefront that worked as well on a phone as on a desktop, with a catalog they could actually change and a cart that behaved correctly when customers add, remove and revisit items across a session.',
    features: [
      'Dynamic product catalog driven entirely by API data',
      'Real-time cart management with immediate feedback on every action',
      'Fully responsive layouts from small phones up',
      'Express.js backend serving catalog and cart operations',
    ],
    techChoices: [
      {
        tech: 'React.js',
        rationale:
          'Cart state changes constantly during a session — a component model made it straightforward to keep every part of the UI showing the same truth.',
      },
      {
        tech: 'Node.js + Express.js',
        rationale:
          'Catalog and cart endpoints belong together behind one API; keeping them in a single Express service avoided premature separation.',
      },
      {
        tech: 'Tailwind CSS',
        rationale:
          'Responsive behaviour is expressed inline at each breakpoint, which made getting the mobile layout right a per-component task rather than a stylesheet audit.',
      },
    ],
    architecture: [
      'Catalog data is fetched, never hardcoded — the client can change what they sell without a redeploy.',
      'Cart operations are validated server-side so the displayed total is always the authoritative one.',
      'Presentation components stay separate from data-fetching ones, keeping the UI reusable across pages.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'MongoDB'],
    metrics: [
      { label: 'Scope', value: 'Full-stack' },
      { label: 'Catalog', value: 'Dynamic' },
      { label: 'Cart', value: 'Real-time' },
    ],
    links: {},
  },

  {
    id: 'maylou',
    title: 'Maylou',
    tagline: 'Localised restaurant ordering with a live staff dashboard',
    year: '2025',
    role: 'Full-Stack Developer',
    category: 'web-app',
    status: 'live',
    featured: false,
    cover: 'arcs',
    summary:
      'A restaurant ordering platform built for local customers, with interactive menu navigation on one side and a live staff dashboard on the other.',
    problem:
      'Ordering needed to be quick for customers browsing a large menu on a phone, while kitchen and floor staff needed to see incoming orders as they arrived — two very different interfaces over the same data.',
    features: [
      'Interactive menu navigation with custom item filtering',
      'Live staff dashboard showing orders as they come in',
      'Localised interface built for the restaurant’s own customers',
      'Express.js backend coordinating orders between both surfaces',
    ],
    techChoices: [
      {
        tech: 'React.js',
        rationale:
          'Two surfaces with different needs share one component vocabulary — the menu and the dashboard are separate views, not separate projects.',
      },
      {
        tech: 'Express.js',
        rationale:
          'A single API owns the order lifecycle, so the customer view and the staff view can never disagree about an order’s state.',
      },
      {
        tech: 'Tailwind CSS',
        rationale:
          'Menu browsing is mobile-first by definition; utility breakpoints made that the default rather than an afterthought.',
      },
    ],
    architecture: [
      'One order model, two clients — customer-facing ordering and the staff dashboard read the same source.',
      'Filtering runs client-side so browsing a long menu never stalls on the network.',
      'Staff dashboard is built around what matters mid-service: what just arrived and what is still open.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Surfaces', value: 'Customer + staff' },
      { label: 'Menu', value: 'Filterable' },
      { label: 'Orders', value: 'Live' },
    ],
    links: {},
  },

  {
    id: 'municipal',
    title: 'Municipal Tenders Platform',
    tagline: 'Public tendering and contractor bidding for municipalities',
    year: '2024',
    role: 'Full-Stack Developer',
    category: 'full-stack',
    status: 'live',
    featured: false,
    cover: 'stack',
    summary:
      'A server-rendered platform letting municipal authorities publish tenders and manage contractor bidding under strict role-based authorisation.',
    problem:
      'Municipal tendering involves parties who must not see each other’s work: authorities publishing tenders, contractors submitting bids, and administrators overseeing both. Getting authorisation wrong is not a UI bug — it undermines the process itself.',
    features: [
      'Tender publication workflow for municipal authorities',
      'Contractor bidding flow with submissions scoped per tender',
      'Role-based authorisation enforced across every action',
      'Server-rendered pages with Bootstrap-based responsive layouts',
    ],
    techChoices: [
      {
        tech: 'Server-rendered MVC (Python)',
        rationale:
          'A batteries-included framework gave authentication, an admin surface and an ORM out of the box — the right trade for a content-and-forms application with no need for a separate frontend.',
      },
      {
        tech: 'Template-based views',
        rationale:
          'Pages are mostly forms and listings; rendering them server-side kept the whole flow in one place instead of splitting it across an API boundary.',
      },
      {
        tech: 'Bootstrap',
        rationale:
          'A conventional component library was the fastest route to accessible, responsive forms for a public-sector audience.',
      },
    ],
    architecture: [
      'Roles are the backbone: every view checks what the current user is entitled to before rendering anything.',
      'Tenders and bids are modelled as distinct entities with an explicit relationship, so a bid can never exist without its tender.',
      'Business rules live in the server layer, not the templates — the UI reflects state, it does not decide it.',
    ],
    stack: [
      'Python',
      'Server-rendered templates',
      'Bootstrap',
      'HTML5 / CSS3',
      'MySQL',
    ],
    metrics: [
      { label: 'Users', value: 'Multi-role' },
      { label: 'Core rule', value: 'Authorisation' },
      { label: 'Scope', value: 'Full-stack' },
    ],
    links: {},
  },
]
