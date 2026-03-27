import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function PATCH(request: NextRequest) {
  const pw = request.headers.get('x-admin-password')
  if (pw !== process.env.ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const id = request.nextUrl.searchParams.get('id')
  if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await getAdmin()
    .from('listings')
    .update({ status: 'rejected' })
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
