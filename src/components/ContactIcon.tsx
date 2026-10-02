import { motion, useReducedMotion } from 'framer-motion'

export type ContactIconKey = 'location' | 'phone' | 'email' | 'hours' | 'message'

type ContactIconProps = {
  name: ContactIconKey
  className?: string
}

export function ContactIcon({ name, className = '' }: ContactIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className={`contact-icon contact-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className={`contact-icon__pulse${reduce ? ' is-static' : ''}`}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {name === 'location' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M16 27s-8-7.2-8-13a8 8 0 1 1 16 0c0 5.8-8 13-8 13Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="14" r="2.8" strokeWidth="1.6" />
        </svg>
      )}
      {name === 'phone' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M11.2 8.5h3.2l1.4 4.2-2 1.2a10.8 10.8 0 0 0 4.3 4.3l1.2-2 4.2 1.4v3.2a2 2 0 0 1-2.2 2A13.5 13.5 0 0 1 9.2 10.7a2 2 0 0 1 2-2.2Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {name === 'email' && (
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="6.5" y="9" width="19" height="14" rx="2" strokeWidth="1.6" />
          <path d="M7.5 11.5 16 17.5l8.5-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'hours' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10.5" strokeWidth="1.6" />
          <path d="M16 10.5V16l4 2.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'message' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M7 9.5h18v11H14l-4.5 3.5V20.5H7v-11Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M11.5 14.5h9M11.5 18h6" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </motion.span>
  )
}
