import { motion, useReducedMotion } from 'framer-motion'

type AnimatedHeadlineProps = {
  text: string
  className?: string
  accentWords?: number
}

export function AnimatedHeadline({
  text,
  className = '',
  accentWords = 2,
}: AnimatedHeadlineProps) {
  const reduce = useReducedMotion()
  const words = text.trim().split(/\s+/)
  const accentFrom = Math.max(0, words.length - accentWords)

  if (reduce) {
    return (
      <h1 className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className={i >= accentFrom ? 'home-hero__word home-hero__word--accent' : undefined}>
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <h1 className={`home-hero__headline ${className}`.trim()} aria-label={text}>
      {words.map((word, i) => (
        <span className="home-hero__word-wrap" key={`${word}-${i}`}>
          <motion.span
            className={`home-hero__word${i >= accentFrom ? ' home-hero__word--accent' : ''}`}
            initial={{ y: '115%', opacity: 0, rotateX: -40 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            transition={{
              delay: 0.38 + i * 0.085,
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      <motion.span
        className="home-hero__scan"
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.45, duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </h1>
  )
}
