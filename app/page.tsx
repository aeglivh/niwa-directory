import { supabase } from '@/lib/supabase'
import { Listing } from '@/lib/types'
import DirectoryClient from '@/components/DirectoryClient'
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
      {/* Masthead */}
      <header style={{ borderBottom: '1px solid #D9D2C7' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-0">
          {/* Top bar */}
          <div
            className="flex items-center justify-between mb-4"
            style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9A958F' }}
          >
            <span>Network of International Women Austria</span>
            <span>Vienna, Austria</span>
          </div>

          {/* Double rule */}
          <div className="rule-double mb-4" />

          {/* Title */}
          <div className="text-center pb-5">
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                color: '#1A1917',
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
              }}
            >
              Vienna Directory
            </p>
          </div>

          {/* Bottom rule */}
          <div className="rule-double" />

          {/* Nav bar */}
          <nav
            className="flex items-center justify-between py-2"
            style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            <span style={{ color: '#9A958F' }}>
              {listings.length} curated listings
            </span>
            <div className="flex items-center gap-4">
              <Link href="/submit" style={{ color: '#1A1917' }} className="hover:text-niwa-rose transition-colors">
                Submit a listing
              </Link>
              <span style={{ color: '#D9D2C7' }}>·</span>
              <Link href="/admin" style={{ color: '#9A958F' }} className="hover:text-ink transition-colors">
                Admin
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Directory */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <DirectoryClient listings={listings} />
      </main>

      {/* Footer */}
      <footer
        style={{ borderTop: '1px solid #D9D2C7' }}
        className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}>
            © NIWA — Network of International Women Austria
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://niwa-at.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}
              className="hover:text-ink transition-colors"
            >
              niwa-at.org
            </a>
            <span style={{ color: '#D9D2C7' }}>·</span>
            <Link
              href="/submit"
              style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A958F' }}
              className="hover:text-ink transition-colors"
            >
              Submit a listing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
