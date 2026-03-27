import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function checkAuth(request: NextRequest): boolean {
  const pw = request.headers.get('x-admin-password')
  return pw === process.env.ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await getAdmin()
    .from('listings')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
