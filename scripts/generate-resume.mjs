/**
 * Generates `public/resume.pdf` — a two-page CV built from the same content as
 * `src/data/cv.ts`, `src/data/experience.ts` and `src/data/projects.ts`.
 *
 * Run with: npm run resume
 *
 * Written as a plain PDF writer (no dependencies): base-14 Helvetica, absolute
 * text positioning, hand-built xref table. Keep the content below in sync with
 * the data files when you edit them.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(here, '../public/resume.pdf')

/* ----------------------------- content ---------------------------------- */

const profile = {
  name: 'Hadbi Mohamed',
  role: 'Full Stack Engineer — React.js · TanStack Start · Express.js · Cypress',
  email: 'hadbimohamed66@gmail.com',
  phone: '0777 84 69 96',
  location: 'El Attaf, Aïn Defla, Algeria',
  links: ['github.com/gost1930', 'LinkedIn: Hadbi Mohamed'],
  summary:
    'Results-driven full-stack engineer with a proven track record of delivering end-to-end features across modern JavaScript ecosystems (React.js, Node.js, Express.js). Skilled at optimising database queries, structuring clean and maintainable code architecture, and translating client requirements into scalable, production-ready applications. Committed to application stability and quality through automated end-to-end testing with Cypress, ensuring reliable releases across freelance and contract engagements.',
}

const skills = [
  [
    'Frontend & Frameworks',
    'React.js, TanStack Start, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5/CSS3',
  ],
  ['Testing & Quality Assurance', 'Cypress (end-to-end testing)'],
  [
    'Backend & Architecture',
    'Node.js, Express.js, RESTful APIs, JWT authentication, Clean architecture',
  ],
  [
    'Databases & Tools',
    'MySQL, MongoDB, Git & GitHub, Postman, Linux / VPS deployment',
  ],
]

const experience = [
  {
    company: 'iso voyage',
    location: 'Algiers, Algeria',
    span: 'Apr 2025 — Present',
    positions: [
      {
        title: 'Full Stack Engineer (Contract / Hybrid)',
        period: 'Jun 2026 — Present',
        bullets: [
          'Architected and developed a full-stack agency web portal and core admin dashboard using React.js and Node.js/Express.js to streamline business operations.',
          'Built a dedicated support dashboard and backend infrastructure to handle customer support workflows, ticketing and administrative actions.',
          'Managed deployment workflows and server environments on Linux-based VPS infrastructure.',
        ],
      },
      {
        title: 'Full Stack Engineer (Freelance / Remote)',
        period: 'Jan 2026 — Jun 2026',
        bullets: [
          'Expanded scope to full-stack ownership, engineering scalable backend API endpoints and integrating them with React frontends.',
          'Authored automated end-to-end test suites with Cypress to validate critical user flows and enhance application stability.',
        ],
      },
      {
        title: 'Frontend Developer (Part-time / Remote)',
        period: 'Apr 2025 — Jan 2026',
        bullets: [
          'Engineered responsive, high-performance user interfaces using React.js and Tailwind CSS.',
          'Collaborated with the core team to translate design requirements into modular, reusable UI components.',
        ],
      },
    ],
  },
  {
    company: 'MARS POS',
    location: 'Saudi Arabia (Remote)',
    span: 'Sep 2024 — Dec 2025',
    positions: [
      {
        title: 'Full-Stack Developer (Freelance)',
        period: 'Oct 2025 — Dec 2025',
        bullets: [
          'Designed and implemented Express.js/Node.js backend features for core point-of-sale workflows and transaction handling.',
          'Optimised API response times and database queries, reducing latency under real-time POS transaction loads.',
        ],
      },
      {
        title: 'Frontend Web Developer (Freelance)',
        period: 'Sep 2024 — Jan 2025',
        bullets: [
          'Built custom, interactive menu filter grids and dynamic POS interface elements to streamline order entry efficiency.',
        ],
      },
    ],
  },
]

const projects = [
  {
    name: 'Agency Web Portal & Admin Dashboard',
    detail:
      'Full-stack portal, admin dashboard and support console built with React.js, Node.js/Express.js and Tailwind CSS, with JWT-based role-aware authorisation and Linux VPS deployment.',
  },
  {
    name: 'MARS POS — Point-of-Sale Platform',
    detail:
      'Interactive menu filter grids and dynamic POS interface elements, plus Express.js backend features for transaction handling tuned for real-time load.',
  },
  {
    name: 'E-Commerce Client Platform',
    detail:
      'Full-featured, responsive platform built with React.js, Node.js, Express.js and Tailwind CSS, featuring dynamic product catalogs and real-time cart management.',
  },
  {
    name: 'Restaurant Web Ordering Application (Maylou)',
    detail:
      'Localised ordering platform built with React.js, Express.js and Tailwind CSS, featuring interactive menu navigation, custom item filtering and a live staff dashboard.',
  },
  {
    name: 'Municipal Projects & Contracting Platform',
    detail:
      'Server-rendered full-stack application enabling municipal authorities to publish tenders, manage contractor bidding workflows and enforce role-based authorisation.',
  },
]

