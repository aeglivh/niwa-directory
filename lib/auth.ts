import { createHmac } from 'crypto'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'niwa_admin'

export function getExpectedToken(): string {
  return createHmac('sha256', process.env.ADMIN_PASSWORD!)
    .update('niwa-admin-session')
    .digest('hex')
}

export function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(COOKIE_NAME)
  return cookie?.value === getExpectedToken()
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export { COOKIE_NAME }
