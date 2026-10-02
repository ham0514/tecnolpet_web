import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const APPS = [
  {
    code: 'FD',
    name: 'FastDoing',
    kind: 'Reportes',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="4" width="20" height="24" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 11h12M10 16h12M10 21h8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    code: 'TU',
    name: 'TecUniversity',
    kind: 'Entrenamiento',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 13 L16 7 L28 13 L16 19 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 15v6c4 3 12 3 16 0v-6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M28 13v8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    code: 'CV',
    name: 'Candidato',
    kind: 'Evaluación',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 26c2.5-5 17.5-5 20 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    code: 'EM',
    name: 'Email',
    kind: 'Correo',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="4" y="8" width="24" height="16" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 9l11 9 11-9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const

/** Clean app-window visual for the applications intro. */
export function AppsVisual() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % APPS.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduce])

  const current = APPS[active]

  return (
    <div className="apps-visual" aria-hidden>
      <motion.div
        className="apps-visual__panel"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`apps-visual__window${reduce ? ' is-static' : ''}`}>
          <div className="apps-visual__chrome">
            <span className="apps-visual__traffic">
              <i />
              <i />
              <i />
            </span>
            <span className="apps-visual__url mono">apps.tecnolpet</span>
          </div>

          <div className="apps-visual__stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.code}
                className="apps-visual__card"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <span className="apps-visual__icon">{current.icon}</span>
                <div className="apps-visual__copy">
                  <strong>{current.name}</strong>
                  <span className="mono">{current.kind}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="apps-visual__dots" role="presentation">
            {APPS.map((app, i) => (
              <span
                key={app.code}
                className={`apps-visual__dot${i === active ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