const education = [
  {
    credential: 'Software Engineering & Continuous Learning',
    institution: 'Self-directed',
    period: 'Ongoing',
    detail:
      'Practice-led: every framework and tool listed here was learned by shipping production work with it.',
  },
  {
    credential: 'Economics Studies',
    institution: 'University',
    period: '2021 — 2023',
    detail: 'Studied economics before moving fully into software engineering.',
  },
]

const languages = 'Arabic (native) · French (fluent) · English (professional)'
/* ------------------------------ pdf writer ------------------------------- */

const PAGE = { w: 595.28, h: 841.89 }
const MARGIN = 56
const CONTENT_W = PAGE.w - MARGIN * 2

const INK = [0.09, 0.09, 0.1]
const MUTED = [0.42, 0.42, 0.45]
const ACCENT = [0.78, 0.54, 0.16]
const RULE = [0.85, 0.85, 0.86]

/**
 * Base-14 fonts use WinAnsiEncoding, so typographic characters have to be
 * mapped to their single-byte codes; anything without one degrades to ASCII.
 */
const WIN_ANSI = {
  '–': '\x96',
  '—': '\x97',
  '‘': '\x91',
  '’': '\x92',
  '“': '\x93',
  '”': '\x94',
  '…': '\x85',
  '·': '\xb7',
  '•': '\x95',
  '©': '\xa9',
  '→': '->',
  'é': '\xe9',
  'è': '\xe8',
  'à': '\xe0',
  'ç': '\xe7',
}

function toWinAnsi(value) {
  let out = ''
  for (const char of value) {
    const code = char.codePointAt(0)
    if (code < 128) out += char
    else if (WIN_ANSI[char]) out += WIN_ANSI[char]
    else if (code < 256) out += char
    else out += '-'
  }
  return out
}

const escape = (value) => toWinAnsi(value).replace(/([\\()])/g, '\\$1')

/** Rough Helvetica advance widths — accurate enough for line breaking. */
function measure(text, size, bold) {
  let units = 0
  for (const char of text) {
    if ('ijltfIr.,;:\'!|[]() '.includes(char)) units += 0.3
    else if ('mwMW@'.includes(char)) units += 0.87
    else if (char === char.toUpperCase() && char !== char.toLowerCase())
      units += 0.7
    else units += 0.53
  }
  return units * size * (bold ? 1.05 : 1)
}

