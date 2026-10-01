import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

type ContactFormProps = {
  type?: 'contact' | 'consultas' | 'empleo' | 'quejas' | 'denuncias'
  submitLabelKey?: string
  extraFields?: Array<'role' | 'cv' | 'company'>
}

type Status = 'idle' | 'sending' | 'ok' | 'err'

export function ContactForm({
  type = 'contact',
  submitLabelKey = 'contact.submit',
  extraFields = ['company'],
}: ContactFormProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('formType', type)

    setStatus('sending')
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        body: data,
      })
      if (!res.ok) throw new Error('fail')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('err')
    }
  }

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

      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('contact.sending') : t(submitLabelKey)}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('contact.success')}</p>}
      {status === 'err' && <p className="form-status err">{t('contact.error')}</p>}
    </form>
  )
}
