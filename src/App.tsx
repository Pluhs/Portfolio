import { useEffect, useRef, useState } from 'react'

const GITHUB_URL = 'https://github.com/Pluhs'
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohammed-alassad/'
const EMAIL_URL = 'mailto:mohammed.alassad2001@gmail.com'
const ASSET_ROOT = import.meta.env.BASE_URL

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
    <a className="wordmark" href="#top" aria-label="Mohammed Al Assad, back to top">
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
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>LinkedIn</a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>GitHub</a>
        <a className="site-nav__cta" href={EMAIL_URL} onClick={() => setOpen(false)}>Let’s talk</a>
      </nav>
    </header>
  )
}

const journeyStops = [
  { id: 'top', label: 'Hello' },
  { id: 'aeroml', label: 'AeroML' },
  { id: 'atlasml', label: 'AtlasML' },
  { id: 'sgtv', label: 'SGTV' },
  { id: 'asyncra', label: 'Asyncra' },
  { id: 'more-projects', label: 'More work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function JourneyRail() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const sections = journeyStops
      .map((stop) => document.getElementById(stop.id))
      .filter((section): section is HTMLElement => Boolean(section))

    let frame = 0
    let navigationLockUntil = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (performance.now() < navigationLockUntil) return
        const marker = window.scrollY + window.innerHeight * 0.32
        let current = sections[0]?.id ?? 'top'

        sections.forEach((section) => {
          if (section.offsetTop <= marker) current = section.id
        })

        const reachedBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
        setActive(reachedBottom ? 'contact' : current)
      })
    }

    const followHash = () => {
      const target = window.location.hash.slice(1)
      if (!journeyStops.some((stop) => stop.id === target)) return
      navigationLockUntil = performance.now() + 1400
      setActive(target)
      window.setTimeout(update, 1450)
    }

    if (window.location.hash) followHash()
    else update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', followHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', followHash)
    }
  }, [])

  const activeIndex = Math.max(0, journeyStops.findIndex((stop) => stop.id === active))

  return (
    <nav className="journey-rail" aria-label="Page navigation">
      <div className="journey-rail__track" aria-hidden="true">
        <span style={{ height: `${(activeIndex / (journeyStops.length - 1)) * 100}%` }} />
      </div>
      <ol>
        {journeyStops.map((stop, index) => (
          <li key={stop.id} className={active === stop.id ? 'is-active' : ''}>
            <a
              href={`#${stop.id}`}
              aria-current={active === stop.id ? 'location' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stop.label}</strong>
            </a>
          </li>
        ))}
      </ol>
    </nav>
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
        <div className="hero__identity">
          <p className="hero__eyebrow">Backend + full-stack engineer · Montréal</p>
          <p className="hero__name" aria-label="Mohammed Al Assad">
            <span>Mohammed</span>
            <span>Al Assad</span>
          </p>
          <figure className="hero__portrait">
            <img src={`${ASSET_ROOT}mohammed-graduation.jpg`} alt="Mohammed Al Assad in his Concordia graduation gown" />
            <figcaption>Concordia Software Engineering · 2026</figcaption>
          </figure>
        </div>
        <div className="hero__statement">
          <p className="hero__status"><span /> Available for full-time roles</p>
          <h1>I like building the parts that make software reliable.</h1>
          <p className="hero__intro">
            I’m a Concordia Software Engineering graduate in Montréal. I’m most at home in backend
            systems, but I work across the product when that is what it takes to ship something good.
          </p>
          <div className="hero__actions">
            <a className="action-link action-link--primary" href={EMAIL_URL}>
              Let’s talk <ExternalArrow />
            </a>
            <a className="action-link" href="#aeroml">
              View selected work <Arrow direction="down" />
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">Explore selected work</div>
    </section>
  )
}