function wrap(text, size, maxWidth, bold = false) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (measure(candidate, size, bold) > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

class Page {
  constructor() {
    this.ops = []
    this.y = PAGE.h - MARGIN
  }

  text(value, { x = MARGIN, size = 9.5, bold = false, color = INK, y } = {}) {
    const top = y ?? this.y
    const font = bold ? '/F2' : '/F1'
    const [r, g, b] = color
    this.ops.push(
      `BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x.toFixed(2)} ${top.toFixed(2)} Tm (${escape(value)}) Tj ET`,
    )
    return this
  }

  right(value, { size = 9, bold = false, color = MUTED, y } = {}) {
    const width = measure(value, size, bold)
    return this.text(value, {
      x: PAGE.w - MARGIN - width,
      size,
      bold,
      color,
      y,
    })
  }

  paragraph(value, { size = 9.5, leading = 13.5, color = MUTED, x = MARGIN, width = CONTENT_W, bold = false } = {}) {
    for (const line of wrap(value, size, width, bold)) {
      this.text(line, { x, size, bold, color })
      this.y -= leading
    }
    return this
  }

  bullet(value, { size = 9, leading = 12.5, x = MARGIN } = {}) {
    const indent = x + 12
    const lines = wrap(value, size, CONTENT_W - 12, false)
    this.ops.push(
      `${ACCENT[0]} ${ACCENT[1]} ${ACCENT[2]} rg ${(x + 3).toFixed(2)} ${(this.y + 2.6).toFixed(2)} m ${(x + 6).toFixed(2)} ${(this.y + 2.6).toFixed(2)} l ${(x + 6).toFixed(2)} ${(this.y + 5.6).toFixed(2)} l ${(x + 3).toFixed(2)} ${(this.y + 5.6).toFixed(2)} l f`,
    )
    lines.forEach((line) => {
      this.text(line, { x: indent, size, color: MUTED })
      this.y -= leading
    })
    return this
  }

  rule({ color = RULE, width = CONTENT_W, x = MARGIN, thickness = 0.6 } = {}) {
    const [r, g, b] = color
    this.ops.push(
      `${r} ${g} ${b} RG ${thickness} w ${x.toFixed(2)} ${this.y.toFixed(2)} m ${(x + width).toFixed(2)} ${this.y.toFixed(2)} l S`,
    )
    return this
  }

  heading(label) {
    this.y -= 10
    this.text(label.toUpperCase(), { size: 8, bold: true, color: ACCENT })
    this.y -= 6
    this.rule()
    this.y -= 14
    return this
  }

  gap(amount) {
    this.y -= amount
    return this
  }

  stream() {
    return this.ops.join('\n')
  }
}

/* -------------------------------- page 1 --------------------------------- */

const page1 = new Page()
page1.y = PAGE.h - MARGIN - 10

page1.text(profile.name, { size: 23, bold: true, color: INK })
page1.right(profile.email, { size: 9, y: page1.y + 11 })
page1.right(`${profile.location} · ${profile.phone}`, {
  size: 9,
  y: page1.y - 3,
})
page1.gap(18)
page1.text(profile.role, { size: 9.5, color: ACCENT })
page1.gap(13)
page1.text(profile.links.join('  ·  '), {
  size: 8.5,
  color: [0.55, 0.55, 0.58],
})
page1.gap(15)
page1.rule({ color: [0.2, 0.2, 0.22], thickness: 0.9 })
page1.gap(22)

page1.text('PROFESSIONAL SUMMARY', { size: 8, bold: true, color: ACCENT })
page1.gap(15)
page1.paragraph(profile.summary, { size: 9.5, leading: 13.5 })

page1.heading('Work experience')

experience.forEach((company, index) => {
  page1.text(company.company, { size: 11.5, bold: true, color: INK })
  page1.right(company.span, { size: 8.5, y: page1.y })
  page1.gap(13)
  page1.text(company.location, { size: 8.5, color: [0.55, 0.55, 0.58] })
  page1.gap(17)

  company.positions.forEach((position) => {
    page1.text(position.title, { size: 9.5, bold: true, color: ACCENT })
    page1.right(position.period, { size: 8.5, y: page1.y })
    page1.gap(14)
    position.bullets.forEach((bullet) => page1.bullet(bullet))
    page1.gap(9)
  })

  page1.gap(index === experience.length - 1 ? 0 : 10)
})

/* -------------------------------- page 2 --------------------------------- */

const page2 = new Page()
page2.y = PAGE.h - MARGIN - 10

page2.text(profile.name, { size: 11, bold: true, color: INK })
page2.right('Page 2 of 2', { size: 8.5 })
page2.gap(10)
page2.rule({ color: [0.2, 0.2, 0.22], thickness: 0.9 })
page2.gap(16)

page2.heading('Technical skills')
skills.forEach(([label, value]) => {
  page2.text(`${label}:`, { size: 9, bold: true, color: INK })
  page2.gap(12)
  page2.paragraph(value, { size: 9, leading: 12.5 })
  page2.gap(7)
})

page2.heading('Featured projects')
projects.forEach((project) => {
  page2.text(project.name, { size: 10, bold: true, color: INK })
  page2.gap(13)
  page2.paragraph(project.detail, { size: 9, leading: 12.5 })
  page2.gap(10)
})

page2.heading('Education')
education.forEach((entry) => {
  page2.text(entry.credential, { size: 10.5, bold: true, color: INK })
  page2.right(entry.period, { size: 8.5, y: page2.y })
  page2.gap(13)
  page2.text(entry.institution, { size: 9.5, color: ACCENT })
  page2.gap(13)
  page2.paragraph(entry.detail, { size: 9, leading: 12.5 })
  page2.gap(10)
})

page2.heading('Languages')
page2.paragraph(languages, { size: 9, leading: 12.5 })

page2.gap(16)
page2.paragraph(
  `Contact: ${profile.email} · ${profile.phone} · ${profile.links.join(' · ')}`,
  { size: 8.5, color: [0.55, 0.55, 0.58] },
)

/* ------------------------------- assemble -------------------------------- */

function buildPdf(pages) {
  const objects = []
  const push = (body) => {
    objects.push(body)
    return objects.length // 1-indexed object number
  }

  const catalogId = push(null) // reserved: 1
  const pagesId = push(null) // reserved: 2
  const fontRegular = push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')
  const fontBold = push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')

  const pageIds = []
  for (const page of pages) {
    const stream = page.stream()
    const contentId = push(
      `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
    )
    const pageId = push(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE.w.toFixed(2)} ${PAGE.h.toFixed(2)}] ` +
        `/Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${contentId} 0 R >>`,
    )
    pageIds.push(pageId)
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
  objects[pagesId - 1] =
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`

  let pdf = '%PDF-1.4\n%âãÏÓ\n'
  const offsets = []

  objects.forEach((body, index) => {
    offsets[index] = Buffer.byteLength(pdf, 'latin1')
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefOffset = Buffer.byteLength(pdf, 'latin1')
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf +=
    `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R ` +
    `/Info << /Title (Hadbi Mohamed - Full Stack Engineer) /Author (Hadbi Mohamed) /Creator (portfolio/scripts/generate-resume.mjs) >> >>\n` +
    `startxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, 'latin1')
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, buildPdf([page1, page2]))
console.log(`Wrote ${OUT}`)
