import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTurnstile } from '../lib/turnstile'

type Status = 'idle' | 'sending' | 'ok' | 'err'
type FormError = 'generic' | 'captchaRequired' | 'captchaFailed' | 'captchaMissing' | 'files' | null

const MAX_FILES = 5
const MAX_FILE_BYTES = 5 * 1024 * 1024
const ROLE_OPTIONS = ['ndt', 'tech', 'ops', 'admin', 'other'] as const

export function EmpleoForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<FormError>(null)
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [fileNames, setFileNames] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
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

  const applyFiles = (files: File[]) => {
    if (files.length > MAX_FILES || files.some((file) => file.size > MAX_FILE_BYTES)) {
      setError('files')
      setFileNames([])
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    setError((prev) => (prev === 'files' ? null : prev))
    setFileNames(files.map((file) => file.name))
  }

  const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    applyFiles(Array.from(e.target.files ?? []))
  }

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files ?? [])
    if (!files.length || !fileInputRef.current) return

    const transfer = new DataTransfer()
    files.slice(0, MAX_FILES).forEach((file) => transfer.items.add(file))
    fileInputRef.current.files = transfer.files
    applyFiles(Array.from(transfer.files))
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
      selectedFiles.length === 0 ||
      selectedFiles.length > MAX_FILES ||
      selectedFiles.some((file) => file.size > MAX_FILE_BYTES)
    ) {
      setStatus('idle')
      setError('files')
      return
    }

    const data = new FormData(form)
    data.set('formType', 'empleo')
    data.set('role', role ? t(`empleo.roles.${role}`) : '')
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
      setRole('')
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
            ? t('empleo.fields.filesError')
            : error === 'generic'
              ? t('contact.error')
              : null

  return (
    <form className="form-stack panel empleo-form" onSubmit={onSubmit}>
      <div className="empleo-form__banner">
        <p className="mono empleo-form__kicker">{t('empleo.formKicker')}</p>
        <p>{t('empleo.formLead')}</p>
      </div>

      <fieldset className="empleo-section">
        <legend>{t('empleo.sections.applicant')}</legend>
        <div className="empleo-grid">
          <div className="field">
            <label htmlFor="empleo-name">{t('contact.name')}</label>
            <input id="empleo-name" name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="empleo-email">{t('contact.emailField')}</label>
            <input id="empleo-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="empleo-phone">{t('contact.phoneField')}</label>
            <input id="empleo-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="empleo-city">{t('empleo.fields.city')}</label>
            <input id="empleo-city" name="city" autoComplete="address-level2" />
          </div>
        </div>
      </fieldset>

      <fieldset className="empleo-section">
        <legend>{t('empleo.sections.interest')}</legend>
        <div className="field">
          <label htmlFor="empleo-role">{t('empleo.role')}</label>
          <select
            id="empleo-role"
            name="roleSelect"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">{t('empleo.roles.placeholder')}</option>
            {ROLE_OPTIONS.map((key) => (
              <option key={key} value={key}>
                {t(`empleo.roles.${key}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="empleo-message">{t('empleo.fields.message')}</label>
          <textarea id="empleo-message" name="message" required rows={5} />
        </div>
      </fieldset>

      <fieldset className="empleo-section">
        <legend>{t('empleo.sections.documents')}</legend>
        <p className="empleo-hint">{t('empleo.fields.filesRequired')}</p>
        <label
          className={`empleo-dropzone${dragging ? ' is-dragging' : ''}`}
          htmlFor="empleo-files"
          onDragEnter={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="empleo-dropzone__title">{t('empleo.fields.files')}</span>
          <span className="empleo-dropzone__hint">{t('empleo.fields.filesHint')}</span>
          <span className="empleo-dropzone__browse">{t('empleo.fields.filesBrowse')}</span>
          <input
            ref={fileInputRef}
            id="empleo-files"
            name="annexes[]"
            type="file"
            multiple
            required
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            onChange={onFilesChange}
          />
        </label>
        {fileNames.length > 0 && (
          <ul className="empleo-file-list">
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
        {status === 'sending' ? t('contact.sending') : t('empleo.submit')}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('empleo.success')}</p>}
      {errorMessage && configured && <p className="form-status err">{errorMessage}</p>}
    </form>
  )
}