function TechStack({
  items,
  label = 'Built with',
  compact = false,
}: {
  items: string[]
  label?: string
  compact?: boolean
}) {
  return (
    <div className={compact ? 'stack-ledger stack-ledger--compact' : 'stack-ledger'}>
      <span className="stack-ledger__label">{label}</span>
      <ul aria-label={`${label}: ${items.join(', ')}`}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
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
    <article id="asyncra" className="project project--asyncra">
      <div className="project__copy reveal">
        <p className="project__kicker">04 / Durable orchestration</p>
        <h3>Asyncra</h3>
        <p className="project__thesis">I built a queue system to learn what happens when workers fail.</p>
        <p className="project__description">
          Asyncra is a Postgres-backed job runner with retries, leases, heartbeats, crash recovery,
          idempotency, and a console where I can see what every worker is doing.
        </p>
        <div className="asyncra-motivation">
          <span>Why I built it</span>
          <p>
            Reading about distributed systems was not enough for me. I wanted to break workers,
            expire leases, retry jobs, and then prove that the system recovered without doing work twice.
          </p>
        </div>
        <p className="project__metric">
          <strong>874</strong>
          <span>jobs / sec median locally<br />76,000 jobs · 16 workers</span>
        </p>
        <TechStack items={['Spring Boot', 'PostgreSQL', 'TypeScript', 'React', 'SSE']} />
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
  { label: 'AutoML', note: 'selects under bounds' },
  { label: 'Recover', note: 'survives a restart' },
  { label: 'Export', note: 'proves portability' },
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
    <article id="atlasml" className="project project--atlas">
      <AtlasVisual />
      <div className="project__copy reveal">
        <div className="atlas-lineage" aria-label="AeroML evolved into AtlasML">
          <span>AeroML</span>
          <Arrow />
          <strong>AtlasML</strong>
        </div>
        <p className="project__kicker">02 / Active · Personal continuation of AeroML</p>
        <h3>AtlasML</h3>
        <p className="project__thesis">After AeroML, I wanted to keep going.</p>
        <p className="project__description">
          AtlasML is my personal continuation of AeroML. I’m rebuilding the idea around durable
          workspaces, recoverable jobs, verified model artifacts, and a desktop app that owns its data.
        </p>
        <p className="project__metric project__metric--atlas">
          <strong>116</strong>
          <span>verified operations<br />across 19 evidence scenarios</span>
        </p>
        <div className="atlas-direction">
          <span>Actively building toward</span>
          <p>
            A smaller, more dependable AutoML tool. I only want to add model or preprocessing
            choices when the test results show that they actually help.
          </p>
        </div>
        <TechStack items={['Electron', 'React', 'Spring Boot', 'PostgreSQL', 'Python', 'XGBoost', 'LightGBM', 'CatBoost']} />
        <div className="project__links">
          <a href="https://github.com/Pluhs/AtlasML" target="_blank" rel="noreferrer">
            Follow the independent build <ExternalArrow />
          </a>
        </div>
      </div>
    </article>
  )
}

function SgtvProject() {
  return (
    <article id="sgtv" className="project project--sgtv">
      <div className="project__copy reveal">
        <p className="project__kicker">03 / Active product leadership · Secret Garden TV</p>
        <h3>SGTV App</h3>
        <p className="project__thesis">I’m helping turn SGTV’s ideas into a real product.</p>
        <p className="project__description">
          I’m working with the team to shape how its videos, characters, and stories fit together.
          We are still figuring out the right experience, so I’m not pretending the technical choices
          are settled before the product is.
        </p>
        <p className="project__metric project__metric--sgtv">
          <strong>0→1</strong>
          <span>product direction<br />architecture + delivery</span>
        </p>
        <div className="sgtv-focus">
          <span>Now building</span>
          <p>
            A cloud-backed streaming app with room for children to explore the SGTV world in more
            interactive ways. The product and architecture are still taking shape.
          </p>
        </div>
        <TechStack
          label="System scope"
          items={['Product direction', 'Cloud architecture', 'Video streaming', 'Full-stack delivery']}
        />
      </div>
      <div className="sgtv-visual reveal" aria-label="Secret Garden TV character and app direction">
        <div className="sgtv-portal">
          <span className="sgtv-seed sgtv-seed--one" aria-hidden="true" />
          <span className="sgtv-seed sgtv-seed--two" aria-hidden="true" />
          <span className="sgtv-seed sgtv-seed--three" aria-hidden="true" />
          <span className="sgtv-seed sgtv-seed--four" aria-hidden="true" />
          <span className="sgtv-seed sgtv-seed--five" aria-hidden="true" />
          <img src={`${ASSET_ROOT}high-res-assets/secret-garden-character-hq.png`} alt="Illustrated Secret Garden TV character" />
        </div>
        <div className="sgtv-visual__caption">
          <span>Active product</span>
          <strong>SGTV App</strong>
          <small>Stream · explore · experience</small>
        </div>
      </div>
    </article>
  )
}

