import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import lockupBanner from '../assets/brand/lockup-banner.png'
import markCircle from '../assets/brand/mark-circle.png'
import markT from '../assets/brand/mark-t.png'
import './Logo.css'

export type LogoLayout = 'header' | 'hero' | 'mark' | 'mark-t' | 'footer'

type LogoProps = {
  layout?: LogoLayout
  className?: string
  alt?: string
  to?: string
}

export function Logo({
  layout = 'header',
  className = '',
  alt = 'Tecnolpet S.A.',
  to,
}: LogoProps) {
  let content: ReactNode

  if (layout === 'mark-t') {
    content = (
      <img
        src={markT}
        alt=""
        className={`logo-img logo-img--mark-t ${className}`.trim()}
        decoding="async"
        draggable={false}
        aria-hidden
      />
    )
  } else if (layout === 'mark') {
    content = (
      <img
        src={markCircle}
        alt={alt}
        className={`logo-img logo-img--mark ${className}`.trim()}
        decoding="async"
        draggable={false}
      />
    )
  } else if (layout === 'header' || layout === 'footer') {
    // Keep banner lockup in chrome (as previously set)
    content = (
      <img
        src={lockupBanner}
        alt={alt}
        className={`logo-img logo-img--${layout} ${className}`.trim()}
        decoding="async"
        draggable={false}
      />
    )
  } else {
    // Hero only: circle mark with TECNOLPET S.A. beside it
    content = (
      <span className={`brand-inline brand-inline--hero ${className}`.trim()} aria-label={alt}>
        <img
          src={markCircle}
          alt=""
          className="brand-inline__mark"
          decoding="async"
          draggable={false}
        />
        <span className="brand-inline__text">
          <span className="brand-inline__name">TECNOLPET</span>
          <span className="brand-inline__sa">S.A.</span>
        </span>
      </span>
    )
  }

  if (to) {
    return (
      <Link to={to} className="logo-link" aria-label={alt}>
        {content}
      </Link>
    )
  }

  return content
}
