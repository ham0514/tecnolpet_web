import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTurnstile } from '../lib/turnstile'

type Status = 'idle' | 'sending' | 'ok' | 'err'
type FormError = 'generic' | 'captchaRequired' | 'captchaFailed' | 'captchaMissing' | 'files' | null
type ComplaintType = 'queja' | 'apelacion' | 'sugerencia' | 'otra'

const MAX_FILES = 5
const MAX_FILE_BYTES = 5 * 1024 * 1024

export function QuejasForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<FormError>(null)
  const [token, setToken] = useState('')
  const [complaintType, setComplaintType] = useState<ComplaintType>('queja')
  const [fileNames, setFileNames] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > MAX_FILES || files.some((file) => file.size > MAX_FILE_BYTES)) {
      setError('files')
      setFileNames([])
      e.target.value = ''
      return
    }
    setError((prev) => (prev === 'files' ? null : prev))
    setFileNames(files.map((file) => file.name))
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

    const selectedFiles = Array.from(fileInputRef.current?.files ?? [])
    if (
      selectedFiles.length > MAX_FILES ||
      selectedFiles.some((file) => file.size > MAX_FILE_BYTES)
    ) {
      setStatus('idle')
      setError('files')
      return
    }

    const data = new FormData(form)
    data.set('formType', 'quejas')
    data.set('complaintType', complaintType)
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
      setComplaintType('queja')
      setFileNames([])
      if (fileInputRef.current) fileInputRef.current.value = ''
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
          : error === 'files'
            ? t('quejas.fields.filesError')
            : error === 'generic'
              ? t('contact.error')
              : null

  const types: ComplaintType[] = ['queja', 'apelacion', 'sugerencia', 'otra']

  return (
    <form className="form-stack panel quejas-form" onSubmit={onSubmit}>
      <fieldset className="quejas-section">
        <legend>{t('quejas.sections.affected')}</legend>
        <div className="quejas-grid-2">
          <div className="field">
            <label htmlFor="quejas-name">{t('quejas.fields.name')}</label>
            <input id="quejas-name" name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="quejas-company">{t('quejas.fields.company')}</label>
            <input id="quejas-company" name="company" autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="quejas-email">{t('quejas.fields.email')}</label>
            <input id="quejas-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="quejas-phone">{t('quejas.fields.phone')}</label>
            <input id="quejas-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field quejas-span-2">
            <label htmlFor="quejas-address">{t('quejas.fields.address')}</label>
            <input id="quejas-address" name="address" autoComplete="street-address" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="quejas-type">{t('quejas.fields.type')}</label>
          <select
            id="quejas-type"
            name="complaintTypeSelect"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value as ComplaintType)}
            required
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {t(`quejas.types.${type}`)}
              </option>
            ))}
          </select>
        </div>

        {complaintType === 'otra' && (
          <div className="field">
            <label htmlFor="quejas-other">{t('quejas.fields.otherSpecify')}</label>
            <input id="quejas-other" name="otherSpecify" required />
          </div>
        )}
      </fieldset>

      <fieldset className="quejas-section">
        <legend>{t('quejas.sections.incident')}</legend>
        <div className="field">
          <label htmlFor="quejas-area">{t('quejas.fields.area')}</label>
          <input id="quejas-area" name="area" />
        </div>
        <div className="quejas-grid-2">
          <div className="field">
            <label htmlFor="quejas-date">{t('quejas.fields.date')}</label>
            <input id="quejas-date" name="incidentDate" type="date" />
          </div>
          <div className="field">
            <label htmlFor="quejas-time">{t('quejas.fields.time')}</label>
            <input id="quejas-time" name="incidentTime" type="time" />
          </div>
        </div>
      </fieldset>

      <fieldset className="quejas-section">
        <legend>{t('quejas.sections.description')}</legend>
        <div className="field">
          <label htmlFor="quejas-message">{t('quejas.fields.description')}</label>
          <textarea id="quejas-message" name="message" required />
        </div>
      </fieldset>

      <fieldset className="quejas-section">
        <legend>{t('quejas.sections.annexes')}</legend>
        <p className="quejas-hint">{t('quejas.fields.annexesHint')}</p>
        <div className="field">
          <label htmlFor="quejas-files">{t('quejas.fields.files')}</label>
          <input
            ref={fileInputRef}
            id="quejas-files"
            name="annexes[]"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            onChange={onFilesChange}
          />
        </div>
        {fileNames.length > 0 && (
          <ul className="quejas-file-list">
            {fileNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </fieldset>

      <div className="field turnstile-field">
        {configured ? (
          <div ref={widgetRef} className="turnstile-widget" />
        ) : (
          <p className="form-status err">{t('contact.captchaMissing')}</p>
        )}
      </div>

      <button className="btn" type="submit" disabled={status === 'sending' || !configured}>
        {status === 'sending' ? t('contact.sending') : t('quejas.submit')}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('contact.success')}</p>}
      {errorMessage && configured && <p className="form-status err">{errorMessage}</p>}
    </form>
  )
}
