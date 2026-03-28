import { supabase } from '@/lib/supabase'
import { Listing } from '@/lib/types'
import DirectoryClient from '@/components/DirectoryClient'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import Link from 'next/link'

async function getListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch listings:', error)
    return []
  }
  return data as Listing[]
}

export const revalidate = 60

export default async function Home() {
  const listings = await getListings()

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      {/* Masthead */}
      <header style={{ borderBottom: '1px solid #D9D2C7' }}>
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 pt-6 mb-4"
          style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9A958F', animation: 'fadeIn 0.5s ease 0s both' }}
        >
          <span className="hidden sm:block">Network of International Women Austria</span>
          <span className="sm:hidden">NIWA</span>
          <span>Vienna, Austria</span>
        </div>

        {/* Double rule — full width */}
        <div className="rule-double" style={{ animation: 'fadeIn 0.5s ease 0.15s both' }} />

        {/* Title */}
        <div className="text-center py-5">
          <a href="/" style={{ display: 'inline-block', textDecoration: 'none', cursor: 'pointer' }}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                color: '#1A1917',
                animation: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both',
              }}
            >
              NIWA
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                fontWeight: 400,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#9A958F',
                marginTop: '0.35rem',
                animation: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both',
              }}
            >
              Vienna Directory
            </p>
          </a>
        </div>

        {/* Bottom rule — full width */}
        <div className="rule-double" style={{ animation: 'fadeIn 0.5s ease 0.55s both' }} />

        {/* Nav bar */}
        <nav
          className="flex items-center justify-between px-4 sm:px-8 py-2"
          style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', animation: 'fadeIn 0.5s ease 0.65s both' }}
        >
          <span style={{ color: '#9A958F' }}>
            {listings.length} curated listings
          </span>
          <div className="flex items-center gap-4">
            <Link href="/submit" style={{ color: '#1A1917' }} className="hover:text-niwa-rose transition-colors">
              Submit a listing
            </Link>
            <span className="hidden lg:inline" style={{ color: '#D9D2C7' }}>·</span>
            <Link href="/admin" className="hidden lg:inline hover:text-ink transition-colors" style={{ color: '#9A958F' }}>
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* Directory */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <DirectoryClient listings={listings} />
      </main>

      {/* Footer */}
      <footer
        style={{ borderTop: '1px solid #B8B2A8' }}
        className="w-full px-4 sm:px-8 py-5"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7670' }}>
              © NIWA — Network of International Women Austria
            </p>
            <span className="hidden sm:inline" style={{ color: '#B8B2A8' }}>·</span>
            <a
              href="https://niwa-at.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7670' }}
              className="hover:text-ink transition-colors"
            >
              niwa-at.org
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7670' }}>
              Made by Studio Egli Labs
            </span>
            <span className="hidden sm:inline" style={{ color: '#B8B2A8' }}>·</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7670' }}>
              v1.0
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
