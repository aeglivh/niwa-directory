import { NextRequest } from 'next/server'
import { getExpectedToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(request: NextRequest) {
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = getExpectedToken()

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
    },
  })
}
