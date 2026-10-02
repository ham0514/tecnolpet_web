import { motion, useReducedMotion } from 'framer-motion'

export type EmpleoIconKey = 'team' | 'profiles' | 'process'

type EmpleoIconProps = {
  name: EmpleoIconKey
  className?: string
}

export function EmpleoIcon({ name, className = '' }: EmpleoIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className={`empleo-icon empleo-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className={`empleo-icon__pulse${reduce ? ' is-static' : ''}`}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {name === 'team' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="11" r="4" strokeWidth="1.6" />
          <path d="M8 24c1.5-4 4.2-6 8-6s6.5 2 8 6" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="13.5" r="2.6" strokeWidth="1.5" />
          <circle cx="24.5" cy="13.5" r="2.6" strokeWidth="1.5" />
        </svg>
      )}
      {name === 'profiles' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9 6.5h9.5L23 11v14.5H9V6.5Z" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 6.5V11H23" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12.5 15h7M12.5 19h7M12.5 23h4.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {name === 'process' && (
        <svg viewBox="0 0 32 32" fill="none">
          <circle cx="8" cy="16" r="3" strokeWidth="1.6" />
          <circle cx="16" cy="16" r="3" strokeWidth="1.6" />
          <circle cx="24" cy="16" r="3" strokeWidth="1.6" />
          <path d="M11 16h2M19 16h2" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </motion.span>
  )
}
