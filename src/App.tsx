import { useEffect, useRef, useState } from 'react'

const GITHUB_URL = 'https://github.com/Pluhs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohammed-alassad/'

type ArrowProps = {
  direction?: 'right' | 'down'
}

function Arrow({ direction = 'right' }: ArrowProps) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function ExternalArrow() {
  return (
    <svg className="external-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6 14 14 6M8 6h6v6" />
    </svg>
  )
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Mohammed Alassaad, back to top">
      <span>MA</span>
      <span className="wordmark__dot" />
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={open ? 'site-header is-menu-open' : 'site-header'}>
      <Wordmark />
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>
      <nav id="site-nav" className={open ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        <a href="#work" onClick={() => setOpen(false)}>Work</a>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </header>
  )
}

function HeroSystem() {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visual = visualRef.current
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        visual.style.setProperty('--shift-x', `${x * 18}px`)
        visual.style.setProperty('--shift-y', `${y * 18}px`)
      })
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div className="hero-system" ref={visualRef} aria-hidden="true">
      <svg className="hero-system__svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path id="route-a" className="system-route system-route--solid" d="M-80 640 C240 460 300 120 650 220 S1100 720 1690 350" />
        <path id="route-b" className="system-route system-route--dash" d="M-80 190 C350 320 470 750 890 580 S1260 110 1690 210" />
        <path id="route-c" className="system-route system-route--thin" d="M180 980 C400 560 830 810 1050 480 S1260 80 1450 -60" />

        <g className="system-node system-node--one">
          <circle cx="316" cy="321" r="76" />
          <circle cx="316" cy="321" r="15" />
        </g>
        <g className="system-node system-node--two">
          <circle cx="900" cy="580" r="110" />
          <circle cx="900" cy="580" r="18" />
        </g>
        <g className="system-node system-node--three">
          <circle cx="1288" cy="282" r="58" />
          <circle cx="1288" cy="282" r="12" />
        </g>

        <circle className="packet packet--lime" r="11" filter="url(#soft-glow)">
          <animateMotion dur="7.4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-a" />
          </animateMotion>
        </circle>
        <circle className="packet packet--orange" r="9" filter="url(#soft-glow)">
          <animateMotion dur="9.2s" begin="-3s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-b" />
          </animateMotion>
        </circle>
        <circle className="packet packet--ink" r="7">
          <animateMotion dur="11s" begin="-6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-c" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="hero">
      <HeroSystem />
      <div className="hero__content">
        <p className="hero__name" aria-label="Mohammed Alassaad">
          <span>MOHAMMED</span>
          <span>ALASSAD</span>
        </p>
        <div className="hero__statement">
          <h1>I build software that stays useful after the happy path ends.</h1>
          <p>
            Full-stack and backend engineer in Montréal, currently looking for a full-time role
            across distributed systems, product infrastructure, and applied AI.
          </p>
          <div className="hero__actions">
            <a className="action-link action-link--primary" href="#work">
              Explore the systems <Arrow direction="down" />
            </a>
            <a className="action-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub <ExternalArrow />
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">Scroll to stress-test</div>
    </section>
  )
}

function SectionIntro({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-intro reveal">
      <span>{index}</span>
      <p>{children}</p>
    </div>
  )
}

function QueueVisual({ crashed }: { crashed: boolean }) {
  return (
    <div className={crashed ? 'queue-visual is-crashed' : 'queue-visual'} aria-hidden="true">
      <svg viewBox="0 0 760 420">
        <path id="queue-route" className="queue-line" d="M42 210 H210 C275 210 275 105 340 105 H475 C545 105 545 210 610 210 H720" />
        <path id="retry-route" className="queue-line queue-line--retry" d="M468 112 C565 22 680 52 680 146" />
        <g className="queue-station queue-station--producer">
          <circle cx="78" cy="210" r="48" />
          <text x="78" y="216">API</text>
        </g>
        <g className="queue-station queue-station--store">
          <circle cx="340" cy="105" r="64" />
          <text x="340" y="101">POSTGRES</text>
          <text className="queue-subtext" x="340" y="122">queue + state</text>
        </g>
        <g className="queue-station queue-station--worker">
          <circle cx="650" cy="210" r="58" />
          <text x="650" y="206">WORKER</text>
          <text className="queue-subtext" x="650" y="228">lease 04</text>
        </g>
        <circle className="queue-job" r="12">
          <animateMotion dur="3.4s" repeatCount="indefinite">
            <mpath href="#queue-route" />
          </animateMotion>
        </circle>
        <circle className="queue-job queue-job--second" r="8">
          <animateMotion dur="3.4s" begin="-1.7s" repeatCount="indefinite">
            <mpath href="#queue-route" />
          </animateMotion>
        </circle>
        {crashed && (
          <circle className="retry-job" r="11">
            <animateMotion dur="1.4s" repeatCount="indefinite">
              <mpath href="#retry-route" />
            </animateMotion>
          </circle>
        )}
      </svg>
      <div className="queue-status" aria-hidden="true">
        <span>{crashed ? 'LEASE EXPIRED' : 'LEASE ACTIVE'}</span>
        <span>{crashed ? 'RETRYING SAFELY' : 'HEARTBEAT 12ms'}</span>
      </div>
    </div>
  )
}

