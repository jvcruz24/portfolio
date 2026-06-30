import { useEffect, useRef, useState } from 'react';
import ProjectShowcase from './components/ProjectShowcase.jsx';

const STAGES = [
  { id: 'hero', label: 'hero' },
  { id: 'summary', label: 'summary' },
  { id: 'experience', label: 'experience' },
  { id: 'showcase', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'certs', label: 'certs' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState({ hero: true });
  const scrollRef = useRef(null);
  const stageRefs = useRef({});
  const animating = useRef(false);

  const goTo = (index) => {
    index = Math.max(0, Math.min(STAGES.length - 1, index));
    if (index === current) return;
    setCurrent(index);
    animating.current = true;
    stageRefs.current[STAGES[index].id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setTimeout(() => {
      animating.current = false;
    }, 700);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      if (animating.current || Math.abs(e.deltaY) < 4) return;
      goTo(current + (e.deltaY > 0 ? 1 : -1));
    };

    let touchStartY = null;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => e.preventDefault();
    const onTouchEnd = (e) => {
      if (touchStartY === null || animating.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 30) goTo(current + (diff > 0 ? 1 : -1));
      touchStartY = null;
    };

    const onKeyDown = (e) => {
      if (animating.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        goTo(current + 1);
      }
      if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        goTo(current - 1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [current]);

  useEffect(() => {
    const root = scrollRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const id = entry.target.id;
            setInView((prev) => ({ ...prev, [id]: true }));
            const idx = STAGES.findIndex((s) => s.id === id);
            if (idx > -1) setCurrent(idx);
          }
        });
      },
      { root, threshold: [0.6] },
    );
    Object.values(stageRefs.current).forEach(
      (node) => node && observer.observe(node),
    );
    return () => observer.disconnect();
  }, []);

  const setStageRef = (id) => (node) => {
    stageRefs.current[id] = node;
  };
  const cls = (id, base) => base + (inView[id] ? ' in-view' : '');

  return (
    <>
      <div className='topbar'>
        <div className='wrap'>
          <div className='brand'>
            <span className='dot' />
            jon<span style={{ color: 'var(--muted)' }}>.dev</span>
          </div>
          <nav className='nav'>
            {STAGES.slice(1).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(STAGES.findIndex((x) => x.id === s.id));
                }}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className='progress-rail'>
        {STAGES.map((s, i) => (
          <div
            key={s.id}
            className={'pdot' + (current === i ? ' active' : '')}
            data-label={s.label}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div
        id='scrollarea'
        ref={scrollRef}
      >
        <section
          className='stage-screen hero'
          id='hero'
          ref={setStageRef('hero')}
        >
          <div className='wrap'>
            <div className={cls('hero', 'eyebrow reveal reveal-1')}>
              <span className='mono'>●</span> available for freelance &amp;
              full-time roles
            </div>
            <h1 className={cls('hero', 'reveal reveal-2')}>
              I automate the boring parts.
            </h1>
            <p className={cls('hero', 'lede reveal reveal-3')}>
              Full Stack Automation Engineer — Next.js, Django, Python, Zapier,
              and the CI/CD pipelines that hold it together.
            </p>
            <div className={cls('hero', 'hero-actions reveal reveal-4')}>
              <a
                className='btn btn-primary'
                href='mailto:its.cruzjon@gmail.com'
              >
                ✉ Email me
              </a>
              <a
                className='btn btn-ghost'
                href='#experience'
                onClick={(e) => {
                  e.preventDefault();
                  goTo(2);
                }}
              >
                View work history ↓
              </a>
            </div>
            <div className={cls('hero', 'contact-row mono reveal reveal-4')}>
              <span>📍 Tanza, Cavite, PH</span>
              <span>📞 +63 975 095 8373</span>
              <span>🔗 LinkedIn</span>
              <span>🔗 GitHub</span>
            </div>
          </div>
          <div className='scroll-cue'>
            <span className='chevron'>↓</span> scroll to begin the pipeline
          </div>
        </section>

        <section
          className='stage-screen'
          id='summary'
          ref={setStageRef('summary')}
        >
          <div className='wrap'>
            <div className={cls('summary', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 01</span>
              <h2>Summary</h2>
              <span className='status'>✓ PASSED</span>
            </div>
            <p className={cls('summary', 'summary-text reveal reveal-2')}>
              With <strong>4 years of experience</strong>, I build dynamic ad
              creatives and software applications using Next.js, Django, and
              MySQL — then automate the repetitive parts around them with Python
              and Zapier, backed by CI/CD workflows and Docker. Less manual
              work, more shipped product.
            </p>
          </div>
        </section>

        <section
          className='stage-screen'
          id='experience'
          ref={setStageRef('experience')}
        >
          <div className='wrap'>
            <div className={cls('experience', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 02</span>
              <h2>Experience</h2>
              <span className='status'>✓ PASSED</span>
            </div>

            <div className={cls('experience', 'job reveal reveal-2')}>
              <div className='job-top'>
                <span className='job-title'>Web Developer (Freelance)</span>
                <span className='job-date'>APR 2026 — JUN 2026</span>
              </div>
              <div className='job-org'>
                Independent Contractor (Remote) · Live sites: Invigor8 · Peptide
                Doc Medical
              </div>
              <ul>
                <li>
                  Led end-to-end development of a telemedicine website from
                  scratch to production using GoHighLevel (GHL).
                </li>
                <li>
                  Built and automated medical intake forms inside GHL to
                  streamline onboarding and securely capture patient data.
                </li>
                <li>
                  Handled the full launch: domain setup, CRM integration, and
                  final testing before go-live.
                </li>
              </ul>
            </div>

            <div className={cls('experience', 'job reveal reveal-3')}>
              <div className='job-top'>
                <span className='job-title'>
                  Full Stack Automation Engineer
                </span>
                <span className='job-date'>JAN 2024 — NOV 2025</span>
              </div>
              <div className='job-org'>Wideout Workforce Inc. · Makati</div>
              <ul>
                <li>
                  Led end-to-end development of an internal collaboration
                  platform with data visualizations for strategic decisions.
                </li>
                <li>
                  Established deployment workflows with Dockerization and CI/CD
                  pipelines.
                </li>
                <li>
                  Boosted operational efficiency by{' '}
                  <strong style={{ color: 'var(--teal)' }}>80%</strong>{' '}
                  automating manual tasks with Python scripts and Zapier.
                </li>
              </ul>
            </div>

            <div className={cls('experience', 'job reveal reveal-4')}>
              <div className='job-top'>
                <span className='job-title'>Creative Developer</span>
                <span className='job-date'>JUN 2021 — JAN 2024</span>
              </div>
              <div className='job-org'>Wideout Workforce Inc. · Makati</div>
              <ul>
                <li>
                  Created new ad creatives based on client briefs; QA'd every
                  unit across browsers and devices.
                </li>
                <li>
                  Exceeded productivity targets by{' '}
                  <strong style={{ color: 'var(--teal)' }}>150%</strong> within
                  the first six months.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className='stage-screen'
          id='showcase'
          ref={setStageRef('showcase')}
        >
          <div className='wrap'>
            <div className={cls('showcase', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 03</span>
              <h2>Project Showcase</h2>
              <span className='status'>✓ PASSED</span>
            </div>
            <div className={cls('showcase', 'reveal reveal-2')}>
              <ProjectShowcase />
            </div>
          </div>
        </section>

        <section
          className='stage-screen'
          id='skills'
          ref={setStageRef('skills')}
        >
          <div className='wrap'>
            <div className={cls('skills', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 04</span>
              <h2>Skills</h2>
              <span className='status'>✓ PASSED</span>
            </div>
            <div className='skill-grid'>
              <div className={cls('skills', 'skill-cat reveal reveal-2')}>
                <h3>Languages</h3>
                <div className='chips'>
                  <span className='chip'>JavaScript</span>
                  <span className='chip'>Python</span>
                </div>
              </div>
              <div className={cls('skills', 'skill-cat reveal reveal-2')}>
                <h3>Frameworks</h3>
                <div className='chips'>
                  <span className='chip'>Next.js</span>
                  <span className='chip'>Django</span>
                </div>
              </div>
              <div className={cls('skills', 'skill-cat reveal reveal-3')}>
                <h3>Databases</h3>
                <div className='chips'>
                  <span className='chip'>MySQL</span>
                  <span className='chip'>MongoDB</span>
                </div>
              </div>
              <div className={cls('skills', 'skill-cat reveal reveal-3')}>
                <h3>Tooling &amp; Infra</h3>
                <div className='chips'>
                  <span className='chip'>API Integration</span>
                  <span className='chip'>Jenkins</span>
                  <span className='chip'>GitHub Actions</span>
                  <span className='chip'>Docker</span>
                  <span className='chip'>Docker Compose</span>
                  <span className='chip'>Zapier</span>
                  <span className='chip'>Looker Studio</span>
                  <span className='chip'>Git/GitHub</span>
                  <span className='chip'>Linux Server</span>
                  <span className='chip'>VPS / Linode</span>
                  <span className='chip'>Go High Level</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className='stage-screen'
          id='certs'
          ref={setStageRef('certs')}
        >
          <div className='wrap'>
            <div className={cls('certs', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 05</span>
              <h2>Certificates</h2>
              <span className='status'>✓ PASSED</span>
            </div>
            <div className={cls('certs', 'flat-card reveal reveal-2')}>
              <div>
                <div className='flat-title'>
                  AWS Certified Cloud Practitioner
                </div>
              </div>
              <div className='flat-date'>MAR 2026</div>
            </div>
          </div>
        </section>

        <section
          className='stage-screen'
          id='education'
          ref={setStageRef('education')}
        >
          <div className='wrap'>
            <div className={cls('education', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 06</span>
              <h2>Education</h2>
              <span className='status'>✓ PASSED</span>
            </div>
            <div className={cls('education', 'flat-card reveal reveal-2')}>
              <div>
                <div className='flat-title'>
                  Bachelor of Science in Information Technology
                </div>
                <div className='flat-sub'>
                  Cavite State University, Main Campus
                </div>
              </div>
              <div className='flat-date'>JUN 2015 — JAN 2020</div>
            </div>
          </div>
        </section>

        <section
          className='stage-screen'
          id='contact'
          style={{ paddingBottom: 30 }}
          ref={setStageRef('contact')}
        >
          <div className='wrap'>
            <div className={cls('contact', 'stage-head reveal reveal-1')}>
              <span className='stage-id mono'>STAGE 07</span>
              <h2>Deploy</h2>
              <span className='status'>✓ READY</span>
            </div>
            <div className={cls('contact', 'contact-card reveal reveal-2')}>
              <h2>Let's ship something.</h2>
              <p>
                Open to freelance projects and full-time roles in full-stack
                development, automation, and frontend engineering.
              </p>
              <div className='contact-links'>
                <a
                  className='btn btn-primary'
                  href='mailto:its.cruzjon@gmail.com'
                >
                  ✉ its.cruzjon@gmail.com
                </a>
                <a
                  className='btn btn-ghost'
                  href='tel:+639750958373'
                >
                  📞 +63 975 095 8373
                </a>
              </div>
            </div>
            <footer>
              build #004 · Vite + React · Tanza, Cavite, Philippines
            </footer>
          </div>
        </section>
      </div>
    </>
  );
}
