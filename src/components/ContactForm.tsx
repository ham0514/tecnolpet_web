import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTurnstile } from '../lib/turnstile'

type ContactFormProps = {
  type?: 'contact' | 'consultas' | 'empleo' | 'quejas' | 'denuncias'
  submitLabelKey?: string
  extraFields?: Array<'role' | 'cv' | 'company'>
  className?: string
}

type Status = 'idle' | 'sending' | 'ok' | 'err'
type FormError = 'generic' | 'captchaRequired' | 'captchaFailed' | 'captchaMissing' | null

export function ContactForm({
  type = 'contact',
  submitLabelKey = 'contact.submit',
  extraFields = ['company'],
  className = '',
}: ContactFormProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<FormError>(null)
  const [token, setToken] = useState('')

  const { widgetRef, reset, configured } = useTurnstile({
    onToken: (value) => {
      setToken(value)
      setError((prev) =>
        prev === 'captchaRequired' || prev === 'captchaFailed' ? null : prev,
      )
    },
    onExpire: () => setToken(''),
    onError: () => {
      setToken('')
      setError('captchaFailed')
    },
  })

  const resetTurnstile = () => {
    setToken('')
    reset()
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!configured) {
      setStatus('idle')
      setError('captchaMissing')
      return
    }

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
    error === 'captchaMissing'
      ? t('contact.captchaMissing')
      : error === 'captchaRequired'
        ? t('contact.captchaRequired')
        : error === 'captchaFailed'
          ? t('contact.captchaFailed')
          : error === 'generic'
            ? t('contact.error')
            : null

  return (
    <form className={`form-stack panel ${className}`.trim()} onSubmit={onSubmit}>
      {type === 'contact' ? (
        <>
          <div className="contact-form__grid">
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
            <div className="field">
              <label htmlFor={`${type}-email`}>{t('contact.emailField')}</label>
              <input id={`${type}-email`} name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor={`${type}-phone`}>{t('contact.phoneField')}</label>
              <input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="field">
            <label htmlFor={`${type}-message`}>{t('contact.message')}</label>
            <textarea id={`${type}-message`} name="message" required />
          </div>
        </>
      ) : (
        <>
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
        </>
      )}

      <div className="field turnstile-field">
        {configured ? (
          <div ref={widgetRef} className="turnstile-widget" />
        ) : (
          <p className="form-status err">{t('contact.captchaMissing')}</p>
        )}
      </div>

      <button className="btn" type="submit" disabled={status === 'sending' || !configured}>
        {status === 'sending' ? t('contact.sending') : t(submitLabelKey)}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('contact.success')}</p>}
      {errorMessage && configured && <p className="form-status err">{errorMessage}</p>}
    </form>
  )
}
