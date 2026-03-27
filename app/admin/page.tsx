'use client'

import { useState, useEffect, useCallback } from 'react'
import { Listing } from '@/lib/types'
import { CATEGORIES } from '@/lib/constants'
import Link from 'next/link'
import { ArrowLeft, Check, X, Plus, RefreshCw, ExternalLink, AtSign, LogOut } from 'lucide-react'

// ─── Add Listing Form ────────────────────────────────────────────────
function AddListingForm({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const res = await fetch('/api/admin/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setLoading(false)
    if (res.ok) {
      setOpen(false)
      setCategory('')
      onAdded()
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="niwa-btn flex items-center gap-2">
        <Plus size={13} /> Add listing
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(26,25,23,0.6)',
        zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div style={{ background: '#FDFAF5', border: '1px solid #D9D2C7', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #D9D2C7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700 }}>Add listing</span>
          <button onClick={() => setOpen(false)} style={{ color: '#9A958F' }}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { name: 'name', label: 'Name', required: true, placeholder: 'Café Schwarzenberg' },
            { name: 'description', label: 'Description', required: true, placeholder: 'Why recommend this?', type: 'textarea' },
            { name: 'address', label: 'Address', placeholder: 'Kärntner Ring 17' },
            { name: 'website', label: 'Website', placeholder: 'https://...' },
            { name: 'instagram', label: 'Instagram', placeholder: '@handle' },
            { name: 'phone', label: 'Phone', placeholder: '+43 1 ...' },
            { name: 'tags', label: 'Tags (comma separated)', placeholder: 'english-speaking, vegan' },
          ].map(({ name, label, required, placeholder, type }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                {label}{required && <span style={{ color: '#C9A8A8' }}> *</span>}
              </label>
              {type === 'textarea' ? (
                <textarea name={name} required={required} className="niwa-input" placeholder={placeholder} style={{ minHeight: '4rem', resize: 'vertical' }} />
              ) : (
                <input name={name} required={required} className="niwa-input" placeholder={placeholder} />
              )}
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              Category <span style={{ color: '#C9A8A8' }}>*</span>
            </label>
            <select name="category" required className="niwa-input" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select…</option>
              {CATEGORIES.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
            </select>
          </div>

          {category === 'Doctors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Specialty <span style={{ color: '#C9A8A8' }}>*</span>
              </label>
              <input name="specialty" required className="niwa-input" placeholder="e.g. Gynecologist" />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>District</label>
            <input name="district" type="number" min={1} max={23} className="niwa-input" placeholder="1–23" />
          </div>

          <div style={{ borderTop: '1px solid #D9D2C7', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" onClick={() => setOpen(false)} className="niwa-btn niwa-btn-outline">Cancel</button>
            <button type="submit" className="niwa-btn" disabled={loading}>{loading ? 'Adding…' : 'Add listing'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Listing Row ───────────────────────────────────────────────────
function ListingRow({ listing, onAction }: { listing: Listing; onAction: () => void }) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const cat = CATEGORIES.find(c => c.label === listing.category)

  async function approve() {
    setLoading('approve')
    await fetch(`/api/admin/approve?id=${listing.id}`, { method: 'PATCH' })
    setLoading(null)
    onAction()
  }

  async function reject() {
    setLoading('reject')
    await fetch(`/api/admin/reject?id=${listing.id}`, { method: 'PATCH' })
    setLoading(null)
    onAction()
  }

  return (
    <div style={{ background: '#FDFAF5', border: '1px solid #D9D2C7', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
            <span className={`category-pill ${cat?.color}`}>{listing.category}</span>
            {listing.specialty && <span style={{ fontSize: '0.65rem', color: '#9A958F', letterSpacing: '0.06em' }}>{listing.specialty}</span>}
            {listing.district && <span style={{ fontSize: '0.65rem', color: '#9A958F' }}>{listing.district}. Bezirk</span>}
          </div>
          <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.05rem', fontWeight: 700, color: '#1A1917', marginBottom: '0.25rem' }}>
            {listing.name}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#4A4845', lineHeight: 1.5 }}>{listing.description}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {listing.website && (
              <a href={listing.website} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.7rem', color: '#4A4845', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ExternalLink size={10} /> {listing.website.replace(/^https?:\/\//, '').split('/')[0]}
              </a>
            )}
            {listing.instagram && (
              <span style={{ fontSize: '0.7rem', color: '#C9A8A8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AtSign size={10} /> {listing.instagram}
              </span>
            )}
          </div>
          {listing.submitted_by && (
            <p style={{ fontSize: '0.65rem', color: '#9A958F', marginTop: '0.5rem' }}>
              Submitted by {listing.submitted_by} · {new Date(listing.submitted_at).toLocaleDateString('en-GB')}
            </p>
          )}
        </div>

        {listing.status === 'pending' && (
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <button onClick={approve} disabled={!!loading}
              style={{ padding: '0.5rem 0.875rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, border: '1px solid #1A1917', background: '#1A1917', color: '#F4EFE6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Check size={11} /> {loading === 'approve' ? '…' : 'Approve'}
            </button>
            <button onClick={reject} disabled={!!loading}
              style={{ padding: '0.5rem 0.875rem', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, border: '1px solid #D9D2C7', background: 'transparent', color: '#9A958F', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <X size={11} /> {loading === 'reject' ? '…' : 'Reject'}
            </button>
          </div>
        )}

        {listing.status === 'published' && (
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F', border: '1px solid #D9D2C7', padding: '0.2rem 0.5rem' }}>
            Published
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Admin Page ────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [listings, setListings] = useState<Listing[]>([])
  const [tab, setTab] = useState<'pending' | 'published'>('pending')
  const [loading, setLoading] = useState(false)

  const fetchListings = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/listings')
    if (res.status === 401) { setAuthed(false); setLoading(false); return }
    if (res.ok) setListings(await res.json())
    setLoading(false)
  }, [])

  // Check if already logged in via cookie
  useEffect(() => {
    fetch('/api/admin/listings').then(res => {
      if (res.ok) {
        res.json().then(data => { setListings(data); setAuthed(true) })
      }
    })
  }, [])

  useEffect(() => {
    if (authed) fetchListings()
  }, [authed, fetchListings])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPwLoading(true)
    setPwError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setPwLoading(false)
    if (res.ok) {
      setAuthed(true)
      setPassword('')
    } else {
      setPwError('Incorrect password')
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
    setListings([])
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div style={{ maxWidth: '360px', width: '100%' }}>
          <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
            Admin Access
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              className="niwa-input"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            {pwError && <p style={{ fontSize: '0.75rem', color: '#C9A8A8' }}>{pwError}</p>}
            <button type="submit" className="niwa-btn" disabled={pwLoading}>
              {pwLoading ? 'Checking…' : 'Enter'}
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}>
              ← Back to directory
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const pending = listings.filter(l => l.status === 'pending')
  const published = listings.filter(l => l.status === 'published')
  const shown = tab === 'pending' ? pending : published

  return (
    <div className="min-h-screen">
      <header style={{ borderBottom: '1px solid #D9D2C7' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={11} /> Directory
            </Link>
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700 }}>Admin</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <AddListingForm onAdded={fetchListings} />
            <button onClick={fetchListings} style={{ padding: '0.5rem', border: '1px solid #D9D2C7', background: 'transparent', cursor: 'pointer', color: '#9A958F' }} title="Refresh">
              <RefreshCw size={13} />
            </button>
            <button onClick={handleLogout} style={{ padding: '0.5rem', border: '1px solid #D9D2C7', background: 'transparent', cursor: 'pointer', color: '#9A958F' }} title="Log out">
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid #D9D2C7' }}>
          {(['pending', 'published'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, padding: '0.625rem 1.25rem', border: 'none', borderBottom: tab === t ? '2px solid #1A1917' : '2px solid transparent', background: 'transparent', color: tab === t ? '#1A1917' : '#9A958F', cursor: 'pointer', marginBottom: '-1px' }}>
              {t} ({t === 'pending' ? pending.length : published.length})
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ fontSize: '0.8rem', color: '#9A958F' }}>Loading…</p>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', fontStyle: 'italic', color: '#D9D2C7' }}>
              No {tab} listings
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {shown.map(l => <ListingRow key={l.id} listing={l} onAction={fetchListings} />)}
          </div>
        )}
      </main>
    </div>
  )
}
