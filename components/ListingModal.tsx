'use client'

import { useEffect } from 'react'
import { Listing } from '@/lib/types'
import { CATEGORIES } from '@/lib/constants'
import { X, ExternalLink, AtSign, MapPin, Phone, Star } from 'lucide-react'

export default function ListingModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const cat = CATEGORIES.find((c) => c.label === listing.category)
  const Icon = cat?.icon
  const instagramHandle = listing.instagram?.replace(/.*instagram\.com\//, '').replace(/\/$/, '').replace('@', '')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(26, 25, 23, 0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onClose}
    >
      <article
        style={{
          background: '#E0DBD3',
          border: '1px solid #A8A29A',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#7A7670', padding: '0.25rem',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '1.75rem 1.75rem 1.5rem' }}>
          {/* Double rule */}
          <div style={{ borderTop: '3px solid #1A1917', paddingTop: '3px', borderBottom: '1px solid #1A1917', marginBottom: '1.25rem' }} />

          {/* Category + district */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className={`category-pill ${cat?.color ?? 'text-stone-700 border-stone-400'}`}>
                {Icon && <Icon size={10} />}
                {listing.category}
              </span>
              {listing.is_niwa_member && (
                <span className="member-badge">
                  <Star size={8} aria-hidden="true" />
                  NIWA Member
                </span>
              )}
            </div>
            {listing.district && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.65rem', letterSpacing: '0.08em', color: '#7A7670' }}>
                <MapPin size={10} />
                {listing.district}. Bezirk
              </span>
            )}
          </div>

          {/* Name */}
          <h2 style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#1A1917',
            marginBottom: '0.35rem',
          }}>
            {listing.name}
          </h2>

          {/* Specialty */}
          {listing.specialty && (
            <p style={{ fontSize: '0.72rem', color: '#9A958F', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
              {listing.specialty}
            </p>
          )}

          {/* Double rule */}
          <div style={{ borderTop: '1px solid #C8C2B8', margin: '1rem 0' }} />

          {/* Full description */}
          <p style={{ fontSize: '0.875rem', color: '#4A4845', lineHeight: 1.65 }}>
            {listing.description}
          </p>

          {/* Address */}
          {listing.address && (
            <p style={{ fontSize: '0.78rem', color: '#7A7670', marginTop: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <MapPin size={12} style={{ marginTop: '2px', flexShrink: 0 }} />
              {listing.address}
            </p>
          )}

          {/* Tags */}
          {listing.tags && listing.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '1.25rem' }}>
              {listing.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '0.15rem 0.4rem', border: '1px solid #A8A29A', color: '#4A4845',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Double rule */}
          <div style={{ borderTop: '1px solid #C8C2B8', margin: '1.25rem 0 1rem' }} />

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {listing.website && (
              <a href={listing.website} target="_blank" rel="noopener noreferrer" className="card-link">
                <ExternalLink size={12} aria-hidden="true" />
                {listing.website.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]}
              </a>
            )}
            {instagramHandle && (
              <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer" className="card-link">
                <AtSign size={12} aria-hidden="true" />@{instagramHandle}
              </a>
            )}
            {listing.phone && (
              <a href={`tel:${listing.phone}`} className="card-link">
                <Phone size={12} aria-hidden="true" />
                {listing.phone}
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
