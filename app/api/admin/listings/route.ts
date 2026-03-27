import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorizedResponse()

  const { data, error } = await getAdmin()
    .from('listings')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
