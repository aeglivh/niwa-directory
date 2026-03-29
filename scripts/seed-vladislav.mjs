import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const { data, error } = await supabase.from('listings').insert({
  name: 'Vladislav',
  category: 'Services',
  specialty: null,
  description: 'Highly recommended moving service. Available by phone.',
  address: null,
  district: null,
  website: null,
  phone: '+380 96 139 00 96',
  tags: ['moving', 'removals'],
  is_niwa_member: false,
  status: 'published',
  submitted_at: now,
  published_at: now,
}).select('name, status')

if (error) {
  console.error('Error:', error.message)
} else {
  console.log(`Added: ${data[0].name}`)
}
