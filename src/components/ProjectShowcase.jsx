import { useState } from 'react';

const PROJECTS = [
  {
    id: 'invigor8',
    tag: 'telemedicine · live site',
    title: 'Invigor8',
    org: 'Freelance · Remote',
    url: 'https://invigor8medical.com/',
    metric: { value: '0 → 1', label: 'shipped solo, idea to production' },
    desc: 'Built and launched a telemedicine site from a blank canvas: full visual design, page layout, and a patient-facing flow designed so first-time visitors can book care without confusion. Wired the domain, DNS, and CRM myself so the handoff to the client was a working business, not just a website.',
    highlights: [
      'Designed the complete site layout and patient journey from scratch',
      'Built and automated medical intake forms to capture patient data securely',
      'Owned domain setup, CRM integration, and pre-launch QA end to end',
    ],
    stack: [
      'GoHighLevel',
      'CRM Integration',
      'Form Automation',
      'DNS / Domain Setup',
    ],
  },
  {
    id: 'peptide',
    tag: 'telemedicine · live site',
    title: 'Peptide Doc Medical',
    org: 'Freelance · Remote',
    url: 'https://peptidedocmedical.com/',
    metric: { value: '2nd', label: 'telemedicine launch, same playbook' },
    desc: 'A second telemedicine build for a different patient base, reusing and refining the intake-automation system from Invigor8. Focus this time was tightening the onboarding form logic so patient data routes correctly into the CRM with no manual re-entry.',
    highlights: [
      'Adapted the intake-automation system to a new patient workflow',
      'Integrated CRM so incoming patient data needs zero manual handling',
      'Ran full testing pass before go-live, then handled the launch itself',
    ],
    stack: ['GoHighLevel', 'CRM Integration', 'Form Automation'],
  },
  {
    id: 'collab',
    tag: 'internal platform',
    title: 'Collaborative Tool',
    org: 'Wideout Workforce Inc. · Makati',
    metric: { value: '80%', label: 'less manual work after automation' },
    desc: "An internal collaboration platform built end-to-end for the team to track work and make decisions off real data instead of guesswork. Behind the UI sits a Dockerized deployment pipeline and a set of Python scripts that took over the repetitive parts of the team's day.",
    highlights: [
      'Led development of the platform from architecture to deployment',
      'Built data visualizations the team uses for strategic decisions',
      'Set up Dockerized CI/CD pipelines for repeatable, low-drama releases',
      'Automated manual workflows with Python + Zapier, cutting busywork 80%',
    ],
    stack: ['Next.js', 'Django', 'MySQL', 'Docker', 'GitHub Actions', 'Zapier'],
    note: true,
    isPrivate: true,
  },
  {
    id: 'ticketing',
    tag: 'internal platform · module',
    title: 'Ticketing & Workflow Routing',
    org: 'Wideout Workforce Inc. · Makati',
    metric: { value: 'auto', label: 'routed, no manual triage' },
    desc: 'A ticketing module built alongside the collaboration platform to route requests and QA issues to the right person automatically, instead of relying on someone manually triaging a shared inbox. Status changes sync out through Zapier, so the people waiting on a fix find out the moment it moves.',
    highlights: [
      'Built request/issue routing logic so tickets reach the right owner automatically',
      'Connected status updates to Zapier so stakeholders get notified without a manual check-in',
      'Backed by the same MySQL + Django stack as the wider internal platform',
    ],
    stack: ['Django', 'Python', 'MySQL', 'Zapier'],
    note: true,
    isPrivate: true,
  },
];

export default function ProjectShowcase() {
  const [active, setActive] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === active);

  return (
    <div className='showcase-shell'>
      <div className='showcase-tabs'>
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className={'showcase-tab' + (p.id === active ? ' active' : '')}
            onClick={() => setActive(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className='showcase-body'>
        <div className='showcase-top'>
          <div>
            <div className='showcase-kind'>{project.tag}</div>
            <div className='showcase-title'>{project.title}</div>
            <div className='showcase-org'>{project.org}</div>
          </div>
          <div className='showcase-metric'>
            <div className='showcase-metric-value'>{project.metric.value}</div>
            <div className='showcase-metric-label'>{project.metric.label}</div>
          </div>
        </div>

        <p className='showcase-desc'>{project.desc}</p>

        <ul className='showcase-highlights'>
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <div className='showcase-chips'>
          {project.stack.map((s) => (
            <span
              key={s}
              className='chip'
            >
              {s}
            </span>
          ))}
        </div>

        {/* {project.note && (
          <div className="showcase-flag">
            ⚠ placeholder copy — replace with the real scope/metrics for this module
          </div>
        )} */}

        {project.url && (
          <a
            className='showcase-link-btn'
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit live site ↗
          </a>
        )}

        {project.isPrivate && (
          <div className='showcase-private'>
            🔒 Private internal tool — not publicly accessible
          </div>
        )}
      </div>
    </div>
  );
}
