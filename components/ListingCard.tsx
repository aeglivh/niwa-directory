'use client'

import { Listing } from '@/lib/types'
import { CATEGORIES } from '@/lib/constants'
import { ExternalLink, AtSign, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES.find((c) => c.label === category)
  return (
    <span className={`category-pill ${cat?.color ?? 'bg-stone-50 text-stone-700 border-stone-200'}`}>
      <span>{cat?.icon}</span>
      {category}
    </span>
  )
}

function OgImage({ src, name }: { src?: string | null; name: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className="w-full h-40 shimmer flex items-center justify-center">
        <span
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#D9D2C7',
            letterSpacing: '-0.02em',
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
          <CategoryBadge category={listing.category} />
          {listing.district && (
            <span className="flex items-center gap-1 text-ink-muted" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>
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
                  border: '1px solid #D9D2C7',
                  color: '#9A958F',
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
          style={{ borderTop: '1px solid #D9D2C7' }}
        >
          {listing.website && (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
              style={{ fontSize: '0.72rem', color: '#4A4845' }}
            >
              <ExternalLink size={11} />
              {listing.website.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]}
            </a>
          )}
          {instagramHandle && (
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline"
              style={{ fontSize: '0.72rem', color: '#C9A8A8' }}
            >
              <AtSign size={11} />@{instagramHandle}
            </a>
          )}
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="flex items-center gap-1"
              style={{ fontSize: '0.72rem', color: '#4A4845' }}
            >
              <Phone size={11} />
              {listing.phone}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
