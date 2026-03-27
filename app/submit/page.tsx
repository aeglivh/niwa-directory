'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, VIENNA_DISTRICTS, DOCTOR_SPECIALTIES } from '@/lib/constants'
import { Category } from '@/lib/types'
import { CheckCircle, ArrowLeft } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function SubmitPage() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [category, setCategory] = useState<Category | ''>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Something went wrong')
      }

      setState('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-5">
          <CheckCircle size={40} style={{ color: '#C9A8A8' }} />
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1A1917',
            }}
          >
            Thank you!
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#4A4845', lineHeight: 1.6 }}>
            Your listing has been submitted for review. Once approved it will appear in the directory.
          </p>
          <Link href="/" className="niwa-btn mt-2">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header style={{ borderBottom: '1px solid #D9D2C7' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}
          >
            <ArrowLeft size={12} />
            Directory
          </Link>
          <span
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#1A1917',
            }}
          >
            Submit a listing
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Intro */}
        <div className="mb-8" style={{ borderBottom: '1px solid #D9D2C7', paddingBottom: '1.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '2rem',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Add a place to the NIWA Vienna Directory
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#4A4845', lineHeight: 1.6 }}>
            All submissions are reviewed before being published. Please fill in as much detail as possible — listings with complete information are approved faster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Name <span style={{ color: '#C9A8A8' }}>*</span>
            </label>
            <input name="name" required className="niwa-input" placeholder="Café Schwarzenberg" />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Category <span style={{ color: '#C9A8A8' }}>*</span>
            </label>
            <select
              name="category"
              required
              className="niwa-input"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty — only for Doctors */}
          {category === 'Doctors' && (
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
                Medical specialty <span style={{ color: '#C9A8A8' }}>*</span>
              </label>
              <select name="specialty" required className="niwa-input">
                <option value="">Select specialty…</option>
                {DOCTOR_SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Description <span style={{ color: '#C9A8A8' }}>*</span>
            </label>
            <textarea
              name="description"
              required
              className="niwa-input"
              style={{ resize: 'vertical', minHeight: '5rem' }}
              placeholder="Why do you recommend this place? What makes it special for the NIWA community?"
            />
          </div>

          {/* Address + District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
                Address
              </label>
              <input name="address" className="niwa-input" placeholder="Kärntner Ring 17" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
                District (Bezirk)
              </label>
              <select name="district" className="niwa-input">
                <option value="">Select…</option>
                {VIENNA_DISTRICTS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Website + Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
                Website
              </label>
              <input name="website" type="url" className="niwa-input" placeholder="https://example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
                Instagram
              </label>
              <input name="instagram" className="niwa-input" placeholder="@handle or full URL" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Phone
            </label>
            <input name="phone" type="tel" className="niwa-input" placeholder="+43 1 …" />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Tags
            </label>
            <input name="tags" className="niwa-input" placeholder="english-speaking, vegetarian, family-friendly (comma separated)" />
            <p style={{ fontSize: '0.7rem', color: '#9A958F' }}>Comma-separated keywords that help others find this listing</p>
          </div>

          {/* Your name */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: '#1A1917' }}>
              Your name
            </label>
            <input name="submitted_by" className="niwa-input" placeholder="Optional — only visible to admin" />
          </div>

          {state === 'error' && (
            <div
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid #C9A8A8',
                background: '#F0E4E4',
                fontSize: '0.8rem',
                color: '#1A1917',
              }}
            >
              {errorMsg}
            </div>
          )}

          <div style={{ borderTop: '1px solid #D9D2C7', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="niwa-btn" disabled={state === 'loading'}>
              {state === 'loading' ? 'Submitting…' : 'Submit listing'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
