import { motion, useReducedMotion } from 'framer-motion'

/** Translucent NDT pipe + ultrasonic scan visualization for the home hero. */
export function HeroOrb() {
  const reduce = useReducedMotion()

  return (
    <div className="home-hero__stage" aria-hidden>
      <motion.div
        className="home-hero__ndt"
        initial={reduce ? false : { opacity: 0, scale: 0.88, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`home-hero__ndt-rig${reduce ? ' is-static' : ''}`}>
          <div className="home-hero__ndt-pipe">
            <span className="home-hero__ndt-pipe-outer" />
            <span className="home-hero__ndt-pipe-inner" />
            <span className="home-hero__ndt-pipe-wall" />
            <span className="home-hero__ndt-weld" />
            <span className="home-hero__ndt-flaw" />
          </div>

          <div className="home-hero__ndt-probe">
            <span className="home-hero__ndt-probe-body" />
            <span className="home-hero__ndt-probe-tip" />
          </div>

          <div className="home-hero__ndt-beams">
            <span className="home-hero__ndt-beam home-hero__ndt-beam--1" />
            <span className="home-hero__ndt-beam home-hero__ndt-beam--2" />
            <span className="home-hero__ndt-beam home-hero__ndt-beam--3" />
            <span className="home-hero__ndt-beam home-hero__ndt-beam--4" />
            <span className="home-hero__ndt-beam home-hero__ndt-beam--5" />
          </div>

          <div className="home-hero__ndt-echoes">
            <span />
            <span />
            <span />
          </div>

          <div className="home-hero__ndt-ascan">
            <svg viewBox="0 0 120 36" preserveAspectRatio="none">
              <path
                className="home-hero__ndt-wave"
                d="M0 28 L8 28 L12 8 L16 28 L28 28 L32 14 L36 28 L48 28 L54 4 L60 28 L72 28 L76 18 L80 28 L96 28 L100 10 L104 28 L120 28"
              />
            </svg>
            <span className="home-hero__ndt-ascan-label mono">UT A-SCAN</span>
          </div>

          <span className="home-hero__ndt-badge mono">PAUT / UT</span>
        </div>
      </motion.div>
    </div>
  )
}
