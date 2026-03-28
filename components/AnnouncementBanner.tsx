'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// ─── Edit here to show a new announcement ───────────────────────────────────
// Change `id` whenever you update `message` so it re-appears for all visitors.
// Set `message` to null (or empty string) to hide the banner entirely.
// Set `link` to a URL to make the message clickable (optional).
const ANNOUNCEMENT = {
  id: 'v1',
  message: 'Are you a NIWA member or know a great business? Submit your listing to the directory.' as string | null,
  link: '/submit' as string | null,
}
// ────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = `niwa_banner_dismissed_${ANNOUNCEMENT.id}`

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ANNOUNCEMENT.message) return
    if (localStorage.getItem(STORAGE_KEY)) return
    setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        background: '#1A1917',
        color: '#F4EFE6',
        borderBottom: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0.6rem 1.25rem',
        position: 'relative',
      }}
    >
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textAlign: 'center', flex: 1 }}>
        {ANNOUNCEMENT.link ? (
          <a href={ANNOUNCEMENT.link} style={{ color: '#F4EFE6', textDecoration: 'underline', textDecorationColor: 'rgba(244,239,230,0.4)', textUnderlineOffset: '2px' }}>
            {ANNOUNCEMENT.message}
          </a>
        ) : ANNOUNCEMENT.message}
      </p>
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, '1')
          setVisible(false)
        }}
        aria-label="Dismiss announcement"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9A958F',
          padding: '0.25rem',
          flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>
    </div>
  )
}
