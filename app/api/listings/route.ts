import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const district = searchParams.get('district')

  let query = supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (category) query = query.eq('category', category)
  if (district) query = query.eq('district', Number(district))

  const { data, error } = await query

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
