import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const { data, error } = await supabase.from('listings').insert({
  name: 'Dr. Robert Stillmann, MSc',
  category: 'Doctors',
  specialty: 'Dentist',
  description: 'Modern dental practice in the 19th district specialising in implantology, aesthetic dentistry, and orthodontics. Known for 3D computer-navigated implants, same-day fixed teeth, and an in-house dental laboratory. Treats children, adults, and patients with dental anxiety. All public insurance accepted.',
  address: 'Krottenbachstraße 82-86, 1190 Wien',
  district: 19,
  website: 'https://www.stillmann.at',
  phone: '+43 1 368 21 21',
  tags: ['dentist', 'implantology', 'aesthetic-dentistry', 'orthodontics', 'kassenarzt'],
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
