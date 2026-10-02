import type { ReactNode } from 'react'

export type ServiceIconKey =
  | 'vt'
  | 'mt'
  | 'pt'
  | 'ut'
  | 'emi'
  | 'drillpipe'
  | 'tension'
  | 'load'
  | 'extra'
  | 'tools'
  | 'tubing'
  | 'accessories'
  | 'trainNdt'
  | 'trainSafety'
  | 'trainTech'

type ServiceIconProps = {
  name: ServiceIconKey
  className?: string
}

function Svg({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      className={`service-icon__svg ${className}`.trim()}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  )
}

export function ServiceIcon({ name, className = '' }: ServiceIconProps) {
  return (
    <span className={`service-icon service-icon--${name} ${className}`.trim()} aria-hidden>
      {name === 'vt' && (
        <Svg>
          <circle className="service-icon__ring" cx="32" cy="32" r="18" />
          <circle className="service-icon__pulse" cx="32" cy="32" r="8" />
          <path className="service-icon__accent" d="M12 32h8M44 32h8M32 12v8M32 44v8" />
          <circle className="service-icon__core" cx="32" cy="32" r="3.5" fill="currentColor" />
        </Svg>
      )}

      {name === 'mt' && (
        <Svg>
          <path
            className="service-icon__accent"
            d="M20 18v16a12 12 0 0 0 24 0V18"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path className="service-icon__accent" d="M20 18h8v10h-8zm16 0h8v10h-8z" fill="currentColor" stroke="none" />
          <circle className="service-icon__particle service-icon__particle--1" cx="24" cy="48" r="2" fill="currentColor" />
          <circle className="service-icon__particle service-icon__particle--2" cx="32" cy="50" r="2" fill="currentColor" />
          <circle className="service-icon__particle service-icon__particle--3" cx="40" cy="47" r="2" fill="currentColor" />
        </Svg>
      )}

      {name === 'pt' && (
        <Svg>
          <path
            className="service-icon__accent service-icon__drop"
            d="M32 12c0 10-12 18-12 28a12 12 0 0 0 24 0c0-10-12-18-12-28z"
            fill="currentColor"
            stroke="none"
            opacity="0.9"
          />
          <circle className="service-icon__sheen" cx="28" cy="34" r="3" fill="#fff" opacity="0.35" />
        </Svg>
      )}

      {name === 'ut' && (
        <Svg>
          <rect className="service-icon__accent" x="26" y="8" width="12" height="16" rx="2" fill="currentColor" stroke="none" />
          <path className="service-icon__wave service-icon__wave--1" d="M18 36c4 4 8 4 12 0s8-4 12 0" />
          <path className="service-icon__wave service-icon__wave--2" d="M14 44c6 5 12 5 18 0s12-5 18 0" />
          <path className="service-icon__wave service-icon__wave--3" d="M10 52c8 6 16 6 24 0s16-6 24 0" />
        </Svg>
      )}

      {name === 'emi' && (
        <Svg>
          <ellipse className="service-icon__ring" cx="32" cy="32" rx="10" ry="20" />
          <ellipse className="service-icon__coil service-icon__coil--1" cx="32" cy="32" rx="18" ry="8" />
          <ellipse className="service-icon__coil service-icon__coil--2" cx="32" cy="32" rx="22" ry="10" />
          <path className="service-icon__accent" d="M32 10v6M32 48v6" />
          <circle className="service-icon__core" cx="32" cy="32" r="3" fill="currentColor" />
        </Svg>
      )}

      {name === 'drillpipe' && (
        <Svg>
          <rect className="service-icon__pipe" x="10" y="26" width="44" height="12" rx="6" />
          <rect className="service-icon__pipe-joint" x="8" y="24" width="8" height="16" rx="2" fill="currentColor" stroke="none" />
          <rect className="service-icon__pipe-joint" x="48" y="24" width="8" height="16" rx="2" fill="currentColor" stroke="none" />
          <path className="service-icon__scan" d="M20 20v24M32 18v28M44 20v24" />
          <circle className="service-icon__pulse" cx="32" cy="32" r="5" />
        </Svg>
      )}

      {name === 'tension' && (
        <Svg>
          <path className="service-icon__accent" d="M12 32h40" strokeWidth="3" />
          <path className="service-icon__arrow service-icon__arrow--l" d="M12 32l8-6v12z" fill="currentColor" stroke="none" />
          <path className="service-icon__arrow service-icon__arrow--r" d="M52 32l-8-6v12z" fill="currentColor" stroke="none" />
          <rect className="service-icon__bar" x="26" y="22" width="12" height="20" rx="2" />
        </Svg>
      )}

      {name === 'load' && (
        <Svg>
          <path className="service-icon__accent" d="M32 10v18M20 28h24" strokeWidth="3" strokeLinecap="round" />
          <path className="service-icon__hook" d="M32 28c8 0 12 6 12 12a8 8 0 0 1-16 0" strokeWidth="3" />
          <rect className="service-icon__weight" x="22" y="46" width="20" height="10" rx="2" fill="currentColor" stroke="none" />
        </Svg>
      )}

      {name === 'extra' && (
        <Svg>
          <circle className="service-icon__gear service-icon__gear--a" cx="26" cy="30" r="12" />
          <circle className="service-icon__gear service-icon__gear--b" cx="40" cy="38" r="10" />
          <circle cx="26" cy="30" r="4" fill="currentColor" stroke="none" />
          <circle cx="40" cy="38" r="3.5" fill="currentColor" stroke="none" />
        </Svg>
      )}

      {name === 'tools' && (
        <Svg>
          <path
            className="service-icon__accent"
            d="M38 14l8 8-4 4-8-8 4-4zM18 42l12-12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="service-icon__accent"
            d="M14 50l8-3 3 8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="service-icon__ring" cx="42" cy="18" r="6" />
        </Svg>
      )}

      {name === 'tubing' && (
        <Svg>
          <rect className="service-icon__pipe" x="8" y="24" width="48" height="16" rx="8" />
          <ellipse className="service-icon__ring" cx="12" cy="32" rx="4" ry="8" />
          <ellipse className="service-icon__core" cx="52" cy="32" rx="4" ry="8" fill="currentColor" stroke="none" />
          <path className="service-icon__scan" d="M24 20v24M36 20v24" />
        </Svg>
      )}

      {name === 'accessories' && (
        <Svg>
          <circle className="service-icon__ring" cx="24" cy="28" r="10" />
          <circle className="service-icon__ring" cx="40" cy="36" r="10" />
          <path className="service-icon__accent" d="M24 22v12M18 28h12M40 30v12M34 36h12" strokeWidth="2.5" />
        </Svg>
      )}

      {name === 'trainNdt' && (
        <Svg>
          <path
            className="service-icon__accent"
            d="M12 22l20-8 20 8-20 8-20-8z"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path className="service-icon__accent" d="M20 26v12c6 4 18 4 24 0V26" strokeWidth="2.5" />
          <path className="service-icon__accent" d="M48 24v14" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      )}

      {name === 'trainSafety' && (
        <Svg>
          <path
            className="service-icon__accent"
            d="M32 10l18 8v12c0 12-8 20-18 24-10-4-18-12-18-24V18l18-8z"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path className="service-icon__accent" d="M24 32l6 6 12-12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      )}

      {name === 'trainTech' && (
        <Svg>
          <rect className="service-icon__accent" x="16" y="16" width="32" height="32" rx="4" strokeWidth="2.5" />
          <path className="service-icon__accent" d="M26 28h12M26 36h8M16 24h32M24 16v32" strokeWidth="2" />
          <circle className="service-icon__core" cx="40" cy="36" r="2.5" fill="currentColor" stroke="none" />
        </Svg>
      )}
    </span>
  )
}
