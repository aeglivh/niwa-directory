'use client'

import { Listing } from '@/lib/types'
import { CATEGORIES } from '@/lib/constants'
import { ExternalLink, AtSign, MapPin, Phone, Star } from 'lucide-react'
import { useState } from 'react'

function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES.find((c) => c.label === category)
  const Icon = cat?.icon
  return (
    <span className={`category-pill ${cat?.color ?? 'text-stone-700 border-stone-400'}`}>
      {Icon && <Icon size={10} />}
      {category}
    </span>
  )
}

function OgImage({ src, name }: { src?: string | null; name: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        className="w-full h-40 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #C8C2B8 0%, #D4CEC4 100%)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '3rem',
            fontWeight: 700,
            color: '#B0AA9F',
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-40 overflow-hidden bg-parchment-dark">
      {!loaded && <div className="absolute inset-0 shimmer" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const instagramHandle = listing.instagram?.replace(/.*instagram\.com\//, '').replace(/\/$/, '').replace('@', '')

  return (
    <article className="listing-card flex flex-col">
      <OgImage src={listing.og_image} name={listing.name} />

      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category + district row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <CategoryBadge category={listing.category} />
            {listing.is_niwa_member && (
              <span className="member-badge">
                <Star size={8} aria-hidden="true" />
                Member
              </span>
            )}
          </div>
          {listing.district && (
            <span className="flex items-center gap-1 text-ink-muted" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', marginLeft: 'auto' }}>
              <MapPin size={10} />
              {listing.district}. Bezirk
            </span>
          )}
        </div>

        {/* Name */}
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '1.1rem',
            fontWeight: 700,
            lineHeight: 1.25,
            color: '#1A1917',
          }}
        >
          {listing.name}
        </h2>

        {/* Specialty */}
        {listing.specialty && (
          <p style={{ fontSize: '0.72rem', color: '#9A958F', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
            {listing.specialty}
          </p>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#4A4845',
            lineHeight: 1.55,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {listing.description}
        </p>

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {listing.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.15rem 0.4rem',
                  border: '1px solid #A8A29A',
                  color: '#4A4845',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Links row */}
        <div
          className="flex items-center gap-3 flex-wrap mt-2 pt-3"
          style={{ borderTop: '1px solid #C8C2B8' }}
        >
          {listing.website && (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              aria-label={`Visit website: ${listing.website.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]} (opens in new tab)`}
            >
              <ExternalLink size={11} aria-hidden="true" />
              {listing.website.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]}
            </a>
          )}
          {instagramHandle && (
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              aria-label={`Instagram profile: @${instagramHandle} (opens in new tab)`}
            >
              <AtSign size={11} aria-hidden="true" />@{instagramHandle}
            </a>
          )}
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="card-link"
              aria-label={`Call ${listing.name}: ${listing.phone}`}
            >
              <Phone size={11} aria-hidden="true" />
              {listing.phone}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
