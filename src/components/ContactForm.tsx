import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

type ContactFormProps = {
  type?: 'contact' | 'consultas' | 'empleo' | 'quejas' | 'denuncias'
  submitLabelKey?: string
  extraFields?: Array<'role' | 'cv' | 'company'>
}

type Status = 'idle' | 'sending' | 'ok' | 'err'
type FormError = 'generic' | 'captchaRequired' | 'captchaFailed' | null

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()

  return new Promise((resolve, reject) => {
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
    script.onerror = () => reject(new Error('turnstile-load-failed'))
    document.head.appendChild(script)
  })
}

export function ContactForm({
  type = 'contact',
  submitLabelKey = 'contact.submit',
  extraFields = ['company'],
}: ContactFormProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<FormError>(null)
  const [token, setToken] = useState('')
  const widgetRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const reactId = useId()

  useEffect(() => {
    if (!SITE_KEY || !widgetRef.current) return

    let cancelled = false

    const mount = async () => {
      try {
        await loadTurnstileScript()
        if (cancelled || !widgetRef.current || !window.turnstile) return

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current)
          widgetIdRef.current = null
        }

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          callback: (value) => {
            setToken(value)
            setError((prev) =>
              prev === 'captchaRequired' || prev === 'captchaFailed' ? null : prev,
            )
          },
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        })
      } catch {
        setError('captchaFailed')
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

  const resetTurnstile = () => {
    setToken('')
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!token) {
      setStatus('idle')
      setError('captchaRequired')
      return
    }

    const data = new FormData(form)
    data.set('formType', type)
    data.set('cf-turnstile-response', token)

    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        body: data,
      })
      if (res.status === 403) {
        setStatus('idle')
        setError('captchaFailed')
        resetTurnstile()
        return
      }
      if (!res.ok) throw new Error('fail')
      setStatus('ok')
      form.reset()
      resetTurnstile()
    } catch {
      setStatus('err')
      setError('generic')
      resetTurnstile()
    }
  }

  const errorMessage =
    error === 'captchaRequired'
      ? t('contact.captchaRequired')
      : error === 'captchaFailed'
        ? t('contact.captchaFailed')
        : error === 'generic'
          ? t('contact.error')
          : null

  return (
    <form className="form-stack panel" style={{ padding: '1.5rem' }} onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${type}-name`}>{t('contact.name')}</label>
        <input id={`${type}-name`} name="name" required autoComplete="name" />
      </div>

      {extraFields.includes('company') && (
        <div className="field">
          <label htmlFor={`${type}-company`}>{t('contact.company')}</label>
          <input id={`${type}-company`} name="company" autoComplete="organization" />
        </div>
      )}

      {extraFields.includes('role') && (
        <div className="field">
          <label htmlFor={`${type}-role`}>{t('empleo.role')}</label>
          <input id={`${type}-role`} name="role" />
        </div>
      )}

      <div className="field">
        <label htmlFor={`${type}-email`}>{t('contact.emailField')}</label>
        <input id={`${type}-email`} name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor={`${type}-phone`}>{t('contact.phoneField')}</label>
        <input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" />
      </div>

      {extraFields.includes('cv') && (
        <div className="field">
          <label htmlFor={`${type}-cv`}>{t('empleo.cv')}</label>
          <input id={`${type}-cv`} name="cv" />
        </div>
      )}

      <div className="field">
        <label htmlFor={`${type}-message`}>{t('contact.message')}</label>
        <textarea id={`${type}-message`} name="message" required />
      </div>

      <div className="field turnstile-field">
        <div ref={widgetRef} className="turnstile-widget" />
      </div>

      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('contact.sending') : t(submitLabelKey)}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('contact.success')}</p>}
      {errorMessage && <p className="form-status err">{errorMessage}</p>}
    </form>
  )
}
