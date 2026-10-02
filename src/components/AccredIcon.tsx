import { motion, useReducedMotion } from 'framer-motion'

export type AccredIconKey = 'iso17020' | 'iso9001'

type AccredIconProps = {
  name: AccredIconKey
  className?: string
}

/** Animated accreditation badge with a light 3D tilt. */
export function AccredIcon({ name, className = '' }: AccredIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={`accred-icon accred-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`accred-icon__frame${reduce ? ' is-static' : ''}`}>
        {name === 'iso17020' ? (
          <svg className="accred-icon__svg" viewBox="0 0 80 80" fill="none">
            <circle className="accred-icon__halo" cx="40" cy="40" r="30" />
            <circle className="accred-icon__halo accred-icon__halo--2" cx="40" cy="40" r="24" />
            <circle className="accred-icon__disc" cx="40" cy="36" r="18" />
            <circle className="accred-icon__rim" cx="40" cy="36" r="18" />
            <circle className="accred-icon__rim-inner" cx="40" cy="36" r="13" />
            <path
              className="accred-icon__check"
              d="M32 36.5l5 5 11-12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path className="accred-icon__ribbon" d="M34 52 L30 68 L40 62 L50 68 L46 52" />
            <text className="accred-icon__label" x="40" y="74" textAnchor="middle">
              17020
            </text>
          </svg>
        ) : (
          <svg className="accred-icon__svg" viewBox="0 0 80 80" fill="none">
            <path
              className="accred-icon__shield"
              d="M40 10 L62 18 V38 C62 52 52 62 40 68 C28 62 18 52 18 38 V18 Z"
            />
            <path
              className="accred-icon__shield-edge"
              d="M40 10 L62 18 V38 C62 52 52 62 40 68 C28 62 18 52 18 38 V18 Z"
            />
            <path className="accred-icon__cycle" d="M28 36 a12 12 0 1 1 2 10" />
            <path className="accred-icon__arrow" d="M40 24 l4 5 h-8 z" />
            <text className="accred-icon__q" x="40" y="44" textAnchor="middle">
              Q
            </text>
            <text className="accred-icon__label" x="40" y="74" textAnchor="middle">
              9001
            </text>
          </svg>
        )}
      </div>
    </motion.div>
  )
}