function AsyncraProject() {
  const [crashed, setCrashed] = useState(false)
  const [status, setStatus] = useState('Worker healthy. Jobs are completing normally.')
  const timeoutRef = useRef<number | null>(null)

  const crashWorker = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setCrashed(true)
    setStatus('Worker lost. Lease expired; the job was recovered and retried without duplicate completion.')
    timeoutRef.current = window.setTimeout(() => {
      setCrashed(false)
      setStatus('Recovery complete. A healthy worker owns the new lease.')
    }, 4200)
  }

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
  }, [])

  return (
    <article className="project project--asyncra">
      <div className="project__copy reveal">
        <p className="project__kicker">01 / Durable orchestration</p>
        <h3>Asyncra</h3>
        <p className="project__thesis">Queues are easy. Recovery is the product.</p>
        <p className="project__description">
          A Postgres-backed job orchestrator with retries, leases, heartbeats, stale-worker
          recovery, idempotency, placement decisions, and an operator console that tells the truth.
        </p>
        <p className="project__metric">
          <strong>874</strong>
          <span>jobs / sec median locally<br />76,000 jobs · 16 workers</span>
        </p>
        <p className="project__stack">Spring Boot · PostgreSQL · TypeScript · React · SSE</p>
        <div className="project__links">
          <a href="https://asyncra.vercel.app" target="_blank" rel="noreferrer">
            Open the live console <ExternalArrow />
          </a>
          <button type="button" onClick={crashWorker} disabled={crashed}>
            {crashed ? 'Recovering…' : 'Crash a worker'} <Arrow />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">{status}</p>
      </div>
      <QueueVisual crashed={crashed} />
    </article>
  )
}

const atlasStages = [
  { label: 'Workspace', note: 'owns the boundary' },
  { label: 'Dataset', note: 'keeps the lineage' },
  { label: 'Model', note: 'replays the state' },
  { label: 'Predict', note: 'proves portability' },
]

function AtlasVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % atlasStages.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="atlas-visual" aria-label={`AtlasML flow: ${atlasStages[active].label}, ${atlasStages[active].note}`}>
      <div className="atlas-orbit" aria-hidden="true">
        <span className="atlas-orbit__ring atlas-orbit__ring--one" />
        <span className="atlas-orbit__ring atlas-orbit__ring--two" />
        <span className="atlas-orbit__core">A</span>
      </div>
      <ol className="atlas-flow">
        {atlasStages.map((stage, index) => (
          <li key={stage.label} className={active === index ? 'is-active' : ''}>
            <button type="button" onClick={() => setActive(index)}>
              <span>0{index + 1}</span>
              <strong>{stage.label}</strong>
              <small>{stage.note}</small>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

function AtlasProject() {
  return (
    <article className="project project--atlas">
      <AtlasVisual />
      <div className="project__copy reveal">
        <p className="project__kicker">02 / Local-first ML infrastructure</p>
        <h3>AtlasML</h3>
        <p className="project__thesis">Models deserve contracts, not vibes.</p>
        <p className="project__description">
          A desktop AutoML system where Electron and React shape the product, Spring Boot owns
          durable state, PostgreSQL records lineage, and bounded Python workers execute ML.
        </p>
        <p className="project__metric project__metric--atlas">
          <strong>116</strong>
          <span>verified operations<br />across 19 evidence scenarios</span>
        </p>
        <p className="project__stack">Electron · React · Java · PostgreSQL · Python · XGBoost</p>
      </div>
    </article>
  )
}

function PerformanceVisual() {
  return (
    <div className="performance-visual" aria-label="Data processing improved from 10.4 seconds to 4.35 seconds">
      <div className="performance-track">
        <span className="performance-label">Before</span>
        <span className="performance-bar performance-bar--before"><b>10.4s</b></span>
      </div>
      <div className="performance-track">
        <span className="performance-label">After</span>
        <span className="performance-bar performance-bar--after"><b>4.35s</b></span>
      </div>
      <p>955 MB manufacturing dataset</p>
    </div>
  )
}

function AeroProject() {
  return (
    <article className="project project--aero">
      <div className="project__copy reveal">
        <p className="project__kicker">03 / Capstone with Pratt &amp; Whitney Canada</p>
        <h3>AeroML</h3>
        <p className="project__thesis">Make heavy data feel light.</p>
        <p className="project__description">
          As technical co-lead, I helped build an end-to-end no-code ML product for manufacturing:
          ingest, clean, explore, train, explain, and predict from one desktop workflow.
        </p>
        <p className="project__stack">FastAPI · React · Electron · DuckDB · PyArrow · SQLite</p>
      </div>
      <PerformanceVisual />
    </article>
  )
}

function Work() {
  return (
    <section id="work" className="work-section">
      <div className="section-shell">
        <SectionIntro index="01 / Selected systems">
          Three projects, one recurring question: what happens when the clean demo meets the real world?
        </SectionIntro>
      </div>
      <AsyncraProject />
      <AtlasProject />
      <AeroProject />
    </section>
  )
}

const principles = [
  ['State', 'Who owns it?'],
  ['Failure', 'What survives a restart?'],
  ['Retries', 'Can this happen twice safely?'],
  ['Performance', 'Did we measure it?'],
  ['AI', 'Did it earn its place?'],
]

function Principles() {
  return (
    <section className="principles">
      <div className="section-shell">
        <SectionIntro index="02 / How I think">
          I like ambitious software. I like it more when its complexity can explain itself.
        </SectionIntro>
        <div className="principle-list">
          {principles.map(([name, question], index) => (
            <div className="principle-row reveal" key={name}>
              <span>0{index + 1}</span>
              <h2>{name}</h2>
              <p>{question}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const experience = [
  {
    years: '2026 — now',
    role: 'Technical Co-Lead & Software Engineer',
    place: 'Secret Garden TV · side project',
    detail: 'Leading the technical direction and building the product end to end with the team.',
  },
  {
    years: '2025 — 2026',
    role: 'Technical Co-Lead',
    place: 'AeroML · Pratt & Whitney Canada capstone',
    detail: 'Turned an ML workflow into a tested desktop product while coordinating the capstone team.',
  },
  {
    years: '2024',
    role: 'Software Developer Intern',
    place: 'Ericsson',
    detail: 'Built concurrent Python backend tooling, API integrations, Linux workflows, and performance tests.',
  },
  {
    years: '2023',
    role: 'Software Developer Intern',
    place: 'Ericsson',
    detail: 'Worked across Spring Boot, Node.js, REST APIs, MongoDB, Docker, Azure, and CI/CD.',
  },
]

function About() {
  return (
    <section id="about" className="about">
      <div className="section-shell">
        <SectionIntro index="03 / The person in the loop">
          A software engineering graduate who likes owning the whole path from API to database to worker to UI.
        </SectionIntro>
        <div className="about__lead reveal">
          <p>
            I’m Mohammed, a Concordia Software Engineering graduate based in Montréal. Backend systems
            are home base, but I work full-stack because seeing the whole product makes the engineering better.
          </p>
          <p>
            My favourite problems live where correctness, performance, and usability overlap—especially
            when jobs retry, processes restart, datasets get large, or AI needs a real product boundary.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-row reveal" key={`${item.place}-${item.years}`}>
              <time>{item.years}</time>
              <div>
                <h3>{item.role}</h3>
                <p>{item.place}</p>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="elsewhere reveal">
          <p>Also building</p>
          <div className="elsewhere__list">
            <div className="elsewhere__item">
              <span>ConUMaps</span>
              <span>Mini capstone · indoor + outdoor campus navigation</span>
            </div>
            <div className="elsewhere__item">
              <span>YTtoMedia</span>
              <span>Electron desktop tool · YouTube audio + video downloads</span>
            </div>
            <div className="elsewhere__item">
              <span>MapleLaunch</span>
              <span>AI-powered job search system · set aside for now</span>
            </div>
            <div className="elsewhere__item">
              <span>SGTV App</span>
              <span>In progress · leading product, architecture + delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="contact__orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="contact__content">
        <p>Have a hard system or a useful product to build?</p>
        <h2>Let’s make it work<br />in the messy world.</h2>
        <div className="contact__links">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            Start a conversation <ExternalArrow />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            Inspect the code <ExternalArrow />
          </a>
        </div>
      </div>
      <div className="contact__footer">
        <span>Mohammed Alassaad</span>
        <span>Montréal, Canada</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <Work />
        <Principles />
        <About />
      </main>
      <Contact />
    </>
  )
}