const aeroStages = [
  {
    code: 'Bronze',
    label: 'Bring the data in',
    detail: 'Upload large CSV and Excel files, profile them, and keep track of where each artifact came from.',
    personal: 'I worked on streaming ingestion, progress updates, safer limits, and keeping large uploads from freezing the UI.',
  },
  {
    code: 'Silver',
    label: 'Clean it the same way every time',
    detail: 'Apply a saved cleaning plan while keeping the original data and every transformation traceable.',
    personal: 'I worked on validation, caching, failure handling, and the desktop flow that connected these steps.',
  },
  {
    code: 'Gold',
    label: 'Train and compare models',
    detail: 'Train models, compare their results, explain predictions, and run them again inside the desktop app.',
    personal: 'I built persistent training progress, portable workspace bundles, quality checks, and reliability fixes for the final demo.',
  },
]

function AeroPipeline() {
  const [active, setActive] = useState(0)
  const [running, setRunning] = useState(false)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    timers.current = []
  }

  const selectStage = (index: number) => {
    clearTimers()
    setRunning(false)
    setActive(index)
  }

  const runPipeline = () => {
    clearTimers()
    setRunning(true)
    setActive(0)
    timers.current = [
      window.setTimeout(() => setActive(1), 1000),
      window.setTimeout(() => setActive(2), 2000),
      window.setTimeout(() => setRunning(false), 3000),
    ]
  }

  useEffect(() => clearTimers, [])

  return (
    <div className={running ? 'aero-pipeline is-running' : 'aero-pipeline'}>
      <div className="aero-pipeline__topline">
        <span>Local workflow / {running ? 'processing' : 'ready'}</span>
        <span>{String(active + 1).padStart(2, '0')} / 03</span>
      </div>
      <ol className="aero-pipeline__stages" aria-label="AeroML data pipeline">
        {aeroStages.map((stage, index) => (
          <li key={stage.code} className={active === index ? 'is-active' : active > index ? 'is-complete' : ''}>
            <button type="button" onClick={() => selectStage(index)} aria-pressed={active === index}>
              <span>0{index + 1}</span>
              <strong>{stage.code}</strong>
            </button>
          </li>
        ))}
      </ol>
      <div className="aero-pipeline__readout" aria-live="polite">
        <p>{aeroStages[active].label}</p>
        <h4>{aeroStages[active].detail}</h4>
        <small>{aeroStages[active].personal}</small>
      </div>
      <button className="aero-pipeline__run" type="button" onClick={runPipeline} disabled={running}>
        <span>{running ? 'Pipeline running' : active === 2 ? 'Run it again' : 'Run the pipeline'}</span>
        <Arrow />
      </button>
    </div>
  )
}

const aeroContributions = [
  {
    name: 'Background jobs & notifications',
    detail: 'Built the cross-page job registry, live training progress that survived navigation and refreshes, notification updates and deep links, and terminal-state reconciliation.',
  },
  {
    name: 'Containers & delivery pipeline',
    detail: 'Implemented the backend and frontend Dockerfiles, Compose environment, dynamic local and Codespaces connectivity, consolidated CI workflows, and automated quality and security gates.',
  },
  {
    name: 'Desktop & offline runtime',
    detail: 'Owned much of the Electron integration seam: backend startup and health checks, portable runtime configuration, installer hardening, offline-safe behavior, and readable failure states.',
  },
  {
    name: 'Data pipeline & ingestion',
    detail: 'Co-implemented and substantially optimized the DuckDB-backed ingestion path, added streaming, progress telemetry and safer limits, and integrated a fast local-file path with a browser fallback.',
  },
  {
    name: 'ML lifecycle & model evolution',
    detail: 'Implemented training and MLflow integration work, then built retrain-plan contracts, model review and evolution services, continue-or-fork lineage, and clearer retraining UX.',
  },
  {
    name: 'Reproducible workspaces',
    detail: 'Built workspace import and export bundles, embedded experiment artifacts, moved large exports into background work, and added portable AI critique notebook downloads.',
  },
  {
    name: 'Quality, security & release',
    detail: 'Integrated SonarCloud and Codecov, raised backend coverage to 90%, hardened secret scanning and runtime boundaries, and closed failures across lineage, inference, caching, and demo UX.',
  },
]

