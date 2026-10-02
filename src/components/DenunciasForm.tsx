import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTurnstile } from '../lib/turnstile'

type Status = 'idle' | 'sending' | 'ok' | 'err'
type FormError = 'generic' | 'captchaRequired' | 'captchaFailed' | 'captchaMissing' | 'files' | null
type Relationship = 'current' | 'former' | 'non'

const MAX_FILES = 5
const MAX_FILE_BYTES = 5 * 1024 * 1024

export function DenunciasForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<FormError>(null)
  const [token, setToken] = useState('')
  const [relationship, setRelationship] = useState<Relationship | ''>('')
  const [anonymous, setAnonymous] = useState(false)
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
      selectedFiles.length > MAX_FILES ||
      selectedFiles.some((file) => file.size > MAX_FILE_BYTES)
    ) {
      setStatus('idle')
      setError('files')
      return
    }

    const data = new FormData(form)
    data.set('formType', 'denuncias')
    data.set('relationship', relationship)
    data.set('anonymous', anonymous ? '1' : '0')
    data.set('cf-turnstile-response', token)
    if (anonymous) {
      data.set('name', t('denuncias.fields.anonymousName'))
    }

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
      setRelationship('')
      setAnonymous(false)
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
            ? t('denuncias.fields.filesError')
            : error === 'generic'
              ? t('contact.error')
              : null

  const relationships: Relationship[] = ['current', 'former', 'non']

  return (
    <form className="form-stack panel denuncias-form" onSubmit={onSubmit}>
      <div className="denuncias-form__banner">
        <p className="mono denuncias-form__kicker">{t('denuncias.formKicker')}</p>
        <p>{t('denuncias.formLead')}</p>
      </div>

      <fieldset className="denuncias-section">
        <legend>{t('denuncias.sections.incident')}</legend>

        <div className="field">
          <label htmlFor="denuncias-location">{t('denuncias.fields.location')}</label>
          <input id="denuncias-location" name="location" required autoComplete="off" />
        </div>

        <div className="field">
          <label htmlFor="denuncias-suspicion">{t('denuncias.fields.suspicion')}</label>
          <textarea id="denuncias-suspicion" name="message" required />
        </div>

        <div className="field">
          <label htmlFor="denuncias-involved">{t('denuncias.fields.involved')}</label>
          <textarea id="denuncias-involved" name="involved" required />
        </div>

        <div className="field">
          <label htmlFor="denuncias-date">{t('denuncias.fields.date')}</label>
          <input id="denuncias-date" name="incidentDate" type="date" required />
        </div>
      </fieldset>

      <fieldset className="denuncias-section">
        <legend>{t('denuncias.sections.evidence')}</legend>
        <label
          className={`denuncias-dropzone${dragging ? ' is-dragging' : ''}`}
          htmlFor="denuncias-files"
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
          <span className="denuncias-dropzone__title">{t('denuncias.fields.files')}</span>
          <span className="denuncias-dropzone__hint">{t('denuncias.fields.filesHint')}</span>
          <span className="denuncias-dropzone__browse">{t('denuncias.fields.filesBrowse')}</span>
          <input
            ref={fileInputRef}
            id="denuncias-files"
            name="annexes[]"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
            onChange={onFilesChange}
          />
        </label>
        {fileNames.length > 0 && (
          <ul className="denuncias-file-list">
            {fileNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </fieldset>

      <fieldset className="denuncias-section">
        <legend>{t('denuncias.sections.relationship')}</legend>
        <div className="field">
          <label htmlFor="denuncias-relationship">{t('denuncias.fields.relationship')}</label>
          <select
            id="denuncias-relationship"
            name="relationshipSelect"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as Relationship | '')}
            required
          >
            <option value="" disabled>
              {t('denuncias.fields.relationshipPlaceholder')}
            </option>
            {relationships.map((option) => (
              <option key={option} value={option}>
                {t(`denuncias.relationships.${option}`)}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="denuncias-section">
        <legend>{t('denuncias.sections.contact')}</legend>
        <p className="denuncias-hint">{t('denuncias.fields.contactHint')}</p>

        <label className={`denuncias-anon${anonymous ? ' is-active' : ''}`}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <span>
            <strong>{t('denuncias.fields.anonymous')}</strong>
            <small>{t('denuncias.fields.anonymousHint')}</small>
          </span>
        </label>

        {!anonymous && (
          <div className="denuncias-grid-2">
            <div className="field">
              <label htmlFor="denuncias-name">{t('denuncias.fields.name')}</label>
              <input id="denuncias-name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="denuncias-email">{t('denuncias.fields.email')}</label>
              <input id="denuncias-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field denuncias-span-2">
              <label htmlFor="denuncias-phone">{t('denuncias.fields.phone')}</label>
              <input id="denuncias-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
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
        {status === 'sending' ? t('contact.sending') : t('denuncias.submit')}
      </button>

      {status === 'ok' && <p className="form-status ok">{t('denuncias.success')}</p>}
      {errorMessage && configured && <p className="form-status err">{errorMessage}</p>}
    </form>
  )
}
