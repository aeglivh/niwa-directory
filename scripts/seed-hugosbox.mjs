import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const { data, error } = await supabase.from('listings').insert({
  name: 'Hugosbox',
  category: 'Shopping & Markets',
  specialty: null,
  description: 'Balloon and party decoration studio in the 8th district. Specialises in custom balloon arrangements, party styling and event decoration for birthdays, baby showers, weddings and corporate events.',
  address: 'Josefstädter Straße 17, 1080 Wien',
  district: 8,
  website: 'https://www.hugosbox.at',
  instagram: 'https://instagram.com/hugosbox_at',
  phone: '+43 677 61849235',
  tags: ['balloons', 'party decoration', 'events', 'styling'],
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
