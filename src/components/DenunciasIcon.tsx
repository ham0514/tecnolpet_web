import { motion, useReducedMotion } from 'framer-motion'

export type DenunciasIconKey = 'integrity' | 'workplace' | 'confidential' | 'conduct'

type DenunciasIconProps = {
  name: DenunciasIconKey
  className?: string
}

export function DenunciasIcon({ name, className = '' }: DenunciasIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className={`denuncias-icon denuncias-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className={`denuncias-icon__pulse${reduce ? ' is-static' : ''}`}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {name === 'integrity' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M16 5.5 24.5 9v7.2c0 5.2-3.6 9.1-8.5 10.8-4.9-1.7-8.5-5.6-8.5-10.8V9L16 5.5Z"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12.5 16.2 15 18.7l4.8-5.2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {name === 'workplace' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
          <circle cx="21" cy="12.5" r="2.5" strokeWidth="1.6" />
          <path d="M6.5 23.5c1.2-3.2 3.5-4.8 5.5-4.8s4.3 1.6 5.5 4.8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.2 20.2c.8-1.7 2.2-2.7 3.8-2.7 1.5 0 2.8.9 3.6 2.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {name === 'confidential' && (
        <svg viewBox="0 0 32 32" fill="none">
          <rect x="9" y="14" width="14" height="11" rx="1.5" strokeWidth="1.6" />
          <path d="M12 14v-3a4 4 0 0 1 8 0v3" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="16" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )}
      {name === 'conduct' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9 5.5h9.5L23 10v16.5H9V5.5Z" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 5.5V10H23" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12.5 15h7M12.5 19h7M12.5 23h4.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </motion.span>
  )
}
