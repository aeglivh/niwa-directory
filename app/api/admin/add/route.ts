import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAuthenticated, unauthorizedResponse } from '@/lib/auth'
import { CATEGORIES } from '@/lib/constants'

const VALID_CATEGORIES: string[] = CATEGORIES.map(c => c.label)

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorizedResponse()

  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, category, specialty, description, address, district, website, instagram, phone, tags, is_niwa_member } = body

  if (!name?.trim()) return Response.json({ error: 'Name is required' }, { status: 400 })
  if (!category || !VALID_CATEGORIES.includes(category)) return Response.json({ error: 'Valid category is required' }, { status: 400 })
  if (!description?.trim()) return Response.json({ error: 'Description is required' }, { status: 400 })

  const parsedTags = tags
    ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  const { error } = await getAdmin().from('listings').insert({
    name: name.trim(),
    category,
    specialty: specialty?.trim() || null,
    description: description.trim(),
    address: address?.trim() || null,
    district: district ? Number(district) : null,
    website: website?.trim() || null,
    instagram: instagram?.trim() || null,
    phone: phone?.trim() || null,
    tags: parsedTags,
    is_niwa_member: is_niwa_member === 'true',
    status: 'published',
    published_at: new Date().toISOString(),
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true }, { status: 201 })
}
