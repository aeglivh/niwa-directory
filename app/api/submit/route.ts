import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CATEGORIES } from '@/lib/constants'
import { Resend } from 'resend'

const VALID_CATEGORIES: string[] = CATEGORIES.map(c => c.label)

export async function POST(request: NextRequest) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, category, specialty, description, address, district, website, instagram, phone, tags, submitted_by, is_niwa_member } = body

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
    is_niwa_member: is_niwa_member === 'on' || is_niwa_member === 'true',
    status: 'pending',
  })

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Notify admin of new pending submission
  if (process.env.NOTIFY_EMAIL && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'NIWA Directory <onboarding@resend.dev>',
      to: process.env.NOTIFY_EMAIL,
      subject: `New listing submission: ${name.trim()}`,
      html: `
        <p>A new listing has been submitted and is waiting for your review.</p>
        <table style="border-collapse:collapse;margin-top:12px">
          <tr><td style="padding:4px 12px 4px 0;color:#9A958F;font-size:13px">Name</td><td style="font-size:13px"><strong>${name.trim()}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#9A958F;font-size:13px">Category</td><td style="font-size:13px">${category}</td></tr>
          ${district ? `<tr><td style="padding:4px 12px 4px 0;color:#9A958F;font-size:13px">District</td><td style="font-size:13px">${district}. Bezirk</td></tr>` : ''}
          ${submitted_by ? `<tr><td style="padding:4px 12px 4px 0;color:#9A958F;font-size:13px">Submitted by</td><td style="font-size:13px">${submitted_by}</td></tr>` : ''}
        </table>
        <p style="margin-top:20px"><a href="https://niwa-directory.vercel.app/admin" style="background:#1A1917;color:#F4EFE6;padding:10px 20px;text-decoration:none;font-size:13px">Review in admin panel →</a></p>
      `,
    }).catch(() => {/* non-blocking — don't fail the submission if email errors */})
  }

  return Response.json({ success: true }, { status: 201 })
}
