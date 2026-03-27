import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/lib/constants'

const VALID_CATEGORIES: string[] = CATEGORIES.map(c => c.label)

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, category, specialty, description, address, district, website, instagram, phone, tags, submitted_by } = body

  // Validation
  if (!name?.trim()) return Response.json({ error: 'Name is required' }, { status: 400 })
  if (!category || !VALID_CATEGORIES.includes(category)) return Response.json({ error: 'Valid category is required' }, { status: 400 })
  if (!description?.trim()) return Response.json({ error: 'Description is required' }, { status: 400 })
  if (category === 'Doctors' && !specialty?.trim()) return Response.json({ error: 'Specialty is required for doctors' }, { status: 400 })

  // Duplicate check (same name + category)
  const { data: existing } = await supabase
    .from('listings')
    .select('id')
    .eq('name', name.trim())
    .eq('category', category)
    .not('status', 'eq', 'rejected')
    .limit(1)

  if (existing && existing.length > 0) {
    return Response.json({ error: 'A listing with this name and category already exists.' }, { status: 409 })
  }

  const parsedTags = tags
    ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : []

  const { error } = await supabase.from('listings').insert({
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
    submitted_by: submitted_by?.trim() || null,
    status: 'pending',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true }, { status: 201 })
}
