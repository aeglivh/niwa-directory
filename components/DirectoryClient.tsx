'use client'

import { useState, useMemo } from 'react'
import { Listing, Category } from '@/lib/types'
import { CATEGORIES, VIENNA_DISTRICTS } from '@/lib/constants'
import ListingCard from './ListingCard'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function DirectoryClient({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [district, setDistrict] = useState<string>('')

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchCat = activeCategory === 'All' || l.category === activeCategory
      const matchDistrict = !district || String(l.district) === district
      const q = query.toLowerCase()
      const matchQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.specialty?.toLowerCase().includes(q) ?? false) ||
        (l.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
      return matchCat && matchDistrict && matchQuery
    })
  }, [listings, query, activeCategory, district])

  return (
    <>
      {/* Search + district filter */}
      <div
        className="flex flex-col sm:flex-row gap-2 mb-6"
        style={{ borderBottom: '1px solid #D9D2C7', paddingBottom: '1.25rem' }}
      >
        <div className="relative flex-1">
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9A958F',
            }}
          />
          <input
            className="niwa-input"
            style={{ paddingLeft: '2.25rem' }}
            placeholder="Search by name, specialty, or keyword…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="relative sm:w-44">
          <SlidersHorizontal
            size={13}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9A958F',
              pointerEvents: 'none',
            }}
          />
          <select
            className="niwa-input select"
            style={{ paddingLeft: '2.25rem' }}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">All districts</option>
            {VIENNA_DISTRICTS.map((d) => (
              <option key={d.value} value={String(d.value)}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5 mb-8">
        <button
          className={`filter-pill flex-1 justify-center ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          All
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.label}
              className={`filter-pill flex-1 justify-center ${activeCategory === cat.label ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.label)}
            >
              <Icon size={11} />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <p
        className="mb-5"
        style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}
      >
        {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
        {activeCategory !== 'All' && ` in ${activeCategory}`}
        {district && ` · ${district}. Bezirk`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.5rem',
              fontStyle: 'italic',
              color: '#D9D2C7',
            }}
          >
            No listings found
          </p>
          <p style={{ fontSize: '0.8rem', color: '#9A958F' }}>
            Try a different category or search term
          </p>
        </div>
      )}
    </>
  )
}
