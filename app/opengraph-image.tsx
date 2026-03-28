import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NIWA Vienna Directory'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await fetch(
    new URL('/fonts/PlayfairDisplay-Black.ttf', 'https://niwa-directory.vercel.app')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#D8D2C6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Top double rule */}
        <div style={{ position: 'absolute', top: 72, left: 72, right: 72, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ height: '3px', background: '#1A1917', display: 'flex' }} />
          <div style={{ height: '1px', background: '#1A1917', display: 'flex' }} />
        </div>

        {/* NIWA wordmark */}
        <div
          style={{
            fontFamily: 'Playfair Display',
            fontSize: '168px',
            fontWeight: 900,
            letterSpacing: '-4px',
            lineHeight: 1,
            color: '#1A1917',
            display: 'flex',
          }}
        >
          NIWA
        </div>

        {/* Vienna Directory subtitle */}
        <div
          style={{
            fontFamily: 'Playfair Display',
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '10px',
            color: '#9A958F',
            marginTop: '18px',
            display: 'flex',
          }}
        >
          VIENNA DIRECTORY
        </div>

        {/* Bottom double rule */}
        <div style={{ position: 'absolute', bottom: 72, left: 72, right: 72, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ height: '3px', background: '#1A1917', display: 'flex' }} />
          <div style={{ height: '1px', background: '#1A1917', display: 'flex' }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Playfair Display', data: fontData, style: 'normal', weight: 900 }],
    }
  )
}
