import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'NIWA Vienna Directory',
  description: 'A curated directory of places in Vienna — doctors, food, shopping, wellness and more — by the NIWA community.',
  openGraph: {
    title: 'NIWA Vienna Directory',
    description: 'Curated by the Network of International Women Austria',
    type: 'website',
    url: 'https://niwa-directory.vercel.app',
    siteName: 'NIWA Vienna Directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NIWA Vienna Directory',
    description: 'Curated by the Network of International Women Austria',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
