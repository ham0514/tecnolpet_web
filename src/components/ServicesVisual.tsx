import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const METHODS = ['VT', 'MT', 'PT', 'UT', 'EMI', 'DPI'] as const

/** Compact NDT A-scan console for the services intro. */
export function ServicesVisual() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % METHODS.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="services-visual" aria-hidden>
      <motion.div
        className="services-visual__panel"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`services-visual__rig${reduce ? ' is-static' : ''}`}>
          <div className="services-visual__header mono">
            <span className="services-visual__live" />
            <span>A-SCAN</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={METHODS[active]}
                className="services-visual__active"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
              >
                {METHODS[active]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="services-visual__scope">
            <svg className="services-visual__wave" viewBox="0 0 120 36" preserveAspectRatio="none">
              <path
                className="services-visual__grid-line"
                d="M0 18 H120 M20 0 V36 M40 0 V36 M60 0 V36 M80 0 V36 M100 0 V36"
              />
              <path
                className="services-visual__trace"
                d="M0 28 L10 28 L14 8 L18 28 L30 28 L34 16 L38 28 L50 28 L56 4 L62 28 L74 28 L78 20 L82 28 L96 28 L100 10 L104 28 L120 28"
              />
              <line className="services-visual__gate" x1="56" y1="2" x2="56" y2="34" />
            </svg>
            <span className="services-visual__sweep" />
          </div>

          <div className="services-visual__methods">
            {METHODS.map((method, i) => (
              <span
                key={method}
                className={`services-visual__method mono${i === active ? ' is-active' : ''}`}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
