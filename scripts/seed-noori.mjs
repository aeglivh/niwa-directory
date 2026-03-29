import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const { data, error } = await supabase.from('listings').insert({
  name: 'Dr. Shahrouz Noori',
  category: 'Doctors',
  specialty: 'Dermatologist',
  description: 'Dermatology, venereology and lymphology practice in the 4th district. Services include skin cancer screening with digital photo documentation, cosmetic dermatology, acne and rosacea treatment, wart removal, hair loss consultation, and paediatric dermatology. Online booking required. All Austrian health insurance accepted.',
  address: 'Gußhausstraße 10/17, 1040 Wien',
  district: 4,
  website: 'https://www.hautarzt-noori.at',
  phone: '+43 1 9928427',
  tags: ['dermatology', 'skin cancer screening', 'cosmetic dermatology', 'lymphology', 'kassenarzt'],
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
