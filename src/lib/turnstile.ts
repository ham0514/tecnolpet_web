import { useEffect, useId, useRef } from 'react'

export const TURNSTILE_SITE_KEY = String(import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '').trim()

const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'

let loadPromise: Promise<void> | null = null

export function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      const prev = window.onTurnstileLoad
      window.onTurnstileLoad = () => {
        prev?.()
        resolve()
      }
      if (window.turnstile) resolve()
      return
    }

    window.onTurnstileLoad = () => resolve()
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onerror = () => {
      loadPromise = null
      reject(new Error('turnstile-load-failed'))
    }
    document.head.appendChild(script)
  })

  return loadPromise
}

function currentTheme(): 'light' | 'dark' {
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'light' ? 'light' : 'dark'
}

type UseTurnstileOptions = {
  onToken: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}

export function useTurnstile({ onToken, onExpire, onError }: UseTurnstileOptions) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  const onExpireRef = useRef(onExpire)
  const onErrorRef = useRef(onError)
  const reactId = useId()

  onTokenRef.current = onToken
  onExpireRef.current = onExpire
  onErrorRef.current = onError

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current) return

    let cancelled = false

    const mount = async () => {
      try {
        await loadTurnstileScript()
        if (cancelled || !widgetRef.current || !window.turnstile) return

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        }

        // Clear any leftover iframe markup before re-render.
        widgetRef.current.innerHTML = ''

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: currentTheme(),
          callback: (value) => onTokenRef.current(value),
          'expired-callback': () => onExpireRef.current?.(),
          'error-callback': () => onErrorRef.current?.(),
        })
      } catch {
        onErrorRef.current?.()
      }
    }

    void mount()

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [reactId])

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  return {
    widgetRef,
    reset,
    configured: Boolean(TURNSTILE_SITE_KEY),
  }
}
