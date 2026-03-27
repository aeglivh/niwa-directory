import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function PATCH(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorizedResponse()

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await getAdmin()
    .from('listings')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
