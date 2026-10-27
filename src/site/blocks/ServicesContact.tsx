'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { ServicesContactBlock } from '@/site/types'

type Field = 'name' | 'email' | 'contact' | 'message' | 'captcha'
type Errors = Partial<Record<Field, string>>

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/** Canvas-drawn captcha from js/contact-form.js (no third-party library). */
function drawCaptcha(canvas: HTMLCanvasElement, code: string) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width: w, height: h } = canvas
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#F2F2F2'
  ctx.fillRect(0, 0, w, h)
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(79, 82, 242, ${0.15 + Math.random() * 0.2})`
    ctx.beginPath()
    ctx.moveTo(Math.random() * w, Math.random() * h)
    ctx.lineTo(Math.random() * w, Math.random() * h)
    ctx.stroke()
  }
  ctx.font = 'bold 22px Arial'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  const charWidth = w / code.length
  for (let i = 0; i < code.length; i++) {
    ctx.save()
    ctx.translate(charWidth * i + charWidth / 2, h / 2 + (Math.random() * 6 - 3))
    ctx.rotate(((Math.random() * 30 - 15) * Math.PI) / 180)
    ctx.fillStyle = '#1E1E1E'
    ctx.fillText(code[i]!, 0, 0)
    ctx.restore()
  }
  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = `rgba(30, 30, 30, ${0.08 + Math.random() * 0.12})`
    ctx.beginPath()
    ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function ServicesContact({
  background,
  title,
  description,
  cardIntro,
  countryCodes,
  services,
}: ServicesContactBlock) {
  const formRef = useRef<HTMLFormElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const captchaInputRef = useRef<HTMLInputElement>(null)
  const [captcha, setCaptcha] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [consentError, setConsentError] = useState(false)
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null)
  const [sending, setSending] = useState(false)

  const newCaptcha = useCallback(() => {
    let code = ''
    for (let i = 0; i < 5; i++) code += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
    setCaptcha(code)
    if (canvasRef.current) drawCaptcha(canvasRef.current, code)
  }, [])

  // Generated on the client only (random), so server and browser HTML match
  useEffect(() => newCaptcha(), [newCaptcha])

  const validate = (data: FormData) => {
    const v = (k: string) => String(data.get(k) ?? '').trim()
    const e: Errors = {}
    if (!v('name')) e.name = 'Please enter your name.'
    else if (!/^[a-zA-Z ]+$/.test(v('name'))) e.name = 'Name should include only letters and spaces.'
    if (!v('email')) e.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) e.email = 'Please enter a valid email address.'
    if (!/^[0-9]{10}$/.test(v('contact'))) e.contact = 'Please enter a valid 10-digit phone number.'
    if (!v('message')) e.message = 'Please enter a message.'
    if (v('captcha_input').toUpperCase() !== captcha.toUpperCase()) e.captcha = 'The code entered does not match.'
    const consentOk = data.get('consent') === 'on'
    setErrors(e)
    setConsentError(!consentOk)
    return Object.keys(e).length === 0 && consentOk
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    const data = new FormData(event.currentTarget)
    if (!validate(data)) return

    setSending(true)
    try {
      const res = await fetch('/next/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          country: data.get('country'),
          contact: data.get('contact'),
          service: data.get('service'),
          message: data.get('message'),
          pageUrl: window.location.pathname,
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { message?: string }
      if (res.ok) {
        setStatus({ text: json.message || 'Your query has been received. We will contact you soon.', ok: true })
        formRef.current?.reset()
      } else {
        setStatus({ text: json.message || 'Something went wrong. Please try again.', ok: false })
      }
    } catch {
      setStatus({ text: 'Something went wrong. Please try again later.', ok: false })
    } finally {
      setSending(false)
      newCaptcha()
      if (captchaInputRef.current) captchaInputRef.current.value = ''
    }
  }

  const err = (field: Field) => <span className="form-error">{errors[field] || ''}</span>
  const cls = (field: Field) => (errors[field] ? 'has-error' : undefined)

  return (
    <section className="services-contact-section">
      <img src={background.src} alt="" className="services-contact-bg-img" aria-hidden="true" />
      <div className="services-contact-overlay"></div>

      <div className="container services-contact-content">
        <div className="services-contact-text">
          <h2 className="services-contact-title fade-anim" data-fade-from="left" data-delay="0.1">
            {title}
          </h2>
          <p className="services-contact-desc fade-anim" data-fade-from="bottom" data-delay="0.25">
            {description}
          </p>
        </div>

        <div className="services-contact-card fade-anim" data-fade-from="right" data-delay="0.2">
          <p className="services-contact-card-intro">{cardIntro}</p>

          <form ref={formRef} className="services-contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="scfName">
                Full Name <span className="required">*</span>
              </label>
              <input type="text" id="scfName" name="name" placeholder="Enter your name" autoComplete="name" className={cls('name')} required />
              {err('name')}
            </div>

            <div className="form-group">
              <label htmlFor="scfEmail">
                Email <span className="required">*</span>
              </label>
              <input type="email" id="scfEmail" name="email" placeholder="Enter your valid email address" autoComplete="email" className={cls('email')} required />
              {err('email')}
            </div>

            <div className="form-group">
              <label htmlFor="scfPhone">
                Phone Number <span className="required">*</span>
              </label>
              <div className="form-row-split">
                <select id="scfCountry" name="country" aria-label="Country code" required>
                  {countryCodes.map((c) => (
                    <option value={c.value} key={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input type="tel" id="scfPhone" name="contact" placeholder="Your Mobile Number" inputMode="numeric" maxLength={10} autoComplete="tel-national" className={cls('contact')} required />
              </div>
              {err('contact')}
            </div>

            <div className="form-group">
              <label htmlFor="scfService">Service you are interested</label>
              <select id="scfService" name="service" defaultValue="">
                <option value="">Enter the service that you&apos;re interested in</option>
                {services.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="scfMessage">
                Message <span className="required">*</span>
              </label>
              <textarea id="scfMessage" name="message" rows={2} placeholder="Write your message here" className={cls('message')} required></textarea>
              {err('message')}
            </div>

            <div className="form-group">
              <label htmlFor="scfCaptchaInput">
                Enter the code shown <span className="required">*</span>
              </label>
              <div className="form-row-split form-captcha-row">
                <div className="form-captcha-display">
                  <canvas ref={canvasRef} width={110} height={44} aria-label="Captcha code"></canvas>
                  <button
                    type="button"
                    className="form-captcha-refresh"
                    aria-label="Get a new code"
                    onClick={() => {
                      newCaptcha()
                      if (captchaInputRef.current) {
                        captchaInputRef.current.value = ''
                        captchaInputRef.current.focus()
                      }
                    }}
                  >
                    <i className="fa-solid fa-arrows-rotate"></i>
                  </button>
                </div>
                <input ref={captchaInputRef} type="text" id="scfCaptchaInput" name="captcha_input" placeholder="Enter code" autoComplete="off" className={cls('captcha')} required />
              </div>
              {err('captcha')}
            </div>

            <label className={`form-consent${consentError ? ' has-error' : ''}`}>
              <input type="checkbox" id="scfConsent" name="consent" required />
              <span>
                By clicking I Agree to <a href="/terms-of-use.html">User Agreement</a>,{' '}
                <a href="/privacy-policy.html">Privacy Policy</a>, and <a href="/privacy-policy.html">Cookie Policy</a>.
              </span>
            </label>

            <div className="services-contact-form-footer">
              <div
                className={`form-status${status ? (status.ok ? ' form-status-success' : ' form-status-error') : ''}`}
                role="status"
                aria-live="polite"
              >
                {status?.text}
              </div>
              <button type="submit" className={`services-contact-submit${sending ? ' loading' : ''}`} disabled={sending}>
                <span className="btn-label">Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
