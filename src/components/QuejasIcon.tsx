import { motion, useReducedMotion } from 'framer-motion'

export type QuejasIconKey = 'definitions' | 'channels' | 'procedure'

type QuejasIconProps = {
  name: QuejasIconKey
  className?: string
}

export function QuejasIcon({ name, className = '' }: QuejasIconProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className={`quejas-icon quejas-icon--${name} ${className}`.trim()}
      aria-hidden
      initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className={`quejas-icon__pulse${reduce ? ' is-static' : ''}`}
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {name === 'definitions' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M8 6.5h11.5a2 2 0 0 1 2 2V25H10a2 2 0 0 1-2-2V6.5Z" strokeWidth="1.6" />
          <path d="M10 25V8.5a2 2 0 0 1 2-2H24" strokeWidth="1.6" />
          <path d="M13 12h7.5M13 16h7.5M13 20h5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {name === 'channels' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M7 16.5c0-4.7 3.8-8.5 8.5-8.5h1"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M14 5.5l3.5 2.5L14 10.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M25 15.5c0 4.7-3.8 8.5-8.5 8.5h-1"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M18 26.5l-3.5-2.5L18 21.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="2.2" />
        </svg>
      )}
      {name === 'procedure' && (
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M9 5.5h9.5L23 10v16.5H9V5.5Z" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M18.5 5.5V10H23" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12.5 15h7M12.5 19h7M12.5 23h4.5" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </motion.span>
  )
}