function AeroContributions() {
  return (
    <section className="aero-contributions" aria-labelledby="aero-contributions-title">
      <div className="aero-contributions__intro reveal">
        <p>My contribution</p>
        <h4 id="aero-contributions-title">The parts I worked on directly.</h4>
        <span>
          AeroML was a team effort. This is the work I can explain in detail because I built it,
          reviewed it, or was responsible for getting it over the line.
        </span>
      </div>
      <ol className="aero-contributions__list">
        {aeroContributions.map((contribution, index) => (
          <li className="reveal" key={contribution.name}>
            <span>0{index + 1}</span>
            <h5>{contribution.name}</h5>
            <p>{contribution.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function AeroProject() {
  return (
    <article id="aeroml" className="project project--aero">
      <div className="aero-feature__main">
        <div className="project__copy reveal">
          <div className="aero-wordmark">
            <img src={`${ASSET_ROOT}aeroml-logo.png`} alt="" />
            <span>Flagship project</span>
          </div>
          <p className="project__kicker">01 / Technical co-lead · Pratt &amp; Whitney Canada capstone</p>
          <h3>AeroML</h3>
          <p className="project__thesis">The project where I learned to co-lead and ship as a team.</p>
          <p className="project__description">
            We built AeroML with a team of more than ten engineers for a Pratt &amp; Whitney Canada
            manufacturing use case. I co-led the technical work and focused on the backend, desktop
            integration, background jobs, packaging, and the pieces that had to work together on demo day.
          </p>
          <div className="aero-proof" aria-label="AeroML outcomes">
            <p><strong>10+</strong><span>person team co-led across frontend, backend, ML, and delivery</span></p>
            <p><strong>38.2%</strong><span>lower MAE than the use-case baseline</span></p>
          </div>
          <TechStack items={['FastAPI', 'Python', 'React', 'Electron', 'DuckDB', 'PyArrow', 'SQLite']} />
        </div>
        <AeroPipeline />
      </div>
      <AeroContributions />
    </article>
  )
}

const moreProjects = [
  {
    name: 'ConUMaps',
    label: 'Mobile campus companion · extended team capstone',
    description: 'A campus navigation app my team built at Concordia. It combines outdoor directions, indoor paths, shuttle data, calendars, and multi-stop planning. I kept working on it after the course to clean up the architecture, improve routing, and make the project easier to run.',
    stack: ['React Native', 'Expo', 'Flask', 'Mapbox', 'Google Calendar'],
  },
  {
    name: 'SEED',
    label: 'AI job-search operating system · formerly MapleLaunch · paused',
    description: 'I started SEED to bring job discovery, fit scoring, tailored application documents, and application tracking into one place. The project is paused, but it gave me a chance to work with Next.js, Spring, Supabase, and a Python ingestion worker.',
    stack: ['Next.js', 'Spring Boot', 'Supabase', 'Python', 'Electron'],
  },
  {
    name: 'YTtoMedia',
    label: 'Packaged cross-platform desktop utility',
    description: 'A desktop YouTube downloader I made for audio and video. It checks the real formats, queues multiple downloads, reports progress, and packages yt-dlp and FFmpeg so the Mac and Windows builds work without a developer setup.',
    stack: ['Electron', 'Node.js', 'yt-dlp', 'FFmpeg', 'GitHub Actions'],
  },
]

function MoreProjects() {
  return (
    <div id="more-projects" className="more-projects">
      <div className="section-shell">
        <header className="more-projects__heading reveal">
          <p>05 / More projects</p>
          <h2>Smaller projects that taught me something useful.</h2>
        </header>
        <div className="more-projects__list reveal">
          {moreProjects.map((project, index) => (
            <article className="more-projects__item" key={project.name}>
              <span>0{index + 1}</span>
              <h3>{project.name}</h3>
              <div className="more-projects__details">
                <strong>{project.label}</strong>
                <p>{project.description}</p>
                <TechStack items={project.stack} compact />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="work-section">
      <AeroProject />
      <AtlasProject />
      <SgtvProject />
      <AsyncraProject />
      <MoreProjects />
    </section>
  )
}

const experienceCompanies = [
  {
    company: 'Secret Garden TV',
    location: 'Canada',
    visual: `${ASSET_ROOT}high-res-assets/secret-garden-character-hq.png`,
    visualClass: 'company-experience__visual--portrait',
    positions: [
      {
        years: 'Jun 2026 — Present',
        role: 'Software Engineer & Technical Lead',
        context: 'Volunteer · SGTV digital platform',
        detail: 'I’m helping the team turn its ideas into a product: clarifying requirements, planning the architecture, and working through the frontend, backend, media, cloud, and delivery decisions.',
        stack: ['Cloud architecture', 'Video streaming', 'APIs', 'Authentication', 'CI/CD'],
      },
    ],
  },
  {
    company: 'Pratt & Whitney Canada',
    location: 'Montréal, QC',
    visual: `${ASSET_ROOT}high-res-assets/pratt-whitney-logo-hq.png`,
    visualClass: 'company-experience__visual--pratt',
    positions: [
      {
        years: 'Sep 2025 — Apr 2026',
        role: 'Software Engineer & Technical Co-Lead',
        context: 'AeroML industry capstone',
        detail: 'I co-led a team of more than ten engineers building a local-first AutoML desktop app for a Pratt & Whitney Canada manufacturing use case.',
        impact: '38.2% lower MAE than the internal baseline · model development reduced from weeks to minutes',
        stack: ['Python', 'FastAPI', 'React', 'Electron', 'DuckDB', 'PyArrow'],
      },
    ],
  },
  {
    company: 'Ericsson',
    location: 'Montréal, QC',
    visual: `${ASSET_ROOT}high-res-assets/ericsson-logo-hq.png`,
    visualClass: 'company-experience__visual--ericsson',
    positions: [
      {
        years: 'May 2024 — Aug 2024',
        role: 'Software Developer Intern',
        context: 'Python backend · Linux',
        detail: 'I built Python backend tools around the Mend APIs for dependency, vulnerability, and compliance work. I also profiled slow paths and used concurrency and thread pools to improve them.',
        stack: ['Python', 'Linux', 'REST APIs', 'Concurrency', 'Mend'],
      },
      {
        years: 'Sep 2023 — Dec 2023',
        role: 'Software Developer Intern',
        context: 'Java and Node.js services',
        detail: 'I worked on Spring Boot and Node.js services backed by MongoDB, packaged them with Docker, supported Azure deployments, and improved the team’s Git and CI/CD workflow.',
        stack: ['Spring Boot', 'Node.js', 'MongoDB', 'Docker', 'Azure'],
      },
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="section-shell">
        <header className="experience-heading reveal">
          <p>02 / Experience</p>
          <h2>The places where I learned how real teams build software.</h2>
        </header>
        <div className="experience-list">
          {experienceCompanies.map((item, index) => (
            <article className="company-experience reveal" key={item.company}>
              <header className="company-experience__mast">
                <div className={`company-experience__visual ${item.visualClass}`} aria-hidden="true">
                  <img src={item.visual} alt="" />
                </div>
                <div className="company-experience__identity">
                  <span>0{index + 1}</span>
                  <p>{item.location}</p>
                  <h3>{item.company}</h3>
                </div>
              </header>
              <div className="company-experience__positions">
                {item.positions.map((position) => (
                  <div className="position-row" key={`${position.role}-${position.years}`}>
                    <time>{position.years}</time>
                    <div className="position-row__role">
                      <h4>{position.role}</h4>
                      <p>{position.context}</p>
                    </div>
                    <div className="position-row__story">
                      <p>{position.detail}</p>
                      {'impact' in position && position.impact && <strong>{position.impact}</strong>}
                      <TechStack items={position.stack} label="Stack used" compact />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
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
        <p>Working on something useful?</p>
        <h2>I’d like to hear<br />about it.</h2>
        <div className="contact__links">
          <a href={EMAIL_URL}>
            Let’s talk <ExternalArrow />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn <ExternalArrow />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub <ExternalArrow />
          </a>
        </div>
      </div>
      <div className="contact__footer">
        <span>Mohammed Al Assad</span>
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

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight * 0.75)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  const returnToTop = () => {
    document.getElementById('top')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <button
      className={visible ? 'back-to-top is-visible' : 'back-to-top'}
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={returnToTop}
    >
      <span>Top</span>
      <Arrow />
    </button>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to selected work</a>
      <RevealObserver />
      <Header />
      <JourneyRail />
      <main>
        <Hero />
        <Work />
        <Experience />
      </main>
      <Contact />
      <BackToTop />
    </>
  )
}
