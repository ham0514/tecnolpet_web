import { motion, useReducedMotion } from 'framer-motion'

export type AboutIconKey =
  | 'history'
  | 'mission'
  | 'vision'
  | 'quality'
  | 'social'
  | 'confidentiality'
  | 'impartiality'
  | 'policy'

type AboutIconProps = {
  name: AboutIconKey
  className?: string
}

export function AboutIcon({ name, className = '' }: AboutIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className={`about-icon about-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.72, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className={`about-icon__pulse${reduce ? ' is-static' : ''}`}
        animate={reduce ? undefined : { scale: [1, 1.07, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {name === 'history' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="10.5" strokeWidth="1.6" />
          <path d="M16 10.5V16l4 2.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'mission' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="9.5" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="5" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
          <path d="M16 4.5v3M16 24.5v3M4.5 16h3M24.5 16h3" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {name === 'vision' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M4.5 16s4.5-7 11.5-7 11.5 7 11.5 7-4.5 7-11.5 7S4.5 16 4.5 16Z" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="3.2" strokeWidth="1.6" />
        </svg>
      )}
      {name === 'quality' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M16 5.5l2.4 5.1 5.6.7-4.2 3.8 1.2 5.5L16 17.9 11 20.9l1.2-5.5-4.2-3.8 5.6-.7L16 5.5Z" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'social' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
          <circle cx="21" cy="12.5" r="2.5" strokeWidth="1.6" />
          <path d="M6.5 23.5c1.2-3.2 3.5-4.8 5.5-4.8s4.3 1.6 5.5 4.8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.2 20.2c.8-1.7 2.2-2.7 3.8-2.7 1.5 0 2.8.9 3.6 2.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {name === 'confidentiality' && (
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="9" y="14" width="14" height="11" rx="1.5" strokeWidth="1.6" />
          <path d="M12 14v-3a4 4 0 0 1 8 0v3" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )}
      {name === 'impartiality' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M16 6.5v19" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 10.5h7.5L21 15.5l2.5 5H16" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 10.5H8.5L11 15.5 8.5 20.5H16" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'policy' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9 5.5h9.5L23 10v16.5H9V5.5Z" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 5.5V10H23" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12.5 15h7M12.5 19h7M12.5 23h4.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </motion.span>
  )
}
