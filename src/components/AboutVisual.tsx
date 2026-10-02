import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const PILLARS = [
  { code: 'MIS', label: 'MISSION' },
  { code: 'VIS', label: 'VISION' },
  { code: 'QA', label: 'QUALITY' },
  { code: 'SOC', label: 'SOCIAL' },
  { code: 'IMP', label: 'IMPARTIAL' },
] as const

/** Company foundation visual: location, year, cycling policy pillars. */
export function AboutVisual() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % PILLARS.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="about-visual" aria-hidden>
      <motion.div
        className="about-visual__panel"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`about-visual__rig${reduce ? ' is-static' : ''}`}>
          <div className="about-visual__header mono">
            <span className="about-visual__pin" />
            <span>ORELLANA · EC</span>
            <span className="about-visual__year">2015</span>
          </div>

          <div className="about-visual__stack">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.code}
                className={`about-visual__row${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
              >
                <span className="about-visual__dot" />
                <span className="about-visual__code mono">{pillar.code}</span>
                <span className="about-visual__bar" />
              </div>
            ))}
          </div>

          <div className="about-visual__readout mono">
            <span>FOCUS</span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={PILLARS[active].label}
                initial={reduce ? false : { y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduce ? undefined : { y: -6, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {PILLARS[active].label}
              </motion.strong>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
